import React, { Component } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { intlShape, injectIntl } from '../../util/reactIntl';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from '../../util/reactIntl';

import { propTypes } from '../../util/types';
import config from '../../config';
import {
  Button,
  FieldCheckboxGroup,
  Form,
  FieldSelect,
  InlineTextButton,
  Modal,
  PrimaryButton,
  FieldTextInput,
  FieldCheckbox,
} from '../../components';
import Axios from 'axios';
import css from './EditListingFeaturesForm.css';
import { Default } from '../../components/BookingPanel/BookingPanel.example';
import { required } from '../../util/validators';

export class EditListingFeaturesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation_error: false,
      subSectors: [],
      jobRoles: [],
      isSendMsgModalOpen: false,
    };
  }

  render() {
    // const submit = (onSubmit) => values => {
    //   let startTimeValue = moment(values.startDate.date.toString().replace(values.startDate.date.toString().substring(16, 21),values.startHour));
    //   let endTimeValue = moment(values.endDate.date.toString().replace(values.endDate.date.toString().substring(16, 21),values.endHour));
    //   if(startTimeValue.isBefore(endTimeValue))
    //   {
    //     this.setState({validation_error : false});
    //     onSubmit(values,false);
    //   }
    //   else
    //   {
    //     this.setState({validation_error : true});
    //   }

    // };
    return (
      <FinalForm
        {...this.props}
        mutators={{ ...arrayMutators }}
        render={formRenderProps => {
          const {
            disabled,
            ready,
            rootClassName,
            className,
            name,
            handleSubmit,
            pristine,
            saveActionMsg,
            intl,
            updated,
            updateInProgress,
            fetchErrors,
            setIsSendMsgModalOpen,
            sectorGroup,
            roleGroup,
            onManageDisableScrolling,
            values,
            form,
          } = formRenderProps;
          console.log('8888', values);

          // if (values.jobroles && values.jobroles.includes('All')) {
          //   // values.jobroles = [
          //   //   ...values.jobroles,
          //   //   ...roleGroup.map(x => !x.hide && x.key).filter(x => x),
          //   // ];
          //   values.jobroles = roleGroup.map(item => item.key);
          // } else if (values.jobroles && roleGroup.length - values.jobroles.length <= 1) {
          //   values.jobroles = roleGroup.map(item => item.key);
          // }

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = disabled || submitInProgress;

          const { updateListingError, showListingsError } = fetchErrors || {};
          const errorMessage = updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
            </p>
          ) : null;

          const errorMessageShowListing = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingFeaturesForm.showListingFailed" />
            </p>
          ) : null;

          const sectors = config.custom.sectors;

          const sectorLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.sectorLabel',
          });

          const subSectorLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.subSectorLabel',
          });

          const jobRoleLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.jobRoleLabel',
          });

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              {errorMessageShowListing}

              <p className={css.smallTextIns}>
                If your Sector is not present,
                <InlineTextButton
                  className={css.btnModSl}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ isMailSectorModalOpen: true });
                  }}
                >
                  &nbsp;click here &nbsp;
                </InlineTextButton>
                and tell us so we can include it for you.
              </p>

              <FieldCheckboxGroup
                label="" //{sectorLabel}
                className={css.profileTypes}
                id="sectors"
                name="sectors"
                options={sectorGroup}
                onChange={e => {
                  let selectedValue = e.target.value;
                  let isAllSelected = selectedValue === 'All';
                  let changeValues = [];
                  if (!isAllSelected) {
                    if (
                      values.sectors &&
                      values.sectors.length &&
                      values.sectors.includes(selectedValue)
                    ) {
                      changeValues = values.sectors.filter(
                        item => item !== selectedValue && item !== 'All'
                      );
                    } else {
                      changeValues = values.sectors
                        ? [...values.sectors, selectedValue]
                        : [selectedValue];
                      changeValues.length === sectorGroup.length - 1 && changeValues.push('All');
                    }
                  } else {
                    if (values.sectors && values.sectors.length && values.sectors.includes('All')) {
                      changeValues = [];
                    } else {
                      changeValues = sectorGroup
                        .filter(item => item !== 'All')
                        .map(item => item.key);
                    }
                  }

                  console.log('9999', selectedValue, values, changeValues);
                  form.change('sectors', changeValues);
                }}
              />

              {this.state.isMailSectorModalOpen ? (
                <Modal
                  id="EditAvailabilityPlan"
                  isOpen={this.state.isMailSectorModalOpen}
                  onClose={() => this.setState({ isMailSectorModalOpen: false })}
                  onManageDisableScrolling={onManageDisableScrolling}
                  // containerClassName={css.modalContainer}
                  className={css.updateModalcol}
                >
                  <FinalForm
                    // {...restOfprops}
                    onSubmit={test => {
                      console.log('test values: ', test);
                    }}
                    mutators={{
                      ...arrayMutators,
                    }}
                    render={fieldRenderProps => {
                      const { hSubmit, values } = fieldRenderProps;

                      const classes = classNames(rootClassName || css.root, className);

                      return (
                        <Form
                          id={'sendmsg'}
                          className={`${classes} ${css.updatePnl}`}
                          onSubmit={values => {
                            console.log('values: ', values);
                          }}
                        >
                          <div className={css.formg}>
                            <FieldTextInput
                              id="emailId"
                              name="emailId"
                              type="text"
                              label={'E-mail Address'}
                              placeholder={'Enter your E-mail Address'}
                              // validate={composeValidators(required(descriptionRequiredMessage))}
                            />
                          </div>
                          <div className={css.formg}>
                            <FieldTextInput
                              id="msg"
                              name="msg"
                              type="textarea"
                              label={'Message'}
                              placeholder={'Enter your message here'}
                              // validate={composeValidators(required(descriptionRequiredMessage))}
                            />
                          </div>

                          <div className={css.submitButtonFG}>
                            <PrimaryButton
                              type="button"
                              inProgress={false}
                              disabled={false}
                              onClick={e => {
                                console.log('click values: ', e, values);
                                Axios.get(
                                  // 'http://localhost:3001/extra/email_send?message=' +
                                  'https://mentorkh.herokuapp.com/extra/email_send?message=' +
                                    values.msg +
                                    '&email=' +
                                    values.emailId
                                )
                                  .then(response => {
                                    console.log('response in submit', response);
                                    // history.push(
                                    //   createResourceLocatorString(
                                    //     'LandingPage',
                                    //     routes,
                                    //     // { keywords: 'php' },
                                    //     {},
                                    //     // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
                                    //     {}
                                    //   )
                                    // );
                                  })
                                  .catch(e => {
                                    console.log('e in submit', e);
                                    // history.push(
                                    //   createResourceLocatorString(
                                    //     'LandingPage',
                                    //     routes,
                                    //     // { keywords: 'php' },
                                    //     {},
                                    //     // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
                                    //     {}
                                    //   )
                                    // );
                                  });
                                this.setState({ isMailSectorModalOpen: false });
                              }}
                            >
                              Send Mail
                            </PrimaryButton>
                          </div>
                        </Form>
                      );
                    }}
                  />
                </Modal>
              ) : null}
              {/* {this.state.subSectors.length > 0 ? (
                <FieldSelect
                  className={css.features}
                  name={'subsectors'}
                  id={2}
                  label={subSectorLabel}
                >
                  {this.state.subSectors.map(m => (
                    <option key={m.key} value={m.key}>
                      {m.label}
                    </option>
                  ))}
                </FieldSelect>
              ) : null} */}

              {/* {this.state.jobRoles.length > 0 ? (
                <FieldSelect className={css.features} name={'jobroles'} id={2} label={jobRoleLabel}>
                  {this.state.jobRoles.map(m => (
                    <option key={m.key} value={m.key}>
                      {m.label}
                    </option>
                  ))}
                </FieldSelect>
              ) : null} */}
              {/* <FieldCheckboxGroup
                label={jobRoleLabel}
                className={css.jobRole}
                id="jobroles"
                name="jobroles"
                options={roleGroup}
                onChange={e => {
                  let selectedValue = e.target.value;
                  let isAllSelected = selectedValue === 'All';
                  let changeValues = [];
                  if (!isAllSelected) {
                    if (
                      values.jobroles &&
                      values.jobroles.length &&
                      values.jobroles.includes(selectedValue)
                    ) {
                      changeValues = values.jobroles.filter(
                        item => item !== selectedValue && item !== 'All'
                      );
                    } else {
                      changeValues = values.jobroles
                        ? [...values.jobroles, selectedValue]
                        : [selectedValue];
                      changeValues.length === roleGroup.length - 1 && changeValues.push('All');
                    }
                  } else {
                    if (
                      values.jobroles &&
                      values.jobroles.length &&
                      values.jobroles.includes('All')
                    ) {
                      changeValues = [];
                    } else {
                      changeValues = roleGroup.filter(item => item !== 'All').map(item => item.key);
                    }
                  }

                  console.log('9999', selectedValue, values, changeValues);
                  form.change('jobroles', changeValues);
                }}
                // validate={required('Please add ')}
              /> */}
              {/* <FormSpy
                onChange={item => {
                  console.log('5555', item);
                }}
              />
              {roleGroup.length &&
                roleGroup.map(item => {
                  return (
                    <FieldCheckbox
                      id={item.key}
                      name="jobroles"
                      value={item.key}
                      label={item.label}
                      // onSelect={item => {
                      //   console.log('item in', item);
                      // }}
                    />
                  );
                })} */}
              {/* <div className={css.ffsec}>
                <p>
                  Remember, for each job / role you will need to create a new Role Profile for each
                  level of seniority you can Mentor at{' '}
                </p>
              </div> */}

              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingFeaturesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
};

EditListingFeaturesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

// const EditListingFeaturesForm = EditListingFeaturesFormComponent;

// export default EditListingFeaturesForm;
export default compose(injectIntl)(EditListingFeaturesFormComponent);
