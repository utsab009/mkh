import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import {
  calculateQuantityFromHours,
  timestampToDate,
  isSameDate,
  isInRange,
} from '../../util/dates';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Form, PrimaryButton, FieldTextInput, InlineTextButton } from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';
import FieldDateAndTimeInput from './FieldDateAndTimeInput';
import moment from 'moment';
import css from './BookingTimeForm.css';
import { isEmpty } from 'lodash';

export class BookingTimeFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingFormArray: [0],
      fieldError: null,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  countInArray(array, date, timeZone) {
    console.log('test:0', array);
    console.log('test:1', date);
    // console.log('test:2', array.bookingStartTime[0]);
    // console.log('test:3', array.bookingEndTime[0]);
    var count = 0;
    for (var i = 0; i < array.bookingStartTime.length; i++) {
      console.log('3333 i', array.bookingEndTime[i]);
      if (array.bookingStartTime[i]) {
        console.log(
          'range',
          'test3:',
          timestampToDate(JSON.parse(array.bookingEndTime[i])),
          isInRange(
            timestampToDate(date),
            timestampToDate(JSON.parse(array.bookingStartTime[i])),
            timestampToDate(JSON.parse(array.bookingEndTime[i])),
            'hour',
            timeZone
          )
        );
        if (
          isInRange(
            timestampToDate(date),
            timestampToDate(JSON.parse(array.bookingStartTime[i])),
            timestampToDate(JSON.parse(array.bookingEndTime[i])),
            'hour',
            timeZone
          )
        ) {
          count++;
        }
      }
    }
    console.log({ count });
    return count;
  }

  handleFormSubmit(e) {
    this.setState({
      fieldError: null,
    });
    console.log(e, e.bookingStartTime.length, 'values in submit');
    console.log(this.props, 'props in submit');
    let { timeZone } = this.props;
    if (e.bookingStartTime && e.bookingStartTime.length == 1) {
      this.props.onSubmit(e);
      console.log('in if');
    }
    if (e.bookingStartTime && e.bookingStartTime.length > 1) {
      let count = [];
      e.bookingStartTime.forEach(element => {
        count.push(this.countInArray(e, element, timeZone));
      });

      if (count.some(elm => elm > 1)) {
        console.log('count in if 1+ submit', count);
        this.setState({
          fieldError: 'Same booking hour selected in multiple occation',
        });
        return;
      }
      console.log('count in submit', count);
      this.props.onSubmit(e);
    }
  }

  removeSelectedDate = index => {
    console.log('idx', index);
    let date = this.state.bookingFormArray.filter(item => item != index);
    // console.log('3333 old array', this.state.bookingFormArray);
    // console.log('3333 new array', date);
    this.setState({
      bookingFormArray: date,
    });
  };

  getEstimate = (values, index, formNumber, otherProps) => {
    const bookingData =
      values &&
      values.bookingStartTime &&
      values.bookingStartTime.length > 0 &&
      values.bookingEndTime[index] &&
      values.bookingStartTime[index]
        ? {
            ...otherProps,
            startDate: timestampToDate(values.bookingStartTime[index]),
            endDate: timestampToDate(values.bookingEndTime[index]),
            // Calculate the quantity as hours between the booking start and booking end
            quantity: calculateQuantityFromHours(
              JSON.parse(values.bookingStartTime[index]),
              JSON.parse(values.bookingEndTime[index])
            ),
          }
        : null;
    // console.log('3333 bookign data', bookingData);
    return bookingData ? (
      <div className={css.priceBreakdownContainer}>
        <h3 className={css.priceBreakdownTitle}>
          <FormattedMessage id="BookingTimeForm.priceBreakdownTitle" /> - {formNumber}
        </h3>
        <EstimatedBreakdownMaybe bookingData={bookingData} />
      </div>
    ) : null;
  };
  render() {
    const { rootClassName, className, price: unitPrice, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingTimeForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingTimeForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            form,
            pristine,
            handleSubmit,
            intl,
            isOwnListing,
            listingId,
            submitButtonWrapperClassName,
            unitPrice,
            unitType,
            values,
            monthlyTimeSlots,
            onFetchTimeSlots,
            timeZone,
          } = fieldRenderProps;
          console.log('3333 error', fieldRenderProps.errors);
          console.log('3333 values', fieldRenderProps.values);

          const startTime = values && values.bookingStartTime ? values.bookingStartTime : null;
          const endTime = values && values.bookingEndTime ? values.bookingEndTime : null;

          const bookingStartLabel = intl.formatMessage({
            id: 'BookingTimeForm.bookingStartTitle',
          });
          const bookingEndLabel = intl.formatMessage({ id: 'BookingTimeForm.bookingEndTitle' });

          const startDate = startTime ? timestampToDate(startTime) : null;
          const endDate = endTime ? timestampToDate(endTime) : null;

          // // This is the place to collect breakdown estimation data. See the
          // // EstimatedBreakdownMaybe component to change the calculations
          // // for customized payment processes.
          // const bookingData =
          //   startDate && endDate
          //     ? {
          //         unitType,
          //         unitPrice,
          //         startDate,
          //         endDate,

          //         // Calculate the quantity as hours between the booking start and booking end
          //         quantity: calculateQuantityFromHours(startDate, endDate),
          //         timeZone,
          //       }
          //     : null;
          // const bookingInfo = bookingData ? (
          //   <div className={css.priceBreakdownContainer}>
          //     <h3 className={css.priceBreakdownTitle}>
          //       <FormattedMessage id="BookingTimeForm.priceBreakdownTitle" />
          //     </h3>
          //     <EstimatedBreakdownMaybe bookingData={bookingData} />
          //   </div>
          // ) : null;

          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );

          const startDateInputProps = {
            label: bookingStartLabel,
            placeholderText: startDatePlaceholder,
          };
          const endDateInputProps = {
            label: bookingEndLabel,
            placeholderText: endDatePlaceholder,
          };

          const dateInputProps = {
            startDateInputProps,
            endDateInputProps,
          };

          return (
            <Form onSubmit={handleSubmit} className={classes}>
              {monthlyTimeSlots && timeZone
                ? this.state.bookingFormArray.map((item, i) => {
                    return (
                      <div key={item}>
                        <div className={css.bookingHeading}>Booking - {i + 1}</div>
                        <FieldDateAndTimeInput
                          {...dateInputProps}
                          className={css.bookingDates}
                          listingId={listingId}
                          bookingStartLabel={bookingStartLabel}
                          onFetchTimeSlots={onFetchTimeSlots}
                          monthlyTimeSlots={monthlyTimeSlots}
                          values={values}
                          intl={intl}
                          form={form}
                          pristine={pristine}
                          timeZone={timeZone}
                          formId={`${item}`}
                          removeSelectedDate={this.removeSelectedDate}
                        />
                        {/* {this.getEstimate(values, item, { unitType, unitPrice, timeZone })} */}
                      </div>
                    );
                  })
                : null}

              {/* {bookingInfo} */}
              <InlineTextButton
                style={{ marginTop: 10, fontSize: 16, marginBottom: 20, textAlign: 'left' }}
                onClick={e => {
                  console.log('2222 event in click', e);
                  e.preventDefault();
                  this.setState(
                    prevState => ({
                      bookingFormArray: [
                        ...this.state.bookingFormArray,
                        prevState.bookingFormArray.length * 1,
                      ],
                    }),
                    console.log('book array', this.state.bookingFormArray)
                  );
                }}
              >
                + Add Slot
              </InlineTextButton>
              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingTimeForm.ownListing'
                      : 'BookingTimeForm.youWontBeChargedInfo'
                  }
                />
              </p>
              {monthlyTimeSlots &&
              timeZone &&
              values &&
              values.bookingStartTime &&
              values.bookingStartTime.length > 0
                ? this.state.bookingFormArray.map((item, i) => {
                    if (values.bookingStartTime[item]) {
                      return (
                        <div key={i}>
                          {/* <div className={css.bookingHeading}>Booking Estimate- {i + 1}</div> */}
                          {this.getEstimate(values, item, i + 1, { unitType, unitPrice, timeZone })}
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })
                : null}
              {this.state.fieldError ? (
                <p className={css.smallPrint} style={{ color: 'red' }}>
                  {this.state.fieldError}
                </p>
              ) : null}
              <div className={submitButtonClasses}>
                <PrimaryButton type="submit">
                  <FormattedMessage id="BookingTimeForm.requestToBook" />
                </PrimaryButton>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

BookingTimeFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  listingId: null,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  monthlyTimeSlots: null,
};

BookingTimeFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  listingId: propTypes.uuid,
  monthlyTimeSlots: object,
  onFetchTimeSlots: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const BookingTimeForm = compose(injectIntl)(BookingTimeFormComponent);
BookingTimeForm.displayName = 'BookingTimeForm';

export default BookingTimeForm;
