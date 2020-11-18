import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
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
  NamedLink,
  ExternalLink,
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

  toggleWelcomeModal = cb => {
    console.log('modal', cb);
    this.props.onUpdateProfile({
      publicData: {
        newUser: false,
      },
    });
    this.setState(
      {
        welcomeModal: false,
      },
      () => cb
    );
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
      currentUser,
    } = this.props;

    // Schema for search engines (helps them to understand what this page is about)
    // http://schema.org
    // We are using JSON-LD format
    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
    const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
    const schemaImage = `${config.canonicalRootURL}${facebookImage}`;
    console.log('newUser', currentUser);
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
                onClose={() => this.toggleWelcomeModal()}
                onManageDisableScrolling={onManageDisableScrolling}
                // className={css.landingModal}
                // containerClassName={css.modalContainer}
              >
                <div className={css.modalHeader}>
                  {currentUser.attributes.profile.displayName}, it is now time for you to decide
                  which Job Roles and / or Grades you can offer Mentoring in.
                </div>
                <div className={css.welcomeModal}>
                  <p>
                    To capture this just click this{' '}
                    <span
                      className={css.internalLink}
                      onClick={() => {
                        this.toggleWelcomeModal(history.push('/l/new'));
                      }}
                    >
                      link
                    </span>{' '}
                    or on{' '}
                    <span
                      className={css.internalLink}
                      onClick={() => {
                        this.toggleWelcomeModal(history.push('/l/new'));
                      }}
                    >
                      Roles I can Mentor
                    </span>{' '}
                    which will be located on the top of each page. Look up and to the right now.
                    Return to it for each Job or Grade you can Mentor.
                  </p>
                  <p>
                    Filling this section in is critical as without doing so, Mentees will not find
                    you.
                  </p>
                  {/* <p>
                    Remember, for each Role you are capable of offering Mentoring in, you'll need to
                    return to the{' '}
                    <span
                      className={css.internalLink}
                      onClick={() => {
                        this.toggleWelcomeModal(history.push('/l/new'));
                      }}
                    >
                      Roles I can Mentor
                    </span>{' '}
                    section of this website and create a new Role Profile, each of which then saved
                    in this section.
                  </p> */}
                  <p>
                    If you would like to watch a video explaining how to do this, click{' '}
                    <span className={css.internalLink}>here</span>
                  </p>
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
              <li className={css.section}>
                <div className={`${css.sectionContent} ${css.scdown}`} style={{ marginTop: 0 }}>
                  {/* <div className={`${css.sectionContent} ${css.scdown}`}> */}
                  <div className={css.scdtitle}>How Try A Mentor works For Mentors</div>

                  <div className={css.scdsteps}>
                    <div className={css.scdstep}>
                      <h2 className={css.scdstepTitle}>1. Create your Mentor Profile</h2>
                      <p>
                        Start by clicking “Become A Mentor” at the top right-hand corner of this
                        page. Give your name, create your password, and outline your Work
                        Experience, Education to date and Skype Address. If you do not have this
                        information to hand, you can fill it in later. Then confirm your e-mail.
                      </p>
                    </div>

                    <div className={css.scdstep}>
                      <h2 className={css.scdstepTitle}>2. Create your Role Profiles</h2>
                      <p>
                        You have provided the information as to why you will be a great Mentor, but
                        what specific Job or Grade based Roles will you help with? To define this,
                        click “Roles I can Mentor” which once signed up will be in the top
                        right-hand corner. Here you will define the specific Jobs or Grades you can
                        Mentor, when you will be available, and how much you will charge and so on
                      </p>
                    </div>

                    <div className={css.scdstep}>
                      <h2 className={css.scdstepTitle}>3. Start Mentoring</h2>
                      <p>
                        You are all set. Bookings will arrive, payments will be automatic and
                        through Skype or another Video Meeting Application you will deliver your
                        on-line Mentoring. Try A Mentor will provide on-going support of key
                        resources for you including a Mentee Management System and free Training on
                        how to improve your Mentoring skills (optional)
                      </p>
                    </div>
                  </div>
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
  const { currentUserListing, currentUserListingFetched, currentUser } = state.user;
  const { isAuthenticated } = state.Auth;
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUserListing,
    currentUserListingFetched,
    isAuthenticated,
    currentUser,
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
