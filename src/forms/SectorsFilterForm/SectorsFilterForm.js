import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import arrayMutators from 'final-form-arrays';
import * as validators from '../../util/validators';
import config from '../../config';
import { Form, PrimaryButton, FieldTextInput, FieldSelect, Button } from '../../components';

import css from './SectorsFilterForm.css';

const KEY_CODE_ENTER = 13;

export class SectorsFilterFormComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        validation_error: false,
        subSectors: [],
        jobRoles:[],
      };
  
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange = values => {
        // const subSectors = values.split(' ').join('');
    
        if(values == "Public Service")
        {
          this.setState({jobRoles: config.custom.publicRoles});
        }
        else
        {
          this.setState({jobRoles: config.custom.nonPublicRoles});
        }
        // const subSectors = config.custom.Civilandstructuralengineering;
        // this.setState({subSectors : subSectors})
        // console.log("subsector using scope",$[subSectors]);
        switch(values){
          case "Accountancy and financial management":
            return (this.setState({subSectors : config.custom.Accountancyandfinancialmanagement}));
          case "Civil and structural engineering":
            return (this.setState({subSectors : config.custom.Civilandstructuralengineering}));
          case "Public Service":
            return (this.setState({subSectors : config.custom.PublicServices}));  
        //   case Default :
        //     return (this.setState({subSectors : config.custom.Accountancyandfinancialmanagement}));  
        }
      }
// const SectorsFilterFormComponent = props => (
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
                } = fieldRenderProps;

                // const submitReady = (updated && pristine) || ready;

                // email
                // const emailLabel = intl.formatMessage({
                //     id: 'SignupForm.emailLabel',
                // });
                // const emailPlaceholder = intl.formatMessage({
                //     id: 'SignupForm.emailPlaceholder',
                // });
                // const emailRequiredMessage = intl.formatMessage({
                //     id: 'SignupForm.emailRequired',
                // });
                // const emailRequired = validators.required(emailRequiredMessage);
                // const emailInvalidMessage = intl.formatMessage({
                //     id: 'SignupForm.emailInvalid',
                // });
                // const emailValid = validators.emailFormatValid(emailInvalidMessage);

                // // password
                // const passwordLabel = intl.formatMessage({
                //     id: 'SignupForm.passwordLabel',
                // });
                // const passwordPlaceholder = intl.formatMessage({
                //     id: 'SignupForm.passwordPlaceholder',
                // });
                // const passwordRequiredMessage = intl.formatMessage({
                //     id: 'SignupForm.passwordRequired',
                // });
                // const passwordMinLengthMessage = intl.formatMessage(
                //     {
                //     id: 'SignupForm.passwordTooShort',
                //     },
                //     {
                //     minLength: validators.PASSWORD_MIN_LENGTH,
                //     }
                // );
                // const passwordMaxLengthMessage = intl.formatMessage(
                //     {
                //     id: 'SignupForm.passwordTooLong',
                //     },
                //     {
                //     maxLength: validators.PASSWORD_MAX_LENGTH,
                //     }
                // );
                // const passwordMinLength = validators.minLength(
                //     passwordMinLengthMessage,
                //     validators.PASSWORD_MIN_LENGTH
                // );
                // const passwordMaxLength = validators.maxLength(
                //     passwordMaxLengthMessage,
                //     validators.PASSWORD_MAX_LENGTH
                // );
                // const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);
                // const passwordValidators = validators.composeValidators(
                //     passwordRequired,
                //     passwordMinLength,
                //     passwordMaxLength
                // );

                // // firstName
                // const firstNameLabel = intl.formatMessage({
                //     id: 'SignupForm.firstNameLabel',
                // });
                // const firstNamePlaceholder = intl.formatMessage({
                //     id: 'SignupForm.firstNamePlaceholder',
                // });
                // const firstNameRequiredMessage = intl.formatMessage({
                //     id: 'SignupForm.firstNameRequired',
                // });
                // const firstNameRequired = validators.required(firstNameRequiredMessage);

                // // lastName
                // const lastNameLabel = intl.formatMessage({
                //     id: 'SignupForm.lastNameLabel',
                // });
                // const lastNamePlaceholder = intl.formatMessage({
                //     id: 'SignupForm.lastNamePlaceholder',
                // });
                // const lastNameRequiredMessage = intl.formatMessage({
                //     id: 'SignupForm.lastNameRequired',
                // });
                // const lastNameRequired = validators.required(lastNameRequiredMessage);

                const classes = classNames(rootClassName || css.root, className);
                // const submitInProgress = inProgress;
                // const submitDisabled = invalid || submitInProgress;

                // const handleTermsKeyUp = e => {
                //     // Allow click action with keyboard like with normal links
                //     if (e.keyCode === KEY_CODE_ENTER) {
                //     onOpenTermsOfService();
                //     }
                // };
                // const termsLink = (
                //     <span
                //     className={css.termsLink}
                //     onClick={onOpenTermsOfService}
                //     role="button"
                //     tabIndex="0"
                //     onKeyUp={handleTermsKeyUp}
                //     >
                //     <FormattedMessage id="SignupForm.termsAndConditionsLinkText" />
                //     </span>
                // );

                const sectors = config.custom.sectors

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
                    {/*<div>
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

                    <div className={css.bottomWrapper}>
                        <p className={css.bottomWrapperText}>
                        <span className={css.termsText}>
                            <FormattedMessage
                            id="SignupForm.termsAndConditionsAcceptText"
                            values={{ termsLink }}
                            />
                        </span>
                        </p>
                        <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
                        <FormattedMessage id="SignupForm.signUp" />
                        </PrimaryButton>
                    </div>*/}
                    <FieldSelect className={css.features} onChange={this.handleChange} name={'sectors'} id={2} label={sectorLabel}>
                            {sectors.map(m => (
                            <option key={m.key} value={m.key}>
                                {m.label}
                            </option>
                            ))}
                        </FieldSelect>

                        {this.state.subSectors.length > 0 ? 
                            (<FieldSelect className={css.features} name={'subsectors'} id={2} label={subSectorLabel}>
                            {this.state.subSectors.map(m => (
                            <option key={m.key} value={m.key}>
                                {m.label}
                            </option>
                            ))}
                        </FieldSelect>)
                        : null
                        }

                        {this.state.jobRoles.length > 0 ? 
                            (<FieldSelect className={css.features} name={'jobroles'} id={2} label={jobRoleLabel}>
                            {this.state.jobRoles.map(m => (
                                <option key={m.key} value={m.key}>
                                {m.label}
                                </option>
                            ))}
                            </FieldSelect>)
                        : null
                        }

                        <Button
                            // className={css.submitButton}
                            type="submit"
                            // inProgress={submitInProgress}
                            // disabled={submitDisabled}
                            // ready={submitReady}
                        >
                            {/*saveActionMsg*/}
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
