import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import classNames from 'classnames';
import { intlShape } from '../../util/reactIntl';
import {
  getStartHours,
  getEndHours,
  isInRange,
  isSameDate,
  isDayMomentInsideRange,
  resetToStartOfDay,
  timeOfDayFromLocalToTimeZone,
  timeOfDayFromTimeZoneToLocal,
  dateIsAfter,
  findNextBoundary,
  timestampToDate,
  localizeAndFormatTime,
  monthIdStringInTimeZone,
  getMonthStartInTimeZone,
  nextMonthFn,
  prevMonthFn,
} from '../../util/dates';
import moment from 'moment';
import { propTypes } from '../../util/types';
import { bookingDateRequired } from '../../util/validators';
import { FieldDateInput, FieldSelect, InlineTextButton } from '../../components';

import NextMonthIcon from './NextMonthIcon';
import PreviousMonthIcon from './PreviousMonthIcon';
import css from './FieldDateAndTimeInput.css';

const MAX_TIME_SLOTS_RANGE = 180;
const TODAY = new Date();

const endOfRange = (date, timeZone) => {
  return resetToStartOfDay(date, timeZone, MAX_TIME_SLOTS_RANGE - 1);
};

const getAvailableStartTimes = (intl, timeZone, bookingStart, timeSlotsOnSelectedDate) => {
  if (timeSlotsOnSelectedDate.length === 0 || !timeSlotsOnSelectedDate[0] || !bookingStart) {
    return [];
  }
  const bookingStartDate = resetToStartOfDay(bookingStart, timeZone);

  const allHours = timeSlotsOnSelectedDate.reduce((availableHours, t) => {
    const startDate = t.attributes.start;
    const endDate = t.attributes.end;
    const nextDate = resetToStartOfDay(bookingStartDate, timeZone, 1);

    // If the start date is after timeslot start, use the start date.
    // Otherwise use the timeslot start time.
    const startLimit = dateIsAfter(bookingStartDate, startDate) ? bookingStartDate : startDate;

    // If date next to selected start date is inside timeslot use the next date to get the hours of full day.
    // Otherwise use the end of the timeslot.
    const endLimit = dateIsAfter(endDate, nextDate) ? nextDate : endDate;

    const hours = getStartHours(intl, timeZone, startLimit, endLimit);
    return availableHours.concat(hours);
  }, []);
  return allHours;
};

const getAvailableEndTimes = (
  intl,
  timeZone,
  bookingStartTime,
  bookingEndDate,
  selectedTimeSlot
) => {
  if (!selectedTimeSlot || !selectedTimeSlot.attributes || !bookingEndDate || !bookingStartTime) {
    return [];
  }

  const endDate = selectedTimeSlot.attributes.end;
  const bookingStartTimeAsDate = timestampToDate(bookingStartTime);

  const dayAfterBookingEnd = resetToStartOfDay(bookingEndDate, timeZone, 1);
  const dayAfterBookingStart = resetToStartOfDay(bookingStartTimeAsDate, timeZone, 1);
  const startOfEndDay = resetToStartOfDay(bookingEndDate, timeZone);

  let startLimit;
  let endLimit;

  if (!dateIsAfter(startOfEndDay, bookingStartTimeAsDate)) {
    startLimit = bookingStartTimeAsDate;
    endLimit = dateIsAfter(dayAfterBookingStart, endDate) ? endDate : dayAfterBookingStart;
  } else {
    // If the end date is on the same day as the selected booking start time
    // use the start time as limit. Otherwise use the start of the selected end date.
    startLimit = dateIsAfter(bookingStartTimeAsDate, startOfEndDay)
      ? bookingStartTimeAsDate
      : startOfEndDay;

    // If the selected end date is on the same day as timeslot end, use the timeslot end.
    // Else use the start of the next day after selected date.
    endLimit = isSameDate(resetToStartOfDay(endDate, timeZone), startOfEndDay)
      ? endDate
      : dayAfterBookingEnd;
  }

  return getEndHours(intl, timeZone, startLimit, endLimit);
};

const getTimeSlots = (timeSlots, date, timeZone) => {
  return timeSlots && timeSlots[0]
    ? timeSlots.filter(t => isInRange(date, t.attributes.start, t.attributes.end, 'day', timeZone))
    : [];
};

// Use start date to calculate the first possible start time or times, end date and end time or times.
// If the selected value is passed to function it will be used instead of calculated value.
const getAllTimeValues = (
  intl,
  timeZone,
  timeSlots,
  startDate,
  selectedStartTime,
  selectedEndDate,
  values
) => {
  let times = getTimeSlots(timeSlots, startDate, timeZone);
  console.log({ times });
  let startTimes = selectedStartTime
    ? []
    : getAvailableStartTimes(intl, timeZone, startDate, times);

  let hasVal =
    values && values.bookingStartTime && values.bookingStartTime.length > 0 ? true : false;

  console.log('before start', startTimes, values);
  console.log({ selectedStartTime });

  if (hasVal) {
    console.log('values in val', values.bookingStartTime);
    startTimes =
      startTimes.length > 0 &&
      startTimes.filter(time => {
        let findVal = values.bookingStartTime.some((item, i) =>
          isInRange(
            timestampToDate(time.timestamp),
            timestampToDate(values.bookingStartTime[i]),
            timestampToDate(values.bookingEndTime[i]),
            'hour',
            timeZone
          )
        );
        // let findVal = values.bookingStartTime.includes(time.timestamp);
        console.log('find', findVal);
        return findVal ? false : true;
      });
  }
  console.log('after start', startTimes, values);

  const startTime = selectedStartTime
    ? selectedStartTime
    : startTimes.length > 0 && startTimes[0] && startTimes[0].timestamp
    ? startTimes[0].timestamp
    : null;

  const startTimeAsDate = startTime ? timestampToDate(startTime) : null;

  // Note: We need to remove 1ms from the calculated endDate so that if the end
  // date would be the next day at 00:00 the day in the form is still correct.
  // Because we are only using the date and not the exact time we can remove the
  // 1ms.
  const endDate = selectedEndDate
    ? selectedEndDate
    : startTimeAsDate
    ? new Date(findNextBoundary(timeZone, startTimeAsDate).getTime() - 1)
    : null;

  const selectedTimeSlot = timeSlots.find(t =>
    isInRange(startTimeAsDate, t.attributes.start, t.attributes.end)
  );

  const endTimes = getAvailableEndTimes(intl, timeZone, startTime, endDate, selectedTimeSlot);
  const endTime =
    endTimes.length > 0 && endTimes[0] && endTimes[0].timestamp ? endTimes[0].timestamp : null;

  return { startTime, endDate, endTime, selectedTimeSlot };
};

const getMonthlyTimeSlots = (monthlyTimeSlots, date, timeZone, values) => {
  const monthId = monthIdStringInTimeZone(date, timeZone);

  return !monthlyTimeSlots || Object.keys(monthlyTimeSlots).length === 0
    ? []
    : monthlyTimeSlots[monthId] && monthlyTimeSlots[monthId].timeSlots
    ? monthlyTimeSlots[monthId].timeSlots
    : [];
};

const Next = props => {
  const { currentMonth, timeZone } = props;
  const nextMonthDate = nextMonthFn(currentMonth, timeZone);

  return dateIsAfter(nextMonthDate, endOfRange(TODAY, timeZone)) ? null : <NextMonthIcon />;
};
const Prev = props => {
  const { currentMonth, timeZone } = props;
  const prevMonthDate = prevMonthFn(currentMonth, timeZone);
  const currentMonthDate = getMonthStartInTimeZone(TODAY, timeZone);

  return dateIsAfter(prevMonthDate, currentMonthDate) ? <PreviousMonthIcon /> : null;
};

/////////////////////////////////////
// FieldDateAndTimeInput component //
/////////////////////////////////////
class FieldDateAndTimeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldError: null,
      currentMonth: getMonthStartInTimeZone(TODAY, props.timeZone),
    };

    this.fetchMonthData = this.fetchMonthData.bind(this);
    this.onMonthClick = this.onMonthClick.bind(this);
    this.onBookingStartDateChange = this.onBookingStartDateChange.bind(this);
    this.onBookingStartTimeChange = this.onBookingStartTimeChange.bind(this);
    this.onBookingEndDateChange = this.onBookingEndDateChange.bind(this);
    this.isOutsideRange = this.isOutsideRange.bind(this);
  }

  fetchMonthData(date) {
    const { listingId, timeZone, onFetchTimeSlots } = this.props;
    const endOfRangeDate = endOfRange(TODAY, timeZone);

    // Don't fetch timeSlots for past months or too far in the future
    if (isInRange(date, TODAY, endOfRangeDate)) {
      // Use "today", if the first day of given month is in the past
      const start = dateIsAfter(TODAY, date) ? TODAY : date;

      // Use endOfRangeDate, if the first day of the next month is too far in the future
      const nextMonthDate = nextMonthFn(date, timeZone);
      const end = dateIsAfter(nextMonthDate, endOfRangeDate)
        ? resetToStartOfDay(endOfRangeDate, timeZone, 0)
        : nextMonthDate;

      // Fetch time slots for given time range
      onFetchTimeSlots(listingId, start, end, timeZone);
    }
  }

  onMonthClick(monthFn) {
    const { onMonthChanged, timeZone } = this.props;

    this.setState(
      prevState => ({ currentMonth: monthFn(prevState.currentMonth, timeZone) }),
      () => {
        // Callback function after month has been updated.
        // react-dates component has next and previous months ready (but inivisible).
        // we try to populate those invisible months before user advances there.
        this.fetchMonthData(monthFn(this.state.currentMonth, timeZone));

        // If previous fetch for month data failed, try again.
        const monthId = monthIdStringInTimeZone(this.state.currentMonth, timeZone);
        const currentMonthData = this.props.monthlyTimeSlots[monthId];
        if (currentMonthData && currentMonthData.fetchTimeSlotsError) {
          this.fetchMonthData(this.state.currentMonth, timeZone);
        }

        // Call onMonthChanged function if it has been passed in among props.
        if (onMonthChanged) {
          onMonthChanged(monthId);
        }
      }
    );
  }

  onBookingStartDateChange = (value, formId) => {
    console.log('start date change', value, formId, this.props);
    this.setState({
      fieldError: null,
    });
    const { monthlyTimeSlots, timeZone, intl, form, values } = this.props;

    if (!value || !value.date) {
      form.batch(() => {
        form.change(`bookingStartTime.${formId}`, null);
        form.change(`bookingEndDate.${formId}`, { date: null });
        form.change(`bookingEndTime.${formId}`, null);
      });
      // Reset the currentMonth too if bookingStartDate is cleared
      this.setState({ currentMonth: getMonthStartInTimeZone(TODAY, timeZone) });

      return;
    }

    // This callback function (onBookingStartDateChange) is called from react-dates component.
    // It gets raw value as a param - browser's local time instead of time in listing's timezone.
    const startDate = timeOfDayFromLocalToTimeZone(value.date, timeZone);
    const timeSlots = getMonthlyTimeSlots(
      monthlyTimeSlots,
      this.state.currentMonth,
      timeZone,
      values
    );
    const timeSlotsOnSelectedDate = getTimeSlots(timeSlots, startDate, timeZone);

    const { startTime, endDate, endTime } = getAllTimeValues(
      intl,
      timeZone,
      timeSlotsOnSelectedDate,
      startDate,
      null,
      null,
      values
    );
    // console.log('vvvvv', timeSlots, value, timeSlotsOnSelectedDate);
    // console.log('vvvvv2', startTime, endDate, endTime);

    // selectedDate['Thu Jul 16 2020 12:00:00 GMT+0530 (India Standard Time)'] = {
    //   timeslot: timeslot,
    //   selectedTime: '',
    // };
    if (!startTime || !endDate || !endTime) {
      this.setState({
        fieldError: 'No timeslot is available in selected date, Please select another date',
      });
      form.batch(() => {
        form.change(`bookingStartTime.${formId}`, null);
        form.change(`bookingEndDate.${formId}`, { date: null });
        form.change(`bookingEndTime.${formId}`, null);
      });
      // values.bookingStartDate[formId] = null;
      // Reset the currentMonth too if bookingStartDate is cleared
      // this.setState({ currentMonth: getMonthStartInTimeZone(TODAY, timeZone) });

      return;
    }
    form.batch(() => {
      form.change(`bookingStartTime.${formId}`, startTime);
      form.change(`bookingEndDate.${formId}`, { date: endDate });
      form.change(`bookingEndTime.${formId}`, endTime);
    });
  };

  onBookingStartTimeChange = (value, formId) => {
    console.log('start time change', value, formId, this.props);
    const { monthlyTimeSlots, timeZone, intl, form, values } = this.props;
    const timeSlots = getMonthlyTimeSlots(
      monthlyTimeSlots,
      this.state.currentMonth,
      timeZone,
      values
    );
    const startDate = values.bookingStartDate[formId].date;
    const timeSlotsOnSelectedDate = getTimeSlots(timeSlots, startDate, timeZone);

    const { endDate, endTime } = getAllTimeValues(
      intl,
      timeZone,
      timeSlotsOnSelectedDate,
      startDate,
      value,
      values
    );

    console.log('vvvvvssssss', endDate.bookingEndDate[formId].date, endTime);

    if (!endDate || !endTime) {
      alert('no end time available');
      form.batch(() => {
        form.change(`bookingEndDate.${formId}`, { date: null });
        form.change(`bookingEndTime.${formId}`, null);
      });

      return;
    }

    form.batch(() => {
      form.change(`bookingEndDate.${formId}`, { date: endDate.bookingEndDate[formId].date });
      form.change(`bookingEndTime.${formId}`, endTime);
    });
  };

  onBookingEndDateChange = (value, formId) => {
    const { monthlyTimeSlots, timeZone, intl, form, values } = this.props;
    if (!value || !value.date) {
      form.change(`bookingEndTime.${formId}`, null);
      return;
    }

    // This callback function (onBookingStartDateChange) is called from react-dates component.
    // It gets raw value as a param - browser's local time instead of time in listing's timezone.
    const endDate = timeOfDayFromLocalToTimeZone(value.date, timeZone);

    const { bookingStartDate, bookingStartTime } = values;
    const startDate = bookingStartDate.date;
    const timeSlots = getMonthlyTimeSlots(
      monthlyTimeSlots,
      this.state.currentMonth,
      timeZone,
      values
    );
    const timeSlotsOnSelectedDate = getTimeSlots(timeSlots, startDate, timeZone);

    const { endTime } = getAllTimeValues(
      intl,
      timeZone,
      timeSlotsOnSelectedDate,
      startDate,
      bookingStartTime,
      endDate,
      values
    );

    form.change(`bookingEndTime.${formId}`, endTime);
  };

  isOutsideRange(day, bookingStartDate, selectedTimeSlot, timeZone) {
    if (!selectedTimeSlot) {
      return true;
    }

    // 'day' is pointing to browser's local time-zone (react-dates gives these).
    // However, bookingStartDate and selectedTimeSlot refer to times in listing's timeZone.
    const localizedDay = timeOfDayFromLocalToTimeZone(day, timeZone);
    // Given day (endDate) should be after the start of the day of selected booking start date.
    const startDate = resetToStartOfDay(bookingStartDate, timeZone);
    // 00:00 would return wrong day as the end date.
    // Removing 1 millisecond, solves the exclusivity issue.
    const inclusiveEnd = new Date(selectedTimeSlot.attributes.end.getTime() - 1);
    // Given day (endDate) should be before the "next" day of selected timeSlots end.
    const endDate = resetToStartOfDay(inclusiveEnd, timeZone, 1);
    return !(dateIsAfter(localizedDay, startDate) && dateIsAfter(endDate, localizedDay));
  }

  render() {
    const {
      rootClassName,
      className,
      formId,
      startDateInputProps,
      endDateInputProps,
      values,
      monthlyTimeSlots,
      timeZone,
      intl,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);

    const bookingStartDate =
      values.bookingStartDate &&
      values.bookingStartDate.length > 0 &&
      values.bookingStartDate[formId]
        ? values.bookingStartDate[formId].date
        : null;

    const bookingStartTime =
      values.bookingStartTime &&
      values.bookingStartTime.length > 0 &&
      values.bookingStartTime[formId]
        ? values.bookingStartTime[formId]
        : null;

    const bookingEndDate =
      values.bookingEndDate && values.bookingEndDate.length > 0 && values.bookingEndDate[formId]
        ? values.bookingEndDate[formId].date
        : null;

    const startTimeDisabled = !bookingStartDate || this.state.fieldError;
    const endDateDisabled = !bookingStartDate || !bookingStartTime;
    const endTimeDisabled = !bookingStartDate || !bookingStartTime || !bookingEndDate;

    const timeSlotsOnSelectedMonth = getMonthlyTimeSlots(
      monthlyTimeSlots,
      this.state.currentMonth,
      timeZone,
      values
    );

    const timeSlotsOnSelectedDate = getTimeSlots(
      timeSlotsOnSelectedMonth,
      bookingStartDate,
      timeZone
    );
    console.log({ timeSlotsOnSelectedDate });

    const availableStartTimes = getAvailableStartTimes(
      intl,
      timeZone,
      bookingStartDate,
      timeSlotsOnSelectedDate
    );

    const firstAvailableStartTime =
      availableStartTimes.length > 0 && availableStartTimes[0] && availableStartTimes[0].timestamp
        ? availableStartTimes[0].timestamp
        : null;

    const { startTime, endDate, selectedTimeSlot } = getAllTimeValues(
      intl,
      timeZone,
      timeSlotsOnSelectedDate,
      bookingStartDate,
      bookingStartTime || firstAvailableStartTime,
      bookingEndDate || bookingStartDate,
      values
    );

    const availableEndTimes = getAvailableEndTimes(
      intl,
      timeZone,
      bookingStartTime || startTime,
      bookingEndDate || endDate,
      selectedTimeSlot
    );

    const isDayBlocked = timeSlotsOnSelectedMonth
      ? day =>
          !timeSlotsOnSelectedMonth.find(timeSlot =>
            isDayMomentInsideRange(
              day,
              timeSlot.attributes.start,
              timeSlot.attributes.end,
              timeZone
            )
          )
      : () => false;

    const placeholderTime = localizeAndFormatTime(
      intl,
      timeZone,
      findNextBoundary(timeZone, TODAY)
    );

    const startTimeLabel = intl.formatMessage({ id: 'FieldDateTimeInput.startTime' });
    const endTimeLabel = intl.formatMessage({ id: 'FieldDateTimeInput.endTime' });
    /**
     * NOTE: In this template the field for the end date is hidden by default.
     * If you want to enable longer booking periods, showing the end date in the form requires some code changes:
     * 1. Move the bookingStartTime field to the same formRow with the bookingStartDate field
     * 2. Remove the div containing the line between dates
     * 3. Remove the css related to hiding the booking end date from the bottom of the FieldDateAndTimeInput.css field
     */

    // const showRemove =
    //   (values &&
    //     values.bookingStartTime &&
    //     values.bookingStartTime.length == 1 &&
    //     values.bookingStartTime[0]) ||
    //   (values && values.bookingStartTime && formId > 0);
    const showRemove = true;

    return (
      <div className={classes}>
        <div className={css.formRow}>
          <div className={classNames(css.field, css.startDate)}>
            <FieldDateInput
              className={css.fieldDateInput}
              name={formId ? `bookingStartDate.${formId}` : 'bookingStartDate'}
              id={formId ? `bookingStartDate.${formId}` : 'bookingStartDate'}
              label={startDateInputProps.label}
              placeholderText={startDateInputProps.placeholderText}
              format={v =>
                v && v.date ? { date: timeOfDayFromTimeZoneToLocal(v.date, timeZone) } : v
              }
              parse={v =>
                v && v.date ? { date: timeOfDayFromLocalToTimeZone(v.date, timeZone) } : v
              }
              isDayBlocked={isDayBlocked}
              onChange={val => this.onBookingStartDateChange(val, formId)}
              onPrevMonthClick={() => this.onMonthClick(prevMonthFn)}
              onNextMonthClick={() => this.onMonthClick(nextMonthFn)}
              navNext={<Next currentMonth={this.state.currentMonth} timeZone={timeZone} />}
              navPrev={<Prev currentMonth={this.state.currentMonth} timeZone={timeZone} />}
              useMobileMargins
              showErrorMessage={false}
              validate={bookingDateRequired('Required')}
            />
          </div>
        </div>
        {this.state.fieldError ? (
          <p className={css.smallPrint} style={{ color: 'red' }}>
            {this.state.fieldError}
          </p>
        ) : null}
        <div className={css.formRow}>
          <div className={classNames(css.field, css.endDateHidden)}>
            <FieldDateInput
              {...endDateInputProps}
              name={`bookingEndDate.${formId}`}
              id={formId ? `bookingEndDate.${formId}` : 'bookingEndDate'}
              className={css.fieldDateInput}
              label={endDateInputProps.label}
              placeholderText={endDateInputProps.placeholderText}
              format={v =>
                v && v.date ? { date: timeOfDayFromTimeZoneToLocal(v.date, timeZone) } : v
              }
              parse={v =>
                v && v.date ? { date: timeOfDayFromLocalToTimeZone(v.date, timeZone) } : v
              }
              isDayBlocked={isDayBlocked}
              onChange={val => this.onBookingEndDateChange(val, formId)}
              onPrevMonthClick={() => this.onMonthClick(prevMonthFn)}
              onNextMonthClick={() => this.onMonthClick(nextMonthFn)}
              navNext={<Next currentMonth={this.state.currentMonth} timeZone={timeZone} />}
              navPrev={<Prev currentMonth={this.state.currentMonth} timeZone={timeZone} />}
              isOutsideRange={day =>
                this.isOutsideRange(day, bookingStartDate, selectedTimeSlot, timeZone)
              }
              useMobileMargins
              showErrorMessage={false}
              validate={bookingDateRequired('Required')}
              disabled={endDateDisabled}
              showLabelAsDisabled={endDateDisabled}
            />
          </div>

          <div className={css.field}>
            <FieldSelect
              name={`bookingStartTime.${formId}`}
              id={formId ? `bookingStartTime.${formId}` : 'bookingStartTime'}
              className={bookingStartDate ? css.fieldSelect : css.fieldSelectDisabled}
              selectClassName={bookingStartDate ? css.select : css.selectDisabled}
              label={startTimeLabel}
              disabled={startTimeDisabled}
              onChange={val => this.onBookingStartTimeChange(val, formId)}
            >
              {bookingStartDate ? (
                availableStartTimes.map(p => (
                  <option key={p.timeOfDay} value={p.timestamp}>
                    {p.timeOfDay}
                  </option>
                ))
              ) : (
                <option>{placeholderTime}</option>
              )}
            </FieldSelect>
          </div>

          <div className={bookingStartDate ? css.lineBetween : css.lineBetweenDisabled}>-</div>

          <div className={css.field}>
            <FieldSelect
              name={`bookingEndTime.${formId}`}
              id={formId ? `bookingEndTime.${formId}` : 'bookingEndTime'}
              className={bookingStartDate ? css.fieldSelect : css.fieldSelectDisabled}
              selectClassName={bookingStartDate ? css.select : css.selectDisabled}
              label={endTimeLabel}
              disabled={endTimeDisabled}
            >
              {bookingStartDate && (bookingStartTime || startTime) ? (
                availableEndTimes.map(p => (
                  <option key={p.timeOfDay === '00:00' ? '24:00' : p.timeOfDay} value={p.timestamp}>
                    {p.timeOfDay === '00:00' ? '24:00' : p.timeOfDay}
                  </option>
                ))
              ) : (
                <option>{placeholderTime}</option>
              )}
            </FieldSelect>
          </div>
        </div>
        {showRemove ? (
          <InlineTextButton
            style={{ marginTop: 10, fontSize: 16, marginBottom: 20, textAlign: 'left' }}
            onClick={e => {
              e.preventDefault();
              Object.keys(this.props.values).forEach((item, i) => delete values[item][formId]);
              this.props.removeSelectedDate(formId);
            }}
          >
            - Delete Slot
          </InlineTextButton>
        ) : null}
      </div>
    );
  }
}

FieldDateAndTimeInput.defaultProps = {
  rootClassName: null,
  className: null,
  startDateInputProps: null,
  endDateInputProps: null,
  startTimeInputProps: null,
  endTimeInputProps: null,
  listingId: null,
  monthlyTimeSlots: null,
  timeZone: null,
};

FieldDateAndTimeInput.propTypes = {
  rootClassName: string,
  className: string,
  formId: string,
  bookingStartLabel: string,
  startDateInputProps: object,
  endDateInputProps: object,
  startTimeInputProps: object,
  endTimeInputProps: object,
  form: object.isRequired,
  values: object.isRequired,
  listingId: propTypes.uuid,
  monthlyTimeSlots: object,
  onFetchTimeSlots: func.isRequired,
  timeZone: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default FieldDateAndTimeInput;
