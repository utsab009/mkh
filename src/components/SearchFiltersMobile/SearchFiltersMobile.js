import React, { Component } from 'react';
import { object, string, bool, number, func, shape, array } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import {
  ModalInMobile,
  Button,
  KeywordFilter,
  PriceFilter,
  SelectSingleFilter,
  SelectMultipleFilter,
} from '../../components';
import { propTypes } from '../../util/types';
import css from './SearchFiltersMobile.css';

const RADIX = 10;

class SearchFiltersMobileComponent extends Component {
  constructor(props) {
    super(props);

    this.openFilters = this.openFilters.bind(this);
    this.cancelFilters = this.cancelFilters.bind(this);
    this.closeFilters = this.closeFilters.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.handleSelectSingle = this.handleSelectSingle.bind(this);
    this.handleSelectMultiple = this.handleSelectMultiple.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleKeyword = this.handleKeyword.bind(this);
    this.initialValue = this.initialValue.bind(this);
    this.initialValues = this.initialValues.bind(this);
    this.initialPriceRangeValue = this.initialPriceRangeValue.bind(this);

    this.state = {
      isFiltersOpenOnMobile: false,
      initialQueryParams: null,
      sector: props.sectorsFilter ? this.initialValue(props.sectorsFilter.paramName) : null,
    };
  }

  // Open filters modal, set the initial parameters to current ones
  openFilters() {
    const { onOpenModal, urlQueryParams } = this.props;
    onOpenModal();
    this.setState({ isFiltersOpenOnMobile: true, initialQueryParams: urlQueryParams });
  }

  // Close the filters by clicking cancel, revert to the initial params
  cancelFilters() {
    const { history, onCloseModal } = this.props;

    history.push(
      createResourceLocatorString(
        'SearchPage',
        routeConfiguration(),
        {},
        this.state.initialQueryParams
      )
    );
    onCloseModal();
    this.setState({ isFiltersOpenOnMobile: false, initialQueryParams: null });
  }

  // Close the filter modal
  closeFilters() {
    this.props.onCloseModal();
    this.setState({ isFiltersOpenOnMobile: false });
  }

  handleSelectSingle(urlParam, option) {
    const { urlQueryParams, history } = this.props;

    // query parameters after selecting the option
    // if no option is passed, clear the selection for the filter
    let queryParams = urlQueryParams;
    if (urlParam === 'pub_sectors') {
      this.setState({ sector: option });
      queryParams = omit(queryParams, 'pub_jobroles');
    }

    queryParams = option ? { ...queryParams, [urlParam]: option } : omit(queryParams, urlParam);
    // const queryParams = option
    //   ? { ...urlQueryParams, [urlParam]: option }
    //   : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  handleSelectMultiple(urlParam, options) {
    const { urlQueryParams, history } = this.props;

    const queryParams =
      options && options.length > 0
        ? { ...urlQueryParams, [urlParam]: options.join(',') }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  handlePrice(urlParam, range) {
    const { urlQueryParams, history } = this.props;
    const { minPrice, maxPrice } = range || {};
    const queryParams =
      minPrice != null && maxPrice != null
        ? { ...urlQueryParams, [urlParam]: `${minPrice},${maxPrice}` }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  handleKeyword(urlParam, keywords) {
    const { urlQueryParams, history } = this.props;
    const queryParams = urlParam
      ? { ...urlQueryParams, [urlParam]: keywords }
      : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  // Reset all filter query parameters
  resetAll(e) {
    const { urlQueryParams, history, filterParamNames } = this.props;

    const queryParams = omit(urlQueryParams, filterParamNames);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));

    // blur event target if event is passed
    if (e && e.currentTarget) {
      e.currentTarget.blur();
    }
  }

  // resolve initial value for a single value filter
  initialValue(paramName) {
    return this.props.urlQueryParams[paramName];
  }

  // resolve initial values for a multi value filter
  initialValues(paramName) {
    const urlQueryParams = this.props.urlQueryParams;
    return !!urlQueryParams[paramName] ? urlQueryParams[paramName].split(',') : [];
  }

  initialPriceRangeValue(paramName) {
    const urlQueryParams = this.props.urlQueryParams;
    const price = urlQueryParams[paramName];
    const valuesFromParams = !!price ? price.split(',').map(v => Number.parseInt(v, RADIX)) : [];

    return !!price && valuesFromParams.length === 2
      ? {
          minPrice: valuesFromParams[0],
          maxPrice: valuesFromParams[1],
        }
      : null;
  }

  render() {
    const {
      rootClassName,
      className,
      listingsAreLoaded,
      resultsCount,
      searchInProgress,
      showAsModalMaxWidth,
      onMapIconClick,
      onManageDisableScrolling,
      selectedFiltersCount,
      certificateFilter,
      sectorsFilter,
      levelFilter,
      mentorLanguageFilter,
      mentorShiftFilter,
      yogaStylesFilter,
      priceFilter,
      keywordFilter,
      intl,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);

    const resultsFound = (
      <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
    );
    const noResults = <FormattedMessage id="SearchFilters.noResultsMobile" />;
    const loadingResults = <FormattedMessage id="SearchFilters.loadingResultsMobile" />;
    const filtersHeading = intl.formatMessage({ id: 'SearchFiltersMobile.heading' });
    const modalCloseButtonMessage = intl.formatMessage({ id: 'SearchFiltersMobile.cancel' });

    const showListingsLabel = intl.formatMessage(
      { id: 'SearchFiltersMobile.showListings' },
      { count: resultsCount }
    );

    const filtersButtonClasses =
      selectedFiltersCount > 0 ? css.filtersButtonSelected : css.filtersButton;

    const certificateLabel = intl.formatMessage({
      id: 'SearchFiltersMobile.certificateLabel',
    });

    const initialcertificate = certificateFilter
      ? this.initialValue(certificateFilter.paramName)
      : null;

    const certificateFilterElement = certificateFilter ? (
      <SelectSingleFilter
        urlParam={certificateFilter.paramName}
        label={certificateLabel}
        onSelect={this.handleSelectSingle}
        liveEdit
        options={certificateFilter.options}
        initialValue={initialcertificate}
        intl={intl}
      />
    ) : null;

    const mentorLanguageLabel = intl.formatMessage({
      id: 'SearchFiltersMobile.mentorLanguageLabel',
    });

    const sectorsLabel = intl.formatMessage({
      id: 'SearchFiltersMobile.sectorsLabel',
    });

    const initialmentorLanguage = mentorLanguageFilter
      ? this.initialValues(mentorLanguageFilter.paramName)
      : null;

    const initialsectors = sectorsFilter ? this.initialValue(sectorsFilter.paramName) : null;

    const sectorsFilterElement = sectorsFilter ? (
      <SelectSingleFilter
        id={'SearchFilters.sectorsFilter'}
        name="sector"
        urlParam={sectorsFilter.paramName}
        label={sectorsLabel}
        onSelect={this.handleSelectSingle}
        // liveEdit
        showAsPopup
        options={sectorsFilter.options}
        initialValue={initialsectors}
        intl={intl}
      />
    ) : null;

    const initialLevel = levelFilter ? this.initialValue(levelFilter.paramName) : null;

    const levelLabel = intl.formatMessage({
      id: 'SearchFilters.levelLabel',
    });

    console.log('levelFilter', levelFilter, this.state);
    const levelFilterElement =
      levelFilter && this.state.sector ? (
        <SelectSingleFilter
          id={'SearchFilters.levelFilter'}
          name="level"
          urlParam={levelFilter.paramName}
          label={levelLabel}
          onSelect={this.handleSelectSingle}
          // liveEdit
          showAsPopup
          options={
            this.state.sector === 'Public Service'
              ? levelFilter.config.public
              : levelFilter.config.private
          }
          initialValue={initialLevel}
          intl={intl}
        />
      ) : null;

    // const mentorLanguageFilterElement = mentorLanguageFilter ? (
    //   <SelectSingleFilter
    //     urlParam={mentorLanguageFilter.paramName}
    //     label={mentorLanguageLabel}
    //     onSelect={this.handleSelectSingle}
    //     liveEdit
    //     options={mentorLanguageFilter.options}
    //     initialValue={initialmentorLanguage}
    //     intl={intl}
    //   />
    // ) : null;

    const mentorLanguageFilterElement = mentorLanguageFilter ? (
      <SelectMultipleFilter
        id={'SearchFilters.mentorLanguageFilter'}
        name="mentorLanguage"
        urlParam={mentorLanguageFilter.paramName}
        label={mentorLanguageLabel}
        onSubmit={this.handleSelectMultiple}
        liveEdit
        // showAsPopup
        options={mentorLanguageFilter.options}
        initialValues={initialmentorLanguage}
      />
    ) : null;

    const mentorShiftLabel = intl.formatMessage({ id: 'SearchFiltersMobile.mentorShiftLabel' });

    const initialmentorShift = this.initialValues(mentorShiftFilter.paramName);

    const mentorShiftFilterElement = mentorShiftFilter ? (
      <SelectMultipleFilter
        id="SearchFiltersMobile.mentorShiftFilter"
        name="mentorShift"
        urlParam={mentorShiftFilter.paramName}
        label={mentorShiftLabel}
        onSubmit={this.handleSelectMultiple}
        liveEdit
        options={mentorShiftFilter.options}
        initialValues={initialmentorShift}
      />
    ) : null;

    const yogaStylesLabel = intl.formatMessage({ id: 'SearchFiltersMobile.yogaStylesLabel' });

    const initialyogaStyles = this.initialValues(yogaStylesFilter.paramName);

    const yogaStylesFilterElement = yogaStylesFilter ? (
      <SelectMultipleFilter
        id="SearchFiltersMobile.yogaStylesFilter"
        name="yogaStyles"
        urlParam={yogaStylesFilter.paramName}
        label={yogaStylesLabel}
        onSubmit={this.handleSelectMultiple}
        liveEdit
        options={yogaStylesFilter.options}
        initialValues={initialyogaStyles}
      />
    ) : null;

    const initialPriceRange = this.initialPriceRangeValue(priceFilter.paramName);

    const priceFilterElement = priceFilter ? (
      <PriceFilter
        id="SearchFiltersMobile.priceFilter"
        urlParam={priceFilter.paramName}
        onSubmit={this.handlePrice}
        liveEdit
        {...priceFilter.config}
        initialValues={initialPriceRange}
      />
    ) : null;

    const initialKeyword = this.initialValue(keywordFilter.paramName);
    const keywordLabel = intl.formatMessage({
      id: 'SearchFiltersMobile.keywordLabel',
    });
    const keywordFilterElement =
      keywordFilter && keywordFilter.config.active ? (
        <KeywordFilter
          id={'SearchFiltersMobile.keywordFilter'}
          name="keyword"
          urlParam={keywordFilter.paramName}
          label={keywordLabel}
          onSubmit={this.handleKeyword}
          liveEdit
          showAsPopup={false}
          initialValues={initialKeyword}
        />
      ) : null;

    return (
      <div className={classes}>
        <div className={css.searchResultSummary}>
          {listingsAreLoaded && resultsCount > 0 ? resultsFound : null}
          {listingsAreLoaded && resultsCount === 0 ? noResults : null}
          {searchInProgress ? loadingResults : null}
        </div>
        <div className={css.buttons}>
          <Button rootClassName={filtersButtonClasses} onClick={this.openFilters}>
            <FormattedMessage id="SearchFilters.filtersButtonLabel" className={css.mapIconText} />
          </Button>
          {/* <div className={css.mapIcon} onClick={onMapIconClick}>
            <FormattedMessage id="SearchFilters.openMapView" className={css.mapIconText} />
          </div> */}
        </div>
        <ModalInMobile
          id="SearchFiltersMobile.filters"
          isModalOpenOnMobile={this.state.isFiltersOpenOnMobile}
          onClose={this.cancelFilters}
          showAsModalMaxWidth={showAsModalMaxWidth}
          onManageDisableScrolling={onManageDisableScrolling}
          containerClassName={css.modalContainer}
          closeButtonMessage={modalCloseButtonMessage}
        >
          <div className={css.modalHeadingWrapper}>
            <span className={css.modalHeading}>{filtersHeading}</span>
            <button className={css.resetAllButton} onClick={e => this.resetAll(e)}>
              <FormattedMessage id={'SearchFiltersMobile.resetAll'} />
            </button>
          </div>
          {this.state.isFiltersOpenOnMobile ? (
            <div className={css.filtersWrapper}>
              {/*keywordFilterElement*/}
              {/*yogaStylesFilterElement*/}
              {/*mentorShiftFilterElement*/}
              {/*certificateFilterElement*/}
              {sectorsFilterElement}
              {levelFilterElement}
              {mentorLanguageFilterElement}
              {priceFilterElement}
            </div>
          ) : null}

          <div className={css.showListingsContainer}>
            <Button className={css.showListingsButton} onClick={this.closeFilters}>
              {showListingsLabel}
            </Button>
          </div>
        </ModalInMobile>
      </div>
    );
  }
}

SearchFiltersMobileComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
  selectedFiltersCount: 0,
  filterParamNames: [],
  certificateFilter: null,
  yogaStylesFilter: null,
  priceFilter: null,
};

SearchFiltersMobileComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  showAsModalMaxWidth: number.isRequired,
  onMapIconClick: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onOpenModal: func.isRequired,
  onCloseModal: func.isRequired,
  selectedFiltersCount: number,
  filterParamNames: array,
  certificateFilter: propTypes.filterConfig,
  yogaStylesFilter: propTypes.filterConfig,
  priceFilter: propTypes.filterConfig,

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const SearchFiltersMobile = injectIntl(withRouter(SearchFiltersMobileComponent));

export default SearchFiltersMobile;
