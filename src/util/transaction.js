import { ensureTransaction } from './data';

/**
 * Transitions
 *
 * These strings must sync with values defined in Flex API,
 * since transaction objects given by API contain info about last transitions.
 * All the actions in API side happen in transitions,
 * so we need to understand what those strings mean.
 */

// When a customer makes a booking to a listing, a transaction is
// created with the initial request-payment transition.
// At this transition a PaymentIntent is created by Marketplace API.
// After this transition, the actual payment must be made on client-side directly to Stripe.
export const TRANSITION_REQUEST_PAYMENT = 'transition/request-payment';

// A customer can also initiate a transaction with an enquiry, and
// then transition that with a request.
export const TRANSITION_ENQUIRE = 'transition/enquire';
export const TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY = 'transition/request-payment-after-enquiry';

// Stripe SDK might need to ask 3D security from customer, in a separate front-end step.
// Therefore we need to make another transition to Marketplace API,
// to tell that the payment is confirmed.
export const TRANSITION_CONFIRM_PAYMENT = 'transition/confirm-payment';

// If the payment is not confirmed in the time limit set in transaction process (by default 15min)
// the transaction will expire automatically.
export const TRANSITION_EXPIRE_PAYMENT = 'transition/expire-payment';

// When the provider accepts or declines a transaction from the
// SalePage, it is transitioned with the accept or decline transition.
export const TRANSITION_ACCEPT = 'transition/accept';

export const TRANSITION_ACCEPT_SHORT_BOOKING = 'transition/accept-short-booking';

export const TRANSITION_DECLINE = 'transition/decline';

// The backend automatically expire the transaction.
export const TRANSITION_EXPIRE = 'transition/expire';

// Admin can also cancel the transition.
export const TRANSITION_CANCEL = 'transition/cancel';

// The backend will mark the transaction completed.
export const TRANSITION_COMPLETE = 'transition/complete';

// Newly added: Wait till the refund period over
export const TRANSITION_BOOKING_PERIOD_END = 'transition/booking-period-end';

export const TRANSITION_SHORT_BOOKING_PERIOD_END = 'transition/short-booking-period-end';

export const TRANSITION_SHORT_BOOKING_JOIN_USER = 'transition/short-booking-join-user';

export const TRANSITION_REFUND_AFTER_USER_JOINED = 'transition/refund-after-user-joined';

export const TRANSITION_SHORT_BOOKING_COMPLETE = 'transition/short-booking-complete';

// Newly added: Wait till the PAYOUT waiting period over (Ex. 7days from booking end)
export const TRANSITION_PAYOUT_WAITING_TIME = 'transition/payout-waiting-time';

// Newly added: raise a payment hold and refund request to admin
export const TRANSITION_HOLD_PAYMENT_REQ = 'transition/hold-payment-request';

// Newly added: cancel by customer at preauth and refund
export const TRANSITION_PREAUTH_CANCEL_REFUND_BY_CUSTOMER = 'transition/decline-customer';

// Newly added: cancel by customer after accept, refund
export const TRANSITION_CANCEL_REFUND_BY_CUSTOMER = 'transition/cancel-refund-by-customer';

// Newly added: cancel by Provider after accept, refund
export const TRANSITION_CANCEL_REFUND_BY_PROVIDER = 'transition/cancel-refund-by-provider';

// Newly added: cancel by customer after booking accepted and within 48hour of booking start, no refund
export const TRANSITION_CANCEL_NO_REFUND_BY_CUSTOMER = 'transition/cancel-no-refund-by-customer';

// Newly added: Initiate a refund when customer raise a refund request after order time over and with refund-period
export const TRANSITION_HOLD_PAYMENT_REQ_SUCCESS = 'transition/pay-back-to-mentee';

// Newly added: ORDER COMPLETD
export const TRANSITION_HOLD_PAYMENT_REQ_FAIL = 'transition/pay-to-mentor';

// Newly added: ORDER COMPLETD
export const TRANSITION_HOLD_PAYMENT_REQ_EXPIRED = 'transition/hold-payment-request-expired';

// Reviews are given through transaction transitions. Review 1 can be
// by provider or customer, and review 2 will be the other party of
// the transaction.
export const TRANSITION_REVIEW_1_BY_PROVIDER = 'transition/review-1-by-provider';
export const TRANSITION_REVIEW_2_BY_PROVIDER = 'transition/review-2-by-provider';
export const TRANSITION_REVIEW_1_BY_CUSTOMER = 'transition/review-1-by-customer';
export const TRANSITION_REVIEW_2_BY_CUSTOMER = 'transition/review-2-by-customer';
export const TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD = 'transition/expire-customer-review-period';
export const TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD = 'transition/expire-provider-review-period';
export const TRANSITION_EXPIRE_REVIEW_PERIOD = 'transition/expire-review-period';

/**
 * Actors
 *
 * There are 4 different actors that might initiate transitions:
 */

// Roles of actors that perform transaction transitions
export const TX_TRANSITION_ACTOR_CUSTOMER = 'customer';
export const TX_TRANSITION_ACTOR_PROVIDER = 'provider';
export const TX_TRANSITION_ACTOR_SYSTEM = 'system';
export const TX_TRANSITION_ACTOR_OPERATOR = 'operator';

export const TX_TRANSITION_ACTORS = [
  TX_TRANSITION_ACTOR_CUSTOMER,
  TX_TRANSITION_ACTOR_PROVIDER,
  TX_TRANSITION_ACTOR_SYSTEM,
  TX_TRANSITION_ACTOR_OPERATOR,
];

/**
 * States
 *
 * These constants are only for making it clear how transitions work together.
 * You should not use these constants outside of this file.
 *
 * Note: these states are not in sync with states used transaction process definitions
 *       in Marketplace API. Only last transitions are passed along transaction object.
 */
const STATE_INITIAL = 'initial';
const STATE_ENQUIRY = 'enquiry';
const STATE_PENDING_PAYMENT = 'pending-payment';
const STATE_PAYMENT_EXPIRED = 'payment-expired';
const STATE_PREAUTHORIZED = 'preauthorized';
const STATE_DECLINED = 'declined';
const STATE_ACCEPTED = 'accepted';
const STATE_CANCELED = 'canceled';
const STATE_DELIVERED = 'delivered';
const STATE_REVIEWED = 'reviewed';
const STATE_BOOKING_ENDED = 'booking-ended';
const STATE_PAYOUT_WAITING = 'payout-waiting';
const STATE_HOLD_PAYMENT_REQUEST = 'hold-payment-request';
const STATE_REVIEWED_BY_CUSTOMER = 'reviewed-by-customer';
const STATE_REVIEWED_BY_PROVIDER = 'reviewed-by-provider';
const STATE_ACCEPTED_SHORT_BOOKING = 'accepted-short-booking';
const STATE_SHORT_BOOKING_ENDED = 'short-booking-ended';
const STATE_SHORT_BOOKING_USER_JOINED = 'short-booking-user-joined';

/**
 * Description of transaction process
 *
 * You should keep this in sync with transaction process defined in Marketplace API
 *
 * Note: we don't use yet any state machine library,
 *       but this description format is following Xstate (FSM library)
 *       https://xstate.js.org/docs/
 */
const stateDescription = {
  // id is defined only to support Xstate format.
  // However if you have multiple transaction processes defined,
  // it is best to keep them in sync with transaction process aliases.
  id: 'preauth-unit-time-booking/release-1',

  // This 'initial' state is a starting point for new transaction
  initial: STATE_INITIAL,

  // States
  states: {
    [STATE_INITIAL]: {
      on: {
        [TRANSITION_ENQUIRE]: STATE_ENQUIRY,
        [TRANSITION_REQUEST_PAYMENT]: STATE_PENDING_PAYMENT,
      },
    },
    [STATE_ENQUIRY]: {
      on: {
        [TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY]: STATE_PENDING_PAYMENT,
      },
    },

    [STATE_PENDING_PAYMENT]: {
      on: {
        [TRANSITION_EXPIRE_PAYMENT]: STATE_PAYMENT_EXPIRED,
        [TRANSITION_CONFIRM_PAYMENT]: STATE_PREAUTHORIZED,
      },
    },

    [STATE_PAYMENT_EXPIRED]: {},
    [STATE_PREAUTHORIZED]: {
      on: {
        [TRANSITION_DECLINE]: STATE_DECLINED,
        [TRANSITION_PREAUTH_CANCEL_REFUND_BY_CUSTOMER]: STATE_DECLINED,
        [TRANSITION_EXPIRE]: STATE_DECLINED,
        [TRANSITION_ACCEPT]: STATE_ACCEPTED,
        [TRANSITION_ACCEPT_SHORT_BOOKING]: STATE_ACCEPTED_SHORT_BOOKING,
      },
    },

    [STATE_DECLINED]: {},
    [STATE_ACCEPTED]: {
      on: {
        [TRANSITION_CANCEL]: STATE_CANCELED,
        [TRANSITION_BOOKING_PERIOD_END]: STATE_BOOKING_ENDED,
        [TRANSITION_CANCEL_REFUND_BY_CUSTOMER]: STATE_CANCELED,
        [TRANSITION_CANCEL_NO_REFUND_BY_CUSTOMER]: STATE_CANCELED,
        [TRANSITION_CANCEL_REFUND_BY_PROVIDER]: STATE_CANCELED,
      },
    },

    [TRANSITION_ACCEPT_SHORT_BOOKING]: {
      on: {
        [TRANSITION_SHORT_BOOKING_PERIOD_END]: STATE_SHORT_BOOKING_ENDED,
        [TRANSITION_SHORT_BOOKING_JOIN_USER]: STATE_SHORT_BOOKING_USER_JOINED,
      },
    },
    [STATE_SHORT_BOOKING_ENDED]: {
      on: {
        [TRANSITION_SHORT_BOOKING_COMPLETE]: STATE_DELIVERED,
      },
    },
    [STATE_SHORT_BOOKING_USER_JOINED]: {
      on: {
        [TRANSITION_REFUND_AFTER_USER_JOINED]: STATE_DELIVERED,
      },
    },

    [STATE_BOOKING_ENDED]: {
      on: {
        [TRANSITION_HOLD_PAYMENT_REQ_SUCCESS]: STATE_CANCELED,
        [TRANSITION_HOLD_PAYMENT_REQ_FAIL]: STATE_PAYOUT_WAITING,
        [TRANSITION_COMPLETE]: STATE_DELIVERED,
      },
    },
    [STATE_PAYOUT_WAITING]: {
      on: {
        [TRANSITION_PAYOUT_WAITING_TIME]: STATE_DELIVERED,
      },
    },

    [STATE_CANCELED]: {},
    [STATE_DELIVERED]: {
      on: {
        [TRANSITION_EXPIRE_REVIEW_PERIOD]: STATE_REVIEWED,
        [TRANSITION_REVIEW_1_BY_CUSTOMER]: STATE_REVIEWED_BY_CUSTOMER,
        [TRANSITION_REVIEW_1_BY_PROVIDER]: STATE_REVIEWED_BY_PROVIDER,
      },
    },

    [STATE_REVIEWED_BY_CUSTOMER]: {
      on: {
        [TRANSITION_REVIEW_2_BY_PROVIDER]: STATE_REVIEWED,
        [TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD]: STATE_REVIEWED,
      },
    },
    [STATE_REVIEWED_BY_PROVIDER]: {
      on: {
        [TRANSITION_REVIEW_2_BY_CUSTOMER]: STATE_REVIEWED,
        [TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD]: STATE_REVIEWED,
      },
    },
    [STATE_REVIEWED]: { type: 'final' },
  },
};

// Note: currently we assume that state description doesn't contain nested states.
const statesFromStateDescription = description => description.states || {};

// Get all the transitions from states object in an array
const getTransitions = states => {
  const stateNames = Object.keys(states);

  const transitionsReducer = (transitionArray, name) => {
    const stateTransitions = states[name] && states[name].on;
    const transitionKeys = stateTransitions ? Object.keys(stateTransitions) : [];
    return [
      ...transitionArray,
      ...transitionKeys.map(key => ({ key, value: stateTransitions[key] })),
    ];
  };

  return stateNames.reduce(transitionsReducer, []);
};

// This is a list of all the transitions that this app should be able to handle.
export const TRANSITIONS = getTransitions(statesFromStateDescription(stateDescription)).map(
  t => t.key
);

// This function returns a function that has given stateDesc in scope chain.
const getTransitionsToStateFn = stateDesc => state =>
  getTransitions(statesFromStateDescription(stateDesc))
    .filter(t => t.value === state)
    .map(t => t.key);

// Get all the transitions that lead to specified state.
const getTransitionsToState = getTransitionsToStateFn(stateDescription);

// This is needed to fetch transactions that need response from provider.
// I.e. transactions which provider needs to accept or decline
export const transitionsToRequested = getTransitionsToState(STATE_PREAUTHORIZED);

/**
 * Helper functions to figure out if transaction is in a specific state.
 * State is based on lastTransition given by transaction object and state description.
 */

const txLastTransition = tx => ensureTransaction(tx).attributes.lastTransition;

export const txIsEnquired = tx =>
  getTransitionsToState(STATE_ENQUIRY).includes(txLastTransition(tx));

export const txIsPaymentPending = tx =>
  getTransitionsToState(STATE_PENDING_PAYMENT).includes(txLastTransition(tx));

export const txIsPaymentExpired = tx =>
  getTransitionsToState(STATE_PAYMENT_EXPIRED).includes(txLastTransition(tx));

// Note: state name used in Marketplace API docs (and here) is actually preauthorized
// However, word "requested" is used in many places so that we decided to keep it.
export const txIsRequested = tx =>
  getTransitionsToState(STATE_PREAUTHORIZED).includes(txLastTransition(tx));

export const txIsAccepted = tx =>
  getTransitionsToState(STATE_ACCEPTED).includes(txLastTransition(tx));

export const txIsDeclined = tx =>
  getTransitionsToState(STATE_DECLINED).includes(txLastTransition(tx));

export const txIsCanceled = tx =>
  getTransitionsToState(STATE_CANCELED).includes(txLastTransition(tx));

export const txIsDelivered = tx =>
  getTransitionsToState(STATE_DELIVERED).includes(txLastTransition(tx));

export const txIsBookingEnded = tx =>
  getTransitionsToState(STATE_BOOKING_ENDED).includes(txLastTransition(tx));

export const txIsHoldPaymentRequested = tx =>
  getTransitionsToState(STATE_HOLD_PAYMENT_REQUEST).includes(txLastTransition(tx));

export const txIsPaymentWaitingTime = tx =>
  getTransitionsToState(STATE_PAYOUT_WAITING).includes(txLastTransition(tx));

const firstReviewTransitions = [
  ...getTransitionsToState(STATE_REVIEWED_BY_CUSTOMER),
  ...getTransitionsToState(STATE_REVIEWED_BY_PROVIDER),
];
export const txIsInFirstReview = tx => firstReviewTransitions.includes(txLastTransition(tx));

export const txIsInFirstReviewBy = (tx, isCustomer) =>
  isCustomer
    ? getTransitionsToState(STATE_REVIEWED_BY_CUSTOMER).includes(txLastTransition(tx))
    : getTransitionsToState(STATE_REVIEWED_BY_PROVIDER).includes(txLastTransition(tx));

export const txIsReviewed = tx =>
  getTransitionsToState(STATE_REVIEWED).includes(txLastTransition(tx));

/**
 * Helper functions to figure out if transaction has passed a given state.
 * This is based on transitions history given by transaction object.
 */

const txTransitions = tx => ensureTransaction(tx).attributes.transitions || [];
const hasPassedTransition = (transitionName, tx) =>
  !!txTransitions(tx).find(t => t.transition === transitionName);

const hasPassedStateFn = state => tx =>
  getTransitionsToState(state).filter(t => hasPassedTransition(t, tx)).length > 0;

export const txHasBeenAccepted = hasPassedStateFn(STATE_ACCEPTED);
export const txHasBeenDelivered = hasPassedStateFn(STATE_DELIVERED);

/**
 * Other transaction related utility functions
 */

export const transitionIsReviewed = transition =>
  getTransitionsToState(STATE_REVIEWED).includes(transition);

export const transitionIsFirstReviewedBy = (transition, isCustomer) =>
  isCustomer
    ? getTransitionsToState(STATE_REVIEWED_BY_CUSTOMER).includes(transition)
    : getTransitionsToState(STATE_REVIEWED_BY_PROVIDER).includes(transition);

export const getReview1Transition = isCustomer =>
  isCustomer ? TRANSITION_REVIEW_1_BY_CUSTOMER : TRANSITION_REVIEW_1_BY_PROVIDER;

export const getReview2Transition = isCustomer =>
  isCustomer ? TRANSITION_REVIEW_2_BY_CUSTOMER : TRANSITION_REVIEW_2_BY_PROVIDER;

// Check if a transition is the kind that should be rendered
// when showing transition history (e.g. ActivityFeed)
// The first transition and most of the expiration transitions made by system are not relevant
export const isRelevantPastTransition = transition => {
  return [
    TRANSITION_ACCEPT,
    TRANSITION_ACCEPT_SHORT_BOOKING,
    TRANSITION_SHORT_BOOKING_PERIOD_END,
    TRANSITION_SHORT_BOOKING_JOIN_USER,
    TRANSITION_REFUND_AFTER_USER_JOINED,
    TRANSITION_SHORT_BOOKING_COMPLETE,
    TRANSITION_CANCEL,
    TRANSITION_COMPLETE,
    TRANSITION_CONFIRM_PAYMENT,
    TRANSITION_DECLINE,
    TRANSITION_EXPIRE,
    TRANSITION_BOOKING_PERIOD_END,
    TRANSITION_PREAUTH_CANCEL_REFUND_BY_CUSTOMER,
    TRANSITION_CANCEL_REFUND_BY_CUSTOMER,
    TRANSITION_CANCEL_NO_REFUND_BY_CUSTOMER,
    TRANSITION_CANCEL_REFUND_BY_PROVIDER,
    TRANSITION_HOLD_PAYMENT_REQ,
    TRANSITION_HOLD_PAYMENT_REQ_SUCCESS,
    TRANSITION_HOLD_PAYMENT_REQ_FAIL,
    TRANSITION_HOLD_PAYMENT_REQ_EXPIRED,
    TRANSITION_REVIEW_1_BY_CUSTOMER,
    TRANSITION_REVIEW_1_BY_PROVIDER,
    TRANSITION_REVIEW_2_BY_CUSTOMER,
    TRANSITION_REVIEW_2_BY_PROVIDER,
  ].includes(transition);
};

export const isCustomerReview = transition => {
  return [TRANSITION_REVIEW_1_BY_CUSTOMER, TRANSITION_REVIEW_2_BY_CUSTOMER].includes(transition);
};

export const isProviderReview = transition => {
  return [TRANSITION_REVIEW_1_BY_PROVIDER, TRANSITION_REVIEW_2_BY_PROVIDER].includes(transition);
};

export const getUserTxRole = (currentUserId, transaction) => {
  const tx = ensureTransaction(transaction);
  const customer = tx.customer;
  if (currentUserId && currentUserId.uuid && tx.id && customer.id) {
    // user can be either customer or provider
    return currentUserId.uuid === customer.id.uuid
      ? TX_TRANSITION_ACTOR_CUSTOMER
      : TX_TRANSITION_ACTOR_PROVIDER;
  } else {
    throw new Error(`Parameters for "userIsCustomer" function were wrong.
      currentUserId: ${currentUserId}, transaction: ${transaction}`);
  }
};

export const txRoleIsProvider = userRole => userRole === TX_TRANSITION_ACTOR_PROVIDER;
export const txRoleIsCustomer = userRole => userRole === TX_TRANSITION_ACTOR_CUSTOMER;
