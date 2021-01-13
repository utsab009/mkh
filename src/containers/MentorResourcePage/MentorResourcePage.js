import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink,
  InlineTextButton,
  Modal,
  PrimaryButton,
  Form,
  Button,
  FieldTextInput,
} from '../../components';
import config from '../../config';
import Axios from 'axios';

import { Tabs, Tab } from 'react-bootstrap';
import css from './MentorResourcePage.css';
// import image from './path/to/image.png';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';
class MentorResourcePage extends React.Component {
  state = {
    isMailSectorModalOpen: false,
  };

  render() {
    // return (
    //   <embed
    //     src="https://tryamentor.net/category/mentor/"
    //     style={{ width: '100%', height: '100vh' }}
    //   ></embed>
    // );
    return (
      <StaticPage
        className={css.root}
        title="Mentor Resource"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'MentorResourcePage',
          description: 'Description of this page',
          name: 'Mentor Resource',
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <embed
              src="https://tryamentor.net/category/mentor/"
              style={{ width: '100%', height: '100vh' }}
            ></embed>
            {/* <div className={css.contentContainer}>
              {this.state.isMailSectorModalOpen ? (
                <Modal
                  id="MenteeResourcePage"
                  isOpen={this.state.isMailSectorModalOpen}
                  onClose={() => this.setState({ isMailSectorModalOpen: false })}
                  onManageDisableScrolling={() => {}}
                  // containerClassName={css.modalContainer}
                  className={css.updateModalcol}
                >
                  <FinalForm
                    // {...restOfprops}
                    onSubmit={test => {
                      console.log('test values: ', test);
                    }}
                    mutators={{
                      ...arrayMutators,
                    }}
                    render={fieldRenderProps => {
                      const { hSubmit, values, rootClassName, className } = fieldRenderProps;

                      const classes = classNames(rootClassName || css.root, className);

                      return (
                        <Form
                          id={'sendmsg'}
                          className={`${classes} ${css.updatePnl}`}
                          onSubmit={values => {
                            console.log('values: ', values);
                          }}
                        >
                          <div className={css.formg}>
                            <FieldTextInput
                              id="emailId"
                              name="emailId"
                              type="text"
                              label={'E-mail Address'}
                              placeholder={'Enter your E-mail Address'}
                              // validate={composeValidators(required(descriptionRequiredMessage))}
                            />
                          </div>
                          <div className={css.formg}>
                            <FieldTextInput
                              id="msg"
                              name="msg"
                              type="textarea"
                              label={'Message'}
                              placeholder={'Enter your message here'}
                              // validate={composeValidators(required(descriptionRequiredMessage))}
                            />
                          </div>

                          <div className={css.submitButtonFG}>
                            <PrimaryButton
                              type="button"
                              inProgress={false}
                              disabled={false}
                              onClick={e => {
                                console.log('click values: ', e, values);
                                Axios.get(
                                  // 'http://localhost:3001/extra/email_send?message=' +
                                  'https://mentorkh.herokuapp.com/extra/email_send?message=' +
                                    values.msg +
                                    '&email=' +
                                    values.emailId
                                )
                                  .then(response => {
                                    console.log('response in submit', response);
                                    // history.push(
                                    //   createResourceLocatorString(
                                    //     'LandingPage',
                                    //     routes,
                                    //     // { keywords: 'php' },
                                    //     {},
                                    //     // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
                                    //     {}
                                    //   )
                                    // );
                                  })
                                  .catch(e => {
                                    console.log('e in submit', e);
                                    // history.push(
                                    //   createResourceLocatorString(
                                    //     'LandingPage',
                                    //     routes,
                                    //     // { keywords: 'php' },
                                    //     {},
                                    //     // {pub_sectors : sectors, pub_subSectors : subsectors, pub_jobroles: jobroles,pub_profileType : this.state.profileTypeSelected}
                                    //     {}
                                    //   )
                                    // );
                                  });
                                this.setState({ isMailSectorModalOpen: false });
                              }}
                            >
                              Send Mail
                            </PrimaryButton>
                          </div>
                        </Form>
                      );
                    }}
                  />
                </Modal>
              ) : null}
              <div className={css.mrhed}>
                <h3>
                  Mentor Resources <span>An ever-growing list of Resources</span>
                </h3>
              </div>
              <div class="modtab">
                <p className={`${css.etctxt} ${css.tbletctxt}`}>
                  If there is{' '}
                  <span
                    className={css.link}
                    onClick={() => this.setState({ isMailSectorModalOpen: true })}
                  >
                    resource
                  </span>{' '}
                  e.g. an article that you think that our community wMy ould value but is missing
                  sector and or job is not listed,{' '}
                  <span
                    className={css.link}
                    onClick={() => this.setState({ isMailSectorModalOpen: true })}
                  >
                    click here
                  </span>{' '}
                  and tell us so we can include it
                </p>
                <Tabs defaultActiveKey="gsm" id="uncontrolled-tab-example">
                  <Tab eventKey="gsm" title="Getting Started as a Mentor ">
                    <div className={css.tabtxt}>
                      <p>
                        <span>Watch:</span> Video tutorial on how to set up as a Mentor on Try A
                        Mentor
                      </p>
                      <a href="#" className={css.watcgbttn}>
                        Open
                      </a>
                    </div>
                  </Tab>
                  <Tab eventKey="htt" title="How To / Training">
                    <div className={css.tabtxt}>
                      <p>
                        <span>Watch:</span> If you are helping your Mentee to get a job or succeed
                        in an interview, this video will guide you on some critical advice to offer.
                        <p>
                          Don Georgevich does a brilliant job explaining how to Sell Yourself in a
                          Job Interview. He does this by providing a clear insight into precisely
                          what Job Recruiters are looking for by exploring the top answers to the
                          top 30 type of interview questions asked.{' '}
                        </p>
                      </p>
                      <a
                        href="https://www.youtube.com/watch?v=B_LmCruLjis"
                        className={css.watcgbttn}
                        target="_blank"
                      >
                        Open
                      </a>
                    </div>
                  </Tab>
                  <Tab eventKey="anp" title="Useful Articles and Papers">
                    <div className={css.tabtxt}>
                      <p>
                        <span>Read:</span> Want some quick practical tips on how to Mentor? Lindsay
                        Solowich provide twelve practical and powerful tips on how to Mentor with
                        impact
                      </p>
                      <a
                        href="https://blog.hubspot.com/marketing/mentor-tips-positive-impact"
                        className={css.watcgbttn}
                        target="_blank"
                      >
                        Open
                      </a>
                    </div>
                  </Tab>
                  <Tab eventKey="as" title="Mentor Stories">
                    <div className={css.tabtxt}>
                      <p>Stories to come</p>
                    </div>
                  </Tab>
                  <Tab eventKey="bs" title="Blog & Social">
                    <div className={css.tabtxt}>
                      <p>Stories to come</p>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div> */}
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </StaticPage>
    );
  }
}

export default MentorResourcePage;
