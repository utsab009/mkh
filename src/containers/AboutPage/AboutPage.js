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
              Tryamentor.com is a place and means for people who have a successful track record performing a
              role to mentor people new to these roles or who hope to enter them. They can equally help a person
              already in a role to further excel in it.
              </p>

              <p>Tryamentor.com empowers people to both share and monetize their experience while simultaneously
              empowering others to directly gain from it – hence our tagline – “Their Experience, Your Success”.</p>
              <p>So, if you are planning your next career step, simply search the site to find a wonderful Mentor who
              can credibly guide you on how to get and succeed in your desired Job Role. Or, if you are currently in
              a role and would like independent and highly effective support – you have found the right place.</p>

              <h3 className={css.subtitle}>Become A Mentor</h3>

              <p>
              Once you have performed a role, you have experience. What Try A Mentor empowers you to do, is
              find people (Mentees) who could directly gain from this experience. It is simply a question of you
              understanding that this experience is valuable and signing up to be a Mentor on Tryamentor.com. You
              place the details required for people to want to be mentored by you and on tryamentor.com you will
              find lots of supports to help you build the skills of a great Mentor.
              </p>

              <h3 id="contact" className={css.subtitle}>
              Who we are
              </h3>
              <p>
              Try A Mentor was started by Kenneth D. Glynn (founder). It is now a part of his overarching company,
              the Beacon HRM Group which is in turn an international Talent Consultancy. Beacon supplies Training, Executive Coaching, eLearning, and Talent Management services across the globe through
              its divisions of Beacon Training, Beacon Talent and eBeacon. Visit our parent website by clicking this
              link.
              </p>
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
