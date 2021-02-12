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
  Portal,
} from '../../components';
import { TopbarContainer } from '../../containers';

import facebookImage from '../../assets/yogatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/yogatimeTwitter-600x314.jpg';
import css from './LandingPage.css';
import { updateProfile } from '../ProfileSettingsPage/ProfileSettingsPage.duck';
import { sendVerificationEmail } from '../../ducks/user.duck';

import ShowMoreText from 'react-show-more-text';

export class LandingPageComponent extends Component {
  state = {
    welcomeModal: true,
    portalShow: false,
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
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onResendVerificationEmail,
    } = this.props;
    // Schema for search engines (helps them to understand what this page is about)
    // http://schema.org
    // We are using JSON-LD format
    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
    const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
    const schemaImage = `${config.canonicalRootURL}${facebookImage}`;
    // let { emailVerified } = (currentUser && currentUser.attributes) || {};
    // console.log('4445 currentUser emailVerified', currentUser, emailVerified);
    // // if(emailVerified !== undefined && )

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
                  which Job Positions you can offer Mentoring in.
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
                    which will be located on the top of each page. Return to it for each Job
                    Position you can Mentor.
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
                      <h2 className={css.scdstepTitle}>1. Create a Mentor Account</h2>
                      <ShowMoreText
                        /* Default options */
                        lines={5}
                        more="Read more"
                        less="Read less"
                        className="content-css"
                        anchorClass="my-anchor-css-class"
                        onClick={this.executeOnClick}
                        expanded={false}
                      >
                        <p>
                          Start by clicking “Become A Mentor”at the top right-hand corner of
                          thispage. Enter identity information andyour e-mail address and verify it.
                        </p>
                      </ShowMoreText>
                    </div>

                    <div className={css.scdstep}>
                      <h2 className={css.scdstepTitle}>2. Start Building your MentorProfile</h2>
                      <ShowMoreText
                        /* Default options */
                        lines={4}
                        more="Read more"
                        less="Read less"
                        className="content-css"
                        anchorClass="my-anchor-css-class"
                        onClick={this.executeOnClick}
                        expanded={false}
                      >
                        <p>
                          Tell potential Mentees about your workand educational history and then
                          selectthe specific Job Roles you can help with.The information collected
                          will allowpotential Mentees know why you canhelp them along with also
                          telling themwhen you will be available, how muchyou will charge, and so
                          on.
                        </p>
                      </ShowMoreText>
                    </div>

                    <div className={css.scdstep}>
                      <h2 className={css.scdstepTitle}>3. Start Mentoring</h2>
                      <ShowMoreText
                        /* Default options */
                        lines={4}
                        more="Read more"
                        less="Read less"
                        className="content-css"
                        anchorClass="my-anchor-css-class"
                        onClick={this.executeOnClick}
                        expanded={false}
                      >
                        <p>
                          You are all set. Bookings will arrive, in-built automatic toolswill
                          organise and remind you about these bookings, theMentoring meetings will
                          be through our video conferencingapplication, and payments to you will be
                          automatic. All youneed to focus on is Mentoring. Need help to Mentor? In
                          Try AMentor you will find an array of free resources includingvideos on
                          how to Mentor.
                        </p>
                        <p>
                          The first meeting is 20 minutes, free of charge, and is aNeeds Assessment.
                          After that, all meetings are charged forand booked in one or more-hour
                          segments by Mentees.
                        </p>
                      </ShowMoreText>
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
  const {
    currentUserListing,
    currentUserListingFetched,
    currentUser,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;
  const { isAuthenticated } = state.Auth;
  return {
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
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
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
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
