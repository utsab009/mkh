import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import classNames from 'classnames';
import arrayMutators from 'final-form-arrays';
import * as validators from '../../util/validators';
import config from '../../config';
import Select from 'react-select';
import {
  Form,
  PrimaryButton,
  FieldTextInput,
  FieldSelect,
  Button,
  InlineTextButton,
  Modal,
} from '../../components';

// import Select from 'react-dropdown-select';
import Axios from 'axios';
import { connect } from 'react-redux';

import css from './SectorsFilterForm.css';

const KEY_CODE_ENTER = 13;
const optionsNew = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
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

    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange = values => {
  //   // const subSectors = values.split(' ').join('');
  //   if (values == 'Public Service') {
  //     this.setState({ jobRoles: config.custom.publicRoles });
  //   } else if (values == 'none') {
  //     this.setState({ jobRoles: [] });
  //   } else {
  //     this.setState({ jobRoles: config.custom.nonPublicRoles });
  //   }
  //   // const subSectors = config.custom.Civilandstructuralengineering;
  //   // this.setState({subSectors : subSectors})
  //   // console.log("subsector using scope",$[subSectors]);
  //   switch (values) {
  //     case 'Accountancy and Financial Management':
  //       return this.setState({ subSectors: config.custom.Accountancyandfinancialmanagement });
  //     case 'Civil and structural engineering':
  //       return this.setState({ subSectors: config.custom.Civilandstructuralengineering });
  //     case 'Public Service':
  //       return this.setState({ subSectors: config.custom.PublicServices });
  //     case 'Accounting':
  //       return this.setState({ subSectors: config.custom.Accounting });
  //     case 'Administration and Office Support':
  //       return this.setState({ subSectors: config.custom.AdministrationAndOfficeSupport });
  //     case 'Advertising Arts and Media':
  //       return this.setState({ subSectors: config.custom.AdvertisingArtsAndMedia });
  //     case 'Banking and Financial Services':
  //       return this.setState({ subSectors: config.custom.BankingAndFinancialServices });
  //     case 'Call Center and Customer Service':
  //       return this.setState({ subSectors: config.custom.CallCenterAndCustomerService });
  //     case 'Community Services and Development':
  //       return this.setState({ subSectors: config.custom.CommunityServicesAndDevelopment });
  //     case 'Construction':
  //       return this.setState({ subSectors: config.custom.Construction });
  //     case 'Consulting and Strategy':
  //       return this.setState({ subSectors: config.custom.ConsultingAndStrategy });
  //     case 'Design and Architecture':
  //       return this.setState({ subSectors: config.custom.DesignAndArchitecture });
  //     case 'Education and Training':
  //       return this.setState({ subSectors: config.custom.EducationAndTraining });
  //     case 'Engineering':
  //       return this.setState({ subSectors: config.custom.Engineering });
  //     case 'Executive':
  //       return this.setState({ subSectors: config.custom.Executive });
  //     case 'Farming Animals and Conservation':
  //       return this.setState({ subSectors: config.custom.FarmingAnimalsAndConservation });
  //     case 'Healthcare and Medical':
  //       return this.setState({ subSectors: config.custom.HealthcareAndMedical });
  //     case 'Hospitality and Tourism':
  //       return this.setState({ subSectors: config.custom.HospitalityAndTourism });
  //     case 'Human Resources and Recruitment':
  //       return this.setState({ subSectors: config.custom.HumanResourcesAndRecruitment });
  //     case 'Information Technology':
  //       return this.setState({ subSectors: config.custom.InformationTechnology });
  //     case 'Insurance':
  //       return this.setState({ subSectors: config.custom.Insurance });
  //     case 'Legal':
  //       return this.setState({ subSectors: config.custom.Legal });
  //     case 'Manufacturing Transport and Logistics':
  //       return this.setState({ subSectors: config.custom.ManufacturingTransportAndLogistics });
  //     case 'Marketing and Communications':
  //       return this.setState({ subSectors: config.custom.MarketingAndCommunications });
  //     case 'Real Estate and Property':
  //       return this.setState({ subSectors: config.custom.RealEstateAndProperty });
  //     case 'Retail and Consumer Products':
  //       return this.setState({ subSectors: config.custom.RetailAndConsumerProducts });
  //     case 'Sales':
  //       return this.setState({ subSectors: config.custom.Sales });
  //     case 'Science and Technology':
  //       return this.setState({ subSectors: config.custom.ScienceAndTechnology });
  //     case 'Sports and Recreation':
  //       return this.setState({ subSectors: config.custom.SportsAndRecreation });
  //     case 'Trades and Services':
  //       return this.setState({ subSectors: config.custom.TradesAndServices });
  //     case 'none':
  //       return this.setState({ subSectors: [] });
  //     //   case Default :
  //     //     return (this.setState({subSectors : config.custom.Accountancyandfinancialmanagement}));
  //   }
  // };

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
    jobRolesConfig.forEach(item =>
      roles.push({ value: item.key, label: item.label, isGrade: item.isGrade || null })
    );
    // jobRolesConfig = roles;
    roles.sort(this.compare);
    this.setState({ jobRolesConfig: roles });
  }

  compare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const bandA = a.label.toUpperCase();
    const bandB = b.label.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };

  // jobRoles = () => this.state.jobRolesConfig.map(item => ({ value: item.key, label: item.label }));

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
            values,
          } = fieldRenderProps;
          // console.log('vvvv', values);
          // console.log('vvvv jobRolesConfig', this.state.jobRolesConfig);
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
              <p className={css.smallText}>
                If your Job Role or Grade is not appearing,
                <span
                  className={css.btnModSl}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ isMailSectorModalOpen: true });
                  }}
                >
                  &nbsp;click here &nbsp;
                </span>
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
                  {/* {console.log(
                    'test: ',
                    this.state.jobRolesConfig.map(item => item.key === values.subsectors)
                  )} */}
                  <Select
                    options={this.state.jobRolesConfig}
                    name="subsectors"
                    placeholder="Type and Select Job Role Here"
                    value={this.state.jobRolesConfig.filter(
                      item => item.value === values.subsectors
                    )}
                    // id="subsectors"
                    onChange={values => {
                      console.log('11111 ', values);
                      values && values.value && form.change('subsectors', values.value);
                      // values.length && values[0].key && form.change('subsectors', values[0].key);
                      // this.onChange(values);
                    }}
                  />
                  {/* <Select
                    className={css.selectCss}
                    name={'subsectors'}
                    id={'subsectors'}
                    clearable
                    options={this.state.jobRolesConfig}
                    placeholder="Type and Select Job Role Here"
                    sortBy="label"
                    backspaceDelete={true}
                    // values={
                    //   values.subsectors
                    //     ? this.state.jobRolesConfig.map(item => item.key === values.subsectors)
                    //     : [{ key: 'none', label: 'none' }]
                    // }
                    values={[{ key: 'ASP.NET Developer', label: 'ASP.NET Developer' }]}
                    itemRenderer={({ item, itemIndex, props, state, methods }) => (
                      <div onClick={() => methods.addItem(item)}>
                        <input type="checkbox" defaultChecked={methods.isSelected(item)} />{' '}
                        {item.label}
                      </div>
                    )}
                    onChange={values => {
                      console.log('11111 ', values);
                      values.length && values[0].key && form.change('subsectors', values[0].key);
                      // this.onChange(values);
                    }}
                  /> */}
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
                className={css.submitButton}
                type="submit"
                // inProgress={submitInProgress}
                // disabled={submitDisabled}
                // ready={submitReady}
              >
                {buttonText}
              </Button>
              {/* <span className={css.normalText}>
                IF YOU ARE IN THE PUBLIC SECTOR AND WANT GRADE BASED RATHER THAN ROLE BASED
                MENTORING, PLEASE PLACE “GENERALIST (PUBLIC SECTOR)” ABOVE
              </span> */}
              <p className={css.customLable}>
                A JOB GRADE IS SPECIFIC TO A PUBLIC SECTOR TYPE ROLE E.G. FEDERAL GOVERNMENT GRADE,
                PUBLIC SECTOR GRADE, HIGHER EDUCATION ETC. INTERNATIONAL GRADES ARE UTILISED SO PICK
                FROM THIS THE EQUIVALENT GRADE
              </p>
              <p className={css.customLable}>JOB ROLES CAN BE EITHER PUBLIC OR PRIVATE SECTOR</p>
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
