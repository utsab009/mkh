import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingPublicForm } from '../../forms';
import { Form, PrimaryButton, InlineTextButton, ListingLink, Modal, FieldTextInput } from '..';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import css from './EditListingPublicPanel.css';
import Axios from 'axios';
import config from '../../config';

const FEATURES_NAME = 'yogaStyles';

////////////
// Portal //
////////////

// TODO: change all the modals to use portals at some point.
// Portal is used here to circumvent the problems that rise
// from different levels of z-indexes in DOM tree.
// Note: React Portal didn't exist when we originally created modals.

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    console.log('this.el', this.props.portalRoot);
    this.props.portalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.props.portalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

const submit = history => values => {
  // const sortedValues = weekdays.reduce(
  //   (submitValues, day) => {
  //     return submitValues[day]
  //       ? {
  //           ...submitValues,
  //           [day]: submitValues[day].sort(sortEntries()),
  //         }
  //       : submitValues;
  //   },
  //   { ...values }
  // );

  // onSubmit(sortedValues);
  console.log('values in submit', history);
  const msg = '<p> Senders Email ID : ' + values.emailId + '</p><p>' + values.msg + '</p>';
  console.log('msg in submit', msg);

  Axios.get(
    // 'http://localhost:3001/extra/email_send?message=' +
    'https://mentorkh.herokuapp.com/extra/email_send?message=' +
      values.msg +
      '&email=' +
      values.emailId
  )
    .then(response => {
      console.log('response in submit', response);
      history.push(
        createResourceLocatorString(
          'LandingPage',
          routes,
          // { keywords: 'php' },
          {},
          // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
          {}
        )
      );
    })
    .catch(e => {
      console.log('e in submit', e);
      history.push(
        createResourceLocatorString(
          'LandingPage',
          routes,
          // { keywords: 'php' },
          {},
          // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
          {}
        )
      );
    });
  const routes = routeConfiguration();
};

const EditListingPublicPanel = props => {
  const {
    rootClassName,
    className,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    onManageDisableScrolling,
    panelUpdated,
    updateInProgress,
    errors,
    history,
  } = props;
  console.log('onManageDisableScrolling', onManageDisableScrolling);
  const [isSendMsgModalOpen, setIsSendMsgModalOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState(null);

  const setPortalRootAfterInitialRender = () => {
    setPortalRoot(document.getElementById('portal-root'));
  };

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  // const panelTitle = isPublished ? (
  //   // <FormattedMessage
  //   //   id="EditListingPublicPanel.title"
  //   //   values={{
  //   //     listingTitle: (
  //   //       <ListingLink listing={listing}>
  //   //         <FormattedMessage id="EditListingPublicPanel.listingTitle" />
  //   //       </ListingLink>
  //   //     ),
  //   //   }}
  //   // />
  //   <FormattedMessage
  //     id="EditListingPublicPanel.title"
  //   />
  // ) : (
  //   <FormattedMessage id="EditListingPublicPanel.createListingTitle" />
  // ); //Default code

  // const yogaStyles = publicData && publicData.yogaStyles;
  const sectors = publicData && publicData.sectors;
  const subsectors = publicData && publicData.subsectors;
  const jobroles = (publicData && publicData.jobroles) || [];
  const initialValues = { sectors, jobroles };
  const panelTitle = (
    <FormattedMessage id="EditListingPublicForm.jobRoleLabel" values={{ subsectors }} />
  );
  // const sectorGroupData = config.custom.sectors.filter(
  //   item => item.key !== 'none' && item.key !== 'Public Service'
  // );
  const roleGroupData = config.custom.nonPublicRoles.filter(item => item.key !== 'none');

  return (
    <main className={classes} ref={setPortalRootAfterInitialRender}>
      {/*<div className={classes} ref={setPortalRootAfterInitialRender}>*/}

      <h1 className={css.title}>{panelTitle}</h1>
      {/* <p>Skip if you do not have experience of this sector</p> */}

      <EditListingPublicForm
        className={css.form}
        name={FEATURES_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          // const { yogaStyles = [] } = values;
          const { jobroles = [] } = values;

          const updatedValues = {
            publicData: {
              // sectors: values.jobroles.length ? ['Public Service'] : publicData.sectors,
              jobroles,
            },
          };
          onSubmit(updatedValues);
        }}
        setIsSendMsgModalOpen={setIsSendMsgModalOpen}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        // sectorGroup={sectorGroupData}
        roleGroup={roleGroupData}
        onManageDisableScrolling={onManageDisableScrolling}
      />
      {/* <p className={css.smallTextIns}>
        If the Seniority Level you were hoping to mentor in is missing, click
        <InlineTextButton className={css.btnModSl} onClick={() => setIsSendMsgModalOpen(true)}>
          &nbsp;here&nbsp;
        </InlineTextButton>
        and tell us so we can include it for you{' '}
      </p> */}

      {/* {portalRoot && onManageDisableScrolling ? (
        <Portal portalRoot={portalRoot}>
          <Modal
            id="EditAvailabilityPlan"
            isOpen={isSendMsgModalOpen}
            onClose={() => setIsSendMsgModalOpen(false)}
            onManageDisableScrolling={onManageDisableScrolling}
            // containerClassName={css.modalContainer}
            // className={css.updateModalcol}
          >
            <FinalForm
              // {...restOfprops}
              onSubmit={submit(history)}
              mutators={{
                ...arrayMutators,
              }}
              render={fieldRenderProps => {
                const { handleSubmit, values } = fieldRenderProps;

                const classes = classNames(rootClassName || css.root, className);

                return (
                  <Form
                    id={'sendmsg'}
                    className={`${classes} ${css.updatePnl}`}
                    onSubmit={handleSubmit}
                  >
                    <div className={css.formg}>
                      <FieldTextInput
                        id="emailId"
                        name="emailId"
                        type="text"
                        label={'E-mail Address'}
                        placeholder={'Enter your E-mail Address'}
                        // validate={composeValidators(required(descriptionRequiredMessage))}
                      />
                    </div>
                    <div className={css.formg}>
                      <FieldTextInput
                        id="msg"
                        name="msg"
                        type="textarea"
                        label={'Message'}
                        placeholder={'Enter your message here'}
                        // validate={composeValidators(required(descriptionRequiredMessage))}
                      />
                    </div>

                    <div className={css.submitButtonFG}>
                      <PrimaryButton type="submit" inProgress={false} disabled={false}>
                        <FormattedMessage id="EditListingAvailabilityPlanForm.saveSchedule" />
                      </PrimaryButton>
                    </div>
                  </Form>
                );
              }}
            />
          </Modal>
        </Portal>
      ) : null} */}

      {/*<InlineTextButton
        className={css.editPlanButton}
        onClick={() => setIsSendMsgModalOpen(true)}
      >
      open Modal
      </InlineTextButton>*/}

      {/*</div>*/}
    </main>
  );
};

EditListingPublicPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingPublicPanel.propTypes = {
  rootClassName: string,
  className: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingPublicPanel;
