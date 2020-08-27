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
  FieldTextInput,
  Form,
  PrimaryButton,
} from '../../components';
import { propTypes } from '../../util/types';
import css from './SearchFiltersMobile.css';
import Select from 'react-dropdown-select';
import Modal from '../Modal/Modal';
import { Form as FinalForm } from 'react-final-form';
import Axios from 'axios';
import arrayMutators from 'final-form-arrays';
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
      subsectors: this.initialValue('pub_subsectors') || null,
      isMailSectorModalOpen: false,
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
    // if (urlParam === 'pub_sectors') {
    //   this.setState({ sector: option });
    //   queryParams = omit(queryParams, 'pub_jobroles');
    // }

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
      urlQueryParams,
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

    const initialsectors = sectorsFilter ? this.initialValues(sectorsFilter.paramName) : null;

    const sectorsFilterElement =
      sectorsFilter && this.state.subsectors !== 'Generalist' ? (
        <SelectMultipleFilter
          id={'SearchFilters.sectorsFilter'}
          name="sector"
          urlParam={sectorsFilter.paramName}
          label={sectorsLabel}
          onSubmit={this.handleSelectMultiple}
          // liveEdit
          showAsPopup
          options={sectorsFilter.options}
          initialValues={initialsectors}
          intl={intl}
        />
      ) : null;

    const initialLevel = levelFilter ? this.initialValues(levelFilter.paramName) : null;

    const levelLabel = intl.formatMessage({
      id: 'SearchFilters.levelLabel',
    });

    console.log('levelFilter', levelFilter, this.state);
    const levelFilterElement = levelFilter ? (
      <SelectMultipleFilter
        id={'SearchFilters.levelFilter'}
        name="level"
        urlParam={levelFilter.paramName}
        label={levelLabel}
        onSubmit={this.handleSelectMultiple}
        liveEdit
        // showAsPopup
        options={
          this.state.subsectors === 'Generalist'
            ? levelFilter.config.public
            : levelFilter.config.private
        }
        initialValues={initialLevel}
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
    const hasNoResult = listingsAreLoaded && resultsCount === 0;

    const showRelatedSearchError = () => {
      let errors = Object.keys(urlQueryParams);
      let error = [];

      if (errors.includes('pub_subsectors') && errors.length === 1) {
        error.push(
          'Sorry, as yet we don’t have mentors for this role but check back. We will! Maybe you could be one in the future?'
        );
      } else {
        error.push(
          'Sorry, as yet we don’t have mentors under this criteria but check back. We will! Maybe you could be one in the future?'
        );
      }
      // let errors = Object.keys(this.props.urlQueryParams);
      // let error = [];

      // if (errors.includes('pub_subsectors')) {
      //   error.push(
      //     'Sorry, as yet we don’t have mentors for this role but check back. We will! Maybe you could be one in the future?'
      //   );
      // }
      // if (errors.includes('pub_sectors')) {
      //   error.push(
      //     'Sorry, as yet we don’t have mentors for this role in this specific Sector but check back. We will! Maybe you could be one in the future?'
      //   );
      // }
      // if (errors.includes('pub_jobroles')) {
      //   error.push(
      //     'Sorry, as yet we don’t have mentors for this role at this specific level but check back. We will! Maybe you could check a different level for now?'
      //   );
      // }
      // if (errors.includes('pub_mentorLanguage')) {
      //   error.push(
      //     'Sorry, as yet we don’t have a mentor for this role who speaks your requested language/s. Please try another language that would be suitable'
      //   );
      // }
      // if (errors.includes('price')) {
      //   error.push('I am sorry there is no Mentors for this role in the price range you picked');
      // }

      return error;
    };

    return (
      <div className={classes}>
        <div className={css.buttons}>
          <Button rootClassName={filtersButtonClasses} onClick={this.openFilters}>
            <FormattedMessage id="SearchFilters.filtersButtonLabel" className={css.mapIconText} />
          </Button>
          {/* <div className={css.mapIcon} onClick={onMapIconClick}>
            <FormattedMessage id="SearchFilters.openMapView" className={css.mapIconText} />
          </div> */}
        </div>
        <div className={css.searchResultSummary}>
          {hasNoResult && urlQueryParams.pub_sectors && (
            <p className={css.smallText}>
              If your sector is not listed,{' '}
              <span
                className={css.btnModSl}
                onClick={e => {
                  e.preventDefault();
                  this.setState({ isMailSectorModalOpen: true });
                }}
              >
                click here
              </span>{' '}
              and tell us so we can include it for you.
            </p>
          )}
          {this.state.isMailSectorModalOpen ? (
            <Modal
              id="SearchFilters"
              isOpen={this.state.isMailSectorModalOpen}
              onClose={() => this.setState({ isMailSectorModalOpen: false })}
              onManageDisableScrolling={() => {}}
              // containerClassName={css.modalContainer}
              className={css.updateModalcol}
            >
              <FinalForm
                // {...restOfprops}
                onSubmit={test => {
                  console.log('test values: ', test);
                }}
                mutators={{
                  ...arrayMutators,
                }}
                render={fieldRenderProps => {
                  const { hSubmit, values } = fieldRenderProps;

                  const classes = classNames(rootClassName || css.root, className);

                  return (
                    <Form
                      id={'sendmsg'}
                      className={`${classes} ${css.updatePnl}`}
                      onSubmit={values => {
                        console.log('values: ', values);
                      }}
                    >
                      <div className={css.formg}>
                        <FieldTextInput
                          id="emailId"
                          name="emailId"
                          type="text"
                          label={'Email ID'}
                          placeholder={'Enter your email ID'}
                          // validate={composeValidators(required(descriptionRequiredMessage))}
                        />
                      </div>
                      <div className={css.formg}>
                        <FieldTextInput
                          id="msg"
                          name="msg"
                          type="textarea"
                          label={'Message'}
                          placeholder={'Enter your message here'}
                          // validate={composeValidators(required(descriptionRequiredMessage))}
                        />
                      </div>

                      <div className={css.submitButtonFG}>
                        <PrimaryButton
                          type="button"
                          inProgress={false}
                          disabled={false}
                          onClick={e => {
                            console.log('click values: ', e, values);
                            Axios.get(
                              // 'http://localhost:3001/extra/email_send?message=' +
                              'https://mentorkh.herokuapp.com/extra/email_send?message=' +
                                values.msg +
                                '&email=' +
                                values.emailId
                            )
                              .then(response => {
                                console.log('response in submit', response);
                                // history.push(
                                //   createResourceLocatorString(
                                //     'LandingPage',
                                //     routes,
                                //     // { keywords: 'php' },
                                //     {},
                                //     // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
                                //     {}
                                //   )
                                // );
                              })
                              .catch(e => {
                                console.log('e in submit', e);
                                // history.push(
                                //   createResourceLocatorString(
                                //     'LandingPage',
                                //     routes,
                                //     // { keywords: 'php' },
                                //     {},
                                //     // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
                                //     {}
                                //   )
                                // );
                              });
                            this.setState({ isMailSectorModalOpen: false });
                          }}
                        >
                          Send Mail
                        </PrimaryButton>
                      </div>
                    </Form>
                  );
                }}
              />
            </Modal>
          ) : null}
          {listingsAreLoaded && resultsCount > 0 ? resultsFound : null}
          {hasNoResult
            ? showRelatedSearchError().map((item, i) => (
                <div className={css.noSearchResults} key={i}>
                  {item}
                </div>
              ))
            : null}
          {searchInProgress ? loadingResults : null}
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
