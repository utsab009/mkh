// import React, { useState } from 'react';
import React, { Component } from 'react';
import { string,func, shape, } from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NamedLink, Modal, Button} from '../../components';
import { SectorsFilterForm } from '../../forms';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';

import css from './SectionHero.css';

export class  SectionHeroComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation_error: false,
      subSectors: [],
      jobRoles:[],
      isSectorModalOpen: false,
      profileTypeSelected: true
    };

    this.profileTypeSelection = this.profileTypeSelection.bind(this);
  }

  profileTypeSelection(jobType) {
    this.setState({profileTypeSelected : jobType, isSectorModalOpen : true});
    // setProfileTypeSelected(jobType);
    // setisSectorModalOpen(true);
  }

// const SectionHero = props => {
  render () {
    const { rootClassName, className, onManageDisableScrolling } = this.props;
    // const [isSectorModalOpen, setisSectorModalOpen] = useState(true);
    // const [profileTypeSelected, setProfileTypeSelected] = useState(null);

    const classes = classNames(rootClassName || css.root, className);

    

    const handleSubmit = values => {
      const { sectors, subsectors, jobroles } = values;
      
      const routes = routeConfiguration();
     
      if(sectors !== 'none')
      {
        this.props.history.push(
          createResourceLocatorString(
            'SearchPage',
            routes,
            // { keywords: 'php' },
            {},
            // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
            {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles}
          )
        );
      }
      else
      {
        this.props.history.push(
          createResourceLocatorString(
            'SearchPage',
            routes,
            // { keywords: 'php' },
            {},
            // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
            {}
          )
        );
      }
    };

    return (
      <div className={classes}>
        <div className={css.heroContent}>
          <h1 className={css.heroMainTitle}>
            <FormattedMessage id="SectionHero.title" />
          </h1>
          {/* <h2 className={css.heroSubTitle}>
            <FormattedMessage id="SectionHero.subTitle" />
          </h2> */}
          {/*<NamedLink
            name="SearchPage"
            to={{
              search:
                'address=United%20States%20of%20America&bounds=71.540724%2C-66.885444%2C18.765563%2C-179.9',
            }}
            className={css.heroButton}
          >
            <FormattedMessage id="SectionHero.browseButton" />
          </NamedLink>*/}
          {!this.state.isSectorModalOpen ?
            <div className={css.inlineButtons}>
              <Button onClick={() => this.profileTypeSelection('jobrole')} className={`${css.heroButton} ${css.modBtn}`}>
                <FormattedMessage id="SectionHero.interviewProfileType" />
              </Button>
              <Button onClick={() => this.profileTypeSelection('interview')} className={`${css.heroButton} ${css.modBtn}`}>
                <FormattedMessage id="SectionHero.jobroleProfileType" />
              </Button>
            </div>
            : null
          }    

          <Modal
            id="MenteeSignupPage.tos"
            isOpen={this.state.isSectorModalOpen}
            onClose={() => this.setState({isSectorModalOpen:false})}
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
};

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
