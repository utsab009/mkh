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

import css from './ProfileSettingsForm.css';
import WorkExperienceForm from './WorkExperienceForm';
import EducationForm from './EducationForm';

const ACCEPT_IMAGES = 'image/*';
const UPLOAD_CHANGE_DELAY = 2000; // Show spinner so that browser has time to load img srcset

class ProfileSettingsFormComponent extends Component {
  constructor(props) {
    super(props);

    this.uploadDelayTimeoutId = null;
    this.state = { uploadDelay: false, currentTab: 1 };
    this.onToggleTab = this.onToggleTab.bind(this);
    this.submittedValues = {};
    console.log('props in psf', props);
  }

  onToggleTab(tab) {
    this.setState({ currentTab: tab });
  }

  componentDidUpdate(prevProps) {
    // Upload delay is additional time window where Avatar is added to the DOM,
    // but not yet visible (time to load image URL from srcset)
    if (prevProps.uploadInProgress && !this.props.uploadInProgress) {
      this.setState({ uploadDelay: true });
      this.uploadDelayTimeoutId = window.setTimeout(() => {
        this.setState({ uploadDelay: false });
      }, UPLOAD_CHANGE_DELAY);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.uploadDelayTimeoutId);
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        mutators={{ ...arrayMutators }}
        render={fieldRenderProps => {
          const {
            className,
            currentUser,
            handleSubmit,
            intl,
            invalid,
            onImageUpload,
            pristine,
            profileImage,
            rootClassName,
            updateInProgress,
            updateProfileError,
            uploadImageError,
            uploadInProgress,
            form,
            values,
          } = fieldRenderProps;

          console.log('values in psf', values);

          const user = ensureCurrentUser(currentUser);
          console.log('user in psf', user);
          // First name
          const firstNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameLabel',
          });
          const firstNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNamePlaceholder',
          });
          const firstNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameRequired',
          });
          const firstNameRequired = validators.required(firstNameRequiredMessage);

          // Last name
          const lastNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameLabel',
          });
          const lastNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNamePlaceholder',
          });
          const lastNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameRequired',
          });
          const lastNameRequired = validators.required(lastNameRequiredMessage);

          const dobRequired = validators.validAge(
            'Date of Birth is rquired and it should be atleast 18 years',
            18
          );

          // Bio
          const bioLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.bioLabel',
          });
          const bioPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.bioPlaceholder',
          });

          const isMentor =
            user.attributes.profile.protectedData &&
            user.attributes.profile.protectedData.userType == 'mentor';

          const uploadingOverlay =
            uploadInProgress || this.state.uploadDelay ? (
              <div className={css.uploadingImageOverlay}>
                <IconSpinner />
              </div>
            ) : null;

          const hasUploadError = !!uploadImageError && !uploadInProgress;
          const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });
          const transientUserProfileImage = profileImage.uploadedImage || user.profileImage;
          const transientUser = { ...user, profileImage: transientUserProfileImage };

          // Ensure that file exists if imageFromFile is used
          const fileExists = !!profileImage.file;
          const fileUploadInProgress = uploadInProgress && fileExists;
          const delayAfterUpload = profileImage.imageId && this.state.uploadDelay;
          const imageFromFile =
            fileExists && (fileUploadInProgress || delayAfterUpload) ? (
              <ImageFromFile
                id={profileImage.id}
                className={errorClasses}
                rootClassName={css.uploadingImage}
                aspectRatioClassName={css.squareAspectRatio}
                file={profileImage.file}
              >
                {uploadingOverlay}
              </ImageFromFile>
            ) : null;

          // Avatar is rendered in hidden during the upload delay
          // Upload delay smoothes image change process:
          // responsive img has time to load srcset stuff before it is shown to user.
          const avatarClasses = classNames(errorClasses, css.avatar, {
            [css.avatarInvisible]: this.state.uploadDelay,
          });
          const avatarComponent =
            !fileUploadInProgress && profileImage.imageId ? (
              <Avatar
                className={avatarClasses}
                renderSizes="(max-width: 767px) 96px, 240px"
                user={transientUser}
                disableProfileLink
              />
            ) : null;

          const chooseAvatarLabel =
            profileImage.imageId || fileUploadInProgress ? (
              <div className={css.avatarContainer}>
                {imageFromFile}

                <div className={css.profilepav}>{avatarComponent}</div>
                <div className={css.changeAvatar}>
                  <FormattedMessage id="ProfileSettingsForm.changeAvatar" />
                </div>
              </div>
            ) : (
              <div className={css.avatarPlaceholder}>
                <div className={css.avatarPlaceholderText}>
                  {console.log(
                    'user: ',
                    user,
                    user &&
                      user.attributes &&
                      user.attributes.profile &&
                      user.attributes.profile.protectedData &&
                      user.attributes.profile.protectedData.userType === 'mentor'
                  )}
                  <FormattedMessage
                    id={
                      user &&
                      user.attributes &&
                      user.attributes.profile &&
                      user.attributes.profile.protectedData &&
                      user.attributes.profile.protectedData.userType === 'mentor'
                        ? 'ProfileSettingsForm.addYourProfilePictureMentor'
                        : 'ProfileSettingsForm.addYourProfilePictureMentee'
                    }
                  />
                </div>
                {console.log('test: ', user.attributes.profile.metadata)}
                <div className={css.avatarPlaceholderTextMobile}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProfilePictureMobile" />
                </div>
              </div>
            );

          const submitError = updateProfileError ? (
            <div className={css.error}>
              <FormattedMessage id="ProfileSettingsForm.updateProfileFailed" />
            </div>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitInProgress = updateInProgress;
          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          const submitDisabled =
            invalid || pristine || pristineSinceLastSubmit || uploadInProgress || submitInProgress;

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedValues = values;
                console.log('values in psf', values, e);
                handleSubmit(e);
              }}
            >
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.yourProfilePicture" />
                </h3>
                <Field
                  accept={ACCEPT_IMAGES}
                  id="profileImage"
                  name="profileImage"
                  label={chooseAvatarLabel}
                  type="file"
                  form={null}
                  uploadImageError={uploadImageError}
                  disabled={uploadInProgress}
                >
                  {fieldProps => {
                    const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
                    const { name, type } = input;
                    const onChange = e => {
                      const file = e.target.files[0];
                      form.change(`profileImage`, file);
                      form.blur(`profileImage`);
                      if (file != null) {
                        const tempId = `${file.name}_${Date.now()}`;
                        onImageUpload({ id: tempId, file });
                      }
                    };

                    let error = null;

                    if (isUploadImageOverLimitError(uploadImageError)) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
                        </div>
                      );
                    } else if (uploadImageError) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
                        </div>
                      );
                    }

                    return (
                      <div className={css.uploadAvatarWrapper}>
                        <label className={css.label} htmlFor={id}>
                          {label}
                        </label>
                        <input
                          accept={accept}
                          id={id}
                          name={name}
                          className={css.uploadAvatarInput}
                          disabled={disabled}
                          onChange={onChange}
                          type={type}
                        />
                        {error}
                      </div>
                    );
                  }}
                </Field>
                <div className={css.tip}>
                  <FormattedMessage id="ProfileSettingsForm.tip" />
                </div>
                <div className={css.fileInfo}>
                  <FormattedMessage id="ProfileSettingsForm.fileInfo" />
                </div>
              </div>
              {this.state.currentTab == 1 ? (
                <div className={css.sectionContainer}>
                  <h3 className={css.sectionTitle}>
                    <FormattedMessage id="ProfileSettingsForm.yourName" />
                  </h3>
                  <div className={css.nameContainer}>
                    <FieldTextInput
                      className={css.firstName}
                      type="text"
                      id="firstName"
                      name="firstName"
                      label={firstNameLabel}
                      placeholder={firstNamePlaceholder}
                      validate={firstNameRequired}
                    />
                    <FieldTextInput
                      className={css.lastName}
                      type="text"
                      id="lastName"
                      name="lastName"
                      label={lastNameLabel}
                      placeholder={lastNamePlaceholder}
                      validate={lastNameRequired}
                    />
                  </div>
                  <FieldTextInput
                    // className={css.firstName}
                    type="text"
                    id={'linkedInID'}
                    name="linkedInID"
                    autoComplete="linkedInID"
                    label={'LinkedIn Address (Optional) – Provided to Mentors'}
                    placeholder="Please enter your linkedIn link"
                    // validate={firstNameRequired}
                  />
                  {isMentor ? (
                    <div className={css.socialMedia}>
                      <FormattedMessage id="ProfileSettingsForm.mentorLinkedinLink" />
                    </div>
                  ) : (
                    <div className={css.socialMedia}>
                      <FormattedMessage id="ProfileSettingsForm.menteeLinkedinLink" />
                    </div>
                  )}
                  {/* {isMentor ? (
                    <FieldTextInput
                      // className={css.lastName}
                      type="text"
                      id={'conferenceLink'}
                      name="conferenceLink"
                      autoComplete="conference link"
                      label={'Skype Link'}
                      placeholder="Please enter your skype address"
                      // validate={lastNameRequired}
                    />
                  ) : null} */}
                  {/* {isMentor ? (
                    <div className={css.socialMedia}>
                      <FormattedMessage id="ProfileSettingsForm.conferenceLink" />
                    </div>
                  ) : null} */}

                  {/* <FieldTextInput
                      type="date"
                      id={`dob`}
                      name={`dob`}
                      label={'Date of Birth'}
                      validate={dobRequired}
                    /> */}
                </div>
              ) : null}
              {/* {user.attributes.profile.protectedData && user.attributes.profile.protectedData.userType == 'mentor' && this.state.currentTab == 1 ?
                <div className={classNames(css.sectionContainer, css.lastSection)}>
                  <h3 className={css.sectionTitle}>
                    <FormattedMessage id="ProfileSettingsForm.bioHeading" />
                  </h3>
                  <FieldTextInput
                    type="textarea"
                    id="bio"
                    name="bio"
                    label={bioLabel}
                    placeholder={bioPlaceholder}
                  />
                </div>
                : null
              } */}
              {this.state.currentTab > 1 && this.state.currentTab < 4 ? (
                <h6>
                  It is important to Start with your most recent{' '}
                  {this.state.currentTab == 2 ? 'Position' : 'Education'} and work backwards{' '}
                </h6>
              ) : null}
              {this.state.currentTab == 2 ? (
                <div className={classNames(css.sectionContainer, css.lastSection)}>
                  <h3 className={css.sectionTitle}>
                    <FormattedMessage id="ProfileSettingsForm.workExpHeading" />
                  </h3>
                  <WorkExperienceForm intl={intl} form={form} values={values} />
                </div>
              ) : null}
              {this.state.currentTab == 3 ? (
                <div className={classNames(css.sectionContainer, css.lastSection)}>
                  <h3 className={css.sectionTitle}>
                    <FormattedMessage id="ProfileSettingsForm.educationHeading" />
                  </h3>
                  <EducationForm intl={intl} form={form} values={values} />
                </div>
              ) : null}
              {user.attributes.profile.protectedData &&
              user.attributes.profile.protectedData.userType == 'mentor' ? (
                <div className={css.nameContainer}>
                  <Button
                    className={css.submitButton}
                    type="button"
                    onClick={() => this.onToggleTab(1)}
                    // inProgress={submitInProgress}
                    disabled={this.state.currentTab == 1 ? true : false}
                    // ready={pristineSinceLastSubmit}
                  >
                    Profile
                  </Button>
                  <Button
                    className={`${css.submitButton} ${css.mdBttn}`}
                    type="button"
                    onClick={() => this.onToggleTab(2)}
                    // inProgress={submitInProgress}
                    disabled={this.state.currentTab == 2 ? true : false}
                    // ready={pristineSinceLastSubmit}
                  >
                    Work Experience
                  </Button>
                  <Button
                    className={css.submitButton}
                    type="button"
                    onClick={() => this.onToggleTab(3)}
                    // inProgress={submitInProgress}
                    disabled={this.state.currentTab == 3 ? true : false}
                    // ready={pristineSinceLastSubmit}
                  >
                    Education
                  </Button>
                </div>
              ) : null}
              {submitError}
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={pristineSinceLastSubmit}
              >
                <FormattedMessage id="ProfileSettingsForm.saveChanges" />
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

ProfileSettingsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  uploadImageError: null,
  updateProfileError: null,
  updateProfileReady: false,
};

ProfileSettingsFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  updateProfileReady: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ProfileSettingsForm = compose(injectIntl)(ProfileSettingsFormComponent);

ProfileSettingsForm.displayName = 'ProfileSettingsForm';

export default ProfileSettingsForm;
