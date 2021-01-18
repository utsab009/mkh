import React, { Component } from 'react';
import { array, bool, func, number, oneOf, object, shape, string } from 'prop-types';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import unionWith from 'lodash/unionWith';
import classNames from 'classnames';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import { parse, stringify } from '../../util/urlHelpers';
import { propTypes } from '../../util/types';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { SearchMap, ModalInMobile, Page, Portal } from '../../components';
import { TopbarContainer } from '../../containers';

import { searchListings, searchMapListings, setActiveListing } from './SearchPage.duck';
import {
  pickSearchParamsOnly,
  validURLParamsForExtendedData,
  validFilterParams,
  createSearchResultSchema,
} from './SearchPage.helpers';
import MainPanel from './MainPanel';
import css from './SearchPage.css';
import { sendVerificationEmail } from '../../ducks/user.duck';

// Pagination page size might need to be dynamic on responsive page layouts
// Current design has max 3 columns 12 is divisible by 2 and 3
// So, there's enough cards to fill all columns on full pagination pages
const RESULT_PAGE_SIZE = 24;
const MODAL_BREAKPOINT = 768; // Search is in modal on mobile layout
const SEARCH_WITH_MAP_DEBOUNCE = 300; // Little bit of debounce before search is initiated.

export class SearchPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchMapOpenOnMobile: props.tab === 'map',
      isMobileModalOpen: false,
      subSectorsConfig: [],
      jobroleConfig: [],
      portalShow: false,
    };

    this.searchMapListingsInProgress = false;

    this.filters = this.filters.bind(this);
    this.onMapMoveEnd = debounce(this.onMapMoveEnd.bind(this), SEARCH_WITH_MAP_DEBOUNCE);
    this.onOpenMobileModal = this.onOpenMobileModal.bind(this);
    this.onCloseMobileModal = this.onCloseMobileModal.bind(this);
  }

  filters() {
    const {
      certificateConfig,
      yogaStylesConfig,
      priceFilterConfig,
      keywordFilterConfig,
      mentorLanguageConfig,
      mentorShiftConfig,
      sectorsConfig,
      levelConfig,
    } = this.props;

    let jobRolesConfig = [];

    // config.custom.sectors.map(sector => {
    //   switch (sector.key) {
    //     case 'Accountancy and Financial Management':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.Accountancyandfinancialmanagement];
    //     case 'Civil and structural engineering':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.Civilandstructuralengineering];
    //     case 'Public Service':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.PublicServices];
    //     case 'Accounting':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.Accounting];
    //     case 'Administration and Office Support':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.AdministrationAndOfficeSupport];
    //     case 'Advertising Arts and Media':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.AdvertisingArtsAndMedia];
    //     case 'Banking and Financial Services':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.BankingAndFinancialServices];
    //     case 'Call Center and Customer Service':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.CallCenterAndCustomerService];
    //     case 'Community Services and Development':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.CommunityServicesAndDevelopment];
    //     case 'Construction':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.Construction];
    //     case 'Consulting and Strategy':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.ConsultingAndStrategy];
    //     case 'Design and Architecture':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.DesignAndArchitecture];
    //     case 'Education and Training':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.EducationAndTraining];
    //     case 'Engineering':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.Engineering];
    //     case 'Executive':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.Executive];
    //     case 'Farming Animals and Conservation':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.FarmingAnimalsAndConservation];
    //     case 'Healthcare and Medical':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.HealthcareAndMedical];
    //     case 'Hospitality and Tourism':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.HospitalityAndTourism];
    //     case 'Human Resources and Recruitment':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.HumanResourcesAndRecruitment];
    //     case 'Information Technology':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.InformationTechnology];
    //     case 'Insurance':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.Insurance];
    //     case 'Legal':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.Legal];
    //     case 'Manufacturing Transport and Logistics':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.ManufacturingTransportAndLogistics];
    //     case 'Marketing and Communications':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.MarketingAndCommunications];
    //     case 'Real Estate and Property':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.RealEstateAndProperty];
    //     case 'Retail and Consumer Products':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.RetailAndConsumerProducts];
    //     case 'Sales':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.Sales];
    //     case 'Science and Technology':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.ScienceAndTechnology];
    //     case 'Sports and Recreation':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.SportsAndRecreation];
    //     case 'Trades and Services':
    //       jobRolesConfig = [...jobRolesConfig, ...config.custom.TradesAndServices];
    //   }
    // });

    // jobRolesConfig = new Set(jobRolesConfig).filter(x => !x.hideFromFilters);

    console.log('jobRolesConfig: ', jobRolesConfig);

    // const { ...searchInURL } = parse(this.props.location.search, {
    //   latlng: ['origin'],
    //   latlngBounds: ['bounds'],
    // });
    // let jobroleConfig = [];
    // let subsectorsConfig = [];
    // if(typeof(searchInURL.pub_sectors) !== undefined)
    // {
    //   if(searchInURL.pub_sectors == "Public Service")
    //   {
    //     jobroleConfig = config.custom.publicRoles;
    //   }
    //   else
    //   {
    //     jobroleConfig = config.custom.nonPublicRoles;
    //   }
    //   // const subSectors = config.custom.Civilandstructuralengineering;
    //   // this.setState({subSectors : subSectors})
    //   // switch(searchInURL.pub_sectors){
    //   //   case "Accountancy and financial management":
    //   //     return (this.setState({subSectorsConfig : config.custom.Accountancyandfinancialmanagement}));
    //   //   case "Civil and structural engineering":
    //   //     return (this.setState({subSectorsConfig : config.custom.Civilandstructuralengineering}));
    //   //   case "Public Service":
    //   //     return (this.setState({subSectorsConfig : config.custom.PublicServices}));
    //   //   case "Default" :
    //   //     return (this.setState({subSectorsConfig : config.custom.Accountancyandfinancialmanagement}));
    //   // }

    //   switch(searchInURL.pub_sectors){
    //     case "Accountancy and financial management":
    //       return (subsectorsConfig = config.custom.Accountancyandfinancialmanagement);
    //     case "Civil and structural engineering":
    //       return (subsectorsConfig =  config.custom.Civilandstructuralengineering);
    //     case "Public Service":
    //       return (subsectorsConfig =  config.custom.PublicServices);
    //     case "Default" :
    //       return (subsectorsConfig = config.custom.Accountancyandfinancialmanagement);
    //   }
    // }
    // Note: "certificate" and "yogaStyles" filters are not actually filtering anything by default.
    // Currently, if you want to use them, we need to manually configure them to be available
    // for search queries. Read more from extended data document:
    // https://www.sharetribe.com/docs/references/extended-data/#data-schema
    // let subsectorsConfig = this.state.subSectorsConfig;
    return {
      certificateFilter: {
        paramName: 'pub_certificate',
        options: certificateConfig.filter(c => !c.hideFromFilters),
      },
      mentorLanguageFilter: {
        paramName: 'pub_mentorLanguage',
        options: mentorLanguageConfig.filter(c => !c.hideFromFilters),
      },
      sectorsFilter: {
        paramName: 'pub_sectors',
        options: sectorsConfig.filter(c => !c.hideFromFilters),
      },
      levelFilter: {
        paramName: 'pub_jobroles',
        config: levelConfig,
      },
      // jobRoleFilter: {
      //   paramName: 'pub_subSectors',
      //   options: jobRolesConfig,
      // },
      // subsectorsFilter: {
      //   paramName: 'pub_subsectors',
      //   options: subsectorsConfig.filter(c => !c.hideFromFilters),
      // },
      mentorShiftFilter: {
        paramName: 'pub_mentorShift',
        options: mentorShiftConfig.filter(c => !c.hideFromFilters),
      },
      yogaStylesFilter: {
        paramName: 'pub_yogaStyles',
        options: yogaStylesConfig,
      },
      priceFilter: {
        paramName: 'price',
        config: priceFilterConfig,
      },
      keywordFilter: {
        paramName: 'keywords',
        config: keywordFilterConfig,
      },
    };
  }

  // Callback to determine if new search is needed
  // when map is moved by user or viewport has changed
  onMapMoveEnd(viewportBoundsChanged, data) {
    const { viewportBounds, viewportCenter } = data;

    const routes = routeConfiguration();
    const searchPagePath = pathByRouteName('SearchPage', routes);
    const currentPath =
      typeof window !== 'undefined' && window.location && window.location.pathname;

    // When using the ReusableMapContainer onMapMoveEnd can fire from other pages than SearchPage too
    const isSearchPage = currentPath === searchPagePath;

    // If mapSearch url param is given
    // or original location search is rendered once,
    // we start to react to "mapmoveend" events by generating new searches
    // (i.e. 'moveend' event in Mapbox and 'bounds_changed' in Google Maps)
    if (viewportBoundsChanged && isSearchPage) {
      const { history, location } = this.props;

      // parse query parameters, including a custom attribute named certificate
      const { address, bounds, mapSearch, ...rest } = parse(location.search, {
        latlng: ['origin'],
        latlngBounds: ['bounds'],
      });

      //const viewportMapCenter = SearchMap.getMapCenter(map);
      const originMaybe = config.sortSearchByDistance ? { origin: viewportCenter } : {};

      const searchParams = {
        address,
        ...originMaybe,
        bounds: viewportBounds,
        mapSearch: true,
        ...validFilterParams(rest, this.filters()),
      };

      history.push(createResourceLocatorString('SearchPage', routes, {}, searchParams));
    }
  }

  // Invoked when a modal is opened from a child component,
  // for example when a filter modal is opened in mobile view
  onOpenMobileModal() {
    this.setState({ isMobileModalOpen: true });
  }

  // Invoked when a modal is closed from a child component,
  // for example when a filter modal is opened in mobile view
  onCloseMobileModal() {
    this.setState({ isMobileModalOpen: false });
  }

  componentDidMount() {
    let { emailVerified, email } =
      (this.props.currentUser && this.props.currentUser.attributes) || {};
    console.log('4445 componentDidMount search page', this.props.currentUser);
    if (emailVerified !== undefined && !emailVerified) {
      this.setState({
        portalShow: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    let { currentUser: currentUserOld } = prevProps;
    let { currentUser } = this.props;

    if (!currentUserOld && currentUser) {
      if (!currentUser.attributes.emailVerified) {
        this.setState({
          portalShow: true,
        });
      }
    }
  }

  render() {
    const {
      intl,
      listings,
      location,
      mapListings,
      onManageDisableScrolling,
      pagination,
      scrollingDisabled,
      searchInProgress,
      searchListingsError,
      searchParams,
      activeListingId,
      onActivateListing,
      history,
      currentUser,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onResendVerificationEmail,
    } = this.props;
    console.log('listings in searchpage', listings);
    // eslint-disable-next-line no-unused-vars
    const { mapSearch, page, ...searchInURL } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    const filters = this.filters();

    // urlQueryParams doesn't contain page specific url params
    // like mapSearch, page or origin (origin depends on config.sortSearchByDistance)
    const urlQueryParams = pickSearchParamsOnly(searchInURL, filters);

    // Page transition might initially use values from previous search
    const urlQueryString = stringify(urlQueryParams);
    const paramsQueryString = stringify(pickSearchParamsOnly(searchParams, filters));
    const searchParamsAreInSync = urlQueryString === paramsQueryString;

    const validQueryParams = validURLParamsForExtendedData(searchInURL, filters);

    const isWindowDefined = typeof window !== 'undefined';
    const isMobileLayout = isWindowDefined && window.innerWidth < MODAL_BREAKPOINT;
    // const shouldShowSearchMap =
    //   !isMobileLayout || (isMobileLayout && this.state.isSearchMapOpenOnMobile);
    const shouldShowSearchMap = false;

    const onMapIconClick = () => {
      this.useLocationSearchBounds = true;
      this.setState({ isSearchMapOpenOnMobile: true });
    };

    const { address, bounds, origin } = searchInURL || {};
    const { title, description, schema } = createSearchResultSchema(listings, address, intl);

    // Set topbar class based on if a modal is open in
    // a child component
    const topbarClasses = this.state.isMobileModalOpen
      ? classNames(css.topbarBehindModal, css.topbar)
      : css.topbar;

    // N.B. openMobileMap button is sticky.
    // For some reason, stickyness doesn't work on Safari, if the element is <button>
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <Page
        scrollingDisabled={scrollingDisabled}
        description={description}
        title={title}
        schema={schema}
      >
        <TopbarContainer
          className={topbarClasses}
          currentPage="SearchPage"
          currentSearchParams={urlQueryParams}
        />
        <div className={css.container}>
          {currentUser && (
            <Portal
              isOpen={this.state.portalShow}
              onClose={() => this.setState({ portalShow: false })}
              onManageDisableScrolling={onManageDisableScrolling}
              user={currentUser}
              sendVerificationEmailInProgress={sendVerificationEmailInProgress}
              sendVerificationEmailError={sendVerificationEmailError}
              onResendVerificationEmail={onResendVerificationEmail}
            />
          )}
          <MainPanel
            urlQueryParams={validQueryParams}
            listings={listings}
            searchInProgress={searchInProgress}
            searchListingsError={searchListingsError}
            searchParamsAreInSync={searchParamsAreInSync}
            onActivateListing={onActivateListing}
            onManageDisableScrolling={onManageDisableScrolling}
            onOpenModal={this.onOpenMobileModal}
            onCloseModal={this.onCloseMobileModal}
            onMapIconClick={onMapIconClick}
            pagination={pagination}
            searchParamsForPagination={parse(location.search)}
            showAsModalMaxWidth={MODAL_BREAKPOINT}
            history={history}
            primaryFilters={{
              yogaStylesFilter: filters.yogaStylesFilter,
              mentorShiftFilter: filters.mentorShiftFilter,
              certificateFilter: filters.certificateFilter,
              mentorLanguageFilter: filters.mentorLanguageFilter,
              sectorsFilter: filters.sectorsFilter,
              levelFilter: filters.levelFilter,
              // jobRoleFilter: filters.jobRoleFilter,
              // subsectorsFilter: filters.subsectorsFilter,
              priceFilter: filters.priceFilter,
              keywordFilter: filters.keywordFilter,
            }}
          />
          {/* <ModalInMobile
            className={css.mapPanel}
            id="SearchPage.map"
            isModalOpenOnMobile={this.state.isSearchMapOpenOnMobile}
            onClose={() => this.setState({ isSearchMapOpenOnMobile: false })}
            showAsModalMaxWidth={MODAL_BREAKPOINT}
            onManageDisableScrolling={onManageDisableScrolling}
          >
            {<div className={css.mapWrapper}>
              {shouldShowSearchMap ? (
                <SearchMap
                  reusableContainerClassName={css.map}
                  activeListingId={activeListingId}
                  bounds={bounds}
                  center={origin}
                  isSearchMapOpenOnMobile={this.state.isSearchMapOpenOnMobile}
                  location={location}
                  listings={mapListings || []}
                  onMapMoveEnd={this.onMapMoveEnd}
                  onCloseAsModal={() => {
                    onManageDisableScrolling('SearchPage.map', false);
                  }}
                  messages={intl.messages}
                />
              ) : null}
                </div>}
          </ModalInMobile> */}
        </div>
      </Page>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

SearchPageComponent.defaultProps = {
  listings: [],
  mapListings: [],
  pagination: null,
  searchListingsError: null,
  searchParams: {},
  tab: 'listings',
  certificateConfig: config.custom.certificate,
  sectorsConfig: config.custom.sectors,
  mentorLanguageConfig: config.custom.mentorLanguages,
  mentorShiftConfig: config.custom.mentorShifts,
  yogaStylesConfig: config.custom.yogaStyles,
  priceFilterConfig: config.custom.priceFilterConfig,
  keywordFilterConfig: config.custom.keywordFilterConfig,
  levelConfig: {
    public: config.custom.publicRoles.filter(x => !x.hideFromFilters),
    private: config.custom.nonPublicRoles.filter(x => !x.hideFromFilters),
  },
  activeListingId: null,
};

SearchPageComponent.propTypes = {
  listings: array,
  mapListings: array,
  onActivateListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onSearchMapListings: func.isRequired,
  pagination: propTypes.pagination,
  scrollingDisabled: bool.isRequired,
  searchInProgress: bool.isRequired,
  searchListingsError: propTypes.error,
  searchParams: object,
  tab: oneOf(['filters', 'listings', 'map']).isRequired,
  certificateConfig: array,
  sectorsConfig: array,
  mentorLanguageConfig: array,
  mentorShiftConfig: array,
  yogaStylesConfig: array,
  levelConfig: object,
  priceFilterConfig: shape({
    min: number.isRequired,
    max: number.isRequired,
    step: number.isRequired,
  }),

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    searchMapListingIds,
    activeListingId,
  } = state.SearchPage;
  const { currentUser, sendVerificationEmailInProgress, sendVerificationEmailError } = state.user;
  console.log('currentPageResultIds', currentPageResultIds);
  const pageListings = getListingsById(state, currentPageResultIds);
  const mapListings = getListingsById(
    state,
    unionWith(currentPageResultIds, searchMapListingIds, (id1, id2) => id1.uuid === id2.uuid)
  );

  return {
    listings: pageListings,
    mapListings,
    pagination,
    scrollingDisabled: isScrollingDisabled(state),
    searchInProgress,
    searchListingsError,
    searchParams,
    activeListingId,
    currentUser,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onSearchMapListings: searchParams => dispatch(searchMapListings(searchParams)),
  onActivateListing: listingId => dispatch(setActiveListing(listingId)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const SearchPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(SearchPageComponent);

SearchPage.loadData = (params, search) => {
  const queryParams = parse(search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });
  const { page = 1, address, origin, ...rest } = queryParams;
  const originMaybe = config.sortSearchByDistance && origin ? { origin } : {};
  return searchListings({
    ...rest,
    ...originMaybe,
    page,
    perPage: RESULT_PAGE_SIZE,
    include: ['author', 'images'],
    'fields.listing': ['title', 'geolocation', 'price', 'publicData'],
    'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
    'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
    'limit.images': 1,
  });
};

export default SearchPage;
