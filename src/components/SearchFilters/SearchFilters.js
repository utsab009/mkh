import React, { Component } from 'react';
import { compose } from 'redux';
import { object, string, bool, number, func, shape } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import {
  SelectSingleFilter,
  SelectMultipleFilter,
  PriceFilter,
  KeywordFilter,
  FieldTextInput,
  Form,
  PrimaryButton,
} from '../../components';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { propTypes } from '../../util/types';
import css from './SearchFilters.css';
import Modal from '../Modal/Modal';
import { Form as FinalForm } from 'react-final-form';
import Axios from 'axios';
import arrayMutators from 'final-form-arrays';
import config from '../../config';
// Dropdown container can have a positional offset (in pixels)
const FILTER_DROPDOWN_OFFSET = -14;
const RADIX = 10;

// resolve initial value for a single value filter
const initialValue = (queryParams, paramName) => {
  return queryParams[paramName];
};

// resolve initial values for a multi value filter
const initialValues = (queryParams, paramName) => {
  return !!queryParams[paramName] ? queryParams[paramName].split(',') : [];
};

const initialPriceRangeValue = (queryParams, paramName) => {
  const price = queryParams[paramName];
  const valuesFromParams = !!price ? price.split(',').map(v => Number.parseInt(v, RADIX)) : [];

  return !!price && valuesFromParams.length === 2
    ? {
        minPrice: valuesFromParams[0],
        maxPrice: valuesFromParams[1],
      }
    : null;
};

// const SearchFiltersComponent = props =>

class SearchFiltersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subsectors: initialValue(props.urlQueryParams, 'pub_subsectors') || null,
      isMailSectorModalOpen: false,
    };
  }

  render() {
    const {
      rootClassName,
      className,
      urlQueryParams,
      listingsAreLoaded,
      resultsCount,
      searchInProgress,
      certificateFilter,
      sectorsFilter,
      levelFilter,
      jobRoleFilter,
      // subsectorsFilter,
      mentorLanguageFilter,
      mentorShiftFilter,
      yogaStylesFilter,
      priceFilter,
      keywordFilter,
      isSearchFiltersPanelOpen,
      toggleSearchFiltersPanel,
      searchFiltersPanelSelectedCount,
      history,
      intl,
      onManageDisableScrolling,
    } = this.props;
    console.log('props in searchfilters', this.props);

    const hasNoResult = listingsAreLoaded && resultsCount === 0;
    const classes = classNames(
      rootClassName || css.root,
      { [css.longInfo]: hasNoResult },
      className
    );

    const certificateLabel = intl.formatMessage({
      id: 'SearchFilters.certificateLabel',
    });

    const mentorLanguageLabel = intl.formatMessage({
      id: 'SearchFilters.mentorLanguageLabel',
    });

    const jobRoleLabel = intl.formatMessage({
      id: 'SearchFilters.jobRoleLabel',
    });

    const sectorsLabel = intl.formatMessage({
      id: 'SearchFilters.sectorsLabel',
    });

    const levelLabel = intl.formatMessage({
      id: 'SearchFilters.levelLabel',
    });

    // const subsectorsLabel = intl.formatMessage({
    //   id: 'SearchFilters.subsectorsLabel',
    // });

    const mentorShiftLabel = intl.formatMessage({
      id: 'SearchFilters.mentorShiftLabel',
    });

    const yogaStylesLabel = intl.formatMessage({
      id: 'SearchFilters.yogaStylesLabel',
    });

    const keywordLabel = intl.formatMessage({
      id: 'SearchFilters.keywordLabel',
    });

    const initialyogaStyles = yogaStylesFilter
      ? initialValues(urlQueryParams, yogaStylesFilter.paramName)
      : null;

    const initialmentorShift = mentorShiftFilter
      ? initialValues(urlQueryParams, mentorShiftFilter.paramName)
      : null;

    const initialcertificate = certificateFilter
      ? initialValue(urlQueryParams, certificateFilter.paramName)
      : null;

    const initialmentorLanguage = mentorLanguageFilter
      ? initialValues(urlQueryParams, mentorLanguageFilter.paramName)
      : null;

    const initialJobRole = jobRoleFilter
      ? initialValue(urlQueryParams, jobRoleFilter.paramName)
      : null;

    const initialsectors = sectorsFilter
      ? initialValues(urlQueryParams, sectorsFilter.paramName)
      : null;

    const initialLevel = levelFilter ? initialValues(urlQueryParams, levelFilter.paramName) : null;

    const isGrade = this.state.subsectors
      ? config.custom
          .rolesConfigData()
          .map(item => item.key === this.state.subsectors && item.isGrade)
          .filter(item => !!item)[0]
      : null;

    // console.log('isGrade: ', isGrade);

    // const initialsubsectors = subsectorsFilter
    //   ? initialValue(urlQueryParams, subsectorsFilter.paramName)
    //   : null;

    const initialPriceRange = priceFilter
      ? initialPriceRangeValue(urlQueryParams, priceFilter.paramName)
      : null;

    const initialKeyword = keywordFilter
      ? initialValue(urlQueryParams, keywordFilter.paramName)
      : null;

    const handleSelectOptions = (urlParam, options) => {
      const queryParams =
        options && options.length > 0
          ? { ...urlQueryParams, [urlParam]: options.join(',') }
          : omit(urlQueryParams, urlParam);
      console.log(
        'test: ',
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams)
      );

      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams)
      );
    };

    const handleSelectOption = (urlParam, option) => {
      // query parameters after selecting the option
      // if no option is passed, clear the selection for the filter
      let queryParams = urlQueryParams;
      // if (urlParam === 'pub_sectors') {
      //   this.setState({ sector: option });
      //   queryParams = omit(queryParams, 'pub_jobroles');
      // }

      queryParams = option ? { ...queryParams, [urlParam]: option } : omit(queryParams, urlParam);

      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams)
      );
    };

    const handlePrice = (urlParam, range) => {
      const { minPrice, maxPrice } = range || {};
      const queryParams =
        minPrice != null && maxPrice != null
          ? { ...urlQueryParams, [urlParam]: `${minPrice},${maxPrice}` }
          : omit(urlQueryParams, urlParam);

      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams)
      );
    };

    const handleKeyword = (urlParam, values) => {
      const queryParams = values
        ? { ...urlQueryParams, [urlParam]: values }
        : omit(urlQueryParams, urlParam);

      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams)
      );
    };

    const certificateFilterElement = certificateFilter ? (
      <SelectSingleFilter
        urlParam={certificateFilter.paramName}
        label={certificateLabel}
        onSelect={handleSelectOption}
        showAsPopup
        options={certificateFilter.options}
        initialValue={initialcertificate}
        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      />
    ) : null;

    // const mentorLanguageFilterElement = mentorLanguageFilter ? (
    //   <SelectSingleFilter
    //     urlParam={mentorLanguageFilter.paramName}
    //     label={mentorLanguageLabel}
    //     onSelect={handleSelectOption}
    //     showAsPopup
    //     options={mentorLanguageFilter.options}
    //     initialValue={initialmentorLanguage}
    //     contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    //   />
    // ) : null;
    console.log(
      'initialmentorlanguage',
      initialmentorLanguage,
      'initialmentorshift',
      initialmentorShift
    );
    const mentorLanguageFilterElement = mentorLanguageFilter ? (
      <SelectMultipleFilter
        id={'SearchFilters.mentorLanguageFilter'}
        name="mentorLanguage"
        urlParam={mentorLanguageFilter.paramName}
        label={mentorLanguageLabel}
        onSubmit={handleSelectOptions}
        showAsPopup
        options={mentorLanguageFilter.options}
        initialValues={initialmentorLanguage}
        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      />
    ) : null;

    // const jobRoleFilterElement = jobRoleFilter ? (
    //   <SelectSingleFilter
    //     urlParam={jobRoleFilter.paramName}
    //     label={jobRoleLabel}
    //     onSelect={handleSelectOption}
    //     showAsPopup
    //     options={jobRoleFilter.options}
    //     initialValue={initialJobRole}
    //     contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    //   />
    // ) : null;

    const sectorsFilterElement =
      !isGrade && sectorsFilter && this.state.subsectors !== 'Generalist' ? (
        <SelectMultipleFilter
          id={'SearchFilters.sectors'}
          name="sectors"
          urlParam={sectorsFilter.paramName}
          label={sectorsLabel}
          onSubmit={handleSelectOptions}
          showAsPopup
          options={sectorsFilter.options}
          initialValues={initialsectors}
          contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
        />
      ) : null;

    const levelFilterElement =
      !isGrade && levelFilter ? (
        <SelectMultipleFilter
          id={'SearchFilters.jobRoles'}
          name="jobRoles"
          urlParam={levelFilter.paramName}
          label={levelLabel}
          onSubmit={handleSelectOptions}
          showAsPopup
          options={
            this.state.subsectors === 'Generalist'
              ? levelFilter.config.public
              : levelFilter.config.private
          }
          initialValues={initialLevel}
          contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
        />
      ) : null;

    // const subsectorsFilterElement = subsectorsFilter ? (
    //   <SelectSingleFilter
    //     urlParam={subsectorsFilter.paramName}
    //     label={subsectorsLabel}
    //     onSelect={handleSelectOption}
    //     showAsPopup
    //     options={subsectorsFilter.options}
    //     initialValue={initialsubsectors}
    //     contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    //   />
    // ) : null;

    const mentorShiftFilterElement = mentorShiftFilter ? (
      <SelectMultipleFilter
        id={'SearchFilters.mentorShiftFilter'}
        name="mentorShift"
        urlParam={mentorShiftFilter.paramName}
        label={mentorShiftLabel}
        onSubmit={handleSelectOptions}
        showAsPopup
        options={mentorShiftFilter.options}
        initialValues={initialmentorShift}
        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      />
    ) : null;

    const yogaStylesFilterElement = yogaStylesFilter ? (
      <SelectMultipleFilter
        id={'SearchFilters.yogaStylesFilter'}
        name="yogaStyles"
        urlParam={yogaStylesFilter.paramName}
        label={yogaStylesLabel}
        onSubmit={handleSelectOptions}
        showAsPopup
        options={yogaStylesFilter.options}
        initialValues={initialyogaStyles}
        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      />
    ) : null;

    const priceFilterElement = priceFilter ? (
      <PriceFilter
        id="SearchFilters.priceFilter"
        urlParam={priceFilter.paramName}
        onSubmit={handlePrice}
        showAsPopup
        {...priceFilter.config}
        initialValues={initialPriceRange}
        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      />
    ) : null;

    const keywordFilterElement =
      keywordFilter && keywordFilter.config.active ? (
        <KeywordFilter
          id={'SearchFilters.keywordFilter'}
          name="keyword"
          urlParam={keywordFilter.paramName}
          label={keywordLabel}
          onSubmit={handleKeyword}
          showAsPopup
          initialValues={initialKeyword}
          contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
        />
      ) : null;

    const toggleSearchFiltersPanelButtonClasses =
      isSearchFiltersPanelOpen || searchFiltersPanelSelectedCount > 0
        ? css.searchFiltersPanelOpen
        : css.searchFiltersPanelClosed;
    const toggleSearchFiltersPanelButton = toggleSearchFiltersPanel ? (
      <button
        className={toggleSearchFiltersPanelButtonClasses}
        onClick={() => {
          toggleSearchFiltersPanel(!isSearchFiltersPanelOpen);
        }}
      >
        <FormattedMessage
          id="SearchFilters.moreFiltersButton"
          values={{ count: searchFiltersPanelSelectedCount }}
        />
      </button>
    ) : null;

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

    console.log({ urlQueryParams });
    console.log('urlQueryParams', showRelatedSearchError());
    return (
      <div className={classes}>
        <p className={css.smallText}>
          If your Job Role or Government Position Classification is not appearing,
          <span
            className={css.btnModSl}
            onClick={e => {
              e.preventDefault();
              this.setState({ isMailSectorModalOpen: true });
            }}
          >
            &nbsp;click here &nbsp;
          </span>
          and tell us so we can include it for you.
        </p>
        {this.state.isMailSectorModalOpen ? (
          <Modal
            id="EditAvailabilityPlan"
            isOpen={this.state.isMailSectorModalOpen}
            onClose={() => this.setState({ isMailSectorModalOpen: false })}
            onManageDisableScrolling={onManageDisableScrolling}
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
                        label={'E-mail Address'}
                        placeholder={'Enter your E-mail Address'}
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
                            })
                            .catch(e => {
                              console.log('e in submit', e);
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

        <div className={css.filterLabel}>
          <FormattedMessage id="SearchFilters.filterlabel" />
        </div>
        <div className={css.filters}>
          {/*yogaStylesFilterElement*/}
          {/*certificateFilterElement*/}
          {/* {jobRoleFilterElement} */}
          {sectorsFilterElement}
          {levelFilterElement}
          {mentorLanguageFilterElement}
          {/* {mentorShiftFilterElement} */}
          {priceFilterElement}
          {/*keywordFilterElement*/}
          {toggleSearchFiltersPanelButton}
        </div>
        {listingsAreLoaded && resultsCount > 0 ? (
          <div className={css.searchResultSummary}>
            <span className={css.resultsFound}>
              <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
            </span>
          </div>
        ) : null}
        {/* {hasNoResult ? (
          <div className={css.noSearchResults}>
            <FormattedMessage id="SearchFilters.noResults" />
          </div>
        ) : null} */}
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
        {hasNoResult && showRelatedSearchError().length > 0
          ? showRelatedSearchError().map((item, i) => (
              <div className={css.noSearchResults} key={i}>
                {item}
              </div>
            ))
          : null}
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
                        label={'E-mail Address'}
                        placeholder={'Enter your E-mail Address'}
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
        {/* <ul className={css.noSearchResults}>
        </ul> */}
        {searchInProgress ? (
          <div className={css.loadingResults}>
            <FormattedMessage id="SearchFilters.loadingResults" />
          </div>
        ) : null}
      </div>
    );
  }
}

SearchFiltersComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
  certificateFilter: null,
  mentorLanguageFilter: null,
  yogaStylesFilter: null,
  priceFilter: null,
  isSearchFiltersPanelOpen: false,
  toggleSearchFiltersPanel: null,
  searchFiltersPanelSelectedCount: 0,
};

SearchFiltersComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  onManageDisableScrolling: func.isRequired,
  certificateFilter: propTypes.filterConfig,
  mentorLanguageFilter: propTypes.filterConfig,
  yogaStylesFilter: propTypes.filterConfig,
  priceFilter: propTypes.filterConfig,
  isSearchFiltersPanelOpen: bool,
  toggleSearchFiltersPanel: func,
  searchFiltersPanelSelectedCount: number,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SearchFilters = compose(
  withRouter,
  injectIntl
)(SearchFiltersComponent);

export default SearchFilters;
