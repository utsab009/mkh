import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import {
  Form,
  PrimaryButton,
  FieldTextInput,
  IconClose,
  InlineTextButton,
  Button,
  FieldDateInput,
} from '../../components';
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

import NextMonthIcon from '../BookingTimeForm/NextMonthIcon';
import PreviousMonthIcon from '../BookingTimeForm/PreviousMonthIcon';

import css from './SignupForm.css';

const KEY_CODE_ENTER = 13;

export class SignupFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { currentTab: 1, termsAccepted: false };
    this.onToggleTab = this.onToggleTab.bind(this);
    this.acceptTerms = this.acceptTerms.bind(this);
  }

  onToggleTab(tab, action) {
    let currentTab = tab;
    if (action == 'next') {
      currentTab = tab + 1;
    } else {
      currentTab = tab - 1;
    }
    this.setState({ currentTab: currentTab });
  }

  acceptTerms() {
    this.setState({ termsAccepted: true });
  }

  render() {
    const { signupType } = this.props;

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
            signupType,
            timeZone,
          } = fieldRenderProps;

          // email
          const emailLabel = intl.formatMessage({
            id: 'SignupForm.emailLabel',
          });
          const emailPlaceholder = intl.formatMessage({
            id: 'SignupForm.emailPlaceholder',
          });
          const emailRequiredMessage = intl.formatMessage({
            id: 'SignupForm.emailRequired',
          });
          const emailRequired = validators.required(emailRequiredMessage);
          const emailInvalidMessage = intl.formatMessage({
            id: 'SignupForm.emailInvalid',
          });
          const emailValid = validators.emailFormatValid(emailInvalidMessage);

          // password
          const passwordLabel = intl.formatMessage({
            id: 'SignupForm.passwordLabel',
          });
          const passwordPlaceholder = intl.formatMessage({
            id: 'SignupForm.passwordPlaceholder',
          });
          const passwordRequiredMessage = intl.formatMessage({
            id: 'SignupForm.passwordRequired',
          });
          const passwordMinLengthMessage = intl.formatMessage(
            {
              id: 'SignupForm.passwordTooShort',
            },
            {
              minLength: validators.PASSWORD_MIN_LENGTH,
            }
          );
          const passwordMaxLengthMessage = intl.formatMessage(
            {
              id: 'SignupForm.passwordTooLong',
            },
            {
              maxLength: validators.PASSWORD_MAX_LENGTH,
            }
          );
          const passwordMinLength = validators.minLength(
            passwordMinLengthMessage,
            validators.PASSWORD_MIN_LENGTH
          );
          const passwordMaxLength = validators.maxLength(
            passwordMaxLengthMessage,
            validators.PASSWORD_MAX_LENGTH
          );
          const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);
          const passwordValidators = validators.composeValidators(
            passwordRequired,
            passwordMinLength,
            passwordMaxLength
          );

          // firstName
          const firstNameLabel = intl.formatMessage({
            id: 'SignupForm.firstNameLabel',
          });
          const firstNamePlaceholder = intl.formatMessage({
            id: 'SignupForm.firstNamePlaceholder',
          });
          const firstNameRequiredMessage = intl.formatMessage({
            id: 'SignupForm.firstNameRequired',
          });
          const firstNameRequired = validators.required(firstNameRequiredMessage);

          // lastName
          const lastNameLabel = intl.formatMessage({
            id: 'SignupForm.lastNameLabel',
          });
          const lastNamePlaceholder = intl.formatMessage({
            id: 'SignupForm.lastNamePlaceholder',
          });
          const lastNameRequiredMessage = intl.formatMessage({
            id: 'SignupForm.lastNameRequired',
          });
          const lastNameRequired = validators.required(lastNameRequiredMessage);

          const dobRequired = validators.validAge(
            'Date of Birth is rquired and it should be atleast 18 years',
            18
          );

          const classes = classNames(rootClassName || css.root, className);
          const submitInProgress = inProgress;
          const submitDisabled = invalid || submitInProgress;

          const handleTermsKeyUp = e => {
            // Allow click action with keyboard like with normal links
            if (e.keyCode === KEY_CODE_ENTER) {
              onOpenTermsOfService();
            }
          };
          const termsLink = (
            <span
              className={css.termsLink}
              onClick={onOpenTermsOfService}
              role="button"
              tabIndex="0"
              onKeyUp={handleTermsKeyUp}
            >
              <FormattedMessage id="SignupForm.termsAndConditionsLinkText" />
            </span>
          );

          /////////////////////////////////////////////// workExperienceElement starts /////////////////////////////////////////
          const workExperienceElement = (
            <div>
              <h3 className={css.sectionTitle}>
                <FormattedMessage id="SignupForm.workExpHeading" />
              </h3>

              <FieldArray id={'workExp'} name={'workExp'}>
                {({ fields }) => {
                  console.log('fields', fields.length);
                  if (fields.length === 0) {
                    fields.length = 1;
                    fields.push({ company: null, position: null, duration: null, dates: null });
                    fields.remove(1);
                  }

                  return (
                    <div className={css.timePicker}>
                      {fields.map((name, index) => {
                        return (
                          <div className={css.fieldWrapper} key={name}>
                            <div>
                              <div className={css.workexp}>
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
                              </div>
                              <div className={css.workexp}>
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
                              </div>
                              <button
                                type="button"
                                className={css.removeButton}
                                onClick={() => fields.remove(index)}
                                style={{ cursor: 'pointer' }}
                              >
                                Remove
                                {/*<IconClose rootClassName={css.closeIcon} />*/}
                              </button>
                              {/*<span className={css.dashBetweenTimes}>-</span>*/}
                            </div>
                            {/*<div
                                className={css.fieldArrayRemove}
                                onClick={() => fields.remove(index)}
                                style={{ cursor: 'pointer' }}
                              >
                                <IconClose rootClassName={css.closeIcon} />
                              </div>*/}
                          </div>
                        );
                      })}

                      {fields.length === 0 ? (
                        <InlineTextButton
                          type="button"
                          className={css.buttonSetHours}
                          onClick={() =>
                            fields.push({
                              company: null,
                              position: null,
                              duration: null,
                              dates: null,
                            })
                          }
                        >
                          <FormattedMessage id="EditListingAvailabilityPlanForm.setHours" />
                        </InlineTextButton>
                      ) : (
                        <InlineTextButton
                          type="button"
                          className={css.buttonAddNew}
                          onClick={() =>
                            fields.push({
                              company: null,
                              position: null,
                              duration: null,
                              dates: null,
                            })
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

          /////////////////////////////////////////////// workExperienceElement ends ////////////////////////////////////

          /////////////////////////////////////////////// educationalElement starts /////////////////////////////////////////
          const educationalElement = (
            <div>
              <h3 className={css.sectionTitle}>
                <FormattedMessage id="SignupForm.educationHeading" />
              </h3>

              <FieldArray id={'education'} name={'education'}>
                {({ fields }) => {
                  console.log('fields', fields.length);
                  if (fields.length === 0) {
                    fields.length = 1;
                    fields.push({ course: null, board: null, duration: null, dates: null });
                    fields.remove(1);
                  }

                  return (
                    <div className={css.timePicker}>
                      {fields.map((name, index) => {
                        return (
                          <div className={css.fieldWrapper} key={name}>
                            <div>
                              <div className={css.workexp}>
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
                              <div className={css.workexp}>
                                <div className={css.field}>
                                  <FieldTextInput
                                    type="text"
                                    id={`${name}.duration`}
                                    name={`${name}.duration`}
                                    label={'length of Time'}
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
                              <button
                                type="button"
                                className={css.removeButton}
                                onClick={() => fields.remove(index)}
                                style={{ cursor: 'pointer' }}
                              >
                                Remove
                                {/*<IconClose rootClassName={css.closeIcon} />*/}
                              </button>
                              {/*<span className={css.dashBetweenTimes}>-</span>*/}
                            </div>
                            {/*<div
                              className={css.fieldArrayRemove}
                              onClick={() => fields.remove(index)}
                              style={{ cursor: 'pointer' }}
                            >
                              <IconClose rootClassName={css.closeIcon} />
                            </div>*/}
                          </div>
                        );
                      })}

                      {fields.length === 0 ? (
                        <InlineTextButton
                          type="button"
                          className={css.buttonSetHours}
                          onClick={() =>
                            fields.push({ course: null, board: null, duration: null, dates: null })
                          }
                        >
                          <FormattedMessage id="EditListingAvailabilityPlanForm.setHours" />
                        </InlineTextButton>
                      ) : (
                        <InlineTextButton
                          type="button"
                          className={css.buttonAddNew}
                          onClick={() =>
                            fields.push({ course: null, board: null, duration: null, dates: null })
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

          /////////////////////////////////////////////// educationalElement ends ////////////////////////////////////

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              <div>
                {this.state.currentTab == 1 ? (
                  <div>
                    <FieldTextInput
                      type="email"
                      id={formId ? `${formId}.email` : 'email'}
                      name="email"
                      autoComplete="email"
                      label={emailLabel}
                      placeholder={emailPlaceholder}
                      validate={validators.composeValidators(emailRequired, emailValid)}
                    />
                    <div className={css.name}>
                      <FieldTextInput
                        className={css.firstNameRoot}
                        type="text"
                        id={formId ? `${formId}.fname` : 'fname'}
                        name="fname"
                        autoComplete="given-name"
                        label={firstNameLabel}
                        placeholder={firstNamePlaceholder}
                        validate={firstNameRequired}
                      />
                      <FieldTextInput
                        className={css.lastNameRoot}
                        type="text"
                        id={formId ? `${formId}.lname` : 'lname'}
                        name="lname"
                        autoComplete="family-name"
                        label={lastNameLabel}
                        placeholder={lastNamePlaceholder}
                        validate={lastNameRequired}
                      />
                    </div>
                    {/*signupType == 'mentor' ?
                      <div className={css.name}>
                        <FieldTextInput
                          className={css.firstNameRoot}
                          type="text"
                          id={formId ? `${formId}.linkedin` : 'linkedin'}
                          name="linkedinLink"
                          autoComplete="linkedin"
                          label={"linked Link"}
                          placeholder={"linked Link"}
                          // validate={firstNameRequired}
                        />
                        <FieldTextInput
                          className={css.lastNameRoot}
                          type="text"
                          id={formId ? `${formId}.youtubelink` : 'youtubelink'}
                          name="youtubeLink"
                          autoComplete="youtube link"
                          label={"youtube link"}
                          placeholder={"youtubelink"}
                          // validate={lastNameRequired}
                        />
                      </div>
                      : null
                    */}
                    <FieldTextInput
                      className={css.password}
                      type="password"
                      id={formId ? `${formId}.password` : 'password'}
                      name="password"
                      autoComplete="new-password"
                      label={passwordLabel}
                      placeholder={passwordPlaceholder}
                      validate={passwordValidators}
                    />
                  </div>
                ) : null}
                {this.state.currentTab > 1 &&
                this.state.currentTab < 4 &&
                signupType == 'mentor' ? (
                  <h6>
                    It is important to Start with your most recent{' '}
                    {this.state.currentTab == 2 ? 'Position' : 'Education'} and work backwards{' '}
                  </h6>
                ) : null}
                {this.state.currentTab == 2 && signupType == 'mentor'
                  ? workExperienceElement
                  : null}
                {this.state.currentTab == 3 && signupType == 'mentor' ? educationalElement : null}
                {/* this.state.currentTab == 4 && signupType == 'mentor' ?
                  <FieldTextInput
                    className={css.field}
                    type="textarea"
                    id={formId ? `${formId}.mentorDescription` : 'mentorDescription'}
                    name="bio"
                    label="Bring your experience to life by explaining how it would help a mentee and if you like how you approach mentoring:"
                    // validate={required}
                  />
                  : null
                */}
                {this.state.currentTab == 1 ? (
                  <FieldTextInput
                    type="date"
                    id={`dob`}
                    name={`dob`}
                    label={'Date of Birth'}
                    validate={dobRequired}
                  />
                ) : null}
                {this.state.currentTab == 2 && signupType == 'mentee' ? (
                  <div>
                    <h1>Before You Join</h1>
                    <p>
                      Our mission is to build a trusted community where anyone can belong anywhere.
                      To ensure this, we're asking you to accept our terms of service and respect
                      everyone on MKH.
                    </p>
                    <h2>MKH Community Commitment</h2>
                    <p>
                      I agree to treat everyone in the MKH community- regardless of their
                      race,religion, national origin,ethnicity,skin colour,disability,sex, gender
                      identity,sexual orientation or age-- with respect, and without judgment or
                      bias. Learn more.
                    </p>
                    <h2>MKH Terms of service</h2>
                    <p>
                      I also accept MKH's Terms of Tervice,Payments Terms of Service, Privacy
                      Policy, and Nondiscrimination Policy
                    </p>
                    <Button
                      type="button"
                      onClick={() => this.acceptTerms()}
                      disabled={this.state.termsAccepted}
                    >
                      Accept
                    </Button>
                  </div>
                ) : null}
              </div>

              <div className={css.bottomWrapper}>
                <p className={css.bottomWrapperText}>
                  <span className={css.termsText}>
                    <FormattedMessage
                      id="SignupForm.termsAndConditionsAcceptText"
                      values={{ termsLink }}
                    />
                  </span>
                </p>
                {(this.state.currentTab < 3 && signupType == 'mentor') ||
                (this.state.currentTab < 2 && signupType == 'mentee') ? (
                  <Button
                    type="button"
                    onClick={() => this.onToggleTab(this.state.currentTab, 'next')}
                    disabled={submitDisabled}
                  >
                    {this.state.currentTab == 1 ? 'Next' : 'Next/Skip for now'}
                  </Button>
                ) : null}
                {(this.state.currentTab > 1 && signupType == 'mentor') ||
                (this.state.currentTab > 1 && signupType == 'mentee') ? (
                  <Button
                    type="button"
                    onClick={() => this.onToggleTab(this.state.currentTab, 'previous')}
                  >
                    Previous
                  </Button>
                ) : null}
                {this.state.currentTab == 3 ||
                (signupType == 'mentee' && this.state.termsAccepted) ? (
                  <PrimaryButton
                    type="submit"
                    inProgress={submitInProgress}
                    disabled={submitDisabled}
                  >
                    <FormattedMessage id="SignupForm.signUp" />
                  </PrimaryButton>
                ) : null}
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

SignupFormComponent.defaultProps = { inProgress: false, timeZone: 'Etc/UTC' };

const { bool, func } = PropTypes;

SignupFormComponent.propTypes = {
  inProgress: bool,

  onOpenTermsOfService: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SignupForm = compose(injectIntl)(SignupFormComponent);
SignupForm.displayName = 'SignupForm';

export default SignupForm;
