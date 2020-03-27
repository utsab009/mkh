import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import arrayMutators from 'final-form-arrays';
import * as validators from '../../util/validators';
import config from '../../config';
import { Form, PrimaryButton, FieldTextInput, FieldSelect, Button } from '../../components';

import css from './SectorsFilterForm.css';

const KEY_CODE_ENTER = 13;

export class SectorsFilterFormComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        validation_error: false,
        subSectors: [],
        jobRoles:[],
      };
  
      this.handleChange = this.handleChange.bind(this);
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
        //   case Default :
        //     return (this.setState({subSectors : config.custom.Accountancyandfinancialmanagement}));  
        }
    }
    render() {
        return (
            <FinalForm
                {...this.props}
                mutators={{ ...arrayMutators }}
                render={fieldRenderProps => {
                const {
                    rootClassName,
                    className,
                    formId,
                    handleSubmit,
                    inProgress,
                    invalid,
                    intl,
                    onOpenTermsOfService,
                } = fieldRenderProps;

                const classes = classNames(rootClassName || css.root, className);

                const sectors = config.custom.sectors

                const sectorLabel = intl.formatMessage({
                    id: 'SectorsFilterForm.sectorLabel',
                });

                const subSectorLabel = intl.formatMessage({
                    id: 'SectorsFilterForm.subSectorLabel',
                });

                const jobRoleLabel = intl.formatMessage({
                    id: 'SectorsFilterForm.jobRoleLabel',
                });

                const buttonText = intl.formatMessage({
                    id: 'SectorsFilterForm.buttonText',
                });

                return (
                    <Form className={classes} onSubmit={handleSubmit}>
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
                            // className={css.submitButton}
                            type="submit"
                            // inProgress={submitInProgress}
                            // disabled={submitDisabled}
                            // ready={submitReady}
                        >
                            {buttonText}
                        </Button>
                    </Form>
                );
                }}
            />
        );
    }
}

SectorsFilterFormComponent.defaultProps = { inProgress: false };

const { bool, func } = PropTypes;

SectorsFilterFormComponent.propTypes = {
  inProgress: bool,

  onOpenTermsOfService: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

// const SectorsFilterForm = compose(injectIntl)(SectorsFilterFormComponent);
// // SectorsFilterForm.displayName = 'SignupForm';

// export default SectorsFilterForm;
export default compose(injectIntl)(SectorsFilterFormComponent);
