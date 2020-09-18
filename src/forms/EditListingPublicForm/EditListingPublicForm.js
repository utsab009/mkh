import React, { Component } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
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
} from '../../components';
import Axios from 'axios';
import css from './EditListingPublicForm.css';
import { Default } from '../../components/BookingPanel/BookingPanel.example';
import { required } from '../../util/validators';

export class EditListingPublicFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation_error: false,
      subSectors: [],
      jobRoles: [],
      isSendMsgModalOpen: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.initialValues && this.props.initialValues.sectors) {
      this.handleChange(this.props.initialValues.sectors);
    }
  }

  handleChange = values => {
    // const subSectors = values.split(' ').join('');

    if (values == 'Public Service') {
      this.setState({ jobRoles: config.custom.publicRoles });
    } else if (values == 'none') {
      this.setState({ jobRoles: [] });
    } else {
      this.setState({ jobRoles: config.custom.nonPublicRoles });
    }
    // const subSectors = config.custom.Civilandstructuralengineering;
    // this.setState({subSectors : subSectors})
    // console.log("subsector using scope",$[subSectors]);
    // switch (values) {
    //   case 'Accountancy and Financial Management':
    //     return this.setState({ subSectors: config.custom.Accountancyandfinancialmanagement });
    //   case 'Civil and structural engineering':
    //     return this.setState({ subSectors: config.custom.Civilandstructuralengineering });
    //   case 'Public Service':
    //     return this.setState({ subSectors: config.custom.PublicServices });
    //   case 'none':
    //     return this.setState({ subSectors: [] });
    //   case 'Accounting':
    //     return this.setState({ subSectors: config.custom.Accounting });
    //   case 'Administration and Office Support':
    //     return this.setState({ subSectors: config.custom.AdministrationAndOfficeSupport });
    //   case 'Advertising Arts and Media':
    //     return this.setState({ subSectors: config.custom.AdvertisingArtsAndMedia });
    //   case 'Banking and Financial Services':
    //     return this.setState({ subSectors: config.custom.BankingAndFinancialServices });
    //   case 'Call Center and Customer Service':
    //     return this.setState({ subSectors: config.custom.CallCenterAndCustomerService });
    //   case 'Community Services and Development':
    //     return this.setState({ subSectors: config.custom.CommunityServicesAndDevelopment });
    //   case 'Construction':
    //     return this.setState({ subSectors: config.custom.Construction });
    //   case 'Consulting and Strategy':
    //     return this.setState({ subSectors: config.custom.ConsultingAndStrategy });
    //   case 'Design and Architecture':
    //     return this.setState({ subSectors: config.custom.DesignAndArchitecture });
    //   case 'Education and Training':
    //     return this.setState({ subSectors: config.custom.EducationAndTraining });
    //   case 'Engineering':
    //     return this.setState({ subSectors: config.custom.Engineering });
    //   case 'Executive':
    //     return this.setState({ subSectors: config.custom.Executive });
    //   case 'Farming Animals and Conservation':
    //     return this.setState({ subSectors: config.custom.FarmingAnimalsAndConservation });
    //   case 'Healthcare and Medical':
    //     return this.setState({ subSectors: config.custom.HealthcareAndMedical });
    //   case 'Hospitality and Tourism':
    //     return this.setState({ subSectors: config.custom.HospitalityAndTourism });
    //   case 'Human Resources and Recruitment':
    //     return this.setState({ subSectors: config.custom.HumanResourcesAndRecruitment });
    //   case 'Information Technology':
    //     return this.setState({ subSectors: config.custom.InformationTechnology });
    //   case 'Insurance':
    //     return this.setState({ subSectors: config.custom.Insurance });
    //   case 'Legal':
    //     return this.setState({ subSectors: config.custom.Legal });
    //   case 'Manufacturing Transport and Logistics':
    //     return this.setState({ subSectors: config.custom.ManufacturingTransportAndLogistics });
    //   case 'Marketing and Communications':
    //     return this.setState({ subSectors: config.custom.MarketingAndCommunications });
    //   case 'Real Estate and Property':
    //     return this.setState({ subSectors: config.custom.RealEstateAndProperty });
    //   case 'Retail and Consumer Products':
    //     return this.setState({ subSectors: config.custom.RetailAndConsumerProducts });
    //   case 'Sales':
    //     return this.setState({ subSectors: config.custom.Sales });
    //   case 'Science and Technology':
    //     return this.setState({ subSectors: config.custom.ScienceAndTechnology });
    //   case 'Sports and Recreation':
    //     return this.setState({ subSectors: config.custom.SportsAndRecreation });
    //   case 'Trades and Services':
    //     return this.setState({ subSectors: config.custom.TradesAndServices });
    //   case Default:
    //     return this.setState({ subSectors: config.custom.Accountancyandfinancialmanagement });
    // }
  };

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
            // sectorGroup,
            roleGroup,
            onManageDisableScrolling,
            values,
            form,
          } = formRenderProps;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = disabled || submitInProgress;

          const { updateListingError, showListingsError } = fetchErrors || {};
          const errorMessage = updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPublicForm.updateFailed" />
            </p>
          ) : null;

          const errorMessageShowListing = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPublicForm.showListingFailed" />
            </p>
          ) : null;

          const sectors = config.custom.sectors;

          const sectorLabel = intl.formatMessage({
            id: 'EditListingPublicForm.sectorLabel',
          });

          const subSectorLabel = intl.formatMessage({
            id: 'EditListingPublicForm.subSectorLabel',
          });

          const jobRoleLabel = intl.formatMessage({
            id: 'EditListingPublicForm.jobRoleLabel',
          });

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              {errorMessageShowListing}

              {/*<FieldCheckboxGroup
                className={css.features}
                id={name}
                name={name}
                options={config.custom.yogaStyles}
              />*/}

              {/* <FieldSelect
                className={css.features}
                onChange={this.handleChange}
                name={'sectors'}
                id={2}
                label={sectorLabel}
              >
                {sectors.map(m => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </FieldSelect> */}
              {/* <FieldCheckboxGroup
                label={sectorLabel}
                className={css.profileTypes}
                id="sectors"
                name="sectors"
                options={sectorGroup}
                validate={required('Please add ')}
              /> */}

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
              {/* <h1>{jobRoleLabel}</h1> */}
              <FieldCheckboxGroup
                // label={jobRoleLabel}
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

                  form.change('jobroles', changeValues);
                }}
                // validate={required('Please add ')}
              />
              {/* <p className={css.smallTextIns}>
                My sector and or job is not listed, click
                <InlineTextButton
                  className={css.btnModSl}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ isMailSectorModalOpen: true });
                  }}
                >
                  &nbsp;here &nbsp;
                </InlineTextButton>
                and tell us so we can include it for you.
              </p> */}

              <p className={css.customLable}>
                If you intend to charge different rates for different levels of seniority, then only
                click the levels that you will be charging the same price for, now. For those other
                price levels, you will need to create a new listing or listings.
              </p>

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

EditListingPublicFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
};

EditListingPublicFormComponent.propTypes = {
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

// const EditListingPublicForm = EditListingPublicFormComponent;

// export default EditListingPublicForm;
export default compose(injectIntl)(EditListingPublicFormComponent);
