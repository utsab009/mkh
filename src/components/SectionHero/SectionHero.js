import React, { useState } from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink, Modal, Button} from '../../components';
import { SectorsFilterForm } from '../../forms';

import css from './SectionHero.css';

const SectionHero = props => {
  const { rootClassName, className, onManageDisableScrolling } = props;

  const [isEditPlanModalOpen, setIsEditPlanModalOpen] = useState(true);

  const classes = classNames(rootClassName || css.root, className);

  const profileTypeSelection = (jobType) => {
     console.log("job type is:",jobType);
     setIsEditPlanModalOpen(true);
  };

  const handleSubmit = values => {
    // const { fname, lname, ...rest } = values;
    // const params = { firstName: fname.trim(), lastName: lname.trim(), ...rest };
    // submitSignup(params);

    console.log("form submitted",values);
  };

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          <FormattedMessage id="SectionHero.title" />
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionHero.subTitle" />
        </h2>
        <NamedLink
          name="SearchPage"
          to={{
            search:
              'address=United%20States%20of%20America&bounds=71.540724%2C-66.885444%2C18.765563%2C-179.9',
          }}
          className={css.heroButton}
        >
          <FormattedMessage id="SectionHero.browseButton" />
        </NamedLink>
        <div className={css.inlineButtons}>
          <Button onClick={() => profileTypeSelection('jobrole')} className={css.heroButton}>
            <FormattedMessage id="SectionHero.interviewProfileType" />
          </Button>
          <Button onClick={() => profileTypeSelection('jobinterview')} className={css.heroButton}>
            <FormattedMessage id="SectionHero.jobroleProfileType" />
          </Button>
        </div>    

        <Modal
          id="MenteeSignupPage.tos"
          isOpen={isEditPlanModalOpen}
          onClose={() => setIsEditPlanModalOpen(false)}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <SectorsFilterForm
            // className={css.form}
            onSubmit={handleSubmit}
            // inProgress={authInProgress}
            // onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
          />
        </Modal>
      </div>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
