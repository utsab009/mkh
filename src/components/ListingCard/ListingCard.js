import React, { Component } from 'react';
import { array, string, func } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { NamedLink, ResponsiveImage, Button, ExternalLink } from '../../components';
import { updateProfile } from '../../containers/ProfileSettingsPage/ProfileSettingsPage.duck';
import { showUser } from '../../containers/ProfilePage/ProfilePage.duck';
import { showListing } from '../../containers/ListingPage/ListingPage.duck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faHeart as solidHeart,
  faHeartBroken,
  faHeartbeat,
  faStar as solidStar,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { types as sdkTypes } from '../../util/sdkLoader';
import SectionAvatar from '../../containers/ListingPage/SectionAvatar';

import css from './ListingCard.css';
import {
  ensureListing,
  ensureOwnListing,
  ensureUser,
  userDisplayNameAsString,
} from '../../util/data';

const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

const getCertificateInfo = (certificateConfig, key) => {
  return certificateConfig.find(c => c.key === key);
};

class ListingImage extends Component {
  render() {
    return <ResponsiveImage {...this.props} />;
  }
}

const LazyImage = lazyLoadWithDimensions(ListingImage, { loadAfterInitialRendering: 3000 });

export class ListingCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation_error: false,
      authorData: null,
    };
    console.log('props in listingcard', props);

    this.addToFav = this.addToFav.bind(this);
    this.removeFromFav = this.removeFromFav.bind(this);
  }

  componentDidMount() {
    console.log('inside componentdidmount', this.props.onShowUser(this.props.listing.author.id));
    const authorData = this.props.onShowUser(this.props.listing.author.id);
    authorData.then(data => {
      console.log('data in showlisting', data);
      this.setState({ authorData: data.data });
    });
    console.log('Listingcard');
  }

  addToFav = id => {
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
    this.props.onUpdateProfile(profileToSaved);
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
    this.props.onUpdateProfile(profileToSaved);
  };
  render() {
    // export const ListingCardComponent = props => {
    const {
      currentUser,
      className,
      rootClassName,
      onUpdateProfile,
      onShowUser,
      intl,
      listing,
      renderSizes,
      certificateConfig,
      setActiveListing,
      onShowListing,
    } = this.props;
    // const listingDetails = onShowListing({id : listing.id});
    // console.log("listingDetails",listingDetails);
    let favouritesArr =
      currentUser &&
      currentUser.attributes.profile.protectedData.favourites &&
      Array.isArray(JSON.parse(currentUser.attributes.profile.protectedData.favourites))
        ? JSON.parse(currentUser.attributes.profile.protectedData.favourites)
        : [];
    const classes = classNames(rootClassName || css.root, className);
    const currentListing = ensureListing(listing);
    console.log('currentListing in listingcard', currentListing);
    const authorAvailable = currentListing && currentListing.author;
    const currentAuthor = authorAvailable ? currentListing.author : null;
    const ensuredAuthor = ensureUser(currentAuthor);
    const { averageRating = 0, ratingCount = 0 } = currentListing.attributes.publicData;
    // console.log("ensuredAuthor",ensuredAuthor);
    let authorData =
      this.state.authorData !== null &&
      this.state.authorData.data &&
      this.state.authorData.data.attributes &&
      this.state.authorData.data.attributes.profile &&
      this.state.authorData.data.attributes.profile.publicData
        ? this.state.authorData.data.attributes.profile.publicData
        : { error: 'no data' };

    // let authorData =
    //   ensuredAuthor !== null && ensuredAuthor.attributes.profile.publicData
    //     ? ensuredAuthor.attributes.profile.publicData
    //     : { error: 'no data' };
    let {
      workExp = null,
      education = null,
      linkedinLink = null,
      youtubeLink = null,
      fullName = ensuredAuthor.attributes.profile.displayName,
    } = authorData;
    console.log('authorData', authorData, this.state);
    const id = currentListing.id.uuid;
    const { title = '', price, publicData } = currentListing.attributes;
    const slug = createSlug(title);
    const firstImage =
      currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

    const certificate = publicData
      ? getCertificateInfo(certificateConfig, publicData.certificate)
      : null;
    const { formattedPrice, priceTitle } = priceData(price, intl);

    const unitType = config.bookingUnitType;
    const isNightly = unitType === LINE_ITEM_NIGHT;
    const isDaily = unitType === LINE_ITEM_DAY;

    const unitTranslationKey = isNightly
      ? 'ListingCard.perNight'
      : isDaily
      ? 'ListingCard.perDay'
      : 'ListingCard.perUnit';
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
    console.log('ensuredAuthor in listingcard', ensuredAuthor, 'state.authordata', authorData);
    return (
      <div className={css.updateRow}>
        <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
          {/* <div
            className={css.threeToTwoWrapper}
            onMouseEnter={() => setActiveListing(currentListing.id)}
            onMouseLeave={() => setActiveListing(null)}
          >
            <div className={`${css.aspectWrapper} ${css.aspectWrapperMod}`}>
              <LazyImage
                rootClassName={`${css.rootForImage} ${css.modifyImg}`}
                alt={title}
                image={firstImage}
                variants={['landscape-crop', 'landscape-crop2x']}
                sizes={renderSizes}
              />
            </div>
          </div> */}
          {/*<div className={css.modImageSec}>*/}
          <div>
            {/*<img src="" />*/}
            <SectionAvatar user={ensuredAuthor} />
          </div>
          <div className={css.info}>
            {/* <div className={css.price}>
              <div className={css.priceValue} title={priceTitle}>
                {formattedPrice}
              </div>
              <div className={css.perUnit}>
                <FormattedMessage id={unitTranslationKey} />
              </div>
            </div> */}
            <div className={css.mainInfo}>
              <div className={`${css.title} ${css.nameav}`}>{fullName}</div>

              {/* <div className={css.certificateInfo}>
                {certificate && !certificate.hideFromListingInfo ? (
                  <span>{certificate.label}</span>
                ) : null}
              </div> */}

              <div className={css.rating}>
                <FontAwesomeIcon icon={solidStar} /> {averageRating} <span>({ratingCount})</span>
              </div>
            </div>

            <div className={css.price}>
              {console.log('workExp: ', workExp)}

              <div className={css.title}>
                {richText('Organisations Worked in:', {
                  longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
                  longWordClass: css.longWord,
                })}
                {workExp !== null
                  ? workExp.map((item, index) => {
                      if (index < 3) {
                        return <span className={css.crr}>{item.company}</span>;
                      }
                    })
                  : null}
              </div>
            </div>

            <div className={css.price}>
              <div className={css.title}>
                Sample Career Roles:
                {workExp !== null
                  ? workExp.map((item, index) => {
                      if (index < 3) {
                        return <span className={css.crr}>{item.position}</span>;
                      }
                    })
                  : null}
              </div>
              <div className={css.priceValue} title={priceTitle}>
                {formattedPrice}
                <FormattedMessage id={unitTranslationKey} />
              </div>
            </div>

            {/*<div className={`${css.price} ${css.nameSig}`}>
                  <div className={`${css.title} ${css.nameav}`}>
                     {fullName}
                  </div>
              <div className={css.priceValue} title={priceTitle}>
                {formattedPrice}<FormattedMessage id={unitTranslationKey} />
              </div>

                </div>*/}
          </div>
        </NamedLink>
        <div className={css.afternm}>
          {currentUser !== null ? (
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
          ) : null}
          <ExternalLink href={linkedinLink} className={css.socialLink}>
            {/* <a href={linkedinLink} className={css.socialLink}> */}
            {/* Linked-in Link */}
            {/*linkedinLink*/}
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
              width="127"
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
            {/* </a> */}
          </ExternalLink>
        </div>
      </div>
    );
  }
}

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  certificateConfig: config.custom.certificate,
  setActiveListing: () => null,
};

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  certificateConfig: array,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

const mapStateToProps = state => {
  // console.log("state in listingcard",state)
  const { currentUser } = state.user;
  // const {
  //   image,
  //   uploadImageError,
  //   uploadInProgress,
  //   updateInProgress,
  //   updateProfileError,
  // } = state.ProfileSettingsPage;
  return {
    currentUser,
    // currentUserListing,
    // image,
    // scrollingDisabled: isScrollingDisabled(state),
    // updateInProgress,
    // updateProfileError,
    // uploadImageError,
    // uploadInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  // onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
  onShowUser: data => dispatch(showUser(data)),
  onShowListing: data => dispatch(showListing(data)),
});

// export default injectIntl(ListingCardComponent);
const ListingCard = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ListingCardComponent);
export default ListingCard;
// export default compose(injectIntl)(ListingCardComponent);
