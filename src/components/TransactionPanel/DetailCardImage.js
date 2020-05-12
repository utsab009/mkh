import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { createSlug, stringify } from '../../util/urlHelpers';
import { AvatarLarge, AvatarMedium, NamedLink, ResponsiveImage } from '../../components';

import css from './TransactionPanel.css';

const createListingLink = (
  listingId,
  label,
  listingDeleted,
  provider,
  searchParams = {},
  className = ''
) => {
  if (!listingDeleted) {
    const params = { id: listingId, slug: createSlug(label) };
    const to = { search: stringify(searchParams) };
    return (
      <div className={css.sectionAvatar}>
        <AvatarLarge
          user={provider}
          className={`${css.avatarDesktop} ${css.modAv}`}
          initialsClassName={css.initialsDesktop}
          disableProfileLink
        />

        <AvatarMedium
          user={provider}
          // className={`${css.avatarMobile} ${css.modAv}`}
          className={classNames(css.avatarWrapper, css.avatarMobile)}
          disableProfileLink
        />
      </div>
      // <div className={classNames(css.avatarWrapper, css.avatarMobile)}>
      // <NamedLink className={className} name="ListingPage" params={params} to={to}>
      //   {/* <NamedLink
      //   className={classNames(css.avatarWrapper, css.avatarMobile)}
      //   name="ListingPage"
      //   params={params}
      //   to={to}
      // > */}
      //   <AvatarMedium user={provider} disableProfileLink />
      // </NamedLink>
      // </div>
    );
  } else {
    return <FormattedMessage id="TransactionPanel.deletedListingOrderTitle" />;
  }
};

// Functional component as a helper to build AddressLinkMaybe
const DetailCardImage = props => {
  const {
    className,
    rootClassName,
    avatarWrapperClassName,
    listingId,
    listingTitle,
    listingDeleted,
    image,
    provider,
    isCustomer,
  } = props;

  const classes = classNames(rootClassName || css.detailCardImageWrapper, className);
  const listingLink = createListingLink(listingId, listingTitle, listingDeleted, provider);

  return (
    <React.Fragment>
      <div className={classes}>
        {/* <div className={css.aspectWrapper}>
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={listingTitle}
            image={image}
            variants={['landscape-crop', 'landscape-crop2x']}
          />
        </div> */}
        {/* <div className={classNames(css.avatarWrapper, css.avatarMobile)}>
          <AvatarMedium user={provider} disableProfileLink />
        </div> */}
      </div>
      {/* {isCustomer ? ( */}
      <div className={avatarWrapperClassName || css.avatarWrapper}>{listingLink}</div>
      {/* ) : null} */}
    </React.Fragment>
  );
};

export default DetailCardImage;
