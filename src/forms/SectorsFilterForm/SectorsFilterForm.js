import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import classNames from 'classnames';
import arrayMutators from 'final-form-arrays';
import * as validators from '../../util/validators';
import config from '../../config';
import {
  Form,
  PrimaryButton,
  FieldTextInput,
  FieldSelect,
  Button,
  InlineTextButton,
  Modal,
} from '../../components';

import Select from 'react-dropdown-select';
import Axios from 'axios';
import { connect } from 'react-redux';

import css from './SectorsFilterForm.css';

const KEY_CODE_ENTER = 13;

export class SectorsFilterFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation_error: false,
      subSectors: [],
      jobRoles: [],
      isMailSectorModalOpen: false,
      jobRolesConfig: [],
    };

    this.handleChange = this.handleChange.bind(this);
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
    switch (values) {
      case 'Accountancy and Financial Management':
        return this.setState({ subSectors: config.custom.Accountancyandfinancialmanagement });
      case 'Civil and structural engineering':
        return this.setState({ subSectors: config.custom.Civilandstructuralengineering });
      case 'Public Service':
        return this.setState({ subSectors: config.custom.PublicServices });
      case 'Accounting':
        return this.setState({ subSectors: config.custom.Accounting });
      case 'Administration and Office Support':
        return this.setState({ subSectors: config.custom.AdministrationAndOfficeSupport });
      case 'Advertising Arts and Media':
        return this.setState({ subSectors: config.custom.AdvertisingArtsAndMedia });
      case 'Banking and Financial Services':
        return this.setState({ subSectors: config.custom.BankingAndFinancialServices });
      case 'Call Center and Customer Service':
        return this.setState({ subSectors: config.custom.CallCenterAndCustomerService });
      case 'Community Services and Development':
        return this.setState({ subSectors: config.custom.CommunityServicesAndDevelopment });
      case 'Construction':
        return this.setState({ subSectors: config.custom.Construction });
      case 'Consulting and Strategy':
        return this.setState({ subSectors: config.custom.ConsultingAndStrategy });
      case 'Design and Architecture':
        return this.setState({ subSectors: config.custom.DesignAndArchitecture });
      case 'Education and Training':
        return this.setState({ subSectors: config.custom.EducationAndTraining });
      case 'Engineering':
        return this.setState({ subSectors: config.custom.Engineering });
      case 'Executive':
        return this.setState({ subSectors: config.custom.Executive });
      case 'Farming Animals and Conservation':
        return this.setState({ subSectors: config.custom.FarmingAnimalsAndConservation });
      case 'Healthcare and Medical':
        return this.setState({ subSectors: config.custom.HealthcareAndMedical });
      case 'Hospitality and Tourism':
        return this.setState({ subSectors: config.custom.HospitalityAndTourism });
      case 'Human Resources and Recruitment':
        return this.setState({ subSectors: config.custom.HumanResourcesAndRecruitment });
      case 'Information Technology':
        return this.setState({ subSectors: config.custom.InformationTechnology });
      case 'Insurance':
        return this.setState({ subSectors: config.custom.Insurance });
      case 'Legal':
        return this.setState({ subSectors: config.custom.Legal });
      case 'Manufacturing Transport and Logistics':
        return this.setState({ subSectors: config.custom.ManufacturingTransportAndLogistics });
      case 'Marketing and Communications':
        return this.setState({ subSectors: config.custom.MarketingAndCommunications });
      case 'Real Estate and Property':
        return this.setState({ subSectors: config.custom.RealEstateAndProperty });
      case 'Retail and Consumer Products':
        return this.setState({ subSectors: config.custom.RetailAndConsumerProducts });
      case 'Sales':
        return this.setState({ subSectors: config.custom.Sales });
      case 'Science and Technology':
        return this.setState({ subSectors: config.custom.ScienceAndTechnology });
      case 'Sports and Recreation':
        return this.setState({ subSectors: config.custom.SportsAndRecreation });
      case 'Trades and Services':
        return this.setState({ subSectors: config.custom.TradesAndServices });
      case 'none':
        return this.setState({ subSectors: [] });
      //   case Default :
      //     return (this.setState({subSectors : config.custom.Accountancyandfinancialmanagement}));
    }
  };

  componentDidMount() {
    let jobRolesConfig = [];

    config.custom.sectors.map(sector => {
      switch (sector.key) {
        case 'Accountancy and Financial Management':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.Accountancyandfinancialmanagement];
        case 'Civil and structural engineering':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.Civilandstructuralengineering];
        case 'Public Service':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.PublicServices];
        case 'Accounting':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.Accounting];
        case 'Administration and Office Support':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.AdministrationAndOfficeSupport];
        case 'Advertising Arts and Media':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.AdvertisingArtsAndMedia];
        case 'Banking and Financial Services':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.BankingAndFinancialServices];
        case 'Call Center and Customer Service':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.CallCenterAndCustomerService];
        case 'Community Services and Development':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.CommunityServicesAndDevelopment];
        case 'Construction':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.Construction];
        case 'Consulting and Strategy':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.ConsultingAndStrategy];
        case 'Design and Architecture':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.DesignAndArchitecture];
        case 'Education and Training':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.EducationAndTraining];
        case 'Engineering':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.Engineering];
        case 'Executive':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.Executive];
        case 'Farming Animals and Conservation':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.FarmingAnimalsAndConservation];
        case 'Healthcare and Medical':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.HealthcareAndMedical];
        case 'Hospitality and Tourism':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.HospitalityAndTourism];
        case 'Human Resources and Recruitment':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.HumanResourcesAndRecruitment];
        case 'Information Technology':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.InformationTechnology];
        case 'Insurance':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.Insurance];
        case 'Legal':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.Legal];
        case 'Manufacturing Transport and Logistics':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.ManufacturingTransportAndLogistics];
        case 'Marketing and Communications':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.MarketingAndCommunications];
        case 'Real Estate and Property':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.RealEstateAndProperty];
        case 'Retail and Consumer Products':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.RetailAndConsumerProducts];
        case 'Sales':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.Sales];
        case 'Science and Technology':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.ScienceAndTechnology];
        case 'Sports and Recreation':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.SportsAndRecreation];
        case 'Trades and Services':
          jobRolesConfig = [...jobRolesConfig, ...config.custom.TradesAndServices];
      }
    });

    jobRolesConfig = new Set(jobRolesConfig).filter(x => !x.hideFromFilters);

    let roles = [];
    jobRolesConfig.map(x => roles.push(x));
    jobRolesConfig = roles;

    this.setState({ jobRolesConfig });
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        mutators={{ ...arrayMutators }}
        render={fieldRenderProps => {
          const {
            rootClassName,
            className,
            formId,
            handleSubmit,
            inProgress,
            invalid,
            intl,
            onOpenTermsOfService,
            form,
            onManageDisableScrolling,
          } = fieldRenderProps;

          const classes = classNames(rootClassName || css.root, className);

          const sectors = config.custom.sectors;

          const sectorLabel = intl.formatMessage({
            id: 'SectorsFilterForm.sectorLabel',
          });

          const subSectorLabel = intl.formatMessage({
            id: 'SectorsFilterForm.subSectorLabel',
          });

          const jobRoleLabel = intl.formatMessage({
            id: 'SectorsFilterForm.jobRoleLabel',
          });

          const buttonText = intl.formatMessage({
            id: 'SectorsFilterForm.buttonText',
          });

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {/* <FieldSelect
                className={css.features}
                onChange={this.handleChange}
                name={'sectors'}
                id={2}
                label={sectorLabel}
              >
                {sectors.map(m => (
                  <option
                    key={m.key}
                    value={!m.hideFromFilters ? m.key : ''}
                    disabled={m.hideFromFilters}
                    selected={m.hideFromFilters}
                  >
                    {m.label}
                  </option>
                ))}
              </FieldSelect> */}

              {/* {this.state.subSectors.length > 0 ? ( */}
              {/* <FieldSelect
                className={css.features}
                name={'subsectors'}
                id={2}
                label={subSectorLabel}
              > */}
              {/* {this.state.subSectors.map(m => (
                    <option
                      key={m.key}
                      value={!m.hideFromFilters ? m.key : ''}
                      disabled={m.hideFromFilters}
                      selected={m.hideFromFilters}
                    >
                      {m.label}
                    </option>
                  ))} */}
              {/* {jobRolesConfig.map(m => (
                  <option
                    key={m.key}
                    value={!m.hideFromFilters ? m.key : ''}
                    disabled={m.hideFromFilters}
                    selected={m.hideFromFilters}
                  >
                    {m.label}
                  </option>
                ))}
              </FieldSelect> */}
              {/* ) : null} */}

              <p>
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
                              label={'Email ID'}
                              placeholder={'Enter your email ID'}
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

              {this.state.jobRolesConfig.length ? (
                <div>
                  <div className={css.modlabel}>{subSectorLabel}</div>
                  <Select
                    className={css.selectCss}
                    name={'subsectors'}
                    id={'subsectors'}
                    options={this.state.jobRolesConfig}
                    placeholder="Select Job Role"
                    // values={jobRolesConfig}
                    onChange={values => {
                      // console.log('values: ', values);
                      form.change('subsectors', values[0].key);
                      // this.onChange(values);
                    }}
                  />
                </div>
              ) : null}

              {/* {this.state.jobRoles.length > 0 ? (
                <FieldSelect className={css.features} name={'jobroles'} id={2} label={jobRoleLabel}>
                  {this.state.jobRoles.map(m => (
                    <option
                      key={m.key}
                      value={!m.hideFromFilters ? m.key : ''}
                      disabled={m.hideFromFilters}
                      selected={m.hideFromFilters}
                    >
                      {m.label}
                    </option>
                  ))}
                </FieldSelect>
              ) : null} */}

              <Button
                // className={css.submitButton}
                type="submit"
                // inProgress={submitInProgress}
                // disabled={submitDisabled}
                // ready={submitReady}
              >
                {buttonText}
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

SectorsFilterFormComponent.defaultProps = { inProgress: false };

const { bool, func } = PropTypes;

SectorsFilterFormComponent.propTypes = {
  inProgress: bool,

  onOpenTermsOfService: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

// const SectorsFilterForm = compose(injectIntl)(SectorsFilterFormComponent);
// // SectorsFilterForm.displayName = 'SignupForm';

// export default SectorsFilterForm;
export default compose(injectIntl)(SectorsFilterFormComponent);
