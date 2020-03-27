import React from 'react';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.css';

const CustomProfileTypeSelectFieldMaybe = props => {
  const { name, id, profileTypes, intl } = props;
  const profileTypesLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.profileTypesLabel',
  });

  return profileTypes ? (
    <FieldSelect className={css.profileTypes} name={name} id={id} label={profileTypesLabel}>
      {profileTypes.map(m => (
        <option key={m.key} value={m.key}>
          {m.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomProfileTypeSelectFieldMaybe;
