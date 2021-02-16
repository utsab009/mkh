import React, { Component } from 'react';
import { bool, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Field, Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { isUploadImageOverLimitError } from '../../util/errors';
import {
  Form,
  Avatar,
  Button,
  ImageFromFile,
  IconSpinner,
  FieldTextInput,
  IconClose,
  InlineTextButton,
} from '../../components';
import moment from 'moment';
import css from './ProfileSettingsForm.css';

const WorkExperienceFormComponent = ({ form, values }) => {
  // const { workExp } = props;

  return (
    <div className={classNames(css.weekDay, null)}>
      {/*<div className={css.dayOfWeek}>
        <FormattedMessage id={`EditListingAvailabilityPlanForm.dayOfWeek.${dayOfWeek}`} />
        Work Experience
      </div>*/}

      <FieldArray id={'workExp'} name={'workExp'}>
        {({ fields }) => {
          // console.log("fields in fieldarray",values);
          console.log('fields in fieldarray', fields);
          if (fields.length === 0) {
            fields.pop();
            fields.push({ company: null, position: null, duration: null, dates: null });
            //   fields.remove(1);
          }
          const { workExp } = values;

          return (
            <div className={css.timePicker}>
              {fields.map((name, index) => {
                return (
                  <div className={css.fieldWrapper} key={name}>
                    <div>
                      <div className={css.nameContainer}>
                        <div className={css.field}>
                          <FieldTextInput
                            type="text"
                            id={`${name}.company`}
                            name={`${name}.company`}
                            label={'I worked for'}
                          />
                        </div>
                        <div className={css.field}>
                          <FieldTextInput
                            type="text"
                            id={`${name}.position`}
                            name={`${name}.position`}
                            label={'In the Position and or Grade of'}
                          />
                        </div>
                      </div>
                      {/* <div className={css.nameContainer}>
                        <div className={css.field}>
                          <FieldTextInput
                            type="text"
                            id={`${name}.duration`}
                            name={`${name}.duration`}
                            label={'Length of Time'}
                          />
                        </div>
                        <div className={css.field}>
                          <FieldTextInput
                            type="text"
                            id={`${name}.startEndDate`}
                            name={`${name}.startEndDate`}
                            label={'From / to'}
                          />
                        </div>
                      </div> */}
                      <div className={css.nameContainer}>
                        <div className={css.field}>
                          <FieldTextInput
                            type="month"
                            id={`${name}.startDate`}
                            name={`${name}.startDate`}
                            label={'From'}
                            // placeholder="YYYY-MM"
                            className={css.spaceMargin}
                            onChange={val => {
                              // console.log('555', val.target.value);
                              form.change(`${name}.startDate`, val.target.value);
                              form.change(`${name}.endDate`, undefined);
                              form.change(`${name}.duration`, undefined);
                            }}
                            // validate={val => {
                            //   console.log('512 start val', val);
                            //   let endDate = workExp[index].endDate;
                            //   if (!endDate) return undefined;
                            //   console.log('512 start', { val, endDate });
                            //   if (val > endDate)
                            //     return 'Start date can not be greater than end date';
                            // }}
                          />
                        </div>
                        <div className={css.field}>
                          <FieldTextInput
                            type="month"
                            id={`${name}.endDate`}
                            name={`${name}.endDate`}
                            label={'To'}
                            minDate={new Date()}
                            onChange={val => {
                              // console.log('555', val.target.value);
                              let end = val.target.value;
                              let start = workExp[index].startDate;
                              form.change(`${name}.endDate`, end);
                              let diff = moment(end).diff(start, 'months');
                              console.log({ diff });
                              if (start && end) form.change(`${name}.duration`, `${diff} months`);
                            }}
                            validate={val => {
                              console.log('512 end val', val);
                              let start = workExp[index].startDate;
                              if (!start) return undefined;
                              console.log('512 end', { val, start });
                              if (start >= val) return 'Minimum duration should be 1 month';
                            }}
                          />
                        </div>
                      </div>
                      <div className={css.nameContainer}>
                        <div className={css.field}>
                          <FieldTextInput
                            type="text"
                            id={`${name}.duration`}
                            name={`${name}.duration`}
                            label={'Length of Time'}
                            className={css.spaceMargin}
                            readOnly
                          />
                        </div>
                      </div>
                      {/*<span className={css.dashBetweenTimes}>-</span>*/}
                    </div>
                    <button
                      type="button"
                      className={css.submitButton}
                      onClick={() => fields.remove(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      Remove
                      {/*<IconClose rootClassName={css.closeIcon} />*/}
                    </button>
                  </div>
                );
              })}

              {fields.length === 0 ? (
                <InlineTextButton
                  type="button"
                  className={css.buttonSetHours}
                  onClick={() =>
                    fields.push({ company: null, position: null, duration: null, dates: null })
                  }
                >
                  <FormattedMessage id="EditListingAvailabilityPlanForm.setHours" />
                </InlineTextButton>
              ) : (
                <InlineTextButton
                  type="button"
                  className={css.buttonAddNew}
                  onClick={() =>
                    fields.push({ company: null, position: null, duration: null, dates: null })
                  }
                >
                  <FormattedMessage id="EditListingAvailabilityPlanForm.addAnother" />
                </InlineTextButton>
              )}
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
};

const WorkExperienceForm = WorkExperienceFormComponent;

export default WorkExperienceForm;
