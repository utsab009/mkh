import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.css';

const SectionFeaturesMaybe = props => {
  const { options, publicData } = props;
  if (!publicData) {
    return null;
  }
  console.log("publicData in sectionfeaturesMaybe",publicData);
  //////////////////////////// default Code //////////////////////////////////////////////////////
  // const selectedOptions = publicData && publicData.yogaStyles ? publicData.yogaStyles : [];  //
  // const selectedConfigOptions = options.filter(o => selectedOptions.find(s => s === o.key)); //
  //////////////////////////// default code ends /////////////////////////////////////////////////
  const {sectors = null, subsectors = null, jobroles = null, mentorLanguage = null, mentorShift = null} = publicData;
  const sectorElement = sectors !== null ? (<p>{sectors}</p>) : null ;
  const subsectorElement = subsectors !== null ? (<p>{subsectors}</p>) : null ;
  const jobroleElement = jobroles !== null ? (<p>{jobroles}</p>) : null ;
  const mentorLanguageElement = mentorLanguage !== null ? (<p>{mentorLanguage}</p>) : null ;
  const mentorShiftElement = mentorShift !== null ? (<p>{mentorShift}</p>) : null ;
  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.sectorTitle" />
      </h2>
      {sectorElement}
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.subSectorTitle" />
      </h2>
      {subsectorElement}
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.jobRoleTitle" />
      </h2>
      {jobroleElement}
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.mentorLanguageTitle" />
      </h2>
      {mentorLanguageElement}
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.mentorLanguageTitle" />
      </h2>
      {mentorLanguageElement}
      {/*<PropertyGroup
        id="ListingPage.yogaStyles"
        options={selectedConfigOptions}
        selectedOptions={selectedOptions}
        twoColumns={selectedConfigOptions > 5}
      />*/}
    </div>
  );
};

export default SectionFeaturesMaybe;
