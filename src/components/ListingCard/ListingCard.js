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
      subSectors: [],
      jobRoles:[],
    };

    this.addToFav = this.addToFav.bind(this);
  }

  addToFav = id => {
    console.log("addtofav:",this.props);
    let {profile} = this.props.currentUser.attributes;
    let favourites = profile.protectedData.favourites && Array.isArray(JSON.parse(profile.protectedData.favourites)) ? JSON.parse(profile.protectedData.favourites) : [];
    favourites.push({id : id, listing : this.props.listing, renderSizes : this.props.renderSizes});
    console.log("favourites after push",favourites);
    profile.protectedData.favourites = JSON.stringify(favourites);
    const profileToSaved = {
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      bio: profile.bio,
      protectedData : profile.protectedData
    }
    console.log("profile in addtofav",profileToSaved);
    this.props.onUpdateProfile(profileToSaved);
  }
  render() {
  // export const ListingCardComponent = props => {
    const {
      currentUser,
      className,
      rootClassName,
      onUpdateProfile,
      intl,
      listing,
      renderSizes,
      certificateConfig,
      setActiveListing,
    } = this.props;
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

      

    return (
      <div>
        <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
          <div
            className={css.threeToTwoWrapper}
            onMouseEnter={() => setActiveListing(currentListing.id)}
            onMouseLeave={() => setActiveListing(null)}
          >
            <div className={css.aspectWrapper}>
              <LazyImage
                rootClassName={css.rootForImage}
                alt={title}
                image={firstImage}
                variants={['landscape-crop', 'landscape-crop2x']}
                sizes={renderSizes}
              />
            </div>
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
              <div className={css.certificateInfo}>
                {certificate && !certificate.hideFromListingInfo ? (
                  <span>{certificate.label}</span>
                ) : null}
              </div>
            </div>
          </div>
        </NamedLink>
        <Button onClick={() => this.addToFav(id)}> add to favourites</Button>
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
