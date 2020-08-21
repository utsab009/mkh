import React from 'react';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink,
} from '../../components';

import css from './MenteeResourcePage.css';
import { Tabs, Tab } from 'react-bootstrap';
// import image from './path/to/image.png';

const MenteeResourcePage = () => {
  return (
    <StaticPage
      className={css.root}
      title="About"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'MenteeResourcePage',
        description: 'Description of this page',
        name: 'About page',
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

            <div className={css.mrhed}>
              <h3>
                Mentee Resources <span>An ever-growing list of Resources</span>
              </h3>
            </div>
            <div class="modtab">
              <p className={`${css.etctxt} ${css.tbletctxt}`}>
                If there is <a href="">resource</a> e.g. an article that you think that our
                community would value but is missing sector and or job is not listed,
                <a href="">click here</a> and tell us so we can include it
              </p>
              <Tabs defaultActiveKey="gsm" id="uncontrolled-tab-example">
                <Tab eventKey="gsm" title="Getting Started as a Mentee ">
                  <div className={css.tabtxt}>
                    <p>
                      <span>Watch:</span> “How to get the most from Mentoring” training created by
                      our sister company Beacon Training
                    </p>
                    <a href="#" className={css.watcgbttn}>
                      Open
                    </a>
                  </div>

                  <div className={css.tabtxt}>
                    <p>
                      <span>Watch:</span>“How to succeed in a Competency Based Interview” training
                      created by our sister company Beacon Training. After watching it your Mentee
                      will gain from you not just how to answer the questions asked effectively but
                      also how to conduct themselves in their interview
                    </p>
                    <a href="#" className={css.watcgbttn}>
                      Open
                    </a>
                  </div>

                  <div className={css.tabtxt}>
                    <p>
                      <span>Read: </span> “How to create a brilliant Bio” by XXX
                    </p>
                    <a href="#" className={css.watcgbttn}>
                      Open
                    </a>
                  </div>

                  <div className={css.tabtxt}>
                    <p>
                      <span>Blog:</span> Join Try A Mentor’s Mentee blog and get talking to our
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
                <Tab eventKey="as" title="Mentee Stories">
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
};

export default MenteeResourcePage;
