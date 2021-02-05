import React from 'react';
import { array, arrayOf, bool, func, object, oneOf, shape, string } from 'prop-types';
import { propTypes } from '../../util/types';
import { intlShape } from '../../util/reactIntl';
import routeConfiguration from '../../routeConfiguration';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
  LISTING_PAGE_PARAM_TYPE_EDIT,
} from '../../util/urlHelpers';
import { ensureListing } from '../../util/data';
import { createResourceLocatorString } from '../../util/routes';
import {
  EditListingAvailabilityPanel,
  EditListingDescriptionPanel,
  EditListingFeaturesPanel,
  EditListingLocationPanel,
  EditListingPhotosPanel,
  EditListingPoliciesPanel,
  EditListingPricingPanel,
  EditListingLanguageYoutubePanel,
  EditListingPublicPanel,
  EditListingIntroductionPanel,
} from '../../components';

import css from './EditListingWizard.css';

export const INTRODUCTION = 'introduction';
export const AVAILABILITY = 'availability';
export const DESCRIPTION = 'description';
export const FEATURES = 'features';
export const PUBLIC = 'public';
export const POLICY = 'policy';
export const LOCATION = 'location';
export const PRICING = 'pricing';
export const PHOTOS = 'photos';
export const LANGUAGE_YOUTUBE = 'language_youtube';

// EditListingWizardTab component supports these tabs
export const SUPPORTED_TABS = [
  INTRODUCTION,
  DESCRIPTION,
  FEATURES,
  PUBLIC,
  LANGUAGE_YOUTUBE,
  // POLICY,
  LOCATION,
  PRICING,
  AVAILABILITY,
  PHOTOS,
];

const pathParamsToNextTab = (params, tab, marketplaceTabs) => {
  const nextTabIndex = marketplaceTabs.findIndex(s => s === tab) + 1;
  const nextTab =
    nextTabIndex < marketplaceTabs.length
      ? marketplaceTabs[nextTabIndex]
      : marketplaceTabs[marketplaceTabs.length - 1];
  return { ...params, tab: nextTab };
};

// When user has update draft listing, he should be redirected to next EditListingWizardTab
const redirectAfterDraftUpdate = (listingId, params, tab, marketplaceTabs, history) => {
  const currentPathParams = {
    ...params,
    type: LISTING_PAGE_PARAM_TYPE_DRAFT,
    id: listingId,
  };
  const routes = routeConfiguration();

  // Replace current "new" path to "draft" path.
  // Browser's back button should lead to editing current draft instead of creating a new one.
  if (params.type === LISTING_PAGE_PARAM_TYPE_NEW) {
    const draftURI = createResourceLocatorString('EditListingPage', routes, currentPathParams, {});
    console.log('165 draftURI', draftURI);
    history.replace(draftURI);
  }

  // Redirect to next tab
  const nextPathParams = pathParamsToNextTab(currentPathParams, tab, marketplaceTabs);
  const to = createResourceLocatorString('EditListingPage', routes, nextPathParams, {});
  console.log('165 to', to);
  history.push(to);
};

const EditListingWizardTab = props => {
  const {
    tab,
    marketplaceTabs,
    params,
    errors,
    fetchInProgress,
    newListingPublished,
    history,
    images,
    listing,
    handleCreateFlowTabScrolling,
    handlePublishListing,
    onAddAvailabilityException,
    onDeleteAvailabilityException,
    onUpdateListing,
    onCreateListingDraft,
    onImageUpload,
    onUpdateImageOrder,
    onRemoveImage,
    onChange,
    onManageDisableScrolling,
    updatedTab,
    updateInProgress,
    intl,
    fetchExceptionsInProgress,
    availabilityExceptions,
  } = props;

  const { type } = params;
  const isNewURI = type === LISTING_PAGE_PARAM_TYPE_NEW;
  const isDraftURI = type === LISTING_PAGE_PARAM_TYPE_DRAFT;
  const isEditPublished = type === LISTING_PAGE_PARAM_TYPE_EDIT;
  const isNewListingFlow = isNewURI || isDraftURI;

  const currentListing = ensureListing(listing);
  const imageIds = images => {
    return images ? images.map(img => img.imageId || img.id) : null;
  };

  console.log('listing: ', currentListing);

  const onCompleteEditListingWizardTab = (tab, updateValues, passThrownErrors = false) => {
    // Normalize images for API call
    const { images: updatedImages, ...otherValues } = updateValues;
    const imageProperty =
      typeof updatedImages !== 'undefined' ? { images: imageIds(updatedImages) } : {};
    const updateValuesWithImages = { ...otherValues, ...imageProperty };
    console.log('551 isNewListingFlow', isNewListingFlow, isNewURI, isDraftURI);
    if (isNewListingFlow) {
      const onUpsertListingDraft = isNewURI
        ? (tab, updateValues) => onCreateListingDraft(updateValues)
        : onUpdateListing;

      const upsertValues = isNewURI
        ? updateValuesWithImages
        : { ...updateValuesWithImages, id: currentListing.id };

      return onUpsertListingDraft(tab, upsertValues)
        .then(r => {
          if (tab !== AVAILABILITY && tab !== marketplaceTabs[marketplaceTabs.length - 1]) {
            // Create listing flow: smooth scrolling polyfill to scroll to correct tab
            handleCreateFlowTabScrolling(false);

            // After successful saving of draft data, user should be redirected to next tab
            redirectAfterDraftUpdate(r.data.data.id.uuid, params, tab, marketplaceTabs, history);
          } else if (tab === marketplaceTabs[marketplaceTabs.length - 1]) {
            handlePublishListing(currentListing.id);
          }
        })
        .catch(e => {
          if (passThrownErrors) {
            throw e;
          }
          // No need for extra actions
          // Error is logged in EditListingPage.duck file.
        });
    } else {
      return onUpdateListing(tab, { ...updateValuesWithImages, id: currentListing.id });
    }
  };

  const panelProps = tab => {
    return {
      className: css.panel,
      errors,
      listing,
      onChange,
      panelUpdated: updatedTab === tab,
      updateInProgress,
      onManageDisableScrolling,
      // newListingPublished and fetchInProgress are flags for the last wizard tab
      ready: newListingPublished,
      disabled: fetchInProgress,
    };
  };

  switch (tab) {
    case INTRODUCTION: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewDescription'
        : 'EditListingWizard.saveEditDescription';
      return (
        <EditListingIntroductionPanel
          {...panelProps(DESCRIPTION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          history={history}
          isNewListingFlow={isEditPublished || isDraftURI ? false : true}
          isEditPublished={isEditPublished}
        />
      );
    }
    case DESCRIPTION: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewDescription'
        : 'EditListingWizard.saveEditDescription';
      return (
        <EditListingDescriptionPanel
          {...panelProps(DESCRIPTION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case FEATURES: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewFeatures'
        : 'EditListingWizard.saveEditFeatures';
      return (
        <EditListingFeaturesPanel
          {...panelProps(FEATURES)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          history={history}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case PUBLIC: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewPublic'
        : 'EditListingWizard.saveEditPublic';
      return (
        <EditListingPublicPanel
          {...panelProps(PUBLIC)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          history={history}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case POLICY: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewPolicies'
        : 'EditListingWizard.saveEditPolicies';
      return (
        <EditListingPoliciesPanel
          {...panelProps(POLICY)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case LANGUAGE_YOUTUBE: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewPolicies'
        : 'EditListingWizard.saveEditPolicies';
      return (
        <EditListingLanguageYoutubePanel
          {...panelProps(LANGUAGE_YOUTUBE)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case LOCATION: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewLocation'
        : 'EditListingWizard.saveEditLocation';
      return (
        <EditListingLocationPanel
          {...panelProps(LOCATION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case PRICING: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewPricing'
        : 'EditListingWizard.saveEditPricing';
      return (
        <EditListingPricingPanel
          {...panelProps(PRICING)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case AVAILABILITY: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewAvailability'
        : 'EditListingWizard.saveEditAvailability';
      return (
        <EditListingAvailabilityPanel
          {...panelProps(AVAILABILITY)}
          fetchExceptionsInProgress={fetchExceptionsInProgress}
          availabilityExceptions={availabilityExceptions}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onAddAvailabilityException={onAddAvailabilityException}
          onDeleteAvailabilityException={onDeleteAvailabilityException}
          onSubmit={values => {
            // We want to return the Promise to the form,
            // so that it doesn't close its modal if an error is thrown.
            return onCompleteEditListingWizardTab(tab, values, true);
          }}
          onNextTab={() =>
            redirectAfterDraftUpdate(listing.id.uuid, params, tab, marketplaceTabs, history)
          }
        />
      );
    }
    case PHOTOS: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditListingWizard.saveNewPhotos'
        : 'EditListingWizard.saveEditPhotos';

      return (
        <EditListingPhotosPanel
          {...panelProps(PHOTOS)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          images={images}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          onUpdateImageOrder={onUpdateImageOrder}
        />
      );
    }
    default:
      return null;
  }
};

EditListingWizardTab.defaultProps = {
  listing: null,
  updatedTab: null,
  availabilityExceptions: [],
};

EditListingWizardTab.propTypes = {
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: oneOf(SUPPORTED_TABS).isRequired,
  }).isRequired,
  availabilityExceptions: arrayOf(propTypes.availabilityException),
  errors: shape({
    createListingDraftError: object,
    publishListingError: object,
    updateListingError: object,
    showListingsError: object,
    uploadImageError: object,
    fetchExceptionsError: object,
    addExceptionError: object,
    deleteExceptionError: object,
  }).isRequired,
  fetchInProgress: bool.isRequired,
  fetchExceptionsInProgress: bool.isRequired,
  newListingPublished: bool.isRequired,
  history: shape({
    push: func.isRequired,
    replace: func.isRequired,
  }).isRequired,
  images: array.isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: shape({
    attributes: shape({
      publicData: object,
      description: string,
      geolocation: object,
      pricing: object,
      title: string,
    }),
    images: array,
  }),

  handleCreateFlowTabScrolling: func.isRequired,
  handlePublishListing: func.isRequired,
  onAddAvailabilityException: func.isRequired,
  onDeleteAvailabilityException: func.isRequired,
  onUpdateListing: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onRemoveImage: func.isRequired,
  onChange: func.isRequired,
  updatedTab: string,
  updateInProgress: bool.isRequired,

  intl: intlShape.isRequired,
};

export default EditListingWizardTab;
