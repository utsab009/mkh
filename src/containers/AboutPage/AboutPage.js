import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from './about-us-1056.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Try A Mentor',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>About Try A Mentor</h1>
          <h1 className={css.pageTitle}>Their Experience, Your Success …</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            {/* <div className={css.contentSide}>
              <p>Yoga was listed by UNESCO as an intangible cultural heritage.</p>
            </div> */}

            <div className={css.contentMain}>
            <h3 className={css.subtitle}>
              Welcome
              </h3>

              <p>
              Tryamentor.com is a website and mobile phone application that enables people who have a successful track record performing ajob / career role to find and thenMentor people new to these roles or who hope to enter them. Due to this experience they can equally help a person already in a role to further excel in it. So, if you have such a track record, Tryamentor.com will enable you to both share and monetize this experience while simultaneously empowering others to directly gain from it.
              </p>

              <p>Equally it is a place where you can find a Mentor. If you are seeking someone who has direct experience in a Job Role you wish to have or are already in, then you will find a range of different Mentors, with unique and common strengths and experience to choose from.</p>
              <p>So, if you are planning your next career step, simply search the site to find a wonderful Mentor who can credibly guide you on how to get and succeed in your desired Job Role. Or, if you are currently in a role and would like independent and highly effective support – you have found the right place.</p>

              <h3 className={css.subtitle}>Who we are</h3>

              <p>Try A Mentor was started by Kenneth D. Glynn (founder). It is now a part of his overarching company, the Beacon HRM Group which is in turn an international Talent Consultancy. Beacon supplies Training, Executive Coaching, eLearning, and Talent Management services across the globe through its divisions of Beacon Training, Beacon Talent and eBeacon. Offices are in New York, San Francisco, and Dublin. Visit our parent website by clicking this link <ExternalLink href="http://www.beaconhrm.com">www.beaconhrm.com</ExternalLink> </p>

              
              {/* <p>
                You can also checkout our{' '}
                <ExternalLink href={siteFacebookPage}>Facebook</ExternalLink> and{' '}
                <ExternalLink href={siteTwitterPage}>Twitter</ExternalLink>.
              </p> */}
              <p>Checkout our Facebook and Twitter feeds to gain access to great supporting materials and
              approaches to Role and Mentoring success.</p>
              <p>Thank you so much for visiting</p>

              <p>Kenneth D. Glynn <br/>
              Founder</p>
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

export default AboutPage;
