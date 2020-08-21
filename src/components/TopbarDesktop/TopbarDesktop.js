import React, { useState, useEffect } from 'react';
import { bool, func, object, number, string } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import {
  Avatar,
  InlineTextButton,
  Logo,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
  ListingLink,
  OwnListingLink,
} from '../../components';
import { TopbarSearchForm } from '../../forms';

import css from './TopbarDesktop.css';
// import { is } from 'date-fns/locale';

const TopbarDesktop = props => {
  const {
    className,
    currentUser,
    currentPage,
    rootClassName,
    currentUserHasListings,
    currentUserListing,
    currentUserListingFetched,
    notificationCount,
    intl,
    isAuthenticated,
    isMentor,
    onLogout,
    onSearchSubmit,
    initialSearchFormValues,
    parentComponent = null,
  } = props;
  const [mounted, setMounted] = useState(false);
  console.log('currentUser:', currentUser);
  const userType =
    currentUser && currentUser.attributes.profile.protectedData
      ? currentUser.attributes.profile.protectedData.userType
      : null;
  const userTypeText = userType !== null && userType === 'mentor' ? 'Mentor' : 'Mentee';
  useEffect(() => {
    setMounted(true);
  }, []);

  const authenticatedOnClientSide = mounted && isAuthenticated;
  const isAuthenticatedOrJustHydrated = isAuthenticated || !mounted;

  //modified by UC
  const rootVariable = parentComponent === null ? css.root : css.rootHomePage;
  const classes = classNames(rootClassName || rootVariable, className);

  //modified by UC
  const searchLinkVariable = parentComponent === null ? css.searchLink : css.searchLinkHomePage;
  const search = (
    <TopbarSearchForm
      className={searchLinkVariable}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
      parentComponent={parentComponent}
    />
  );

  const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;

  const inboxLinkVariable = parentComponent === null ? css.inboxLink : css.inboxLinkHomePage;

  const inboxLink = authenticatedOnClientSide ? (
    <NamedLink
      className={inboxLinkVariable}
      name="InboxPage"
      params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
    >
      <span className={css.inbox}>
        <FormattedMessage id="TopbarDesktop.inbox" />
        {notificationDot}
      </span>
    </NamedLink>
  ) : null;

  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };

  const profileMenu = authenticatedOnClientSide ? (
    <Menu>
      <MenuLabel className={css.profileMenuLabel} isOpenClassName={css.profileMenuIsOpen}>
        <Avatar className={css.avatar} user={currentUser} disableProfileLink />
      </MenuLabel>
      {isMentor ? (
        <MenuContent className={css.profileMenuContent}>
          {/*<MenuItem key="EditListingPage">
            <OwnListingLink
              listing={currentUserListing}
              listingFetched={currentUserListingFetched}
              className={css.yourListingsLink}
            >
              <div>
                <span className={css.menuItemBorder} />
                {currentUserListing ? (
                  <FormattedMessage id="TopbarDesktop.editYourListingLink" />
                ) : (
                  <FormattedMessage id="TopbarDesktop.addYourListingLink" />
                )}
              </div>
            </OwnListingLink>
                </MenuItem>*/}
          <MenuItem key="ManageListingsPage">
            <NamedLink
              className={classNames(css.yourListingsLink, currentPageClass('ManageListingsPage'))}
              name="ManageListingsPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.listingLink" />
            </NamedLink>
          </MenuItem>
          <MenuItem key="PlannerPage">
            <NamedLink
              className={classNames(css.profileSettingsLink, currentPageClass('PlannerPage'))}
              name="PlannerPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.plannerLink" />
            </NamedLink>
          </MenuItem>
          <MenuItem key="FavouritesPage">
            <NamedLink
              className={classNames(css.yourListingsLink, currentPageClass('FavouritesPage'))}
              name="FavouritesPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.favourites" />
            </NamedLink>
          </MenuItem>
          <MenuItem key="ProfileSettingsPage">
            <NamedLink
              className={classNames(
                css.profileSettingsLink,
                currentPageClass('ProfileSettingsPage')
              )}
              name="ProfileSettingsPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage
                id="TopbarDesktop.profileSettingsLink"
                values={{ userType: userTypeText }}
              />
            </NamedLink>
          </MenuItem>
          <MenuItem key="MentorResourcePage">
            <NamedLink
              className={classNames(
                css.profileSettingsLink,
                currentPageClass('MentorResourcePage')
              )}
              name="MentorResourcePage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage
                id="TopbarDesktop.resourceLink"
                values={{ userType: userTypeText }}
              />
            </NamedLink>
          </MenuItem>
          <MenuItem key="AccountSettingsPage">
            <NamedLink
              className={classNames(css.yourListingsLink, currentPageClass('AccountSettingsPage'))}
              name="AccountSettingsPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.accountSettingsLink" />
            </NamedLink>
          </MenuItem>
          <MenuItem key="logout">
            <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.logout" />
            </InlineTextButton>
          </MenuItem>
        </MenuContent>
      ) : (
        <MenuContent className={css.profileMenuContent}>
          <MenuItem key="FavouritesPage">
            <NamedLink
              className={classNames(css.yourListingsLink, currentPageClass('FavouritesPage'))}
              name="FavouritesPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.favourites" />
            </NamedLink>
          </MenuItem>
          <MenuItem key="ProfileSettingsPage">
            <NamedLink
              className={classNames(
                css.profileSettingsLink,
                currentPageClass('ProfileSettingsPage')
              )}
              name="ProfileSettingsPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage
                id="TopbarDesktop.profileSettingsLink"
                values={{ userType: userTypeText }}
              />
            </NamedLink>
          </MenuItem>
          <MenuItem key="MenteeResourcePage">
            <NamedLink
              className={classNames(
                css.profileSettingsLink,
                currentPageClass('MenteeResourcePage')
              )}
              name="MenteeResourcePage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage
                id="TopbarDesktop.resourceLink"
                values={{ userType: userTypeText }}
              />
            </NamedLink>
          </MenuItem>
          <MenuItem key="AccountSettingsPage">
            <NamedLink
              className={classNames(css.yourListingsLink, currentPageClass('AccountSettingsPage'))}
              name="AccountSettingsPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.accountSettingsLink" />
            </NamedLink>
          </MenuItem>
          <MenuItem key="logout">
            <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.logout" />
            </InlineTextButton>
          </MenuItem>
        </MenuContent>
      )}
    </Menu>
  ) : null;

  //modified by SD
  const signupLinkVariable = parentComponent === null ? css.signupLink : css.signupLinkHomePage;
  const menteeSignupLink = isAuthenticatedOrJustHydrated ? null : (
    <NamedLink name="MenteeSignupPage" className={signupLinkVariable}>
      <span className={css.signup}>
        <FormattedMessage id="TopbarDesktop.menteeSignup" />
      </span>
    </NamedLink>
  );

  //modified by SD
  const signupLink = isAuthenticatedOrJustHydrated ? null : (
    <NamedLink name="SignupPage" className={signupLinkVariable}>
      <span className={css.signup}>
        <FormattedMessage id="TopbarDesktop.signup" />
      </span>
    </NamedLink>
  );

  //modified by SD
  const loginLinkVariable = parentComponent === null ? css.loginLink : css.loginLinkHomePage;
  const loginLink = isAuthenticatedOrJustHydrated ? null : (
    <NamedLink name="LoginPage" className={loginLinkVariable}>
      <span className={css.login}>
        <FormattedMessage id="TopbarDesktop.login" />
      </span>
    </NamedLink>
  );
  //modified by UC
  const createListingLinkVariable =
    parentComponent === null ? css.createListingLink : css.createListingLinkHomePage;
  const listingLink =
    authenticatedOnClientSide && currentUserListingFetched && currentUserListing ? (
      <ListingLink
        className={createListingLinkVariable}
        listing={currentUserListing}
        children={
          <span className={css.createListing}>
            <FormattedMessage id="TopbarDesktop.viewListing" />
          </span>
        }
      />
    ) : null;
  //modified by UC
  const createListingLink = (
    // isAuthenticatedOrJustHydrated && !(currentUserListingFetched && !currentUserListing) ? null : // to generate new listing link
    <NamedLink className={createListingLinkVariable} name="NewListingPage">
      <span className={css.createListing}>
        <FormattedMessage id="TopbarDesktop.createListing" />
      </span>
    </NamedLink>
  );

  //modified by UC
  const logoLinkVariable = parentComponent === null ? css.logoLink : css.logoLinkHomePage;
  return (
    <nav className={classes}>
      <NamedLink className={logoLinkVariable} name="LandingPage">
        <Logo
          format="desktop"
          className={css.logo}
          alt={intl.formatMessage({ id: 'TopbarDesktop.logo' })}
        />
      </NamedLink>
      {search}
      {/*listingLink*/}
      {menteeSignupLink}
      {signupLink}
      {isMentor ? createListingLink : null}
      {inboxLink}
      {profileMenu}
      {loginLink}
    </nav>
  );
};

TopbarDesktop.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  currentPage: null,
  notificationCount: 0,
  initialSearchFormValues: {},
  currentUserListing: null,
  currentUserListingFetched: false,
};

TopbarDesktop.propTypes = {
  rootClassName: string,
  className: string,
  currentUserHasListings: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
  currentUser: propTypes.currentUser,
  currentPage: string,
  isAuthenticated: bool.isRequired,
  onLogout: func.isRequired,
  notificationCount: number,
  onSearchSubmit: func.isRequired,
  initialSearchFormValues: object,
  intl: intlShape.isRequired,
};

export default TopbarDesktop;
