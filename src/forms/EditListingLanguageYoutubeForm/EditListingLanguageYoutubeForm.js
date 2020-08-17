import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldCheckboxGroup } from '../../components';
// import CustomCertificateSelectFieldMaybe from './CustomCertificateSelectFieldMaybe';
// import CustomMentorLanguageSelectFieldMaybe from './CustomMentorLanguageSelectFieldMaybe';
// import CustomProfileTypeSelectFieldMaybe from './CustomProfileTypeSelectFieldMaybe';

import css from './EditListingLanguageYoutubeForm.css';

const TITLE_MAX_LENGTH = 60;

const EditListingLanguageYoutubeFormComponent = props => (
  <FinalForm
    {...props}
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
        values,
      } = formRenderProps;
      const titleMessage = intl.formatMessage({ id: 'EditListingLanguageYoutubeForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingLanguageYoutubeForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingLanguageYoutubeForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingLanguageYoutubeForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingLanguageYoutubeForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingLanguageYoutubeForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingLanguageYoutubeForm.descriptionRequired',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingLanguageYoutubeForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingLanguageYoutubeForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingLanguageYoutubeForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled =
        invalid || disabled || submitInProgress || !values.mentorLanguage.length;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}

          <FieldCheckboxGroup
            label={'What Languages can you mentor in?'}
            className={css.profileTypes}
            id="mentorLanguage"
            name="mentorLanguage"
            options={mentorLanguages}
            validate={required('Please add ')}
          />

          <FieldTextInput
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
          />

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

EditListingLanguageYoutubeFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingLanguageYoutubeFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingLanguageYoutubeFormComponent);
