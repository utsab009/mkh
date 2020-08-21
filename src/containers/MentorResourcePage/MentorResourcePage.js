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
    return (
      <StaticPage
        className={css.root}
        title="About"
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
            <div className={css.contentContainer}>
              {/* <NamedLink name="LandingPage">Go to home page</NamedLink> or
              <ExternalLink href="https://google.com">Go to Google</ExternalLink> */}
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
                              label={'Email ID'}
                              placeholder={'Enter your email ID'}
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
                        <span>Watch:</span> “How to Mentor Successfully” training created by our
                        sister company Beacon Training
                      </p>
                      <a href="#" className={css.watcgbttn}>
                        Open
                      </a>
                    </div>

                    <div className={css.tabtxt}>
                      <p>
                        <span>Watch:</span>If your Mentee wants help with an Interview watch
                        “Interviewing Skills” training created by our sister company Beacon
                        Training. After watching it your Mentee will gain from you not just how to
                        answer the questions asked effectively but also how to conduct themselves in
                        their interview
                      </p>
                      <a href="#" className={css.watcgbttn}>
                        Open
                      </a>
                    </div>

                    <div className={css.tabtxt}>
                      <p>
                        <span>Read: </span> “How to Be an Amazing Mentor: 12 Ways to Make a Positive
                        Impact on Others” by Lindsay Kolowich
                      </p>
                      <a href="#" className={css.watcgbttn}>
                        Open
                      </a>
                    </div>

                    <div className={css.tabtxt}>
                      <p>
                        <span>Blog:</span> Join Try A Mentor’s Mentor blog and get talking to our
                        community, get answers and share resources and know-how
                      </p>
                      <a href="#" className={css.watcgbttn}>
                        Open
                      </a>
                    </div>

                    <p className={css.etctxt}>Etc.</p>
                    <p className={css.etctxt}>
                      We would have the ability to add more links with descriptions
                    </p>
                  </Tab>
                  <Tab eventKey="htt" title="How To / Training">
                    <div className={css.tabtxt}>
                      <p>Content Goes here</p>
                    </div>
                  </Tab>
                  <Tab eventKey="anp" title="Articles and Papers">
                    <div className={css.tabtxt}>
                      <p>Content Goes here</p>
                    </div>
                  </Tab>
                  <Tab eventKey="as" title="Mentor Stories">
                    <div className={css.tabtxt}>
                      <p>Content Goes here</p>
                    </div>
                  </Tab>
                  <Tab eventKey="bs" title="Blog & Social">
                    <div className={css.tabtxt}>
                      <p>Content Goes here</p>
                    </div>
                  </Tab>
                  <Tab eventKey="all" title="All">
                    <div className={css.tabtxt}>
                      <p>Content Goes here</p>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
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
