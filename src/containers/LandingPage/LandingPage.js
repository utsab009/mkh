import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { propTypes } from '../../util/types';
import config from '../../config';
import {
  Page,
  SectionHero,
  SectionHowItWorks,
  SectionLocations,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  Modal,
} from '../../components';
import { TopbarContainer } from '../../containers';

import facebookImage from '../../assets/yogatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/yogatimeTwitter-600x314.jpg';
import css from './LandingPage.css';
import { updateProfile } from '../ProfileSettingsPage/ProfileSettingsPage.duck';

export class LandingPageComponent extends Component {
  state = {
    welcomeModal: true,
  };

  toggleWelcomeModal = () => {
    this.props.onUpdateProfile({
      publicData: {
        newUser: false,
      },
    });
    this.setState({
      welcomeModal: false,
    });
  };

  render() {
    const {
      history,
      intl,
      location,
      scrollingDisabled,
      currentUserListing,
      currentUserListingFetched,
      onManageDisableScrolling,
      isAuthenticated,
      isNewUser,
      isMentor,
    } = this.props;

    // Schema for search engines (helps them to understand what this page is about)
    // http://schema.org
    // We are using JSON-LD format
    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
    const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
    const schemaImage = `${config.canonicalRootURL}${facebookImage}`;
    console.log('7777 newUser', isNewUser);
    return (
      <Page
        className={css.root}
        scrollingDisabled={scrollingDisabled}
        contentType="website"
        description={schemaDescription}
        title={schemaTitle}
        facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
        twitterImages={[
          { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
        ]}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'WebPage',
          description: schemaDescription,
          name: schemaTitle,
          image: [schemaImage],
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer parentComponent="homepage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            {isAuthenticated && isNewUser && isMentor ? (
              <Modal
                id="LandingPage.welcomeModalMenor"
                isOpen={this.state.welcomeModal}
                onClose={this.toggleWelcomeModal}
                onManageDisableScrolling={onManageDisableScrolling}
                // containerClassName={css.modalContainer}
              >
                <div>Name, this is now time to decide which job roles you can mentor.</div>
                <div className={css.welcomeModal}>
                  <p>To capture these just click, Role I an Mentor to create a Role Profile</p>
                  <p>Create new Role Profiles for each Job Role you can mentor.</p>
                  <p>If you would like to watch a video explaining how to do this, click here</p>
                </div>
              </Modal>
            ) : null}
            <div className={css.heroContainer}>
              <SectionHero
                className={css.hero}
                history={history}
                location={location}
                onManageDisableScrolling={onManageDisableScrolling}
              />
            </div>
            <ul className={css.sections}>
              {/*<li className={css.section}>
              <div className={css.sectionContentFirstChild}>
                <SectionLocations />
              </div>
            </li>*/}
              <li className={css.section}>
                <div className={css.sectionContent}>
                  <SectionHowItWorks
                    currentUserListing={currentUserListing}
                    currentUserListingFetched={currentUserListingFetched}
                  />
                </div>
              </li>
            </ul>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

LandingPageComponent.defaultProps = {
  currentUserListing: null,
  currentUserListingFetched: false,
};

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
  onManageDisableScrolling: func.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUserListing, currentUserListingFetched } = state.user;
  const { isAuthenticated } = state.Auth;
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUserListing,
    currentUserListingFetched,
    isAuthenticated,
    isNewUser:
      state.user.currentUser && state.user.currentUser.attributes.profile.publicData.newUser,
    isMentor:
      state.user.currentUser &&
      state.user.currentUser.attributes.profile.protectedData.userType === 'mentor',
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(LandingPageComponent);

export default LandingPage;
