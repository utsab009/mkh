import React, { Component } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl } from '../../util/reactIntl';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from '../../util/reactIntl';

import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, Form, FieldSelect } from '../../components';

import css from './EditListingFeaturesForm.css';
import { Default } from '../../components/BookingPanel/BookingPanel.example';

export class EditListingFeaturesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation_error: false,
      subSectors: [],
      jobRoles:[],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if(this.props.initialValues && this.props.initialValues.sectors)
    {
      this.handleChange(this.props.initialValues.sectors);
    } 
  }
  
  handleChange = values => {
    // const subSectors = values.split(' ').join('');

    if(values == "Public Service")
    {
      this.setState({jobRoles: config.custom.publicRoles});
    }
    else
    {
      this.setState({jobRoles: config.custom.nonPublicRoles});
    }
    // const subSectors = config.custom.Civilandstructuralengineering;
    // this.setState({subSectors : subSectors})
    // console.log("subsector using scope",$[subSectors]);
    switch(values){
      case "Accountancy and financial management":
        return (this.setState({subSectors : config.custom.Accountancyandfinancialmanagement}));
      case "Civil and structural engineering":
        return (this.setState({subSectors : config.custom.Civilandstructuralengineering}));
      case "Public Service":
        return (this.setState({subSectors : config.custom.PublicServices}));  
      case Default :
        return (this.setState({subSectors : config.custom.Accountancyandfinancialmanagement}));  
    }
  }
  
  render() {
    console.log("this.props",this.props);
    // const submit = (onSubmit) => values => {
    //   let startTimeValue = moment(values.startDate.date.toString().replace(values.startDate.date.toString().substring(16, 21),values.startHour));
    //   let endTimeValue = moment(values.endDate.date.toString().replace(values.endDate.date.toString().substring(16, 21),values.endHour));
    //   if(startTimeValue.isBefore(endTimeValue))
    //   {
    //     this.setState({validation_error : false});
    //     onSubmit(values,false);
    //   }
    //   else
    //   {
    //     this.setState({validation_error : true});
    //   }
      
    // };
    return (  
      <FinalForm
        {...this.props}
        mutators={{ ...arrayMutators }}
        render={formRenderProps => {
          const {
            disabled,
            ready,
            rootClassName,
            className,
            name,
            handleSubmit,
            pristine,
            saveActionMsg,
            intl,
            updated,
            updateInProgress,
            fetchErrors,
          } = formRenderProps;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = disabled || submitInProgress;

          const { updateListingError, showListingsError } = fetchErrors || {};
          const errorMessage = updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
            </p>
          ) : null;

          const errorMessageShowListing = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingFeaturesForm.showListingFailed" />
            </p>
          ) : null;

          const sectors = config.custom.sectors

          const sectorLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.sectorLabel',
          });

          const subSectorLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.subSectorLabel',
          });

          const jobRoleLabel = intl.formatMessage({
            id: 'EditListingFeaturesForm.jobRoleLabel',
          });

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              {errorMessageShowListing}

              {/*<FieldCheckboxGroup
                className={css.features}
                id={name}
                name={name}
                options={config.custom.yogaStyles}
              />*/}

              <FieldSelect className={css.features} onChange={this.handleChange} name={'sectors'} id={2} label={sectorLabel}>
                {sectors.map(m => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </FieldSelect>

              {this.state.subSectors.length > 0 ? 
                (<FieldSelect className={css.features} name={'subsectors'} id={2} label={subSectorLabel}>
                {this.state.subSectors.map(m => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </FieldSelect>)
              : null
              }

              {this.state.jobRoles.length > 0 ? 
                (<FieldSelect className={css.features} name={'jobroles'} id={2} label={jobRoleLabel}>
                {this.state.jobRoles.map(m => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </FieldSelect>)
              : null
              }

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

EditListingFeaturesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
};

EditListingFeaturesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

// const EditListingFeaturesForm = EditListingFeaturesFormComponent;

// export default EditListingFeaturesForm;
export default compose(injectIntl)(EditListingFeaturesFormComponent);
