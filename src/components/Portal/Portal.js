import React from 'react';
import css from './Portal.css';
import ReactDOM from 'react-dom';
import {
  Page,
  NamedLink,
  NamedRedirect,
  LinkTabNavHorizontal,
  IconEmailSent,
  InlineTextButton,
  IconClose,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  Modal,
  TermsOfService,
} from '../../components';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import {
  isSignupEmailTakenError,
  isTooManyEmailVerificationRequestsError,
} from '../../util/errors';

export default function Portal({
  isOpen,
  children,
  onClose,
  onManageDisableScrolling,
  user,
  sendVerificationEmailInProgress,
  sendVerificationEmailError,
  onResendVerificationEmail,
}) {
  if (!isOpen || !user) return null;

  const name = user.attributes.profile.firstName;
  const email = <span className={css.email}>{user.attributes.email}</span>;
  const resendEmailLink = (
    <InlineTextButton rootClassName={css.modalHelperLink} onClick={onResendVerificationEmail}>
      <FormattedMessage id="AuthenticationPage.resendEmailLinkText" />
    </InlineTextButton>
  );
  const fixEmailLink = (
    <NamedLink className={css.modalHelperLink} name="ContactDetailsPage">
      <FormattedMessage id="AuthenticationPage.fixEmailLinkText" />
    </NamedLink>
  );

  const resendErrorTranslationId = isTooManyEmailVerificationRequestsError(
    sendVerificationEmailError
  )
    ? 'AuthenticationPage.resendFailedTooManyRequests'
    : 'AuthenticationPage.resendFailed';
  const resendErrorMessage = sendVerificationEmailError ? (
    <p className={css.error}>
      <FormattedMessage id={resendErrorTranslationId} />
    </p>
  ) : null;

  return ReactDOM.createPortal(
    <Modal
      id="emailNotVerified"
      isOpen={isOpen}
      onClose={onClose}
      onManageDisableScrolling={onManageDisableScrolling}
      // className={css.landingModal}
      // containerClassName={css.modalContainer}
    >
      <IconEmailSent className={css.modalIcon} />
      <h1 className={css.modalTitle}>
        <FormattedMessage id="AuthenticationPage.verifyEmailTitle" values={{ name }} />
      </h1>
      <p className={css.modalMessage}>
        <FormattedMessage id="AuthenticationPage.verifyEmailText" values={{ email }} />
      </p>
      {resendErrorMessage}

      <div className={css.bottomWrapper}>
        <p className={css.modalHelperText}>
          {sendVerificationEmailInProgress ? (
            <FormattedMessage id="AuthenticationPage.sendingEmail" />
          ) : (
            <FormattedMessage id="AuthenticationPage.resendEmail" values={{ resendEmailLink }} />
          )}
        </p>
        <p className={css.modalHelperText}>
          <FormattedMessage id="AuthenticationPage.checkJunctext" />
        </p>
        <p className={css.modalHelperText}>
          <FormattedMessage id="AuthenticationPage.fixEmail" values={{ fixEmailLink }} />
        </p>
      </div>
    </Modal>,
    document.getElementById('portal-root')
  );
}
