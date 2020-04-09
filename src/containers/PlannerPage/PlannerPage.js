import React, { Component } from 'react';
import { arrayOf, bool, number, oneOf, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import {
  txIsAccepted,
  txIsCanceled,
  txIsDeclined,
  txIsEnquired,
  txIsRequested,
  txHasBeenDelivered,
  txIsPaymentExpired,
  txIsPaymentPending,
} from '../../util/transaction';
import { propTypes, DATE_TYPE_DATETIME } from '../../util/types';
import { createSlug, stringify } from '../../util/urlHelpers';
import { ensureCurrentUser, ensureListing } from '../../util/data';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Avatar,
  BookingTimeInfo,
  NamedLink,
  NotificationBadge,
  Page,
  PaginationLinks,
  TabNav,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  IconSpinner,
  UserDisplayName,
} from '../../components';
import { TopbarContainer, NotFoundPage } from '../../containers';
import config from '../../config';
import moment from 'moment';

import { loadData } from '../../containers/InboxPage/InboxPage.duck';
// import css from './PlannerPage.css';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// const formatDate = (intl, date) => {
//   return {
//     short: intl.formatDate(date, {
//       month: 'short',
//       day: 'numeric',
//     }),
//     long: `${intl.formatDate(date)} ${intl.formatTime(date)}`,
//   };
// };

// // Translated name of the state of the given transaction
// export const txState = (intl, tx, type) => {
//   const isOrder = type === 'order';

//   if (txIsEnquired(tx)) {
//     return {
//       nameClassName: isOrder ? css.nameNotEmphasized : css.nameEmphasized,
//       bookingClassName: css.bookingActionNeeded,
//       lastTransitionedAtClassName: css.lastTransitionedAtEmphasized,
//       stateClassName: css.stateActionNeeded,
//       state: intl.formatMessage({
//         id: 'PlannerPage.stateEnquiry',
//       }),
//     };
//   } else if (txIsRequested(tx)) {
//     const requested = isOrder
//       ? {
//           nameClassName: css.nameNotEmphasized,
//           bookingClassName: css.bookingNoActionNeeded,
//           lastTransitionedAtClassName: css.lastTransitionedAtEmphasized,
//           stateClassName: css.stateActionNeeded,
//           state: intl.formatMessage({
//             id: 'PlannerPage.stateRequested',
//           }),
//         }
//       : {
//           nameClassName: css.nameEmphasized,
//           bookingClassName: css.bookingActionNeeded,
//           lastTransitionedAtClassName: css.lastTransitionedAtEmphasized,
//           stateClassName: css.stateActionNeeded,
//           state: intl.formatMessage({
//             id: 'PlannerPage.statePending',
//           }),
//         };

//     return requested;
//   } else if (txIsPaymentPending(tx)) {
//     return {
//       nameClassName: isOrder ? css.nameNotEmphasized : css.nameEmphasized,
//       bookingClassName: css.bookingNoActionNeeded,
//       lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
//       stateClassName: isOrder ? css.stateActionNeeded : css.stateNoActionNeeded,
//       state: intl.formatMessage({
//         id: 'PlannerPage.statePendingPayment',
//       }),
//     };
//   } else if (txIsPaymentExpired(tx)) {
//     return {
//       nameClassName: css.nameNotEmphasized,
//       bookingClassName: css.bookingNoActionNeeded,
//       lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
//       stateClassName: css.stateNoActionNeeded,
//       state: intl.formatMessage({
//         id: 'PlannerPage.stateExpired',
//       }),
//     };
//   } else if (txIsDeclined(tx)) {
//     return {
//       nameClassName: css.nameNotEmphasized,
//       bookingClassName: css.bookingNoActionNeeded,
//       lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
//       stateClassName: css.stateNoActionNeeded,
//       state: intl.formatMessage({
//         id: 'PlannerPage.stateDeclined',
//       }),
//     };
//   } else if (txIsAccepted(tx)) {
//     return {
//       nameClassName: css.nameNotEmphasized,
//       bookingClassName: css.bookingNoActionNeeded,
//       lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
//       stateClassName: css.stateSucces,
//       state: intl.formatMessage({
//         id: 'PlannerPage.stateAccepted',
//       }),
//     };
//   } else if (txIsCanceled(tx)) {
//     return {
//       nameClassName: css.nameNotEmphasized,
//       bookingClassName: css.bookingNoActionNeeded,
//       lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
//       stateClassName: css.stateNoActionNeeded,
//       state: intl.formatMessage({
//         id: 'PlannerPage.stateCanceled',
//       }),
//     };
//   } else if (txHasBeenDelivered(tx)) {
//     return {
//       nameClassName: css.nameNotEmphasized,
//       bookingClassName: css.bookingNoActionNeeded,
//       lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
//       stateClassName: css.stateNoActionNeeded,
//       state: intl.formatMessage({
//         id: 'PlannerPage.stateDelivered',
//       }),
//     };
//   } else {
//     console.warn('This transition is unknown:', tx.attributes.lastTransition);
//     return null;
//   }
// };

// // Functional component as internal helper to print BookingTimeInfo if that is needed
// const BookingInfoMaybe = props => {
//   const { bookingClassName, isOrder, intl, tx, unitType } = props;
//   const isEnquiry = txIsEnquired(tx);

//   if (isEnquiry) {
//     return null;
//   }
//   const listingAttributes = ensureListing(tx.listing).attributes;
//   const timeZone = listingAttributes.availabilityPlan
//     ? listingAttributes.availabilityPlan.timezone
//     : 'Etc/UTC';

//   // If you want to show the booking price after the booking time on PlannerPage you can
//   // add the price after the BookingTimeInfo component. You can get the price by uncommenting
//   // sthe following lines:

//   // const bookingPrice = isOrder ? tx.attributes.payinTotal : tx.attributes.payoutTotal;
//   // const price = bookingPrice ? formatMoney(intl, bookingPrice) : null;

//   // Remember to also add formatMoney function from 'util/currency.js' and add this after BookingTimeInfo:
//   // <div className={css.itemPrice}>{price}</div>

//   return (
//     <div className={classNames(css.bookingInfoWrapper, bookingClassName)}>
//       <BookingTimeInfo
//         bookingClassName={bookingClassName}
//         isOrder={isOrder}
//         intl={intl}
//         tx={tx}
//         unitType={unitType}
//         dateType={DATE_TYPE_DATETIME}
//         timeZone={timeZone}
//       />
//     </div>
//   );
// };

// BookingInfoMaybe.propTypes = {
//   intl: intlShape.isRequired,
//   isOrder: bool.isRequired,
//   tx: propTypes.transaction.isRequired,
//   unitType: propTypes.bookingUnitType.isRequired,
// };

// const createListingLink = (listing, otherUser, searchParams = {}, className = '') => {
//   const listingId = listing.id && listing.id.uuid;
//   const label = listing.attributes.title;
//   const listingDeleted = listing.attributes.deleted;

//   if (!listingDeleted) {
//     const params = { id: listingId, slug: createSlug(label) };
//     const to = { search: stringify(searchParams) };
//     return (
//       <NamedLink className={className} name="ListingPage" params={params} to={to}>
//         <Avatar user={otherUser} disableProfileLink />
//       </NamedLink>
//     );
//   } else {
//     return <FormattedMessage id="TransactionPanel.deletedListingOrderTitle" />;
//   }
// };

// export const InboxItem = props => {
//   const { unitType, type, tx, intl, stateData } = props;
//   const { customer, provider, listing } = tx;
//   const isOrder = type === 'order';

//   const otherUser = isOrder ? provider : customer;
//   const otherUserDisplayName = <UserDisplayName user={otherUser} intl={intl} />;
//   const isOtherUserBanned = otherUser.attributes.banned;

//   const isSaleNotification = !isOrder && txIsRequested(tx);
//   const rowNotificationDot = isSaleNotification ? <div className={css.notificationDot} /> : null;
//   const lastTransitionedAt = formatDate(intl, tx.attributes.lastTransitionedAt);

//   const linkClasses = classNames(css.itemLink, {
//     [css.bannedUserLink]: isOtherUserBanned,
//   });

//   const listingLink = listing ? createListingLink(listing, otherUser) : null;

//   return (
//     <div className={css.item}>
//       <div className={css.itemAvatar}>
//         {isOrder && listing ? listingLink : <Avatar user={otherUser} />}
//       </div>
//       <NamedLink
//         className={linkClasses}
//         name={isOrder ? 'OrderDetailsPage' : 'SaleDetailsPage'}
//         params={{ id: tx.id.uuid }}
//       >
//         <div className={css.rowNotificationDot}>{rowNotificationDot}</div>
//         <div className={css.itemInfo}>
//           <div className={classNames(css.itemUsername, stateData.nameClassName)}>
//             {otherUserDisplayName}
//           </div>
//           <BookingInfoMaybe
//             bookingClassName={stateData.bookingClassName}
//             intl={intl}
//             isOrder={isOrder}
//             tx={tx}
//             unitType={unitType}
//           />
//         </div>
//         <div className={css.itemState}>
//           <div className={classNames(css.stateName, stateData.stateClassName)}>
//             {stateData.state}
//           </div>
//           <div
//             className={classNames(css.lastTransitionedAt, stateData.lastTransitionedAtClassName)}
//             title={lastTransitionedAt.long}
//           >
//             {lastTransitionedAt.short}
//           </div>
//         </div>
//       </NamedLink>
//     </div>
//   );
// };

// InboxItem.propTypes = {
//   unitType: propTypes.bookingUnitType.isRequired,
//   type: oneOf(['order', 'sale']).isRequired,
//   tx: propTypes.transaction.isRequired,
//   intl: intlShape.isRequired,
// };
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// export const PlannerPageComponent = props => {
export class PlannerPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    selectedDate: null,
    monthStart: moment()
        .startOf('month')
        .format('YYYY-MM-DD'),
    monthEnd: moment()
        .endOf('month')
        .format('YYYY-MM-DD'),
    events: [],
    links: [],
    provider_id: props.provider_id,
    };
  }

  /*componentDidMount() {
    if (window) {
      Axios.get(
        'https://pxs5uogx8e.execute-api.eu-west-3.amazonaws.com/dev/booking?provider_id=' +
        this.state.provider_id +
        '&start_date=' +
        this.state.monthStart +
        '&end_date=' +
        this.state.monthEnd
      )
      .then(response => {
        if (response.data !== null) {
            const events = [];
            for (var i = 0; i < response.data.data.length; i++) {
            const eventObj = {
              id: response.data.data[i].transaction_id,
              title: response.data.data[i].listing_name,
              allDay: false,
              start: response.data.data[i].start_time,
              end: response.data.data[i].end_time,
            };
            events.push(eventObj);
          }

          this.setState({ events: events });
        }
      })
      .catch();

      this.onSelectSlot(moment().format('DD MM YYYY'));
    }
  }

  onSelectSlot = (date, event = false) => {
    let startOfDate = '';
    let endOfDate = '';
    let selectedDate = '';
    if (event == false) {
    startOfDate = moment(date.start)
        .startOf('day')
        .utc()
        .format('YYYY-MM-DD HH:mm');
    endOfDate = moment(date.start)
        .startOf('day')
        .add(1, 'day')
        .subtract(1, 'minute')
        .utc()
        .format('YYYY-MM-DD HH:mm');
    selectedDate = date.start;
    } else {
    startOfDate = moment(date)
        .startOf('day')
        .utc()
        .format('YYYY-MM-DD HH:mm');
    endOfDate = moment(date)
        .startOf('day')
        .add(1, 'day')
        .subtract(1, 'minute')
        .utc()
        .format('YYYY-MM-DD HH:mm');
    selectedDate = date;
    }

    Axios.get(
    'https://pxs5uogx8e.execute-api.eu-west-3.amazonaws.com/dev/booking?provider_id=' +
        this.state.provider_id +
        '&start_date=' +
        startOfDate +
        '&end_date=' +
        endOfDate
    )
    .then(response => {
        if (response.data !== null) {
        const links = response.data.data;

        this.setState({ links: links });
        }
        this.setState({ selectedDate: moment(selectedDate).format('MMM DD YYYY') });
    })
    .then(() => {
        if (this.state.links.length > 0) {
        this.props.history.push('#eventdiv');
        }
    })
    .catch();
  };

  onNavigate = (date, view) => {
    let start, end;
    if (view === 'month') {
    start = moment(date)
        .startOf('month')
        .format('YYYY-MM-DD');
    end = moment(date)
        .endOf('month')
        .format('YYYY-MM-DD');
    }

    Axios.get(
    'https://pxs5uogx8e.execute-api.eu-west-3.amazonaws.com/dev/booking?provider_id=' +
        this.state.provider_id +
        '&start_date=' +
        start +
        '&end_date=' +
        end
    )
    .then(response => {
      if (response.data !== null) {
        const events = [];
        for (var i = 0; i < response.data.data.length; i++) {
          const eventObj = {
          id: response.data.data[i].transaction_id,
          title: response.data.data[i].listing_name,
          allDay: false,
          start: response.data.data[i].start_time,
          end: response.data.data[i].end_time,
          };
          events.push(eventObj);
        }
        this.setState({ events: events });
      }
    })
    .catch();

    return true;
  };

  onSelectEvent = (event, e) => {
        this.onSelectSlot(event.start, true);
        // this.props.history.push('/sale/' + event.id + '/details');
  };*/

  render() {    
    const {
      unitType,
      currentUser,
      currentUserListing,
      fetchInProgress,
      fetchOrdersOrSalesError,
      intl,
      pagination,
      params,
      providerNotificationCount,
      scrollingDisabled,
      transactions,
    } = this.props;
    console.log("transaction in plannerpage",transactions);
    // const { tab } = params;
    // const ensuredCurrentUser = ensureCurrentUser(currentUser);

    // const validTab = tab === 'orders' || tab === 'sales';
    // if (!validTab) {
    //   return <NotFoundPage />;
    // }

    // const isOrders = tab === 'orders';

    // const ordersTitle = intl.formatMessage({ id: 'PlannerPage.ordersTitle' });
    // const salesTitle = intl.formatMessage({ id: 'PlannerPage.salesTitle' });
    // const title = isOrders ? ordersTitle : salesTitle;

    // const toTxItem = tx => {
    //   const type = isOrders ? 'order' : 'sale';
    //   const stateData = txState(intl, tx, type);
    //   console.log("tx",tx);
    //   // Render InboxItem only if the latest transition of the transaction is handled in the `txState` function.
    //   return stateData ? (
    //     <li key={tx.id.uuid} className={css.listItem}>
    //       {<InboxItem unitType={unitType} type={type} tx={tx} intl={intl} stateData={stateData} />}
    //     </li>
    //   ) : null;
    // };

    // const error = fetchOrdersOrSalesError ? (
    //   <p className={css.error}>
    //     <FormattedMessage id="PlannerPage.fetchFailed" />
    //   </p>
    // ) : null;

    // const noResults =
    //   !fetchInProgress && transactions.length === 0 && !fetchOrdersOrSalesError ? (
    //     <li key="noResults" className={css.noResults}>
    //       <FormattedMessage id={isOrders ? 'PlannerPage.noOrdersFound' : 'PlannerPage.noSalesFound'} />
    //     </li>
    //   ) : null;

    // const hasOrderOrSaleTransactions = (tx, isOrdersTab, user) => {
    //   return isOrdersTab
    //     ? user.id && tx && tx.length > 0 && tx[0].customer.id.uuid === user.id.uuid
    //     : user.id && tx && tx.length > 0 && tx[0].provider.id.uuid === user.id.uuid;
    // };
    // const hasTransactions =
    //   !fetchInProgress && hasOrderOrSaleTransactions(transactions, isOrders, ensuredCurrentUser);
    // const pagingLinks =
    //   hasTransactions && pagination && pagination.totalPages > 1 ? (
    //     <PaginationLinks
    //       className={css.pagination}
    //       pageName="PlannerPage"
    //       pagePathParams={params}
    //       pagination={pagination}
    //     />
    //   ) : null;

    // const providerNotificationBadge =
    //   providerNotificationCount > 0 ? <NotificationBadge count={providerNotificationCount} /> : null;

    // const tabs = [
    //   {
    //     text: (
    //       <span>
    //         <FormattedMessage id="PlannerPage.ordersTabTitle" />
    //       </span>
    //     ),
    //     selected: isOrders,
    //     linkProps: {
    //       name: 'PlannerPage',
    //       params: { tab: 'orders' },
    //     },
    //   },
    //   {
    //     text: (
    //       <span>
    //         <FormattedMessage id="PlannerPage.salesTabTitle" />
    //         {providerNotificationBadge}
    //       </span>
    //     ),
    //     selected: !isOrders,
    //     linkProps: {
    //       name: 'PlannerPage',
    //       params: { tab: 'sales' },
    //     },
    //   },
    // ];
    // const nav = <TabNav rootClassName={css.tabs} tabRootClassName={css.tab} tabs={tabs} />;

    return (
      <p>hello World</p>
    //   <Page title={title} scrollingDisabled={scrollingDisabled}>
    //     <LayoutSideNavigation>
    //       <LayoutWrapperTopbar>
    //         <TopbarContainer
    //           className={css.topbar}
    //           mobileRootClassName={css.mobileTopbar}
    //           desktopClassName={css.desktopTopbar}
    //           currentPage="PlannerPage"
    //         />
    //       </LayoutWrapperTopbar>
    //       <LayoutWrapperSideNav className={css.navigation}>
    //         <h1 className={css.title}>
    //           <FormattedMessage id="PlannerPage.title" />
    //         </h1>
    //         {currentUserListing ? nav : <div className={css.navPlaceholder} />}
    //       </LayoutWrapperSideNav>
    //       <LayoutWrapperMain>
    //         {error}
    //         <ul className={css.itemList}>
    //           {!fetchInProgress ? (
    //             transactions.map(toTxItem)
    //           ) : (
    //             <li className={css.listItemsLoading}>
    //               <IconSpinner />
    //             </li>
    //           )}
    //           {noResults}
    //         </ul>
    //         {pagingLinks}
    //       </LayoutWrapperMain>
    //       <LayoutWrapperFooter>
    //         <Footer />
    //       </LayoutWrapperFooter>
    //     </LayoutSideNavigation>
    //   </Page>
    );
  }
};

PlannerPageComponent.defaultProps = {
  unitType: config.bookingUnitType,
  currentUser: null,
  currentUserListing: null,
  currentUserHasOrders: null,
  fetchOrdersOrSalesError: null,
  pagination: null,
  providerNotificationCount: 0,
  sendVerificationEmailError: null,
};

PlannerPageComponent.propTypes = {
  params: shape({
    tab: string.isRequired,
  }).isRequired,

  unitType: propTypes.bookingUnitType,
  currentUser: propTypes.currentUser,
  currentUserListing: propTypes.ownListing,
  fetchInProgress: bool.isRequired,
  fetchOrdersOrSalesError: propTypes.error,
  pagination: propTypes.pagination,
  providerNotificationCount: number,
  scrollingDisabled: bool.isRequired,
  transactions: arrayOf(propTypes.transaction).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { fetchInProgress, fetchOrdersOrSalesError, pagination, transactionRefs } = state.InboxPage;
  const {
    currentUser,
    currentUserListing,
    currentUserNotificationCount: providerNotificationCount,
  } = state.user;
  return {
    currentUser,
    currentUserListing,
    fetchInProgress,
    fetchOrdersOrSalesError,
    pagination,
    providerNotificationCount,
    scrollingDisabled: isScrollingDisabled(state),
    transactions: getMarketplaceEntities(state, transactionRefs),
  };
};

const PlannerPage = compose(
  connect(mapStateToProps),
  injectIntl
)(PlannerPageComponent);

PlannerPage.loadData = loadData;

export default PlannerPage;
