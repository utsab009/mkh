/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { array, arrayOf, bool, func, object, shape, string, oneOf } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { LISTING_STATE_PENDING_APPROVAL, LISTING_STATE_CLOSED, propTypes } from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  LISTING_PAGE_DRAFT_VARIANT,
  LISTING_PAGE_PENDING_APPROVAL_VARIANT,
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_EDIT,
  createSlug,
} from '../../util/urlHelpers';
import { formatMoney } from '../../util/currency';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import {
  ensureListing,
  ensureOwnListing,
  ensureUser,
  userDisplayNameAsString,
} from '../../util/data';
import { timestampToDate, calculateQuantityFromHours } from '../../util/dates';
import { richText } from '../../util/richText';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { initializeCardPaymentData } from '../../ducks/stripe.duck.js';
import videoIcon from '../../assets/play-icon.png';
import {
  Page,
  Modal,
  NamedLink,
  NamedRedirect,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  BookingPanel,
  ExternalLink,
  Button,
} from '../../components';
import { EnquiryForm } from '../../forms';
import { TopbarContainer, NotFoundPage } from '../../containers';

import {
  sendEnquiry,
  loadData,
  setInitialValues,
  fetchTimeSlots,
  resetNewBuyer,
} from './ListingPage.duck';
import SectionImages from './SectionImages';
import SectionAvatar from './SectionAvatar';
import SectionHeading from './SectionHeading';
import SectionDescriptionMaybe from './SectionDescriptionMaybe';
import SectionFeaturesMaybe from './SectionFeaturesMaybe';
import SectionReviews from './SectionReviews';
import SectionMapMaybe from './SectionMapMaybe';
import css from './ListingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import {
  faCoffee,
  faHeart as solidHeart,
  faHeartBroken,
  faHeartbeat,
  faStar as solidStar,
} from '@fortawesome/free-solid-svg-icons';
import { updateProfile } from '../ProfileSettingsPage/ProfileSettingsPage.duck';
const MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE = 16;
const { UUID } = sdkTypes;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`,
    };
  }
  return {};
};

export class ListingPageComponent extends Component {
  constructor(props) {
    super(props);
    const { enquiryModalOpenForListingId, params } = props;
    this.state = {
      pageClassNames: [],
      imageCarouselOpen: false,
      enquiryModalOpen: enquiryModalOpenForListingId === params.id,
      showNoVideoError: false,
      showNoLinkError: false,
      welcomeModal: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onContactUser = this.onContactUser.bind(this);
    this.onSubmitEnquiry = this.onSubmitEnquiry.bind(this);
    this.props.resetNewBuyerAction();
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.newListing) {
      this.toggleWelcomeModal();
    }
    console.log('445 in useEff');
    // window.addEventListener('focus', this.onFocus);
  }

  toggleWelcomeModal = cb => {
    // this.props.onUpdateProfile({
    //   publicData: {
    //     newListing: false,
    //   },
    // });
    if (this.state.welcomeModal) {
      this.props.history.location.state = null;
    }
    this.setState(
      prevState => ({
        welcomeModal: !prevState.welcomeModal,
      }),
      () => cb
    );
  };

  handleSubmit(values) {
    const {
      history,
      getListing,
      params,
      callSetInitialValues,
      onInitializeCardPaymentData,
    } = this.props;
    const listingId = new UUID(params.id);
    const listing = getListing(listingId);

    // const { bookingStartTime, bookingEndTime, ...restOfValues } = values;
    // const bookingStart = timestampToDate(bookingStartTime);
    // const bookingEnd = timestampToDate(bookingEndTime);
    const { bookingStartTime, bookingEndTime, bookingEndDate, bookingStartDate, seats } = values;

    // const bookingData = {
    //   quantity: calculateQuantityFromHours(bookingStart, bookingEnd),
    //  units: calculateQuantityFromHours(bookingStart, bookingEnd),
    //   ...restOfValues,
    // };
    const bookingData = {
      // quantity: 1,
      // units: 1,
      ...values,
    };
    const FormData = (...args) => {
      let data = {
        bookingStartTime: timestampToDate(JSON.parse(args[0])),
        bookingEndTime: timestampToDate(JSON.parse(args[1])),
        bookingEndDate: args[2],
        bookingStartDate: args[3],
        quantity: calculateQuantityFromHours(
          timestampToDate(JSON.parse(args[0])),
          timestampToDate(JSON.parse(args[1]))
        ),
        // seats: args[4],
        // quantity: calculateQuantityFromHours(timestampToDate(args[0]), timestampToDate(args[1])),
        // units: calculateQuantityFromHours(timestampToDate(args[0]), timestampToDate(args[1])),
      };
      return data;
    };

    let bookingDates = [];
    values &&
      values.bookingStartDate.length &&
      values.bookingStartDate.forEach((item, i) => {
        // bookingDates[i].bookingStart = item.date;
        bookingDates.push(
          FormData(
            bookingStartTime[i],
            bookingEndTime[i],
            bookingEndDate[i],
            bookingStartDate[i]
            // seats[i]
          )
        );
      });

    // const initialValues = {
    //   listing,
    //   bookingData,
    //   bookingDates: {
    //     bookingStart,
    //     bookingEnd,
    //   },
    //   confirmPaymentError: null,
    // };
    const initialValues = {
      listing,
      bookingData,
      bookingDates,
      confirmPaymentError: null,
    };

    const routes = routeConfiguration();
    // Customize checkout page state with current listing and selected bookingDates
    const { setInitialValues } = findRouteByRouteName('CheckoutPage', routes);
    callSetInitialValues(setInitialValues, initialValues);

    // Clear previous Stripe errors from store if there is any
    onInitializeCardPaymentData();

    // Redirect to CheckoutPage
    history.push(
      createResourceLocatorString(
        'CheckoutPage',
        routes,
        { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
        {}
      )
    );
  }

  onContactUser() {
    const { currentUser, history, callSetInitialValues, params, location } = this.props;

    if (!currentUser) {
      const state = { from: `${location.pathname}${location.search}${location.hash}` };

      // We need to log in before showing the modal, but first we need to ensure
      // that modal does open when user is redirected back to this listingpage
      callSetInitialValues(setInitialValues, { enquiryModalOpenForListingId: params.id });

      // signup and return back to listingPage.
      history.push(
        createResourceLocatorString('MenteeSignupPage', routeConfiguration(), {}, {}),
        state
      );
    } else {
      this.setState({ enquiryModalOpen: true });
    }
  }

  onSubmitEnquiry(values) {
    const { history, params, onSendEnquiry } = this.props;
    const routes = routeConfiguration();
    const listingId = new UUID(params.id);
    const { message } = values;

    onSendEnquiry(listingId, message.trim())
      .then(txId => {
        this.setState({ enquiryModalOpen: false });

        // Redirect to OrderDetailsPage
        history.push(
          createResourceLocatorString('OrderDetailsPage', routes, { id: txId.uuid }, {})
        );
      })
      .catch(() => {
        // Ignore, error handling in duck file
      });
  }
  addToFav = id => {
    let { history } = this.props;
    let { pathname, search } = history.location;
    console.log('101', pathname, search);
    if (search) {
      pathname = pathname + search;
    }
    console.log('101', pathname, search);
    if (!this.props.currentUser) {
      history.push('/login', { from: pathname });
      return;
    }

    let { profile } = this.props.currentUser.attributes;
    let newFavourites =
      profile.protectedData.favourites &&
      Array.isArray(JSON.parse(profile.protectedData.favourites))
        ? JSON.parse(profile.protectedData.favourites)
        : [];
    newFavourites.push({
      id: id,
      listing: this.props.listing,
      renderSizes: this.props.renderSizes,
    });
    // profile.protectedData = {favourites : JSON.stringify(favourites)};
    profile.protectedData.favourites = JSON.stringify(newFavourites);
    const profileToSaved = {
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      bio: profile.bio,
      protectedData: profile.protectedData,
    };
    this.props.onupdateProfile(profileToSaved);
  };

  removeFromFav = id => {
    let { profile } = this.props.currentUser.attributes;
    let newFavourites =
      profile.protectedData.favourites &&
      Array.isArray(JSON.parse(profile.protectedData.favourites))
        ? JSON.parse(profile.protectedData.favourites)
        : [];
    if (newFavourites.length == 0) {
      return false;
    }
    const removedArr = newFavourites.filter(c => c.id !== id);
    profile.protectedData.favourites = JSON.stringify(removedArr);
    const profileToSaved = {
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      bio: profile.bio,
      protectedData: profile.protectedData,
    };
    this.props.onupdateProfile(profileToSaved);
  };
  render() {
    const {
      unitType,
      isAuthenticated,
      currentUser,
      getListing,
      getOwnListing,
      intl,
      onManageDisableScrolling,
      onFetchTimeSlots,
      params: rawParams,
      location,
      scrollingDisabled,
      showListingError,
      reviews,
      fetchReviewsError,
      sendEnquiryInProgress,
      sendEnquiryError,
      monthlyTimeSlots,
      certificateConfig,
      yogaStylesConfig,
      sectorsConfig,
      transactionBetweenParties,
      fetchIsFirstTransactionBetweenPartiesInProgress,
      fetchIsFirstTransactionBetweenPartiesError,
    } = this.props;
    console.log('in list page props', this.props);
    let ratingSum = 0;
    reviews.map(r => {
      ratingSum += Number(r.attributes.rating);
    });
    let averageRating = ratingSum / reviews.length;
    const listingId = new UUID(rawParams.id);
    const isPendingApprovalVariant = rawParams.variant === LISTING_PAGE_PENDING_APPROVAL_VARIANT;
    const isDraftVariant = rawParams.variant === LISTING_PAGE_DRAFT_VARIANT;
    const currentListing =
      isPendingApprovalVariant || isDraftVariant
        ? ensureOwnListing(getOwnListing(listingId))
        : ensureListing(getListing(listingId));
    console.log({ currentListing });
    const listingSlug = rawParams.slug || createSlug(currentListing.attributes.title || '');
    const params = { slug: listingSlug, ...rawParams };

    const listingType = isDraftVariant
      ? LISTING_PAGE_PARAM_TYPE_DRAFT
      : LISTING_PAGE_PARAM_TYPE_EDIT;
    const listingTab = isDraftVariant ? 'photos' : 'description';

    const isApproved =
      currentListing.id && currentListing.attributes.state !== LISTING_STATE_PENDING_APPROVAL;

    const pendingIsApproved = isPendingApprovalVariant && isApproved;

    // If a /pending-approval URL is shared, the UI requires
    // authentication and attempts to fetch the listing from own
    // listings. This will fail with 403 Forbidden if the author is
    // another user. We use this information to try to fetch the
    // public listing.
    const pendingOtherUsersListing =
      (isPendingApprovalVariant || isDraftVariant) &&
      showListingError &&
      showListingError.status === 403;
    const shouldShowPublicListingPage = pendingIsApproved || pendingOtherUsersListing;

    if (shouldShowPublicListingPage) {
      return <NamedRedirect name="ListingPage" params={params} search={location.search} />;
    }

    const {
      description = '',
      geolocation = null,
      price = null,
      title = '',
      publicData,
    } = currentListing.attributes;
    const experience = publicData.experience || '';
    const richTitle = fullName => (
      <span>
        {richText(fullName, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE,
          longWordClass: css.longWord,
        })}
      </span>
    );

    const bookingTitle = (
      <FormattedMessage id="ListingPage.bookingTitle" values={{ title: richTitle }} />
    );

    const topbar = <TopbarContainer />;

    if (showListingError && showListingError.status === 404) {
      // 404 listing not found

      return <NotFoundPage />;
    } else if (showListingError) {
      // Other error in fetching listing

      const errorTitle = intl.formatMessage({
        id: 'ListingPage.errorLoadingListingTitle',
      });

      return (
        <Page title={errorTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn className={css.pageRoot}>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain>
              <p className={css.errorText}>
                <FormattedMessage id="ListingPage.errorLoadingListingMessage" />
              </p>
            </LayoutWrapperMain>
            <LayoutWrapperFooter>
              <Footer />
            </LayoutWrapperFooter>
          </LayoutSingleColumn>
        </Page>
      );
    } else if (!currentListing.id) {
      // Still loading the listing

      const loadingTitle = intl.formatMessage({
        id: 'ListingPage.loadingListingTitle',
      });

      return (
        <Page title={loadingTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn className={css.pageRoot}>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain>
              <p className={css.loadingText}>
                <FormattedMessage id="ListingPage.loadingListingMessage" />
              </p>
            </LayoutWrapperMain>
            <LayoutWrapperFooter>
              <Footer />
            </LayoutWrapperFooter>
          </LayoutSingleColumn>
        </Page>
      );
    }

    const handleViewPhotosClick = e => {
      // Stop event from bubbling up to prevent image click handler
      // trying to open the carousel as well.
      e.stopPropagation();
      this.setState({
        imageCarouselOpen: true,
      });
    };
    const authorAvailable = currentListing && currentListing.author;
    const userAndListingAuthorAvailable = !!(currentUser && authorAvailable);
    const isOwnListing =
      userAndListingAuthorAvailable && currentListing.author.id.uuid === currentUser.id.uuid;
    const showContactUser = authorAvailable && (!currentUser || (currentUser && !isOwnListing));
    const isMentor =
      currentUser &&
      currentUser.attributes.profile.protectedData &&
      currentUser.attributes.profile.protectedData.isMentor;

    const currentAuthor = authorAvailable ? currentListing.author : null;
    const ensuredAuthor = ensureUser(currentAuthor);
    let authorData =
      ensuredAuthor !== null && ensuredAuthor.attributes.profile.publicData
        ? ensuredAuthor.attributes.profile.publicData
        : { error: 'no data' };
    let {
      workExp = null,
      education = null,
      linkedinLink = null,
      fullName = ensuredAuthor.attributes.profile.displayName,
    } = authorData;
    console.log('currentListing: ', currentListing, authorData);
    // console.log(
    //   'currentListing: 123',
    //   checkIfCustomerHasPreviousBookingWithProvider(currentListing.author.id.uuid)
    // );
    const youtubeLink =
      currentListing &&
      currentListing.attributes &&
      currentListing.attributes.publicData &&
      currentListing.attributes.publicData.youtubeLink;

    const { subsectors } = publicData || 'yours';

    let authorBio =
      ensuredAuthor !== null && ensuredAuthor.attributes.profile.bio
        ? ensuredAuthor.attributes.profile.bio
        : null;
    const linkedinLinkMsg = !!linkedinLink
      ? 'See your Mentor’s Linked-In Profile'
      : 'Mentor is yet to share their linkedIn link';
    const youtubeMsg = !!youtubeLink
      ? 'Your Mentor may have created a Video on how they can help'
      : 'Mentor has yet to post a video';
    // When user is banned or deleted the listing is also deleted.
    // Because listing can be never showed with banned or deleted user we don't have to provide
    // banned or deleted display names for the function
    const authorDisplayName = userDisplayNameAsString(ensuredAuthor, '');

    const { formattedPrice, priceTitle } = priceData(price, intl);

    const handleBookingSubmit = values => {
      const isCurrentlyClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
      if (isOwnListing || isCurrentlyClosed) {
        window.scrollTo(0, 0);
      } else {
        this.handleSubmit(values);
      }
    };

    const listingImages = (listing, variantName) =>
      (listing.images || [])
        .map(image => {
          const variants = image.attributes.variants;
          const variant = variants ? variants[variantName] : null;

          // deprecated
          // for backwards combatility only
          const sizes = image.attributes.sizes;
          const size = sizes ? sizes.find(i => i.name === variantName) : null;

          return variant || size;
        })
        .filter(variant => variant != null);

    const facebookImages = listingImages(currentListing, 'facebook');
    const twitterImages = listingImages(currentListing, 'twitter');
    const schemaImages = JSON.stringify(facebookImages.map(img => img.url));
    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage(
      { id: 'ListingPage.schemaTitle' },
      { title, price: formattedPrice, siteTitle }
    );

    const hostLink = (
      <NamedLink
        className={css.authorNameLink}
        name="ListingPage"
        params={params}
        to={{ hash: '#host' }}
      >
        {authorDisplayName}
      </NamedLink>
    );
    const id = currentListing.id.uuid;
    let favouritesArr =
      currentUser &&
      currentUser.attributes.profile.protectedData.favourites &&
      Array.isArray(JSON.parse(currentUser.attributes.profile.protectedData.favourites))
        ? JSON.parse(currentUser.attributes.profile.protectedData.favourites)
        : [];
    let isFavourite = false;
    if (favouritesArr.length > 0) {
      // isFavourite = favouritesArr.filter(c => c.id !== id).length > 0 ? true : false;
      isFavourite = favouritesArr.filter(c => {
        if (c.id == id) {
          return true;
        }
        // else
        // {
        //   return false;
        // }
      });
    }

    // transactionBetweenParties,
    //   fetchIsFirstTransactionBetweenPartiesInProgress,
    //   fetchIsFirstTransactionBetweenPartiesError

    const showShortBooking =
      !fetchIsFirstTransactionBetweenPartiesError &&
      !fetchIsFirstTransactionBetweenPartiesInProgress &&
      transactionBetweenParties !== null &&
      transactionBetweenParties < 1;
    return (
      <Page
        title={schemaTitle}
        scrollingDisabled={scrollingDisabled}
        author={authorDisplayName}
        contentType="website"
        description={description}
        facebookImages={facebookImages}
        twitterImages={twitterImages}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ItemPage',
          description: description,
          name: schemaTitle,
          image: schemaImages,
        }}
      >
        <LayoutSingleColumn className={css.pageRoot}>
          <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div>
              <Modal
                id="ListingPage.welcomeModal"
                isOpen={this.state.welcomeModal}
                onClose={() => this.toggleWelcomeModal()}
                onManageDisableScrolling={onManageDisableScrolling}
                // className={css.landingModal}
                // containerClassName={css.modalContainer}
              >
                <div className={css.modalHeader}>Congratulations</div>
                <div className={css.welcomeModal}>
                  <p>
                    Mentees who now search for the Job Role of {subsectors} will now find you and
                    this is the page they will see which you can{' '}
                    <span
                      className={css.internalLink}
                      onClick={() => {
                        this.toggleWelcomeModal(this.props.history.push('/listings'));
                      }}
                    >
                      update
                    </span>{' '}
                    at any time. This said, sometimes Mentees may not be able to book you as Stripe
                    may not have fully verified your banking details, so we advise that you check
                    back in 24 hours to ensure all is in order.
                  </p>
                  {/* <p>
                      Mentees who now search for the Job Role of {subsectors} will now find you and
                      be able to book you. This page is what they will see. If you need to change
                      any part of it, just go to the Circle in the top right-hand corner of this
                      screen that has your picture or initials in it. Click{' '}
                      <span
                        className={css.internalLink}
                        onClick={() => {
                          this.toggleWelcomeModal(this.props.history.push('/listings'));
                        }}
                      >
                        Role Listings
                      </span>
                      . Here you will be able to open this Role Listing and edit it as often as you
                      require.
                    </p> */}
                  <p className={css.subHeaderModal}>How?</p>
                  <p>
                    Sign-in to Try A Mentor and click the circle with your initials or photo in it
                    at the top right-hand corner of any Try A Mentor page. When you click it, a
                    drop-down menu will appear with{' '}
                    <span
                      className={css.internalLink}
                      onClick={() => {
                        this.toggleWelcomeModal(
                          this.props.history.push('/account/contact-details')
                        );
                      }}
                    >
                      Account Settings
                    </span>
                    . Click this and then on the left of this page you will find{' '}
                    <span
                      className={css.internalLink}
                      onClick={() => {
                        this.toggleWelcomeModal(this.props.history.push('/account/payments'));
                      }}
                    >
                      Mentor Bank Details
                    </span>
                    . Click this and you will see if Stripe has verified your account. If all is in
                    order Mentees can book you, if not, you can access Stripe here to see how you
                    can help them to verify your banking details.
                  </p>
                  {/* <p>
                      Another option you will see when clicking the circle is{' '}
                      <span
                        className={css.internalLink}
                        onClick={() => {
                          this.toggleWelcomeModal(this.props.history.push('/profile-settings'));
                        }}
                      >
                        Mentor Profile
                      </span>
                      . Here is where you can place your photograph, LinkedIn link (if you have one)
                      and update your Job Experience and Education.
                    </p> */}
                </div>
              </Modal>
              <SectionImages
                title={title}
                listing={currentListing}
                isOwnListing={isOwnListing}
                editParams={{
                  id: listingId.uuid,
                  slug: listingSlug,
                  type: listingType,
                  tab: listingTab,
                }}
                imageCarouselOpen={this.state.imageCarouselOpen}
                onImageCarouselClose={() => this.setState({ imageCarouselOpen: false })}
                handleViewPhotosClick={handleViewPhotosClick}
                onManageDisableScrolling={onManageDisableScrolling}
              />
              <div className={css.contentContainer}>
                <div className={`${css.mainContent} ${css.modCon}`}>
                  <div className={css.inlineavhed}>
                    <SectionAvatar user={currentAuthor} params={params} />

                    <div className={css.hedRating}>
                      <div>
                        {
                          <SectionHeading
                            priceTitle={priceTitle}
                            formattedPrice={formattedPrice}
                            richTitle={richTitle(fullName)}
                            listingCertificate={publicData ? publicData.certificate : null}
                            certificateConfig={certificateConfig}
                            hostLink={hostLink}
                            showContactUser={showContactUser}
                            onContactUser={this.onContactUser}
                          />
                        }

                        <div className={css.rating}>
                          <FontAwesomeIcon icon={solidStar} />{' '}
                          {isNaN(averageRating) ? 0 : averageRating} <span>({reviews.length})</span>
                        </div>
                      </div>
                      <div className={css.fevVidContainer}>
                        <div className={css.favSec}>
                          {isFavourite.length > 0 ? (
                            <Button onClick={() => this.removeFromFav(id)} className={css.favBtn}>
                              <FontAwesomeIcon icon={solidHeart} />
                            </Button>
                          ) : (
                            <Button onClick={() => this.addToFav(id)} className={css.favBtn}>
                              <FontAwesomeIcon icon={faHeart} />{' '}
                            </Button>
                          )}
                        </div>
                        {/* {currentUser !== null ? (
                          <div className={css.favSec}>
                            {isFavourite.length > 0 ? (
                              <Button onClick={() => this.removeFromFav(id)} className={css.favBtn}>
                                <FontAwesomeIcon icon={solidHeart} />
                              </Button>
                            ) : (
                              <Button onClick={() => this.addToFav(id)} className={css.favBtn}>
                                <FontAwesomeIcon icon={faHeart} />{' '}
                              </Button>
                            )}
                          </div>
                        ) : null} */}
                        {!youtubeLink ? (
                          <div
                            onClick={() =>
                              this.setState({ showNoVideoError: true, showNoLinkError: false })
                            }
                          >
                            <a
                              href={youtubeLink}
                              target="_blank"
                              title={youtubeMsg}
                              className={css.sociallink}
                            >
                              Mentor Video
                              <img src={videoIcon} className={css.videoIcon} />
                            </a>
                          </div>
                        ) : (
                          <div>
                            <a
                              href={youtubeLink}
                              target="_blank"
                              title={youtubeMsg}
                              className={css.sociallink}
                            >
                              Mentor Video
                              <img src={videoIcon} className={css.videoIcon} />
                            </a>
                          </div>
                        )}

                        {this.state.showNoVideoError && (
                          <div className={css.noVideoError}>The Mentor has yet to post a video</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className={css.avtardec}>{description}</p>
                  {/* {experience ? <p className={css.avtardec}>{experience}</p> : null} */}
                  {experience && experience != '<p></p>\n' ? (
                    <div dangerouslySetInnerHTML={{ __html: experience }}></div>
                  ) : (
                    <h4></h4>
                  )}

                  {/*<SectionDescriptionMaybe description={description} />
                  <SectionFeaturesMaybe options={sectorsConfig} publicData={publicData} />*/}
                  {/*<SectionMapMaybe
                    geolocation={geolocation}
                    publicData={publicData}
                    listingId={currentListing.id}
                  />*/}

                  <div className={css.casec}>
                    <h2>Career: </h2>
                    <ul>
                      {workExp !== null
                        ? workExp.map((item, index) => {
                            if (index < 4) {
                              return (
                                <li key={index}>
                                  {item.position} in {item.company} for {item.duration}{' '}
                                </li>
                              );
                            }
                          })
                        : null}
                      {/*<li>Head of IT in Pfizer for 25 years </li>
                        <li>Lab technician in Pfizer for 5 years</li>*/}
                    </ul>
                  </div>

                  <div className={css.casec}>
                    <h2>Education:</h2>
                    <ul>
                      {education !== null
                        ? education.map((item, index) => {
                            if (index < 4) {
                              return (
                                <li>
                                  {item.course} from {item.board} during {item.startEndDate}{' '}
                                </li>
                              );
                            }
                          })
                        : null}
                    </ul>
                  </div>

                  <span>
                    {/* <a
                      href={linkedinLink}
                      target="_blank"
                      title={linkedinLinkMsg}
                      className={css.sociallink}
                    >
                      Linked-in Link
                    </a> */}
                    {!linkedinLink ? (
                      <span
                        onClick={() =>
                          this.setState({ showNoLinkError: true, showNoVideoError: false })
                        }
                      >
                        <ExternalLink
                          href={linkedinLink}
                          target="_blank"
                          title={linkedinLinkMsg}
                          className={css.socialLinkedInlink}
                        >
                          {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns="http://www.w3.org/1999/xlink"
                        width="22"
                        height="27"
                      >
                        <path
                          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                          fill="#626262"
                        />
                      </svg> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="90"
                            height="27"
                            viewBox="1.786 1.783 287.865 76.248"
                          >
                            <path
                              d="M213.882 7.245c0-3.015 2.508-5.462 5.6-5.462h64.568c3.093 0 5.6 2.447 5.6 5.462V72.57c0 3.016-2.507 5.461-5.6 5.461h-64.568c-3.092 0-5.6-2.445-5.6-5.46V7.244z"
                              fill="#069"
                            />
                            <path d="M1.785 65.652h31.62V55.27H13.23V15.665H1.785v49.987zM49.414 65.652v-34.43H37.97v34.43h11.444zm-5.721-39.13c3.99 0 6.474-2.644 6.474-5.95-.074-3.378-2.484-5.947-6.398-5.947-3.915 0-6.475 2.57-6.475 5.947 0 3.306 2.484 5.95 6.324 5.95h.075zM54.727 65.652h11.444V46.424c0-1.029.074-2.058.377-2.791.826-2.056 2.709-4.186 5.871-4.186 4.142 0 5.799 3.158 5.799 7.784v18.42H89.66V45.91c0-10.576-5.646-15.497-13.176-15.497-6.173 0-8.884 3.451-10.39 5.802h.077v-4.993H54.727c.151 3.231 0 34.43 0 34.43zM105.805 15.665H94.361v49.987h11.444V54.489l2.86-3.601 8.96 14.764h14.078l-15.056-21.373 13.174-14.54h-13.776s-9.411 13.008-10.24 14.552V15.665z" />
                            <path d="M162.306 51.29c.151-.884.377-2.58.377-4.498 0-8.9-4.518-17.936-16.413-17.936-12.724 0-18.597 10.063-18.597 19.19 0 11.288 7.153 18.337 19.65 18.337 4.97 0 9.561-.732 13.327-2.275l-1.506-7.558c-3.088 1.024-6.25 1.537-10.164 1.537-5.345 0-10.012-2.195-10.389-6.871l23.715.072v.002zm-23.79-7.742c.301-2.938 2.26-7.273 7.153-7.273 5.194 0 6.4 4.628 6.4 7.273h-13.552zM190.93 15.665v17.304h-.151c-1.657-2.422-5.12-4.038-9.71-4.038-8.81 0-16.564 7.05-16.49 19.094 0 11.164 7.003 18.435 15.735 18.435 4.744 0 9.26-2.058 11.52-6.024h.225l.453 5.216h10.163c-.15-2.424-.302-6.61-.302-10.723V15.664h-11.444zm0 34.05c0 .88-.075 1.763-.227 2.495-.675 3.16-3.386 5.361-6.699 5.361-4.742 0-7.83-3.818-7.83-9.84 0-5.654 2.637-10.208 7.906-10.208 3.538 0 6.022 2.423 6.7 5.433.15.663.15 1.398.15 2.058v4.7z" />
                            <path
                              d="M236.85 65.61V31.18h-11.444v34.43h11.445zm-5.72-39.13c3.99 0 6.474-2.644 6.474-5.948-.075-3.379-2.484-5.949-6.398-5.949-3.917 0-6.475 2.57-6.475 5.949 0 3.304 2.483 5.948 6.324 5.948h.074zM243.184 65.61h11.443V46.385c0-1.028.075-2.058.377-2.792.827-2.057 2.71-4.186 5.872-4.186 4.14 0 5.797 3.157 5.797 7.786V65.61h11.443V45.869c0-10.575-5.645-15.496-13.174-15.496-6.173 0-8.884 3.45-10.39 5.8h.076v-4.992h-11.443c.149 3.23-.001 34.43-.001 34.43z"
                              fill="#fff"
                            />
                          </svg>
                        </ExternalLink>
                      </span>
                    ) : (
                      <ExternalLink
                        href={linkedinLink}
                        target="_blank"
                        title={linkedinLinkMsg}
                        className={css.socialLinkedInlink}
                      >
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns="http://www.w3.org/1999/xlink"
                        width="22"
                        height="27"
                      >
                        <path
                          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                          fill="#626262"
                        />
                      </svg> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="90"
                          height="27"
                          viewBox="1.786 1.783 287.865 76.248"
                        >
                          <path
                            d="M213.882 7.245c0-3.015 2.508-5.462 5.6-5.462h64.568c3.093 0 5.6 2.447 5.6 5.462V72.57c0 3.016-2.507 5.461-5.6 5.461h-64.568c-3.092 0-5.6-2.445-5.6-5.46V7.244z"
                            fill="#069"
                          />
                          <path d="M1.785 65.652h31.62V55.27H13.23V15.665H1.785v49.987zM49.414 65.652v-34.43H37.97v34.43h11.444zm-5.721-39.13c3.99 0 6.474-2.644 6.474-5.95-.074-3.378-2.484-5.947-6.398-5.947-3.915 0-6.475 2.57-6.475 5.947 0 3.306 2.484 5.95 6.324 5.95h.075zM54.727 65.652h11.444V46.424c0-1.029.074-2.058.377-2.791.826-2.056 2.709-4.186 5.871-4.186 4.142 0 5.799 3.158 5.799 7.784v18.42H89.66V45.91c0-10.576-5.646-15.497-13.176-15.497-6.173 0-8.884 3.451-10.39 5.802h.077v-4.993H54.727c.151 3.231 0 34.43 0 34.43zM105.805 15.665H94.361v49.987h11.444V54.489l2.86-3.601 8.96 14.764h14.078l-15.056-21.373 13.174-14.54h-13.776s-9.411 13.008-10.24 14.552V15.665z" />
                          <path d="M162.306 51.29c.151-.884.377-2.58.377-4.498 0-8.9-4.518-17.936-16.413-17.936-12.724 0-18.597 10.063-18.597 19.19 0 11.288 7.153 18.337 19.65 18.337 4.97 0 9.561-.732 13.327-2.275l-1.506-7.558c-3.088 1.024-6.25 1.537-10.164 1.537-5.345 0-10.012-2.195-10.389-6.871l23.715.072v.002zm-23.79-7.742c.301-2.938 2.26-7.273 7.153-7.273 5.194 0 6.4 4.628 6.4 7.273h-13.552zM190.93 15.665v17.304h-.151c-1.657-2.422-5.12-4.038-9.71-4.038-8.81 0-16.564 7.05-16.49 19.094 0 11.164 7.003 18.435 15.735 18.435 4.744 0 9.26-2.058 11.52-6.024h.225l.453 5.216h10.163c-.15-2.424-.302-6.61-.302-10.723V15.664h-11.444zm0 34.05c0 .88-.075 1.763-.227 2.495-.675 3.16-3.386 5.361-6.699 5.361-4.742 0-7.83-3.818-7.83-9.84 0-5.654 2.637-10.208 7.906-10.208 3.538 0 6.022 2.423 6.7 5.433.15.663.15 1.398.15 2.058v4.7z" />
                          <path
                            d="M236.85 65.61V31.18h-11.444v34.43h11.445zm-5.72-39.13c3.99 0 6.474-2.644 6.474-5.948-.075-3.379-2.484-5.949-6.398-5.949-3.917 0-6.475 2.57-6.475 5.949 0 3.304 2.483 5.948 6.324 5.948h.074zM243.184 65.61h11.443V46.385c0-1.028.075-2.058.377-2.792.827-2.057 2.71-4.186 5.872-4.186 4.14 0 5.797 3.157 5.797 7.786V65.61h11.443V45.869c0-10.575-5.645-15.496-13.174-15.496-6.173 0-8.884 3.45-10.39 5.8h.076v-4.992h-11.443c.149 3.23-.001 34.43-.001 34.43z"
                            fill="#fff"
                          />
                        </svg>
                      </ExternalLink>
                    )}
                  </span>
                  <span>
                    {/* {!youtubeLink ? (
                      <span
                        onClick={() =>
                          this.setState({ showNoVideoError: true, showNoLinkError: false })
                        }
                      >
                        <a
                          href={youtubeLink}
                          target="_blank"
                          title={youtubeMsg}
                          className={css.sociallink}
                        >
                          Mentor Video
                        </a>
                      </span>
                    ) : (
                      <a
                        href={youtubeLink}
                        target="_blank"
                        title={youtubeMsg}
                        className={css.sociallink}
                      >
                        Mentor Video
                      </a>
                    )} */}

                    {/* {this.state.showNoVideoError && (
                      <div className={css.noVideoError}>The Mentor has yet to post a video</div>
                    )} */}
                    {this.state.showNoLinkError && (
                      <div className={css.noLinkedInError}>
                        Mentor is yet to share their LinkedIn link
                      </div>
                    )}
                  </span>
                  <SectionReviews reviews={reviews} fetchReviewsError={fetchReviewsError} />
                </div>

                <div className={css.rightSecbooking}>
                  {!isOwnListing && !isMentor && (
                    <button type="button" onClick={this.onContactUser} className={css.qtbtn}>
                      Would you like to ask me a question ?
                    </button>
                  )}
                  {!fetchIsFirstTransactionBetweenPartiesError &&
                    !fetchIsFirstTransactionBetweenPartiesInProgress &&
                    transactionBetweenParties !== null && (
                      <BookingPanel
                        className={`${css.bookingPanel} ${css.modbp}`}
                        listing={currentListing}
                        isOwnListing={isOwnListing}
                        isCurrentUserMentor={isMentor}
                        unitType={unitType}
                        onSubmit={handleBookingSubmit}
                        title={bookingTitle}
                        authorDisplayName={authorDisplayName}
                        onManageDisableScrolling={onManageDisableScrolling}
                        monthlyTimeSlots={monthlyTimeSlots}
                        onFetchTimeSlots={onFetchTimeSlots}
                        showShortBooking={showShortBooking}
                      />
                    )}
                </div>
              </div>
            </div>
            <Modal
              id="ListingPage.enquiry"
              contentClassName={css.enquiryModalContent}
              isOpen={isAuthenticated && this.state.enquiryModalOpen}
              onClose={() => this.setState({ enquiryModalOpen: false })}
              onManageDisableScrolling={onManageDisableScrolling}
            >
              <EnquiryForm
                className={css.enquiryForm}
                submitButtonWrapperClassName={css.enquirySubmitButtonWrapper}
                listingTitle={title}
                authorDisplayName={authorDisplayName}
                sendEnquiryError={sendEnquiryError}
                onSubmit={this.onSubmitEnquiry}
                inProgress={sendEnquiryInProgress}
              />
            </Modal>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ListingPageComponent.defaultProps = {
  unitType: config.bookingUnitType,
  currentUser: null,
  enquiryModalOpenForListingId: null,
  showListingError: null,
  reviews: [],
  fetchReviewsError: null,
  monthlyTimeSlots: null,
  sendEnquiryError: null,
  certificateConfig: config.custom.certificate,
  yogaStylesConfig: config.custom.yogaStyles,
  sectorsConfig: config.custom.sectors,
};

ListingPageComponent.propTypes = {
  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string,
  }).isRequired,

  unitType: propTypes.bookingUnitType,
  // from injectIntl
  intl: intlShape.isRequired,

  params: shape({
    id: string.isRequired,
    slug: string,
    variant: oneOf([LISTING_PAGE_DRAFT_VARIANT, LISTING_PAGE_PENDING_APPROVAL_VARIANT]),
  }).isRequired,

  isAuthenticated: bool.isRequired,
  currentUser: propTypes.currentUser,
  getListing: func.isRequired,
  getOwnListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  enquiryModalOpenForListingId: string,
  showListingError: propTypes.error,
  callSetInitialValues: func.isRequired,
  reviews: arrayOf(propTypes.review),
  fetchReviewsError: propTypes.error,
  monthlyTimeSlots: object,
  // monthlyTimeSlots could be something like:
  // monthlyTimeSlots: {
  //   '2019-11': {
  //     timeSlots: [],
  //     fetchTimeSlotsInProgress: false,
  //     fetchTimeSlotsError: null,
  //   }
  // }
  sendEnquiryInProgress: bool.isRequired,
  sendEnquiryError: propTypes.error,
  onSendEnquiry: func.isRequired,
  onInitializeCardPaymentData: func.isRequired,

  certificateConfig: array,
  yogaStylesConfig: array,
  sectorsConfig: array,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  const {
    showListingError,
    reviews,
    fetchReviewsError,
    monthlyTimeSlots,
    sendEnquiryInProgress,
    sendEnquiryError,
    enquiryModalOpenForListingId,
    transactionBetweenParties,
    fetchIsFirstTransactionBetweenPartiesInProgress,
    fetchIsFirstTransactionBetweenPartiesError,
  } = state.ListingPage;
  const { currentUser } = state.user;

  const getListing = id => {
    const ref = { id, type: 'listing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  const getOwnListing = id => {
    const ref = { id, type: 'ownListing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    isAuthenticated,
    currentUser,
    getListing,
    getOwnListing,
    scrollingDisabled: isScrollingDisabled(state),
    enquiryModalOpenForListingId,
    showListingError,
    reviews,
    fetchReviewsError,
    monthlyTimeSlots,
    sendEnquiryInProgress,
    sendEnquiryError,
    transactionBetweenParties,
    fetchIsFirstTransactionBetweenPartiesInProgress,
    fetchIsFirstTransactionBetweenPartiesError,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  callSetInitialValues: (setInitialValues, values) => dispatch(setInitialValues(values)),
  onSendEnquiry: (listingId, message) => dispatch(sendEnquiry(listingId, message)),
  onInitializeCardPaymentData: () => dispatch(initializeCardPaymentData()),
  onFetchTimeSlots: (listingId, start, end, timeZone) =>
    dispatch(fetchTimeSlots(listingId, start, end, timeZone)),
  onupdateProfile: data => dispatch(updateProfile(data)),
  resetNewBuyerAction: () => dispatch(resetNewBuyer()),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const ListingPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ListingPageComponent);

ListingPage.setInitialValues = initialValues => setInitialValues(initialValues);
ListingPage.loadData = loadData;

export default ListingPage;
