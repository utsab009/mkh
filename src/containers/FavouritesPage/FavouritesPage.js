import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { types as sdkTypes } from '../../util/sdkLoader';
import { propTypes } from '../../util/types';
import config from '../../config';
import { parse } from '../../util/urlHelpers';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  ManageListingCard,
  ListingCard,
  Page,
  PaginationLinks,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer } from '../../containers';

// import {
//   closeListing,
//   openListing,
//   getOwnListingsById,
//   queryOwnListings,
// } from './FavouritesPage.duck';
import css from './FavouritesPage.css';

// Pagination page size might need to be dynamic on responsive page layouts
// Current design has max 3 columns 42 is divisible by 2 and 3
// So, there's enough cards to fill all columns on full pagination pages
const RESULT_PAGE_SIZE = 42;

export class FavouritesPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { listingMenuOpen: null };
    this.onToggleMenu = this.onToggleMenu.bind(this);
  }

  onToggleMenu(listing) {
    this.setState({ listingMenuOpen: listing });
  }

  render() {
    const {
      currentUser,  
      closingListing,
      closingListingError,
      listings,
      onCloseListing,
      onOpenListing,
      openingListing,
      openingListingError,
      pagination,
      queryInProgress,
      queryListingsError,
      queryParams,
      scrollingDisabled,
      intl,
    } = this.props;

    let favouritesArr = currentUser && currentUser.attributes.profile.protectedData.favourites && Array.isArray(JSON.parse(currentUser.attributes.profile.protectedData.favourites)) ? JSON.parse(currentUser.attributes.profile.protectedData.favourites) : [];
    console.log("favouritesArr",favouritesArr);

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const listingsAreLoaded = !queryInProgress && hasPaginationInfo;

    const loadingResults = (
      <h2>
        <FormattedMessage id="FavouritesPage.loadingOwnListings" />
      </h2>
    );

    const queryError = (
      <h2 className={css.error}>
        <FormattedMessage id="FavouritesPage.queryError" />
      </h2>
    );

    const noResults =
      listingsAreLoaded && pagination.totalItems === 0 ? (
        <h1 className={css.title}>
          <FormattedMessage id="FavouritesPage.noResults" />
        </h1>
      ) : null;

    const heading =
      listingsAreLoaded && pagination.totalItems > 0 ? (
        <h1 className={css.title}>
          <FormattedMessage
            id="FavouritesPage.youHaveListings"
            values={{ count: pagination.totalItems }}
          />
        </h1>
      ) : (
        noResults
      );

    const page = queryParams ? queryParams.page : 1;
    const paginationLinks =
      listingsAreLoaded && pagination && pagination.totalPages > 1 ? (
        <PaginationLinks
          className={css.pagination}
          pageName="FavouritesPage"
          pageSearchParams={{ page }}
          pagination={pagination}
        />
      ) : null;

    const listingMenuOpen = this.state.listingMenuOpen;
    const closingErrorListingId = !!closingListingError && closingListingError.listingId;
    const openingErrorListingId = !!openingListingError && openingListingError.listingId;

    const title = intl.formatMessage({ id: 'FavouritesPage.title' });

    const panelWidth = 62.5;
    // Render hints for responsive image
    const renderSizes = [
      `(max-width: 767px) 100vw`,
      `(max-width: 1920px) ${panelWidth / 2}vw`,
      `${panelWidth / 3}vw`,
    ].join(', ');

    const { Money, UUID } = sdkTypes;

    return (
      <Page title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="FavouritesPage" />
            <UserNav selectedPageName="FavouritesPage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            {queryInProgress ? loadingResults : null}
            {queryListingsError ? queryError : null}
            <div className={css.listingPanel}>
              {heading}
              <div className={css.listingCards}>
                {favouritesArr.map(l => {
                //   <ManageListingCard
                //     className={css.listingCard}
                //     key={l.id}
                //     listing={l.listing}
                //     isMenuOpen={!!listingMenuOpen && listingMenuOpen.id.uuid === l.id.uuid}
                //     actionsInProgressListingId={openingListing || closingListing}
                //     onToggleMenu={this.onToggleMenu}
                //     onCloseListing={onCloseListing}
                //     onOpenListing={onOpenListing}
                //     hasOpeningError={openingErrorListingId.uuid === l.id.uuid}
                //     hasClosingError={closingErrorListingId.uuid === l.id.uuid}
                //     renderSizes={renderSizes}
                //   />
                l.listing.attributes.price = new Money(l.listing.attributes.price.amount, l.listing.attributes.price.currency);
                l.listing.author.id = new UUID(l.listing.author.id.uuid);
                return(
                  <ListingCard
                    className={css.listingCard}
                    key={l.id}
                    listing={l.listing}
                    renderSizes={l.renderSizes}
                    // setActiveListing={setActiveListing}
                  />
                )})}
              </div>
              {paginationLinks}
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

FavouritesPageComponent.defaultProps = {
  listings: [],
  pagination: null,
  queryListingsError: null,
  queryParams: null,
  closingListing: null,
  closingListingError: null,
  openingListing: null,
  openingListingError: null,
};

const { arrayOf, bool, func, object, shape, string } = PropTypes;

FavouritesPageComponent.propTypes = {
  closingListing: shape({ uuid: string.isRequired }),
  closingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  listings: arrayOf(propTypes.ownListing),
  onCloseListing: func.isRequired,
  onOpenListing: func.isRequired,
  openingListing: shape({ uuid: string.isRequired }),
  openingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  pagination: propTypes.pagination,
  queryInProgress: bool.isRequired,
  queryListingsError: propTypes.error,
  queryParams: object,
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
    const { currentUser} = state.user;
    return {
      currentUser,
    };
};

// const mapDispatchToProps = dispatch => ({
//   onCloseListing: listingId => dispatch(closeListing(listingId)),
//   onOpenListing: listingId => dispatch(openListing(listingId)),
// });

const FavouritesPage = compose(
  connect(
    mapStateToProps,
    // mapDispatchToProps
  ),
  injectIntl
)(FavouritesPageComponent);

// FavouritesPage.loadData = (params, search) => {
//   const queryParams = parse(search);
//   const page = queryParams.page || 1;
//   return queryOwnListings({
//     ...queryParams,
//     page,
//     perPage: RESULT_PAGE_SIZE,
//     include: ['images'],
//     'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
//     'limit.images': 1,
//   });
// };

export default FavouritesPage;
