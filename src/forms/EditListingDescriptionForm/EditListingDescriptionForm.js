import React, { useEffect, useState, Component } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import {
  Form,
  Button,
  FieldTextInput,
  FieldCheckboxGroup,
  FieldSelect,
  InlineTextButton,
  Modal,
  PrimaryButton,
} from '../../components';
import CustomCertificateSelectFieldMaybe from './CustomCertificateSelectFieldMaybe';
import CustomMentorLanguageSelectFieldMaybe from './CustomMentorLanguageSelectFieldMaybe';
import CustomProfileTypeSelectFieldMaybe from './CustomProfileTypeSelectFieldMaybe';
import Select from 'react-dropdown-select';
import css from './EditListingDescriptionForm.css';
import config from '../../config';
import Axios from 'axios';
const TITLE_MAX_LENGTH = 60;

class EditListingDescriptionFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isMailSectorModalOpen: false };
  }

  render() {
    // const [jobRolesConfigNew, setJobRolesConfig] = useState([]);

    // const customItemRenderer = ({ item, itemIndex, props, state, methods }) => {
    //   // console.log('88888', item);
    //   return (
    //     <FieldSelect {...props} key={itemIndex} onClick={() => methods.addItem(item)}>
    //       <input {...props} type="checkbox" checked={methods.isSelected(item)} /> {item.label}
    //     </FieldSelect>
    //   );
    // };

    return (
      <FinalForm
        {...this.props}
        mutators={{ ...arrayMutators }}
        render={formRenderProps => {
          const {
            certificate,
            mentorLanguages,
            profileTypes,
            className,
            disabled,
            ready,
            handleSubmit,
            intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateInProgress,
            fetchErrors,
            form,
            values,
            rootClassName,
            onManageDisableScrolling,
          } = formRenderProps;
          const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
          const titlePlaceholderMessage = intl.formatMessage({
            id: 'EditListingDescriptionForm.titlePlaceholder',
          });
          const titleRequiredMessage = intl.formatMessage({
            id: 'EditListingDescriptionForm.titleRequired',
          });
          const maxLengthMessage = intl.formatMessage(
            { id: 'EditListingDescriptionForm.maxLength' },
            {
              maxLength: TITLE_MAX_LENGTH,
            }
          );

          const descriptionMessage = intl.formatMessage({
            id: 'EditListingDescriptionForm.description',
          });
          const descriptionPlaceholderMessage = intl.formatMessage({
            id: 'EditListingDescriptionForm.descriptionPlaceholder',
          });
          const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
          const descriptionRequiredMessage = intl.formatMessage({
            id: 'EditListingDescriptionForm.descriptionRequired',
          });

          const { updateListingError, createListingDraftError, showListingsError } =
            fetchErrors || {};
          const errorMessageUpdateListing = updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
            </p>
          ) : null;

          // This error happens only on first tab (of EditListingWizard)
          const errorMessageCreateListingDraft = createListingDraftError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
            </p>
          ) : null;

          const errorMessageShowListing = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
            </p>
          ) : null;

          const classes = classNames(css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;
          console.log({ values });
          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessageCreateListingDraft}
              {errorMessageUpdateListing}
              {errorMessageShowListing}
              <p>
                If your job role is not appearing,
                <InlineTextButton
                  className={css.btnModSl}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ isMailSectorModalOpen: true });
                  }}
                >
                  &nbsp;click here &nbsp;
                </InlineTextButton>
                and tell us so we can include it for you.
              </p>

              <FieldTextInput
                id="title"
                name="title"
                className={css.title}
                type="text"
                label={titleMessage}
                placeholder={titlePlaceholderMessage}
                maxLength={TITLE_MAX_LENGTH}
                validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
                autoFocus
              />

              {/* <FieldTextInput
                id="description"
                name="description"
                className={css.description}
                type="textarea"
                label={descriptionMessage}
                placeholder={descriptionPlaceholderMessage}
                validate={composeValidators(required(descriptionRequiredMessage))}
              /> */}

              {this.state.isMailSectorModalOpen ? (
                <Modal
                  id="EditAvailabilityPlan"
                  isOpen={this.state.isMailSectorModalOpen}
                  onClose={() => this.setState({ isMailSectorModalOpen: false })}
                  onManageDisableScrolling={onManageDisableScrolling}
                  // containerClassName={css.modalContainer}
                  className={css.updateModalcol}
                >
                  <FinalForm
                    // {...restOfprops}
                    onSubmit={test => {
                      console.log('test values: ', test);
                    }}
                    mutators={{
                      ...arrayMutators,
                    }}
                    render={fieldRenderProps => {
                      const { hSubmit, values } = fieldRenderProps;

                      const classes = classNames(rootClassName || css.root, className);

                      return (
                        <Form
                          id={'sendmsg'}
                          className={`${classes} ${css.updatePnl}`}
                          onSubmit={values => {
                            console.log('values: ', values);
                          }}
                        >
                          <div className={css.formg}>
                            <FieldTextInput
                              id="emailId"
                              name="emailId"
                              type="text"
                              label={'Email ID'}
                              placeholder={'Enter your email ID'}
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
                            <PrimaryButton
                              type="button"
                              inProgress={false}
                              disabled={false}
                              onClick={e => {
                                console.log('click values: ', e, values);
                                Axios.get(
                                  // 'http://localhost:3001/extra/email_send?message=' +
                                  'https://mentorkh.herokuapp.com/extra/email_send?message=' +
                                    values.msg +
                                    '&email=' +
                                    values.emailId
                                )
                                  .then(response => {
                                    console.log('response in submit', response);
                                    // history.push(
                                    //   createResourceLocatorString(
                                    //     'LandingPage',
                                    //     routes,
                                    //     // { keywords: 'php' },
                                    //     {},
                                    //     // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
                                    //     {}
                                    //   )
                                    // );
                                  })
                                  .catch(e => {
                                    console.log('e in submit', e);
                                    // history.push(
                                    //   createResourceLocatorString(
                                    //     'LandingPage',
                                    //     routes,
                                    //     // { keywords: 'php' },
                                    //     {},
                                    //     // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
                                    //     {}
                                    //   )
                                    // );
                                  });
                                this.setState({ isMailSectorModalOpen: false });
                              }}
                            >
                              Send Mail
                            </PrimaryButton>
                          </div>
                        </Form>
                      );
                    }}
                  />
                </Modal>
              ) : null}

              <Select
                className={css.selectCss}
                id="subsectors"
                name="subsectors"
                options={config.custom.rolesConfigData()}
                placeholder="Select Job Role"
                // itemRenderer={customItemRenderer}
                values={config.custom.rolesConfigData().filter(x => x.key === values.subsectors)}
                onChange={values => {
                  console.log('values: ', values);
                  form.change('subsectors', values[0].key);
                  // this.onChange(values);
                }}
              />

              {/* <FieldTextInput
              // className={css.lastName}
              type="text"
              id={'youtubelink'}
              name="youtubeLink"
              autoComplete="youtube link"
              label={'YouTube link (Optional)'}
              placeholder={
                'Video explaining why you are the ideal Mentor in general or for this specific role'
              }
              className={css.youtubeLink}
              // validate={lastNameRequired}
            /> */}

              {/*<CustomCertificateSelectFieldMaybe
              id="certificate"
              name="certificate"
              certificate={certificate}
              intl={intl}
            />*/}

              {/*<FieldCheckboxGroup
              className={css.profileTypes}
              id="profileType"
              name="profileType"
              options={profileTypes}
            />*/}

              {/* <FieldCheckboxGroup
              label={'What Languages can you mentor in?'}
              className={css.profileTypes}
              id="mentorLanguage"
              name="mentorLanguage"
              options={mentorLanguages}
            /> */}

              {/*<CustomMentorLanguageSelectFieldMaybe
              id="mentorLanguage"
              name="mentorLanguage"
              mentorLanguages={mentorLanguages}
              intl={intl}
            />*/}

              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  certificate: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
