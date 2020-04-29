import React from 'react';
import { AvatarLarge, AvatarMedium } from '../../components';

import css from './ListingPage.css';

const SectionAvatar = props => {
  const { user } = props;
  console.log("user in sectionAvatar",user);
  return (
    <div className={css.sectionAvatar}>
      <AvatarLarge
        user={user}
        className={`${css.avatarDesktop} ${css.modAv}`}
        initialsClassName={css.initialsDesktop}
        disableProfileLink
      />

      <AvatarMedium user={user} className={`${css.avatarMobile} ${css.modAv}`} disableProfileLink />
    </div>
  );
};

export default SectionAvatar;
