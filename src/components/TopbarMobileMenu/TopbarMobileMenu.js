/**
 *  TopbarMobileMenu prints the menu content for authenticated user or
 * shows login actions for those who are not authenticated.
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { bool, func, number, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import {
  AvatarLarge,
  InlineTextButton,
  NamedLink,
  NotificationBadge,
  OwnListingLink,
  Button,
  Modal,
} from '../../components';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from '../../util/reactIntl';

import { SectorsFilterForm } from '../../forms';

import css from './TopbarMobileMenu.css';

// const TopbarMobileMenu = props => {
//   const {
//     isAuthenticated,
//     currentPage,
//     currentUserHasListings,
//     currentUserListing,
//     currentUserListingFetched,
//     currentUser,
//     notificationCount,
//     onLogout,
//     isMentor,
//   } = props;

//   const user = ensureCurrentUser(currentUser);

//   if (!isAuthenticated) {
//     const Menteesignup = (
//       <NamedLink name="MenteeSignupPage" className={css.signupLink}>
//         <FormattedMessage id="TopbarMobileMenu.signupLink" />
//       </NamedLink>
//     );

//     const Mentorsignup = (
//       <NamedLink name="SignupPage" className={css.signupLink}>
//         <FormattedMessage id="TopbarMobileMenu.mentorSignupLink" />
//       </NamedLink>
//     );

//     const login = (
//       <NamedLink name="LoginPage" className={css.loginLink}>
//         <FormattedMessage id="TopbarMobileMenu.loginLink" />
//       </NamedLink>
//     );

//     const signupOrLogin = (
//       <span className={css.authenticationLinks}>
//         <FormattedMessage
//           id="TopbarMobileMenu.signupOrLogin"
//           values={{ Menteesignup, Mentorsignup, lineBreak: <br />, login }}
//         />
//       </span>
//     );
//     return (
//       <div className={css.root}>
//         <div className={css.content}>
//           <div className={css.authenticationGreeting}>
//             <FormattedMessage
//               id="TopbarMobileMenu.unauthorizedGreeting"
//               values={{ lineBreak: <br />, signupOrLogin }}
//             />
//           </div>
//         </div>
//         {/* <div className={css.footer}>
//           <NamedLink className={css.createNewListingLink} name="NewListingPage">
//             <FormattedMessage id="TopbarMobileMenu.newListingLink" />
//           </NamedLink>
//         </div> */}
//       </div>
//     );
//   }

//   const notificationCountBadge =
//     notificationCount > 0 ? (
//       <NotificationBadge className={css.notificationBadge} count={notificationCount} />
//     ) : null;

//   const displayName = user.attributes.profile.firstName;
//   const currentPageClass = page => {
//     const isAccountSettingsPage =
//       page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
//     return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
//   };

//   return (
//     <div className={css.root}>
//       <AvatarLarge className={css.avatar} user={currentUser} />
//       <div className={css.content}>
//         <span className={css.greeting}>
//           <FormattedMessage id="TopbarMobileMenu.greeting" values={{ displayName }} />
//         </span>
//         <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
//           <FormattedMessage id="TopbarMobileMenu.logoutLink" />
//         </InlineTextButton>
//         <NamedLink
//           className={classNames(css.inbox, currentPageClass('InboxPage'))}
//           name="InboxPage"
//           params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
//         >
//           <FormattedMessage id="TopbarMobileMenu.inboxLink" />
//           {notificationCountBadge}
//         </NamedLink>
//         {/*<OwnListingLink
//           listing={currentUserListing}
//           listingFetched={currentUserListingFetched}
//           className={css.navigationLink}
//         />*/}
//         {
//           <NamedLink
//             className={classNames(css.navigationLink, currentPageClass('FavouritesPage'))}
//             name="FavouritesPage"
//           >
//             <FormattedMessage id="TopbarMobileMenu.favourites" />
//           </NamedLink>
//         }
//         <NamedLink
//           className={classNames(css.navigationLink, currentPageClass('ProfileSettingsPage'))}
//           name="ProfileSettingsPage"
//         >
//           <FormattedMessage
//             id="TopbarMobileMenu.profileSettingsLink"
//             values={{ userType: isMentor ? 'Mentor' : 'Mentee' }}
//           />
//         </NamedLink>
//         {isMentor ? (
//           <NamedLink
//             className={classNames(css.navigationLink, currentPageClass('ManageListingsPage'))}
//             name="ManageListingsPage"
//           >
//             <FormattedMessage id="TopbarDesktop.listingLink" />
//           </NamedLink>
//         ) : null}
//         {isMentor ? (
//           <NamedLink
//             className={classNames(css.navigationLink, currentPageClass('PlannerPage'))}
//             name="PlannerPage"
//           >
//             <FormattedMessage id="TopbarMobileMenu.plannerLink" />
//           </NamedLink>
//         ) : null}
//         <NamedLink
//           className={classNames(css.navigationLink, currentPageClass('AccountSettingsPage'))}
//           name="AccountSettingsPage"
//         >
//           <FormattedMessage id="TopbarMobileMenu.accountSettingsLink" />
//         </NamedLink>
//       </div>
//       {/* <div className={css.footer}>
//         <NamedLink className={css.createNewListingLink} name="NewListingPage">
//           <FormattedMessage id="TopbarMobileMenu.newListingLink" />
//         </NamedLink>
//       </div> */}
//       <div className={css.footer}>
//         <NamedLink className={css.createNewListingLink} name="SearchPage">
//           {/* <FormattedMessage id="TopbarMobileMenu.newListingLink" /> */}
//           Try a Mentor
//         </NamedLink>
//       </div>
//     </div>
//   );
// };

class TopbarMobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation_error: false,
      subSectors: [],
      jobRoles: [],
      isSectorModalOpen: false,
      profileTypeSelected: true,
    };

    this.profileTypeSelection = this.profileTypeSelection.bind(this);
  }

  profileTypeSelection = jobType => {
    this.setState({ profileTypeSelected: jobType, isSectorModalOpen: true });
    // setProfileTypeSelected(jobType);
    // setisSectorModalOpen(true);
  };

  handleSubmit = values => {
    const { sectors, subsectors, jobroles } = values;

    const routes = routeConfiguration();

    this.props.history.push(
      createResourceLocatorString(
        'SearchPage',
        routes,
        // { keywords: 'php' },
        {},
        // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
        { pub_subsectors: subsectors }
      )
    );

    // if (sectors !== 'none') {
    //   this.props.history.push(
    //     createResourceLocatorString(
    //       'SearchPage',
    //       routes,
    //       // { keywords: 'php' },
    //       {},
    //       // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
    //       { pub_sectors: sectors, pub_subSectors: subsectors, pub_jobroles: jobroles }
    //     )
    //   );
    // } else {
    //   this.props.history.push(
    //     createResourceLocatorString(
    //       'SearchPage',
    //       routes,
    //       // { keywords: 'php' },
    //       {},
    //       // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
    //       {}
    //     )
    //   );
    // }
  };

  render() {
    const {
      isAuthenticated,
      currentPage,
      currentUserHasListings,
      currentUserListing,
      currentUserListingFetched,
      currentUser,
      notificationCount,
      onLogout,
      isMentor,
      onManageDisableScrolling,
    } = this.props;

    const user = ensureCurrentUser(currentUser);
    console.log('user: ', user);

    if (!isAuthenticated) {
      const Menteesignup = (
        <NamedLink name="MenteeSignupPage" className={css.signupLink}>
          <FormattedMessage id="TopbarMobileMenu.signupLink" />
        </NamedLink>
      );

      const Mentorsignup = (
        <NamedLink name="SignupPage" className={css.signupLink}>
          <FormattedMessage id="TopbarMobileMenu.mentorSignupLink" />
        </NamedLink>
      );

      const login = (
        <NamedLink name="LoginPage" className={css.loginLink}>
          <FormattedMessage id="TopbarMobileMenu.loginLink" />
        </NamedLink>
      );

      const signupOrLogin = (
        <span className={css.authenticationLinks}>
          <FormattedMessage
            id="TopbarMobileMenu.signupOrLogin"
            values={{ Menteesignup, Mentorsignup, lineBreak: <br />, login }}
          />
        </span>
      );
      return (
        <div className={css.root}>
          <div className={css.content}>
            <div className={css.authenticationGreeting}>
              <FormattedMessage
                id="TopbarMobileMenu.unauthorizedGreeting"
                values={{ lineBreak: <br />, signupOrLogin }}
              />
            </div>
          </div>
          {/* <div className={css.footer}>
          <NamedLink className={css.createNewListingLink} name="NewListingPage">
            <FormattedMessage id="TopbarMobileMenu.newListingLink" />
          </NamedLink>
        </div> */}
        </div>
      );
    }

    const notificationCountBadge =
      notificationCount > 0 ? (
        <NotificationBadge className={css.notificationBadge} count={notificationCount} />
      ) : null;

    const displayName = user.attributes.profile.firstName;
    const currentPageClass = page => {
      const isAccountSettingsPage =
        page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
      return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
    };

    return this.state.isSectorModalOpen ? (
      <Modal
        id="MenteeSignupPage.tos"
        isOpen={this.state.isSectorModalOpen}
        onClose={() => this.setState({ isSectorModalOpen: false })}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <SectorsFilterForm
          // className={css.form}
          onSubmit={this.handleSubmit}
          // inProgress={authInProgress}
          // onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
        />
      </Modal>
    ) : (
      <div className={css.root}>
        <AvatarLarge className={css.avatar} user={currentUser} />
        <div className={css.content}>
          <span className={css.greeting}>
            <FormattedMessage id="TopbarMobileMenu.greeting" values={{ displayName }} />
          </span>
          <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
            <FormattedMessage id="TopbarMobileMenu.logoutLink" />
          </InlineTextButton>
          <NamedLink
            className={classNames(css.inbox, currentPageClass('InboxPage'))}
            name="InboxPage"
            params={{ tab: isMentor ? 'sales' : 'orders' }}
            // params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
          >
            <FormattedMessage id="TopbarMobileMenu.inboxLink" />
            {notificationCountBadge}
          </NamedLink>
          {/*<OwnListingLink
          listing={currentUserListing}
          listingFetched={currentUserListingFetched}
          className={css.navigationLink}
        />*/}
          {
            <NamedLink
              className={classNames(css.navigationLink, currentPageClass('FavouritesPage'))}
              name="FavouritesPage"
            >
              <FormattedMessage id="TopbarMobileMenu.favourites" />
            </NamedLink>
          }
          <NamedLink
            className={classNames(css.navigationLink, currentPageClass('ProfileSettingsPage'))}
            name="ProfileSettingsPage"
          >
            <FormattedMessage
              id="TopbarMobileMenu.profileSettingsLink"
              values={{ userType: isMentor ? 'Mentor' : 'Mentee' }}
            />
          </NamedLink>
          {isMentor ? (
            <NamedLink
              className={classNames(css.navigationLink, currentPageClass('ManageListingsPage'))}
              name="ManageListingsPage"
            >
              <FormattedMessage id="TopbarDesktop.listingLink" />
            </NamedLink>
          ) : null}
          {isMentor ? (
            <NamedLink
              className={classNames(css.navigationLink, currentPageClass('MentorResourcePage'))}
              name="MentorResourcePage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage
                id="TopbarDesktop.resourceLink"
                values={{ userType: isMentor ? 'Mentor' : 'Mentee' }}
              />
            </NamedLink>
          ) : null}

          {!isMentor ? (
            <NamedLink
              className={classNames(css.navigationLink, currentPageClass('MenteeResourcePage'))}
              name="MenteeResourcePage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage
                id="TopbarDesktop.resourceLink"
                values={{ userType: isMentor ? 'Mentor' : 'Mentee' }}
              />
            </NamedLink>
          ) : null}

          {isMentor ? (
            <NamedLink
              className={classNames(css.navigationLink, currentPageClass('PlannerPage'))}
              name="PlannerPage"
            >
              <FormattedMessage id="TopbarMobileMenu.plannerLink" />
            </NamedLink>
          ) : null}
          <NamedLink
            className={classNames(css.navigationLink, currentPageClass('AccountSettingsPage'))}
            name="AccountSettingsPage"
          >
            <FormattedMessage id="TopbarMobileMenu.accountSettingsLink" />
          </NamedLink>
        </div>
        {isMentor ? (
          <div className={css.footer}>
            <NamedLink className={css.createNewListingLink} name="NewListingPage">
              <FormattedMessage id="TopbarMobileMenu.newListingLink" />
            </NamedLink>
          </div>
        ) : (
          <div className={css.footer}>
            <Button
              onClick={() => this.profileTypeSelection('jobrole')}
              className={css.createNewListingLink}
            >
              <FormattedMessage id="TopbarMobileMenu.searchMentor" />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // const { currentUserListing, currentUserListingFetched } = state.user;

  return {
    scrollingDisabled: isScrollingDisabled(state),
    // currentUserListing,
    // currentUserListingFetched,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

TopbarMobileMenu.defaultProps = {
  currentUser: null,
  notificationCount: 0,
  currentPage: null,
  currentUserListing: null,
  currentUserListingFetched: false,
};

TopbarMobileMenu.propTypes = {
  isAuthenticated: bool.isRequired,
  currentUserHasListings: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
  currentUser: propTypes.currentUser,
  currentPage: string,
  notificationCount: number,
  onLogout: func.isRequired,
};

// export default TopbarMobileMenu;

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(TopbarMobileMenu);
