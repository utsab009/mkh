import React, { useEffect, useState, Component } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import {
  Form,
  Button,
  FieldTextInput,
  FieldCheckboxGroup,
  FieldSelect,
  InlineTextButton,
  Modal,
  PrimaryButton,
} from '../../components';
import CustomCertificateSelectFieldMaybe from './CustomCertificateSelectFieldMaybe';
import CustomMentorLanguageSelectFieldMaybe from './CustomMentorLanguageSelectFieldMaybe';
import CustomProfileTypeSelectFieldMaybe from './CustomProfileTypeSelectFieldMaybe';
import Select from 'react-select';
import css from './EditListingDescriptionForm.css';
import config from '../../config';
import Axios from 'axios';
const TITLE_MAX_LENGTH = 60;

class EditListingDescriptionFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMailSectorModalOpen: false,
      roleData: config.custom
        .rolesConfigData()
        .map(item => ({ value: item.key, label: item.label, isGrade: item.isGrade || null }))
        .sort(this.compare),
    };
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

  render() {
    // const [jobRolesConfigNew, setJobRolesConfig] = useState([]);

    // const customItemRenderer = ({ item, itemIndex, props, state, methods }) => {
    //   // console.log('88888', item);
    //   return (
    //     <FieldSelect {...props} key={itemIndex} onClick={() => methods.addItem(item)}>
    //       <input {...props} type="checkbox" checked={methods.isSelected(item)} /> {item.label}
    //     </FieldSelect>
    //   );
    // };

    return (
      <FinalForm
        {...this.props}
        mutators={{ ...arrayMutators }}
        render={formRenderProps => {
          const {
            certificate,
            mentorLanguages,
            profileTypes,
            className,
            disabled,
            ready,
            handleSubmit,
            intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateInProgress,
            fetchErrors,
            form,
            values,
            rootClassName,
            onManageDisableScrolling,
          } = formRenderProps;
          const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
          const titlePlaceholderMessage = intl.formatMessage({
            id: 'EditListingDescriptionForm.titlePlaceholder',
          });
          const titleRequiredMessage = intl.formatMessage({
            id: 'EditListingDescriptionForm.titleRequired',
          });
          const maxLengthMessage = intl.formatMessage(
            { id: 'EditListingDescriptionForm.maxLength' },
            {
              maxLength: TITLE_MAX_LENGTH,
            }
          );

          const descriptionMessage = intl.formatMessage({
            id: 'EditListingDescriptionForm.description',
          });
          const descriptionPlaceholderMessage = intl.formatMessage({
            id: 'EditListingDescriptionForm.descriptionPlaceholder',
          });
          const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
          const descriptionRequiredMessage = intl.formatMessage({
            id: 'EditListingDescriptionForm.descriptionRequired',
          });

          const { updateListingError, createListingDraftError, showListingsError } =
            fetchErrors || {};
          const errorMessageUpdateListing = updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
            </p>
          ) : null;

          // This error happens only on first tab (of EditListingWizard)
          const errorMessageCreateListingDraft = createListingDraftError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
            </p>
          ) : null;

          const errorMessageShowListing = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
            </p>
          ) : null;

          const classes = classNames(css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;
          console.log({ values });
          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessageCreateListingDraft}
              {errorMessageUpdateListing}
              {errorMessageShowListing}

              <FieldTextInput
                id="title"
                name="title"
                className={css.title}
                type="text"
                label={titleMessage}
                placeholder={titlePlaceholderMessage}
                maxLength={TITLE_MAX_LENGTH}
                validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
                autoFocus
              />

              {/* <FieldTextInput
                id="description"
                name="description"
                className={css.description}
                type="textarea"
                label={descriptionMessage}
                placeholder={descriptionPlaceholderMessage}
                validate={composeValidators(required(descriptionRequiredMessage))}
              /> */}

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

              <div className={css.customTitle}>
                {/* State the <span className={css.underLine}>Job Role</span> you can Mentor */}
                Second Step. Now select the Job Role or Job Grade you can offer Mentoring in
              </div>
              <div className={css.customSubLable}>
                {/* (For each Job Role you can Mentor, you will need to return to this section, create a
                new Profile name, and answer each of the questions again) */}
              </div>
              <Select
                options={this.state.roleData}
                name="subsectors"
                placeholder="Now type the Job Role or Job Grade Here"
                value={this.state.roleData.filter(item => item.value === values.subsectors)}
                // id="subsectors"
                onChange={values => {
                  console.log('test: ', values);
                  values && values.value && form.change('subsectors', values.value);
                  values && form.change('isGrade', values.isGrade || null);
                }}
              />
              <p className={css.smallTextIns}>
                If the Job Role or Grade are not present,{' '}
                <InlineTextButton
                  className={css.btnModSl}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ isMailSectorModalOpen: true });
                  }}
                >
                  click here
                </InlineTextButton>{' '}
                and tell us so we can include it for you.
              </p>
              <FieldTextInput
                id="experience"
                name="experience"
                className={css.title}
                type="text"
                label="Third Step. Tell Mentees about your experience of the Role or Grade"
                placeholder="How will your experience help? What did you achieve while in the role? Etc."
                // maxLength={TITLE_MAX_LENGTH}
                // validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
                autoFocus
              />

              <div className={css.customLable}>
                INTERNATIONAL GRADES ARE UTILISED, SO PLEASE PICK YOUR EQUIVALENT OR SIMLAR GRADE
              </div>

              {/* <div className={css.customLable}>
                Hoping to Mentor people found in the{' '}
                <span className={`${css.underLine} ${css.textColor}`}>Public Sector</span>
                <span className={css.textColor}>?</span> Read Below{' '}
              </div>
              <div className={css.formHelperIns}>
                <div>You can Mentor People in the Public Sector in two ways: </div>
                <ul>
                  <li className={css.formHelperInsli}>
                    - Mentor them by the job role they have (this will make no difference to the
                    process){' '}
                  </li>
                  <li className={css.formHelperInsli}>
                    - Or Mentor them by their Seniority Level regardless of Job Role{' '}
                  </li>
                </ul>
              </div>
              <div className={css.formHelperIns}>
                <div>
                  If it is by Seniority Level only, please type “
                  <span className={`${css.textColor}`}>Generalist (Public Sector)</span>” in Job
                  Role above, then
                </div>
                <ul>
                  <li className={css.formHelperInsli}>
                    - Skip (leave blank) the next section (Sub-Sectors & Seniority Levels){' '}
                  </li>
                  <li className={css.formHelperInsli}>
                    - Pick the Seniority level in the section “Public Sector: Levels”{' '}
                  </li>
                </ul>
              </div> */}
              {/* <FieldTextInput
              // className={css.lastName}
              type="text"
              id={'youtubelink'}
              name="youtubeLink"
              autoComplete="youtube link"
              label={'YouTube link (Optional)'}
              placeholder={
                'Video explaining why you are the ideal Mentor in general or for this specific role'
              }
              className={css.youtubeLink}
              // validate={lastNameRequired}
            /> */}

              {/*<CustomCertificateSelectFieldMaybe
              id="certificate"
              name="certificate"
              certificate={certificate}
              intl={intl}
            />*/}

              {/*<FieldCheckboxGroup
              className={css.profileTypes}
              id="profileType"
              name="profileType"
              options={profileTypes}
            />*/}

              {/* <FieldCheckboxGroup
              label={'What Languages can you mentor in?'}
              className={css.profileTypes}
              id="mentorLanguage"
              name="mentorLanguage"
              options={mentorLanguages}
            /> */}

              {/*<CustomMentorLanguageSelectFieldMaybe
              id="mentorLanguage"
              name="mentorLanguage"
              mentorLanguages={mentorLanguages}
              intl={intl}
            />*/}

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

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  certificate: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
