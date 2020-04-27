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
import { NamedLink, ResponsiveImage, Button } from '../../components';
import { updateProfile } from '../../containers/ProfileSettingsPage/ProfileSettingsPage.duck';
import { showUser } from '../../containers/ProfilePage/ProfilePage.duck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faHeart as solidHeart,faHeartBroken,faHeartbeat, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart} from '@fortawesome/free-regular-svg-icons';
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
    // console.log("props in listingcard",props);

    this.addToFav = this.addToFav.bind(this);
    this.removeFromFav = this.removeFromFav.bind(this);
  }

  componentDidMount() {
    this.props.onShowUser(this.props.listing.author.id);
  }

  addToFav = id => {
    let {profile} = this.props.currentUser.attributes;
    let newFavourites = profile.protectedData.favourites && Array.isArray(JSON.parse(profile.protectedData.favourites)) ? JSON.parse(profile.protectedData.favourites) : [];
    newFavourites.push({id : id, listing : this.props.listing, renderSizes : this.props.renderSizes});
    // profile.protectedData = {favourites : JSON.stringify(favourites)};
    profile.protectedData.favourites = JSON.stringify(newFavourites);
    const profileToSaved = {
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      bio: profile.bio,
      protectedData : profile.protectedData
    }
    this.props.onUpdateProfile(profileToSaved);
  }

  removeFromFav = id => {
    let {profile} = this.props.currentUser.attributes;
    let newFavourites = profile.protectedData.favourites && Array.isArray(JSON.parse(profile.protectedData.favourites)) ? JSON.parse(profile.protectedData.favourites) : [];
    if(newFavourites.length == 0)
    {
      return false;
    }
    const removedArr = newFavourites.filter(c => c.id !== id);
    profile.protectedData.favourites = JSON.stringify(removedArr);
    const profileToSaved = {
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      bio: profile.bio,
      protectedData : profile.protectedData
    }
    this.props.onUpdateProfile(profileToSaved);
  }
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
    } = this.props;
    let favouritesArr = currentUser && currentUser.attributes.profile.protectedData.favourites && Array.isArray(JSON.parse(currentUser.attributes.profile.protectedData.favourites)) ? JSON.parse(currentUser.attributes.profile.protectedData.favourites) : [];
    const classes = classNames(rootClassName || css.root, className);
    const currentListing = ensureListing(listing);
    console.log("currentListing in listingcard",currentListing);
    const authorAvailable = currentListing && currentListing.author;
    const currentAuthor = authorAvailable ? currentListing.author : null;
    const ensuredAuthor = ensureUser(currentAuthor);
    const {averageRating = 0, ratingCount = 0} = currentListing.attributes.publicData;
    // console.log("ensuredAuthor",ensuredAuthor);
    // let authorData = this.state.authorData !== null && this.state.authorData.data.attributes.profile.publicData ? this.state.authorData.data.attributes.profile.publicData : {error:"no data"}; 
    let authorData = ensuredAuthor !== null && ensuredAuthor.attributes.profile.publicData ? ensuredAuthor.attributes.profile.publicData : {error:"no data"}; 
    let {workExp = null, education = null, linkedinLink = null, youtubeLink = null } = authorData;
    // console.log("authorData",authorData);
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
    if (favouritesArr.length > 0)
    {
      // isFavourite = favouritesArr.filter(c => c.id !== id).length > 0 ? true : false;
      isFavourite = favouritesArr.filter(c => {
        if(c.id == id)
        {
          return true;
        }
        // else
        // {
        //   return false;
        // }
      })
    }
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
             <SectionAvatar user={currentAuthor} />
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
              <div className={css.title}>
                {richText('Organisations Worked in:', {
                  longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
                  longWordClass: css.longWord,
                })}
                {
                  workExp !== null ? workExp.map((item, index) => {
                    if(index < 4)
                    {
                      return (
                        <span className={css.crr}>{item.company}</span>
                      );
                    }
                  })
                  : null
                }
              </div>
              
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
                  <div className={css.title}>
                    Career Roles:
                    {
                      workExp !== null ? workExp.map((item, index) => {
                        if(index < 4)
                        {
                          return (
                            <span className={css.crr}>{item.position}</span>
                          );
                        }
                      })
                      : null
                    }
                  </div>

                  <a href={linkedinLink} className={css.socialLink}>
                    Linked-in Link
                     { /*linkedinLink*/
                    }
                  </a>



            </div>

            <div className={`${css.price} ${css.nameSig}`}>
                  <div className={`${css.title} ${css.nameav}`}>
                     {title}
                  </div>
              <div className={css.priceValue} title={priceTitle}>
                {formattedPrice}<FormattedMessage id={unitTranslationKey} />
              </div>

            </div>
          </div>

        
          </NamedLink>
          {currentUser !== null ?
          <div className={css.favSec}>
            {isFavourite.length > 0 ? 
              (<Button onClick={() => this.removeFromFav(id)} className={css.favBtn}><FontAwesomeIcon icon={solidHeart} /></Button>)
              :(<Button onClick={() => this.addToFav(id)} className={css.favBtn}><FontAwesomeIcon icon={faHeart} /> </Button>)        
            }
          </div>
          : null
          }
        
       
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
  const { currentUser} = state.user;
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
