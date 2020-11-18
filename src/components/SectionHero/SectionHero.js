// import React, { useState } from 'react';
import React, { Component } from 'react';
import { string, func, shape } from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NamedLink, Modal, Button } from '../../components';
import { SectorsFilterForm } from '../../forms';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';

import vidback from '../../assets/MaleMentor_online.mp4';

import css from './SectionHero.css';

export class SectionHeroComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation_error: false,
      subSectors: [],
      jobRoles: [],
      isSectorModalOpen: false,
      profileTypeSelected: true,
    };

    this.profileTypeSelection = this.profileTypeSelection.bind(this);
  }

  profileTypeSelection(jobType) {
    this.setState({ profileTypeSelected: jobType, isSectorModalOpen: true });
    // setProfileTypeSelected(jobType);
    // setisSectorModalOpen(true);
  }

  // const SectionHero = props => {
  render() {
    const { rootClassName, className, onManageDisableScrolling } = this.props;
    // const [isSectorModalOpen, setisSectorModalOpen] = useState(true);
    // const [profileTypeSelected, setProfileTypeSelected] = useState(null);

    const classes = classNames(rootClassName || css.root, className);

    const handleSubmit = values => {
      console.log('vvvv in submit', values);
      const { sectors, subsectors, jobroles } = values;

      const routes = routeConfiguration();

      this.props.history.push(
        createResourceLocatorString(
          'SearchPage',
          routes,
          // { keywords: 'php' },
          {},
          // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
          { pub_subsectors: subsectors }
        )
      );

      // if (sectors !== 'none') {
      //   this.props.history.push(
      //     createResourceLocatorString(
      //       'SearchPage',
      //       routes,
      //       // { keywords: 'php' },
      //       {},
      //       // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
      //       { pub_sectors: sectors, pub_subSectors: subsectors, pub_jobroles: jobroles }
      //     )
      //   );
      // } else {
      //   this.props.history.push(
      //     createResourceLocatorString(
      //       'SearchPage',
      //       routes,
      //       // { keywords: 'php' },
      //       {},
      //       // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
      //       {}
      //     )
      //   );
      // }
    };

    return (
      <div className={classes}>
        
        <div className={css.heroContent}>
          <h1 className={css.heroMainTitle}>
            <FormattedMessage id="SectionHero.title" />
          </h1>
          {!this.state.isSectorModalOpen ? (
            <div className={css.inlineButtons}>
              <Button
                onClick={() => this.profileTypeSelection('jobrole')}
                className={`${css.heroButton} ${css.modBtn}`}
              >
                <FormattedMessage id="SectionHero.interviewProfileType" />
              </Button>
              <Button
                onClick={() => this.profileTypeSelection('interview')}
                className={`${css.heroButton} ${css.modBtn}`}
              >
                <FormattedMessage id="SectionHero.jobroleProfileType" />
              </Button>
            </div>
          ) : null}
          {this.state.isSectorModalOpen && (
            <Modal
              id="MenteeSignupPage.tos"
              isOpen={this.state.isSectorModalOpen}
              onClose={() => this.setState({ isSectorModalOpen: false })}
              onManageDisableScrolling={onManageDisableScrolling}
            >
              <SectorsFilterForm
                // className={css.form}
                onSubmit={handleSubmit}
                onManageDisableScrolling={onManageDisableScrolling}
                // inProgress={authInProgress}
                // onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
              />
            </Modal>
          )}
        </div>
      
      <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop" 
        className={css.backvid}>
                <source src={vidback} type="video/mp4" />
              </video>
      </div>
    );
  }
}

SectionHeroComponent.defaultProps = { rootClassName: null, className: null };

SectionHeroComponent.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
  rootClassName: string,
  className: string,
};

const SectionHero = compose(
  withRouter,
  // connect(
  //   mapStateToProps,
  //   mapDispatchToProps
  // ),
  injectIntl
)(SectionHeroComponent);

export default SectionHero;
