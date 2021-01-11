import React, { Component } from 'react';
import { array, arrayOf, bool, func, number, object, string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import {
  TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY,
  txIsAccepted,
  txIsCanceled,
  txIsDeclined,
  txIsEnquired,
  txIsPaymentExpired,
  txIsPaymentPending,
  txIsRequested,
  txHasBeenDelivered,
  txIsBookingEnded,
  txIsHoldPaymentRequested,
  txIsPaymentWaitingTime,
} from '../../util/transaction';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import {
  ensureListing,
  ensureTransaction,
  ensureUser,
  userDisplayNameAsString,
} from '../../util/data';
import { isMobileSafari } from '../../util/userAgent';
import { formatMoney } from '../../util/currency';
import {
  AvatarLarge,
  BookingPanel,
  NamedLink,
  ReviewModal,
  UserDisplayName,
  AvatarMedium,
} from '../../components';
import { SendMessageForm } from '../../forms';
import config from '../../config';

// These are internal components that make this file more readable.
import AddressLinkMaybe from './AddressLinkMaybe';
import BreakdownMaybe from './BreakdownMaybe';
import DetailCardHeadingsMaybe from './DetailCardHeadingsMaybe';
import DetailCardImage from './DetailCardImage';
import FeedSection from './FeedSection';
import SaleActionButtonsMaybe from './SaleActionButtonsMaybe';
import PanelHeading, {
  HEADING_ENQUIRED,
  HEADING_PAYMENT_PENDING,
  HEADING_PAYMENT_EXPIRED,
  HEADING_REQUESTED,
  HEADING_ACCEPTED,
  HEADING_DECLINED,
  HEADING_CANCELED,
  HEADING_DELIVERED,
} from './PanelHeading';

import moment from 'moment';
import 'isomorphic-fetch';
import { Client } from '@microsoft/microsoft-graph-client';

import css from './TransactionPanel.css';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import Modal from '../Modal/Modal';
import { UserAgentApplication } from 'msal';
var gapi;
// const gapi = window.gapi;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';
// Helper function to get display names for different roles

// const MS_APP_ID = '4611404d-2da2-4148-972e-9a9452db7760';
const MS_APP_ID = '8f186ab5-fc9b-4699-aac4-b7bb447f7c73';
const MS_SCOPES = ['user.read', 'calendars.ReadWrite', 'Mail.Send'];

const displayNames = (currentUser, currentProvider, currentCustomer, intl) => {
  const authorDisplayName = <UserDisplayName user={currentProvider} intl={intl} />;
  const customerDisplayName = <UserDisplayName user={currentCustomer} intl={intl} />;

  let otherUserDisplayName = '';
  let otherUserDisplayNameString = '';
  const currentUserIsCustomer =
    currentUser.id && currentCustomer.id && currentUser.id.uuid === currentCustomer.id.uuid;
  const currentUserIsProvider =
    currentUser.id && currentProvider.id && currentUser.id.uuid === currentProvider.id.uuid;

  if (currentUserIsCustomer) {
    otherUserDisplayName = authorDisplayName;
    otherUserDisplayNameString = userDisplayNameAsString(currentProvider, '');
  } else if (currentUserIsProvider) {
    otherUserDisplayName = customerDisplayName;
    otherUserDisplayNameString = userDisplayNameAsString(currentCustomer, '');
  }

  return {
    authorDisplayName,
    customerDisplayName,
    otherUserDisplayName,
    otherUserDisplayNameString,
  };
};

export class TransactionPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessageFormFocused: false,
      isReviewModalOpen: false,
      reviewSubmitted: false,
      showCancelModal: false,
      currentTimePastHourCap: false,
      preauthCancel: false,
      googleCalenderLogin: false,
      msOutlookCalenderLogin: false,
      showSuccess: false,
    };
    this.isMobSaf = false;
    this.sendMessageFormName = 'TransactionPanel.SendMessageForm';

    this.onOpenReviewModal = this.onOpenReviewModal.bind(this);
    this.onSubmitReview = this.onSubmitReview.bind(this);
    this.onSendMessageFormFocus = this.onSendMessageFormFocus.bind(this);
    this.onSendMessageFormBlur = this.onSendMessageFormBlur.bind(this);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.scrollToMessage = this.scrollToMessage.bind(this);

    this.userAgentApplication = new UserAgentApplication({
      auth: {
        clientId: MS_APP_ID,
        redirectUri: 'http://localhost:3000/',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
      },
    });

    // var user = this.userAgentApplication.getAccount();
    // this.userAgentApplication.handleRedirectCallback((error, response) => {
    //   // handle redirect response or error
    //   console.log('************************************* redireact');
    // });
  }

  componentDidMount() {
    this.isMobSaf = isMobileSafari();
    this.initClient();

    // If MSAL already has an account, the user
    // is already logged in
    const accounts = this.userAgentApplication.getAllAccounts();
    console.log('199', accounts);
    if (accounts && accounts.length > 0) {
      // Enhance user object with data from Graph
      this.getUserProfile();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log({ prevProps }, { prevState });
  }

  login = async () => {
    try {
      // Login via popup
      await this.userAgentApplication.loginPopup({
        scopes: MS_SCOPES,
        prompt: 'select_account',
      });

      // After login, get the user's profile
      await this.getUserProfile();
    } catch (err) {
      console.log('199 login err', err);
      this.setState({
        msOutlookCalenderLogin: false,
        user: {},
        error: this.normalizeError(err),
      });
    }
  };
  logout = () => {
    this.userAgentApplication.logout();
  };

  getAccessToken = async scopes => {
    try {
      const accounts = this.userAgentApplication.getAllAccounts();
      console.log('119 accounts', accounts);
      if (accounts.length <= 0) throw new Error('login_required');
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token
      var silentResult = await this.userAgentApplication.acquireTokenSilent({
        scopes: scopes,
        account: accounts[0],
      });

      return silentResult.accessToken;
    } catch (err) {
      // If a silent request fails, it may be because the user needs
      // to login or grant consent to one or more of the requested scopes
      if (this.isInteractionRequired(err)) {
        var interactiveResult = await this.userAgentApplication.acquireTokenPopup({
          scopes: scopes,
        });

        return interactiveResult.accessToken;
      } else {
        throw err;
      }
    }
  };
  setErrorMessage = (message, debug) => {
    this.setState({
      error: { message: message, debug: debug },
    });
  };

  isInteractionRequired = error => {
    if (!error.message || error.message.length <= 0) {
      return false;
    }

    return (
      error.message.indexOf('consent_required') > -1 ||
      error.message.indexOf('interaction_required') > -1 ||
      error.message.indexOf('login_required') > -1 ||
      error.message.indexOf('no_account_in_silent_request') > -1
    );
  };

  normalizeError = error => {
    var normalizedError = {};
    if (typeof error === 'string') {
      var errParts = error.split('|');
      normalizedError =
        errParts.length > 1 ? { message: errParts[1], debug: errParts[0] } : { message: error };
    } else {
      normalizedError = {
        message: error.message,
        debug: JSON.stringify(error),
      };
    }
    return normalizedError;
  };

  getUserProfile = async () => {
    try {
      var accessToken = await this.getAccessToken(MS_SCOPES);

      console.log('199 getUserProfile accessToken', accessToken);
      if (accessToken) {
        // TEMPORARY: Display the token in the error flash
        this.addOutlookEvent(accessToken);
        this.setState({
          msOutlookCalenderLogin: true,
          error: { message: 'Access token:', debug: accessToken },
        });
      }
    } catch (err) {
      this.setState({
        msOutlookCalenderLogin: false,
        user: {},
        error: this.normalizeError(err),
      });
    }
  };

  addOutlookEvent = token => {
    var headers = new Headers();
    var bearer = 'Bearer ' + token;
    headers.append('Authorization', bearer);
    console.log('199 token in eve', headers);
    var options = {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        subject: "Let's go for lunch",
        body: {
          contentType: 'HTML',
          content: 'Does noon work for you?',
        },
        start: {
          dateTime: '2021-01-15T12:00:00',
          timeZone: 'Pacific Standard Time',
        },
        end: {
          dateTime: '2021-01-15T14:00:00',
          timeZone: 'Pacific Standard Time',
        },
        location: {
          displayName: "Harry's Bar",
        },
        attendees: [
          {
            emailAddress: {
              address: 'samanthab@contoso.onmicrosoft.com',
              name: 'Samantha Booth',
            },
            type: 'required',
          },
        ],
        allowNewTimeProposals: true,
        transactionId: '7E163156-7762-4BEB-A1C6-729EA81755A7d',
      }),
    };
    var graphEndpoint = 'https://graph.microsoft.com/v1.0/me/events';
    console.log('199 params', options);
    fetch(graphEndpoint, options)
      .then(resp => {
        //do something with response
        console.log('199 res', resp);
      })
      .catch(e => console.log('199 error: ', e));
  };

  initClient = () => {
    gapi = window.gapi;
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
          // Handle the initial sign-in state.
          this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          // authorizeButton.onclick = handleAuthClick;
          // signoutButton.onclick = handleSignoutClick;
        })
        .catch(e => console.error(e));
    });
  };

  updateSigninStatus = isSignedIn => {
    console.log({ isSignedIn });
    if (isSignedIn) {
      // listUpcomingEvents();
      this.setState({
        googleCalenderLogin: true,
      });
    } else {
      this.setState({
        googleCalenderLogin: false,
      });
    }
  };

  onOpenReviewModal() {
    this.setState({ isReviewModalOpen: true });
  }

  onSubmitReview(values) {
    const { onSendReview, transaction, transactionRole } = this.props;
    const currentTransaction = ensureTransaction(transaction);
    const { reviewRating, reviewContent } = values;
    const rating = Number.parseInt(reviewRating, 10);
    onSendReview(transactionRole, currentTransaction, rating, reviewContent)
      .then(r => this.setState({ isReviewModalOpen: false, reviewSubmitted: true }))
      .catch(e => {
        // Do nothing.
      });
  }

  onSendMessageFormFocus() {
    this.setState({ sendMessageFormFocused: true });
    if (this.isMobSaf) {
      // Scroll to bottom
      window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
    }
  }

  onSendMessageFormBlur() {
    this.setState({ sendMessageFormFocused: false });
  }

  onMessageSubmit(values, form) {
    const message = values.message ? values.message.trim() : null;
    const { transaction, onSendMessage } = this.props;
    const ensuredTransaction = ensureTransaction(transaction);

    if (!message) {
      return;
    }
    onSendMessage(ensuredTransaction.id, message)
      .then(messageId => {
        form.reset();
        this.scrollToMessage(messageId);
      })
      .catch(e => {
        // Ignore, Redux handles the error
      });
  }

  scrollToMessage(messageId) {
    const selector = `#msg-${messageId.uuid}`;
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }

  render() {
    const {
      rootClassName,
      className,
      currentUser,
      transaction,
      totalMessagePages,
      oldestMessagePageFetched,
      messages,
      initialMessageFailed,
      savePaymentMethodFailed,
      fetchMessagesInProgress,
      fetchMessagesError,
      sendMessageInProgress,
      sendMessageError,
      sendReviewInProgress,
      sendReviewError,
      onFetchTimeSlots,
      onManageDisableScrolling,
      onShowMoreMessages,
      transactionRole,
      intl,
      onAcceptSale,
      onDeclineSale,
      acceptInProgress,
      declineInProgress,
      acceptSaleError,
      declineSaleError,
      onSubmitBookingRequest,
      monthlyTimeSlots,
      nextTransitions,
      onHoldRequest,
      cancelByCustomer,
    } = this.props;
    console.log('199 state', this.state);
    const currentTransaction = ensureTransaction(transaction);
    const currentListing = ensureListing(currentTransaction.listing);
    const currentProvider = ensureUser(currentTransaction.provider);
    const currentCustomer = ensureUser(currentTransaction.customer);
    const isCustomer = transactionRole === 'customer';
    const isProvider = transactionRole === 'provider';

    const listingLoaded = !!currentListing.id;
    const listingDeleted = listingLoaded && currentListing.attributes.deleted;
    const iscustomerLoaded = !!currentCustomer.id;
    const isCustomerBanned = iscustomerLoaded && currentCustomer.attributes.banned;
    const isCustomerDeleted = iscustomerLoaded && currentCustomer.attributes.deleted;
    const isProviderLoaded = !!currentProvider.id;
    const isProviderBanned = isProviderLoaded && currentProvider.attributes.banned;
    const isProviderDeleted = isProviderLoaded && currentProvider.attributes.deleted;

    const stateDataFn = tx => {
      if (txIsEnquired(tx)) {
        const transitions = Array.isArray(nextTransitions)
          ? nextTransitions.map(transition => {
              return transition.attributes.name;
            })
          : [];
        const hasCorrectNextTransition =
          transitions.length > 0 && transitions.includes(TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY);
        return {
          headingState: HEADING_ENQUIRED,
          showBookingPanel: isCustomer && !isProviderBanned && hasCorrectNextTransition,
        };
      } else if (txIsPaymentPending(tx)) {
        return {
          headingState: HEADING_PAYMENT_PENDING,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txIsPaymentExpired(tx)) {
        return {
          headingState: HEADING_PAYMENT_EXPIRED,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txIsRequested(tx)) {
        return {
          headingState: HEADING_REQUESTED,
          showDetailCardHeadings: isCustomer,
          showSaleButtons: isProvider && !isCustomerBanned,
          showCancel: true,
          preauthState: true,
        };
      } else if (txIsAccepted(tx)) {
        return {
          headingState: HEADING_ACCEPTED,
          showDetailCardHeadings: isCustomer,
          showAddress: isCustomer,
          showCancel: true,
          preauthState: false,
          allowProviderCancel: true,
        };
      } else if (txIsDeclined(tx)) {
        return {
          headingState: HEADING_DECLINED,
          showDetailCardHeadings: isCustomer,
          allowProviderCancel: false,
        };
      } else if (txIsCanceled(tx)) {
        return {
          headingState: HEADING_CANCELED,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txHasBeenDelivered(tx)) {
        return {
          headingState: HEADING_DELIVERED,
          showDetailCardHeadings: isCustomer,
          showAddress: isCustomer,
          allowProviderCancel: false,
        };
      } else if (txIsBookingEnded(tx)) {
        return {
          headingState: HEADING_DELIVERED,
          holdPaymentPeriod: true,
          allowProviderCancel: false,
        };
      } else if (txIsPaymentWaitingTime(tx)) {
        return {
          headingState: HEADING_DELIVERED,
          holdPaymentPeriod: false,
        };
      } else if (txIsHoldPaymentRequested(tx)) {
        return {
          headingState: HEADING_DELIVERED,
          holdPaymentRequested: true,
        };
      } else {
        return { headingState: 'unknown' };
      }
    };
    const stateData = stateDataFn(currentTransaction);
    console.log({ stateData });
    console.log({ currentTransaction });
    const deletedListingTitle = intl.formatMessage({
      id: 'TransactionPanel.deletedListingTitle',
    });

    const {
      authorDisplayName,
      customerDisplayName,
      otherUserDisplayName,
      otherUserDisplayNameString,
    } = displayNames(currentUser, currentProvider, currentCustomer, intl);

    const { publicData, geolocation } = currentListing.attributes;
    const location = publicData && publicData.location ? publicData.location : {};
    const listingTitle = currentListing.attributes.deleted
      ? deletedListingTitle
      : currentListing.attributes.title;

    const unitType = config.bookingUnitType;
    const isNightly = unitType === LINE_ITEM_NIGHT;
    const isDaily = unitType === LINE_ITEM_DAY;

    const unitTranslationKey = isNightly
      ? 'TransactionPanel.perNight'
      : isDaily
      ? 'TransactionPanel.perDay'
      : 'TransactionPanel.perUnit';

    const price = currentListing.attributes.price;
    const bookingSubTitle = price
      ? `${formatMoney(intl, price)} ${intl.formatMessage({ id: unitTranslationKey })}`
      : '';

    const firstImage =
      currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

    const saleButtons = (
      <SaleActionButtonsMaybe
        showButtons={stateData.showSaleButtons}
        acceptInProgress={acceptInProgress}
        declineInProgress={declineInProgress}
        acceptSaleError={acceptSaleError}
        declineSaleError={declineSaleError}
        onAcceptSale={() =>
          onAcceptSale(currentTransaction.id).then(res => console.log('res', res))
        }
        onDeclineSale={() => onDeclineSale(currentTransaction.id)}
      />
    );

    const showSendMessageForm =
      !isCustomerBanned && !isCustomerDeleted && !isProviderBanned && !isProviderDeleted;

    const sendMessagePlaceholder = intl.formatMessage(
      { id: 'TransactionPanel.sendMessagePlaceholder' },
      { name: otherUserDisplayNameString }
    );

    const sendingMessageNotAllowed = intl.formatMessage({
      id: 'TransactionPanel.sendingMessageNotAllowed',
    });

    const paymentMethodsPageLink = (
      <NamedLink name="PaymentMethodsPage">
        <FormattedMessage id="TransactionPanel.paymentMethodsPageLink" />
      </NamedLink>
    );

    const classes = classNames(rootClassName || css.root, className);

    // currentTransaction
    let { displayEnd, displayStart, seats } = currentTransaction.booking.attributes;
    let { title, availabilityPlan } = currentTransaction.listing.attributes;
    const event = {
      summary: title,
      location: location.address,
      // description: 'Really great refreshments',
      start: {
        dateTime: displayStart,
        timeZone: availabilityPlan.timezone,
      },
      end: {
        dateTime: displayEnd,
        timeZone: availabilityPlan.timezone,
      },
      // recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
      // attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }],
      // reminders: {
      //   useDefault: false,
      //   overrides: [
      //     { method: 'email', minutes: 24 * 60 },
      //     { method: 'popup', minutes: 10 },
      //   ],
      // },
    };

    // const CLIENT_ID = '1033598433613-tvqsg6e9lg5jacll4jjvait26qgglut5.apps.googleusercontent.com';
    // const clientSecret = 'yJZdWmtPRYHHcVeCgJFSulME';
    // const API_KEY = 'AIzaSyD80EabvQcj_X4Wx5N6YZ8XYlRRkxJ-8WI';
    // // Array of API discovery doc URLs for APIs used by the quickstart
    // const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    // const SCOPES = 'https://www.googleapis.com/auth/calendar';

    const handleClick = () => {
      gapi = window.gapi;
      console.log('login', gapi.auth2.getAuthInstance().isSignedIn.get());
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        let request = gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: event,
        });
        request.execute(event => {
          console.log('event', event);
          console.log('event link', event.htmlLink);
          this.setState({
            showSuccess: true,
          });
          setTimeout(
            () =>
              this.setState({
                showSuccess: false,
              }),
            3000
          );
          // window.open(event.htmlLink);
        });
      } else {
        gapi.load('client:auth2', () => {
          console.log('loaded client');

          // gapi.client.init({
          //   apiKey: API_KEY,
          //   clientId: CLIENT_ID,
          //   discoveryDocs: DISCOVERY_DOCS,
          //   scope: SCOPES,
          // });

          gapi.client.load('calendar', 'v3', () => console.log('bam!'));

          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
              let request = gapi.client.calendar.events.insert({
                calendarId: 'primary',
                resource: event,
              });

              request.execute(event => {
                console.log('event', event);
                console.log('event link', event.htmlLink);
                // window.open(event.htmlLink);
                this.setState({
                  showSuccess: true,
                });
                setTimeout(
                  () =>
                    this.setState({
                      showSuccess: false,
                    }),
                  5000
                );
              });
            })
            .catch(e => console.error(e));
        });
      }
    };

    const handleSignoutClick = event => {
      gapi.auth2.getAuthInstance().signOut();
    };

    return (
      <div className={classes}>
        <div className={css.container}>
          <div className={css.txInfo}>
            {/* <DetailCardImage
              rootClassName={css.imageWrapperMobile}
              avatarWrapperClassName={css.avatarWrapperMobile}
              listingTitle={listingTitle}
              image={firstImage}
              provider={currentProvider}
              isCustomer={isCustomer}
              listingId={currentListing.id && currentListing.id.uuid}
              listingDeleted={listingDeleted}
            /> */}
            {/* {isProvider ? (
              <div className={css.avatarWrapperProviderDesktop}>
                <AvatarLarge user={currentCustomer} className={css.avatarDesktop} />
              </div>
            ) : null} */}
            <PanelHeading
              panelHeadingState={stateData.headingState}
              transactionRole={transactionRole}
              providerName={authorDisplayName}
              customerName={customerDisplayName}
              isCustomerBanned={isCustomerBanned}
              listingId={currentListing.id && currentListing.id.uuid}
              listingTitle={listingTitle}
              listingDeleted={listingDeleted}
            />
            <div className={css.bookingDetailsMobile}>
              <AddressLinkMaybe
                rootClassName={css.addressMobile}
                location={location}
                geolocation={geolocation}
                showAddress={stateData.showAddress}
              />
              <BreakdownMaybe transaction={currentTransaction} transactionRole={transactionRole} />
            </div>
            {savePaymentMethodFailed ? (
              <p className={css.genericError}>
                <FormattedMessage
                  id="TransactionPanel.savePaymentMethodFailed"
                  values={{ paymentMethodsPageLink }}
                />
              </p>
            ) : null}
            <FeedSection
              rootClassName={css.feedContainer}
              currentTransaction={currentTransaction}
              currentUser={currentUser}
              fetchMessagesError={fetchMessagesError}
              fetchMessagesInProgress={fetchMessagesInProgress}
              initialMessageFailed={initialMessageFailed}
              messages={messages}
              oldestMessagePageFetched={oldestMessagePageFetched}
              onOpenReviewModal={this.onOpenReviewModal}
              onShowMoreMessages={() => onShowMoreMessages(currentTransaction.id)}
              totalMessagePages={totalMessagePages}
            />
            {showSendMessageForm ? (
              <SendMessageForm
                formId={this.sendMessageFormName}
                rootClassName={css.sendMessageForm}
                messagePlaceholder={sendMessagePlaceholder}
                inProgress={sendMessageInProgress}
                sendMessageError={sendMessageError}
                onFocus={this.onSendMessageFormFocus}
                onBlur={this.onSendMessageFormBlur}
                onSubmit={this.onMessageSubmit}
              />
            ) : (
              <div className={css.sendingMessageNotAllowed}>{sendingMessageNotAllowed}</div>
            )}
            {stateData.showSaleButtons ? (
              <div className={css.mobileActionButtons}>{saleButtons}</div>
            ) : null}
            {/* {isCustomer && stateData.holdPaymentPeriod && stateData.holdPaymentPeriod === true ? ( */}

            {!stateData.showSaleButtons ? (
              <>
                <PrimaryButton style={{ marginTop: 15 }} onClick={this.login}>
                  {this.state.msOutlookCalenderLogin
                    ? 'Get Event in Microsoft outlook'
                    : 'Log in to Microsoft outlook to get event notification'}
                </PrimaryButton>
                {this.state.msOutlookCalenderLogin ? (
                  <SecondaryButton style={{ marginTop: 15 }} onClick={this.logout}>
                    Log out from Microsoft outlook
                  </SecondaryButton>
                ) : null}
                <PrimaryButton style={{ marginTop: 15 }} onClick={handleClick}>
                  {this.state.googleCalenderLogin
                    ? 'Get Event in Google Calender'
                    : 'Login to google calender to get event notification'}
                </PrimaryButton>
                {this.state.googleCalenderLogin ? (
                  <SecondaryButton style={{ marginTop: 15 }} onClick={handleSignoutClick}>
                    Sign out from Google Calender
                  </SecondaryButton>
                ) : null}
              </>
            ) : null}
            {this.state.showSuccess ? (
              <div className={css.successMessage}>Event added successfully to calendar</div>
            ) : null}
            {/* // Mobile view // */}
            {currentTransaction &&
            currentTransaction.booking &&
            moment(currentTransaction.booking.attributes.start).diff(new Date()) > 0 &&
            ((isCustomer && stateData.showCancel && stateData.showCancel !== false) ||
              (!isCustomer &&
                stateData.allowProviderCancel &&
                stateData.allowProviderCancel !== false)) ? (
              <div
                className={css.mobileActionButtons}
                style={{ maxWidth: '50%', margin: '50px auto' }}
              >
                <PrimaryButton
                  onClick={() => {
                    const preauthState = stateData.preauthState ? stateData.preauthState : false;
                    const currentTime = new Date();
                    const bookingTime = currentTransaction.booking.attributes.start;
                    const bookingRemaining = moment(bookingTime).diff(currentTime);
                    this.setState({
                      showCancelModal: true,
                      currentTimePastHourCap: bookingRemaining > 172800000 ? false : true,
                      preauthCancel: preauthState,
                    });
                  }}
                >
                  Cancel Meeting
                </PrimaryButton>
                {this.state.showCancelModal && (
                  <Modal
                    id="TransactionPanel.cancelModal"
                    isOpen={this.state.showCancelModal}
                    onClose={() => this.setState({ showCancelModal: false })}
                    onManageDisableScrolling={onManageDisableScrolling}
                  >
                    {(!this.state.currentTimePastHourCap ||
                      this.state.preauthCancel ||
                      !isCustomer) && (
                      <div>
                        Are you sure you want to cancel this meeting – if you are sure, press yes,
                        if you do not want to cancel, press no
                      </div>
                    )}

                    {this.state.currentTimePastHourCap && isCustomer && !this.state.preauthCancel && (
                      <div>
                        Are you sure you want to cancel this meeting as this cancellation will see
                        no refund (please see{' '}
                        <NamedLink name="TermsOfServicePage" className={css.link}>
                          terms and conditions
                        </NamedLink>
                        ) – if you are sure, press yes, if you do not want to cancel, press no
                      </div>
                    )}
                    <PrimaryButton
                      style={{ marginBottom: 15, marginTop: 50 }}
                      onClick={() => {
                        const preauthState = stateData.preauthState
                          ? stateData.preauthState
                          : false;
                        const currentTime = new Date();
                        const bookingTime = currentTransaction.booking.attributes.start;
                        const bookingRemaining = moment(bookingTime).diff(currentTime);

                        // console.log('6666 start', bookingTime);
                        // console.log('6666 now', currentTime);
                        console.log('6666 diff', bookingRemaining > 172800000, bookingRemaining);
                        // console.log('6666 currentTransaction', currentTransaction);
                        cancelByCustomer({
                          id: currentTransaction.id,
                          preauthCancel: preauthState,
                          bookingStartTime: currentTransaction.booking.attributes.start,
                          isCustomer,
                        });
                        this.setState({ showCancelModal: false });
                      }}
                    >
                      Yes
                    </PrimaryButton>
                    <SecondaryButton onClick={() => this.setState({ showCancelModal: false })}>
                      No
                    </SecondaryButton>
                  </Modal>
                )}
              </div>
            ) : null}
          </div>

          <div className={css.asideDesktop}>
            <div className={css.detailCard}>
              <DetailCardImage
                avatarWrapperClassName={css.avatarWrapperDesktop}
                listingTitle={listingTitle}
                image={firstImage}
                provider={currentProvider}
                isCustomer={isCustomer}
                listingId={currentListing.id && currentListing.id.uuid}
                listingDeleted={listingDeleted}
              />

              <DetailCardHeadingsMaybe
                showDetailCardHeadings={stateData.showDetailCardHeadings}
                listingTitle={listingTitle}
                subTitle={bookingSubTitle}
                location={location}
                geolocation={geolocation}
                showAddress={stateData.showAddress}
              />
              {stateData.showBookingPanel ? (
                <BookingPanel
                  className={css.bookingPanel}
                  titleClassName={css.bookingTitle}
                  isOwnListing={false}
                  listing={currentListing}
                  title={listingTitle}
                  subTitle={bookingSubTitle}
                  authorDisplayName={authorDisplayName}
                  onSubmit={onSubmitBookingRequest}
                  onManageDisableScrolling={onManageDisableScrolling}
                  monthlyTimeSlots={monthlyTimeSlots}
                  onFetchTimeSlots={onFetchTimeSlots}
                />
              ) : null}
              <BreakdownMaybe
                className={css.breakdownContainer}
                transaction={currentTransaction}
                transactionRole={transactionRole}
              />

              {stateData.showSaleButtons ? (
                <div className={css.desktopActionButtons}>{saleButtons}</div>
              ) : null}
              {/* {isCustomer && stateData.holdPaymentPeriod && stateData.holdPaymentPeriod === true ? ( */}
              {currentTransaction &&
              currentTransaction.booking &&
              moment(currentTransaction.booking.attributes.start).diff(new Date()) > 0 &&
              ((isCustomer && stateData.showCancel && stateData.showCancel !== false) ||
                (!isCustomer && stateData.allowProviderCancel)) ? (
                <div
                  className={css.desktopActionButtons}
                  style={{ maxWidth: '80%', margin: '50px auto' }}
                >
                  <PrimaryButton
                    onClick={() => {
                      const preauthState = stateData.preauthState ? stateData.preauthState : false;
                      const currentTime = new Date();
                      const bookingTime = currentTransaction.booking.attributes.start;
                      const bookingRemaining = moment(bookingTime).diff(currentTime);
                      this.setState({
                        showCancelModal: true,
                        currentTimePastHourCap: bookingRemaining > 172800000 ? false : true,
                        preauthCancel: preauthState,
                      });
                    }}
                  >
                    Cancel Meeting
                  </PrimaryButton>
                  {this.state.showCancelModal && (
                    <Modal
                      id="TransactionPanel.cancelModal"
                      isOpen={this.state.showCancelModal}
                      onClose={() => this.setState({ showCancelModal: false })}
                      onManageDisableScrolling={onManageDisableScrolling}
                    >
                      {(!this.state.currentTimePastHourCap ||
                        this.state.preauthCancel ||
                        !isCustomer) && (
                        <div>
                          Are you sure you want to cancel this meeting – if you are sure, press yes,
                          if you do not want to cancel, press no
                        </div>
                      )}

                      {this.state.currentTimePastHourCap &&
                        isCustomer &&
                        !this.state.preauthCancel && (
                          <div>
                            Are you sure you want to cancel this meeting as this cancellation will
                            see no refund (please see{' '}
                            <NamedLink name="TermsOfServicePage" className={css.link}>
                              terms and conditions
                            </NamedLink>
                            ) – if you are sure, press yes, if you do not want to cancel, press no
                          </div>
                        )}
                      <PrimaryButton
                        style={{ marginBottom: 15, marginTop: 50 }}
                        onClick={() => {
                          const preauthState = stateData.preauthState
                            ? stateData.preauthState
                            : false;
                          const currentTime = new Date();
                          const bookingTime = currentTransaction.booking.attributes.start;
                          const bookingRemaining = moment(bookingTime).diff(currentTime);

                          // console.log('6666 start', bookingTime);
                          // console.log('6666 now', currentTime);
                          console.log('6666 diff', bookingRemaining > 172800000, bookingRemaining);
                          // console.log('6666 currentTransaction', currentTransaction);
                          cancelByCustomer({
                            id: currentTransaction.id,
                            preauthCancel: preauthState,
                            bookingStartTime: currentTransaction.booking.attributes.start,
                            isCustomer,
                          });
                          this.setState({ showCancelModal: false });
                        }}
                      >
                        Yes
                      </PrimaryButton>
                      <SecondaryButton onClick={() => this.setState({ showCancelModal: false })}>
                        No
                      </SecondaryButton>
                    </Modal>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <ReviewModal
          id="ReviewOrderModal"
          isOpen={this.state.isReviewModalOpen}
          onCloseModal={() => this.setState({ isReviewModalOpen: false })}
          onManageDisableScrolling={onManageDisableScrolling}
          onSubmitReview={this.onSubmitReview}
          revieweeName={otherUserDisplayName}
          reviewSent={this.state.reviewSubmitted}
          sendReviewInProgress={sendReviewInProgress}
          sendReviewError={sendReviewError}
        />
      </div>
    );
  }
}

TransactionPanelComponent.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  acceptSaleError: null,
  declineSaleError: null,
  fetchMessagesError: null,
  initialMessageFailed: false,
  savePaymentMethodFailed: false,
  sendMessageError: null,
  sendReviewError: null,
  monthlyTimeSlots: null,
  nextTransitions: null,
};

TransactionPanelComponent.propTypes = {
  rootClassName: string,
  className: string,

  currentUser: propTypes.currentUser,
  transaction: propTypes.transaction.isRequired,
  totalMessagePages: number.isRequired,
  oldestMessagePageFetched: number.isRequired,
  messages: arrayOf(propTypes.message).isRequired,
  initialMessageFailed: bool,
  savePaymentMethodFailed: bool,
  fetchMessagesInProgress: bool.isRequired,
  fetchMessagesError: propTypes.error,
  sendMessageInProgress: bool.isRequired,
  sendMessageError: propTypes.error,
  sendReviewInProgress: bool.isRequired,
  sendReviewError: propTypes.error,
  onFetchTimeSlots: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onShowMoreMessages: func.isRequired,
  onSendMessage: func.isRequired,
  onSendReview: func.isRequired,
  onSubmitBookingRequest: func.isRequired,
  monthlyTimeSlots: object,
  nextTransitions: array,

  // Sale related props
  onAcceptSale: func.isRequired,
  onDeclineSale: func.isRequired,
  acceptInProgress: bool.isRequired,
  declineInProgress: bool.isRequired,
  acceptSaleError: propTypes.error,
  declineSaleError: propTypes.error,

  // from injectIntl
  intl: intlShape,
};

const TransactionPanel = injectIntl(TransactionPanelComponent);

export default TransactionPanel;
