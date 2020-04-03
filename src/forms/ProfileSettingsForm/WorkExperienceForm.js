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

/////////////////////////////////////////////// workExperienceElement starts /////////////////////////////////////////
const WorkExperienceFormComponent = props => {
    const {values,workExp,intl, initialValues} = props;
    // console.log("values in workexperienceelement in psf",values,workExp);
    // console.log("values in workexperienceelement in psf",values[workExp]);
    
    return (
      <div className={classNames(css.weekDay, null)}>
        {/*<div className={css.dayOfWeek}>
          <FormattedMessage id={`EditListingAvailabilityPlanForm.dayOfWeek.${dayOfWeek}`} />
          Work Experience
        </div>*/}
  
        <FieldArray name={workExp}>
          {({ fields }) => {
            // console.log("fields in fieldarray",values);
            console.log("fields in fieldarray",fields);
            if(fields.length === 0)
            {
              fields.pop();
              fields.push({company:null,position:null,duration:null,dates:null})
            //   fields.remove(1);
            }
  
            return (
              <div className={css.timePicker}>
                {fields.map((name, index) => {
                  return (
                    <div className={css.fieldWrapper} key={name}>
                      <div >
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
                            label={'In the Position of'}
                          />    
                        </div>
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
                        {/*<span className={css.dashBetweenTimes}>-</span>*/}
                      </div>
                      <div
                        className={css.fieldArrayRemove}
                        onClick={() => fields.remove(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        <IconClose rootClassName={css.closeIcon} />
                      </div>
                    </div>
                  );
                })}
  
                {fields.length === 0 ? (
                  <InlineTextButton
                    type="button"
                    className={css.buttonSetHours}
                    onClick={() => fields.push({company:null,position:null,duration:null,dates:null})}
                  >
                    <FormattedMessage id="EditListingAvailabilityPlanForm.setHours" />
                  </InlineTextButton>
                ) : (
                  <InlineTextButton
                    type="button"
                    className={css.buttonAddNew}
                    onClick={() => fields.push({company:null,position:null,duration:null,dates:null})}
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
  
  ///////////////////////////////////////////// workExperienceElement ends ////////////////////////////////////  

  const WorkExperienceForm = WorkExperienceFormComponent/*compose(injectIntl)(
    WorkExperienceFormComponent  );*/
  
//   EditListingAvailabilityPlanForm.displayName = 'EditListingAvailabilityPlanForm';
  
  export default WorkExperienceForm;  