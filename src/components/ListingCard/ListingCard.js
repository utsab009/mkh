import React, { Component } from 'react';
import { array, string, func } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing } from '../../util/data';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { NamedLink, ResponsiveImage, Button } from '../../components';
import { updateProfile } from '../../containers/ProfileSettingsPage/ProfileSettingsPage.duck';
import { showUser } from '../../containers/ProfilePage/ProfilePage.duck';

import { types as sdkTypes } from '../../util/sdkLoader';

import css from './ListingCard.css';

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
    console.log("this.props in CDM in listingcard",this.props.listing.author.id);
    let authorData ;
    let showuserresponse = this.props.onShowUser(this.props.listing.author.id);
    showuserresponse.then(result => {
      authorData = result.data;
      this.setState({authorData : authorData});
     return result;
    });
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
    console.log("this.state.authordata",this.state.authorData);
    let authorData = this.state.authorData !== null && this.state.authorData.data.attributes.profile.publicData ? this.state.authorData.data.attributes.profile.publicData : {error:"no data"}; 
    let {workExp = null, education = null } = authorData;
    console.log("workExp:",workExp);
    let favouritesArr = currentUser && currentUser.attributes.profile.protectedData.favourites && Array.isArray(JSON.parse(currentUser.attributes.profile.protectedData.favourites)) ? JSON.parse(currentUser.attributes.profile.protectedData.favourites) : [];
    const classes = classNames(rootClassName || css.root, className);
    const currentListing = ensureListing(listing);
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
    console.log("favouritesArr",favouritesArr);
    let isFavourite = false;
    if (favouritesArr.length > 0)
    {
      // isFavourite = favouritesArr.filter(c => c.id !== id).length > 0 ? true : false;
      isFavourite = favouritesArr.filter(c => {
        console.log('c.id',c.id,'id',id);
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
    console.log("isfavourite :",isFavourite);  

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
           <div className={css.modImageSec}>
             <img image={firstImage} />
           </div>
          <div className={css.info}>
            <div className={css.price}>
              <div className={css.priceValue} title={priceTitle}>
                {formattedPrice}
              </div>
              <div className={css.perUnit}>
                <FormattedMessage id={unitTranslationKey} />
              </div>
            </div>
            <div className={css.mainInfo}>
              <div className={css.title}>
                {richText(title, {
                  longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
                  longWordClass: css.longWord,
                })}
              </div>
              {workExp !== null ? workExp.map((item, index) => {
                if(index < 4)
                return (
                  <div>{item.company}</div>
                );
                })
                : null
              }
              <div className={css.certificateInfo}>
                {certificate && !certificate.hideFromListingInfo ? (
                  <span>{certificate.label}</span>
                ) : null}
              </div>
            </div>
          </div>
        </NamedLink>
        {currentUser !== null ?
          <div>
            {isFavourite.length > 0 ? 
              (<Button onClick={() => this.removeFromFav(id)}> remove from favourites</Button>)
              :(<Button onClick={() => this.addToFav(id)}> add to favourites</Button>)        
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
