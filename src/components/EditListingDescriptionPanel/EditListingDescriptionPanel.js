import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { EditListingDescriptionForm } from '../../forms';
import config from '../../config';

import css from './EditListingDescriptionPanel.css';

const EditListingDescriptionPanel = props => {
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
    onManageDisableScrolling,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData } = currentListing.attributes;
  console.log('8888 publicData', currentListing.attributes);
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    // <FormattedMessage
    //   id="EditListingDescriptionPanel.title"
    //   values={{
    //     listingTitle: (
    //       <ListingLink listing={listing}>
    //         <FormattedMessage id="EditListingDescriptionPanel.listingTitle" />
    //       </ListingLink>
    //     ),
    //   }}
    // />
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  ); // Default Code

  // const panelTitle = (
  //   <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  // );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <div className={css.titleSmall}>
        YOU HAVE ALREADY PROVIDED YOUR EDUCATION AND EXPERIENCE TO DATE. THIS SECTION IS ABOUT
        TELLING US ABOUT A JOB ROLE YOU WILL OFFER MENTORING IN WHICH IN TURN HELPS MENTEES FIND YOU
      </div>
      <EditListingDescriptionForm
        className={css.form}
        initialValues={{
          title,
          // description,
          // certificate: publicData.certificate,
          // mentorLanguage: publicData.mentorLanguage,
          // profileType: publicData.profileType,
          subsectors: publicData.subsectors,
        }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const {
            title,
            // description,
            // certificate,
            // mentorLanguage,
            // profileType = [],
            // youtubeLink,
            subsectors,
          } = values;
          console.log('test: ', values);
          const updateValues = {
            title: title.trim(),
            // description,
            publicData: { subsectors },
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
        onManageDisableScrolling={onManageDisableScrolling}
      />
    </div>
  );
};

EditListingDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingDescriptionPanel.propTypes = {
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

export default EditListingDescriptionPanel;
