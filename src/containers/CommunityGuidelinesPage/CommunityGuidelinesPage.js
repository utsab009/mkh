import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { TopbarContainer } from '../../containers';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  CommunityGuidelines,
} from '../../components';
import config from '../../config';

import css from './CommunityGuidelinesPage.css';

const CommunityGuidelinesPageComponent = props => {
  const { scrollingDisabled, intl } = props;

  const tabs = [
    {
      text: intl.formatMessage({ id: 'CommunityGuidelinesPage.privacyTabTitle' }),
      selected: false,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'CommunityGuidelinesPage.tosTabTitle' }),
      selected: false,
      linkProps: {
        name: 'TermsOfServicePage',
      },
    },
    {
      text: intl.formatMessage({ id: 'CommunityGuidelinesPage.cgTabTitle' }),
      selected: true,
      linkProps: {
        name: 'CommunityGuidelinesPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'FaqPage.faqTabTitle' }),
      selected: false,
      linkProps: {
        name: 'FaqPage',
      },
    },
  ];
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage(
    { id: 'CommunityGuidelinesPage.schemaTitle' },
    { siteTitle }
  );
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: schemaTitle,
  };
  return (
    <Page title={schemaTitle} scrollingDisabled={scrollingDisabled} schema={schema}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="CommunityGuidelinesPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.heading}>
              <FormattedMessage id="CommunityGuidelinesPage.heading" />
            </h1>
            <CommunityGuidelines />
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

const { bool } = PropTypes;

CommunityGuidelinesPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const CommunityGuidelinesPage = compose(
  connect(mapStateToProps),
  injectIntl
)(CommunityGuidelinesPageComponent);

export default CommunityGuidelinesPage;
