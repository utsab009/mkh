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
import { Form, Avatar, Button, ImageFromFile, IconSpinner, FieldTextInput, IconClose, InlineTextButton } from '../../components';

import css from './ProfileSettingsForm.css';

const EducationFormComponent = props => { 
  return (
    <div className={classNames(css.weekDay, null)}>
      {/*<div className={css.dayOfWeek}>
        <FormattedMessage id={`EditListingAvailabilityPlanForm.dayOfWeek.${dayOfWeek}`} />
        Work Experience
      </div>*/}

      <FieldArray id={'education'} name={'education'}>
        {({ fields }) => {
          console.log("fields", fields.length);
          if(fields.length === 0)
          {
            fields.pop();
            fields.push({course:null,board:null,duration:null,dates:null})
            // fields.remove(1);
          }

          return (
            <div className={css.timePicker}>
               {fields.map((name, index) => {
                return (
                  <div className={css.fieldWrapper} key={name}>
                    <div >
                      <div className={css.nameContainer}>
                        <div className={css.field}>
                            <FieldTextInput
                            type="text"
                            id={`${name}.course`}
                            name={`${name}.course`}
                            label={'I gained'}
                            />    
                        </div>
                        <div className={css.field}>
                            <FieldTextInput
                            type="text"
                            id={`${name}.board`}
                            name={`${name}.board`}
                            label={'From which institution'}
                            />    
                        </div>
                      </div>
                      <div className={css.nameContainer}>
                        <div className={css.field}>
                            <FieldTextInput
                            type="text"
                            id={`${name}.duration`}
                            name={`${name}.duration`}
                            label={'Over what length of Time'}
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
                  onClick={() => fields.push({course:null,board:null,duration:null,dates:null})}
                >
                  <FormattedMessage id="EditListingAvailabilityPlanForm.setHours" />
                </InlineTextButton>
              ) : (
                <InlineTextButton
                  type="button"
                  className={css.buttonAddNew}
                  onClick={() => fields.push({course:null,board:null,duration:null,dates:null})}
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


  const EducationForm = EducationFormComponent;
  export default EducationForm;  