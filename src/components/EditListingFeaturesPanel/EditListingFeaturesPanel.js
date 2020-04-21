import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingFeaturesForm } from '../../forms';
import {  
  Form,
  PrimaryButton,
  InlineTextButton,
  ListingLink,
  Modal, 
  FieldTextInput
} from '../../components';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import css from './EditListingFeaturesPanel.css';

const FEATURES_NAME = 'yogaStyles';

const submit = () => values => {
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
  console.log("values in submit",values);
};

const EditListingFeaturesPanel = props => {
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
  } = props;

  const [isSendMsgModalOpen, setIsSendMsgModalOpen] = useState(false);

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingFeaturesPanel.title"
      values={{
        listingTitle: (
          <ListingLink listing={listing}>
            <FormattedMessage id="EditListingFeaturesPanel.listingTitle" />
          </ListingLink>
        ),
      }}
    />
  ) : (
    <FormattedMessage id="EditListingFeaturesPanel.createListingTitle" />
  );

  // const yogaStyles = publicData && publicData.yogaStyles;
  const sectors = publicData && publicData.sectors;
  const subsectors = publicData && publicData.subsectors;
  const jobroles = publicData && publicData.jobroles;
  const initialValues = { sectors, subsectors, jobroles };

  return (
    
    <div className={classes}>
     
      <h1 className={css.title}>{panelTitle}</h1>
      <InlineTextButton
                    className={css.btnModSl}
                    onClick={() => setIsSendMsgModalOpen(true)}
                  >
                  open Modal2
              </InlineTextButton>
      
      <EditListingFeaturesForm
        className={css.form}
        name={FEATURES_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          // const { yogaStyles = [] } = values;
          const { sectors = '', subsectors = '', jobroles = '' } = values;

          const updatedValues = {
            publicData: { sectors, subsectors, jobroles},
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
      />
       <Modal
        id="EditAvailabilityPlan"
        isOpen={isSendMsgModalOpen}
        onClose={() => setIsSendMsgModalOpen(false)}
        onManageDisableScrolling={onManageDisableScrolling}
        // containerClassName={css.modalContainer}
        className={css.updateModalcol}
      >
        <FinalForm
          // {...restOfprops}
          onSubmit={submit()}
          mutators={{
            ...arrayMutators,
          }}
          render={fieldRenderProps => {
            const {
              // rootClassName,
              // className,
              // formId,
              // handleSubmit,
              // inProgress,
              // intl,
              // listingTitle,
              // weekdays,
              // fetchErrors,
              handleSubmit,
              values,
            } = fieldRenderProps;

            const classes = classNames(rootClassName || css.root, className);
            // const submitInProgress = inProgress;

            // const concatDayEntriesReducer = (entries, day) =>
            //   values[day] ? entries.concat(values[day]) : entries;
            // const hasUnfinishedEntries = !!weekdays
            //   .reduce(concatDayEntriesReducer, [])
            //   .find(e => !e.startTime || !e.endTime);

            // const { updateListingError } = fetchErrors || {};

            // const submitDisabled = submitInProgress || hasUnfinishedEntries;

            // const mentorShifts = config.custom.mentorShifts

            // const mentorShiftLabel = intl.formatMessage({
            //   id: 'EditListingAvailabilityPlanForm.mentorShiftLabel',
            // });

            return (
              <Form id={"sendmsg"} className={`${classes} ${css.updatePnl}`} onSubmit={handleSubmit}>
                {/*<h2 className={css.heading}>
                  <FormattedMessage
                    id="EditListingAvailabilityPlanForm.title"
                    values={{ listingTitle }}
                  />
                </h2>
            */} 
                <div className={css.formg}>
                  <FieldTextInput
                    id="emailId"
                    name="emailId"
                    type="text"
                    label={"Email ID"}
                    placeholder={"Enter your email ID"}
                    // validate={composeValidators(required(descriptionRequiredMessage))}
                  />
                </div>
                <div className={css.formg}>
                  <FieldTextInput
                    id="msg"
                    name="msg"
                    type="textarea"
                    label={"Message"}
                    placeholder={"Enter your message here"}
                    // validate={composeValidators(required(descriptionRequiredMessage))}
                  />
                </div>
                  

                <div className={css.submitButtonFG}>
                  {/*updateListingError ? (
                    <p className={css.error}>
                      <FormattedMessage id="EditListingAvailabilityPlanForm.updateFailed" />
                    </p>
                  ) : null*/}
                  <PrimaryButton type="submit" inProgress={false} disabled={false}>
                    <FormattedMessage id="EditListingAvailabilityPlanForm.saveSchedule" />
                  </PrimaryButton>
                </div>
              </Form>
            );
          }}
        />
      </Modal>
      {/*<InlineTextButton
        className={css.editPlanButton}
        onClick={() => setIsSendMsgModalOpen(true)}
      >
      open Modal
      </InlineTextButton>*/}
      
      
    </div>
  );
};

EditListingFeaturesPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingFeaturesPanel.propTypes = {
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

export default EditListingFeaturesPanel;
