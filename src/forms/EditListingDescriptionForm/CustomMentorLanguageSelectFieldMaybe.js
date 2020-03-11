import React from 'react';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.css';

const CustomMentorLanguageSelectFieldMaybe = props => {
  const { name, id, mentorLanguages, intl } = props;
  const mentorLanguageLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.mentorLanguageLabel',
  });

  return mentorLanguages ? (
    <FieldSelect className={css.mentorLanguage} name={name} id={id} label={mentorLanguageLabel}>
      {mentorLanguages.map(m => (
        <option key={m.key} value={m.key}>
          {m.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomMentorLanguageSelectFieldMaybe;
