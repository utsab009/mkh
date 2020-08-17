import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '..';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { EditListingLanguageYoutubeForm } from '../../forms';
import config from '../../config';

import css from './EditListingLanguageYoutubePanel.css';

const EditListingLanguageYoutubePanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    // <FormattedMessage
    //   id="EditListingLanguageYoutubePanel.title"
    //   values={{
    //     listingTitle: (
    //       <ListingLink listing={listing}>
    //         <FormattedMessage id="EditListingLanguageYoutubePanel.listingTitle" />
    //       </ListingLink>
    //     ),
    //   }}
    // />
    <FormattedMessage
      id="EditListingLanguageYoutubePanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingLanguageYoutubePanel.createListingTitle" />
  ); // Default Code

  // const panelTitle = (
  //   <FormattedMessage id="EditListingLanguageYoutubePanel.createListingTitle" />
  // );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingLanguageYoutubeForm
        className={css.form}
        initialValues={{
          title,
          description,
          certificate: publicData.certificate,
          mentorLanguage: publicData.mentorLanguage,
          profileType: publicData.profileType,
          youtubeLink: publicData.youtubeLink,
        }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const {
            title,
            description,
            certificate,
            mentorLanguage,
            profileType = [],
            youtubeLink,
          } = values;
          const updateValues = {
            title: title.trim(),
            description,
            publicData: { mentorLanguage, youtubeLink },
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        certificate={config.custom.certificate}
        mentorLanguages={config.custom.mentorLanguages}
        profileTypes={config.custom.profileTypes}
      />
    </div>
  );
};

EditListingLanguageYoutubePanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingLanguageYoutubePanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingLanguageYoutubePanel;
