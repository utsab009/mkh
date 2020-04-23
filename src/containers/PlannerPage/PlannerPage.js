import React, { Component } from 'react';
import { arrayOf, bool, number, oneOf, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes, DATE_TYPE_DATETIME } from '../../util/types';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  NamedLink,
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer, NotFoundPage } from '../../containers';
import config from '../../config';
import moment from 'moment';
// import 'moment/locale/en-gb';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import css from './PlannerPage.css';
import { loadData } from '../../containers/InboxPage/InboxPage.duck';
// moment.locale("es-es", {
// 	week: {
// 		dow: 1 //Monday is the first day of the week.
// 	}
// });
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export class PlannerPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    transactions: [], 
    events: [], 
    dailyEvents: [],
    selectedDate: null,
    monthStart: moment()
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss'),
    monthEnd: moment()
        .endOf('month')
        .format('YYYY-MM-DD HH:mm:ss'),
    events: [],
    links: [],
    provider_id: props.provider_id,
    };
  }

  txnsToState = (txns) => {
    let events = [];
    const transactions = txns.filter(item => {
        events.push({
          allday:false,
          start: item.booking.attributes.start,
          end : item.booking.attributes.end,
          title: item.listing.attributes.title,
          id: item.id.uuid
        });
        return item;
    });
    this.setState({events : events,transactions : transactions,selectedDate:moment().format('DD-MM-YYYY')});
  };

  onSelectSlot = (date, event = false) => {
    const dailyEvents = this.state.events.filter(item => {
      if(moment(item.start).format('YYYY-MM-DD') === moment(date.start).format('YYYY-MM-DD'))
      // if(moment(item.start).isAfter(date.start) && moment(item.start).isBefore(moment(date.start).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')))
      {
        return item;
      }
    });
    this.setState({dailyEvents:dailyEvents, selectedDate: moment(date.start).format('DD-MM-YYYY')});
    
  };

  onNavigate = (date, view) => {
    let monthChangeDate = {start:moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss')};
    this.onSelectSlot(monthChangeDate);
  
  };

  onSelectEvent = (event, e) => {
    let eventDate = {start:moment(event.start).startOf('day').format('YYYY-MM-DD HH:mm:ss')};
        this.onSelectSlot(eventDate, true);
        // this.props.history.push('/sale/' + event.id + '/details');
  };

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


    if(this.state.transactions.length == 0 && transactions.length > 0)
    {
      this.txnsToState(transactions);
    }

    const itemList = item => {
        return (
          <li key={item.id} className={css.listItem}>
            <NamedLink name={'SaleDetailsPage'} params={{ id: item.id }}>
              <span className={css.linkTitle}>{item.title}</span>
              <span className={css.linkDate}>{moment(item.start).format('HH:mm')}</span>
            </NamedLink>
          </li>
        );
    };
    return (
      <Page className={css.root} title={"Planner"} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="Planner" />
            <UserNav selectedPageName="Planner" listing={currentUserListing} />
          </LayoutWrapperTopbar>
          {<LayoutWrapperMain>
            <div className={css.content}>
              <div className={css.headingContainer}>
                <h1 className={css.heading}>
                  <FormattedMessage id="Planner.heading" />
                </h1>
              </div>
              <div>
                <div style={{ height: '800px' }}>
                  <Calendar
                    className={css.abc}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={moment().toDate()}
                    localizer={localizer}
                    defaultView="month"
                    views={['month']}
                    onNavigate={this.onNavigate}
                    onSelectEvent={this.onSelectEvent}
                    selectable={true}
                    onSelectSlot={this.onSelectSlot}
                  />
                </div>
                <div id={'eventdiv'} className={css.eventDiv}>
                  {this.state.dailyEvents.length > 0 ? (
                    <div>
                      <h2>Bookings for {this.state.selectedDate}</h2>
                      <ul>
                        {this.state.dailyEvents.map(itemList)}
                      </ul>
                    </div>
                  ) : (
                    <h2>No Bookings on {this.state.selectedDate}</h2>
                  )}
                </div>
              </div>
            </div>
          </LayoutWrapperMain>}
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
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
