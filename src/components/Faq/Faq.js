import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Accordion, Card, Container, Toast } from 'react-bootstrap';
import css from './Faq.css';

const Faq = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: November 22, 2019</p>

      <Accordion defaultActiveKey="0">
        <h2>General Questions</h2>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              What is Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={css.faqCardBody}>
            <p>Tryamentor.com is a place and means, for people who have a successful track record performing a role, to mentor people new to these roles, or who hope to enter them. They can equally help a person already in a role to further excel in it. </p> 
            <p>Tryamentor.com empowers people to both share and monetize their experience, while simultaneously empowering others to directly gain from it – hence our tagline – “Their Experience, Your Success”. </p>
            <p>So, if you are planning your next career step, simply search the site to find a wonderful Mentor who can credibly guide you on how to get and succeed in your desired Job Role. Or, if you are currently in a role and would like independent and highly effective support – you have found the right place.</p>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
            What does Try A Mentor do?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body className={css.faqCardBody}>
              <p>It allows you to search for a person by sector, role and level, who can aid you to find, successfully interview for, and excel in that role.</p> 

            <p>For Mentors, it is a place for them to share and monetize the effective experience they gained from across their career, through finding people who would value support in knowing how to achieve similar career success for a specific Job Role. </p>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
            How does Try A Mentor work?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body className={css.faqCardBody}>
              <p>It is simple. You have arrived hoping to find a Mentor capable of helping you with an interview or job role or both. Click on the button you desire. Then, for the role you are interested in click on the sector in which it is found, click on the role itself, and lastly the level of seniority of the role. A list of Mentors who have had this role in the sector and required seniority will appear.</p> 

            <p>Instantly you will see a snapshot of the organisations they have worked for, roles they have had and average reviews from those they have mentored. Add those of interest to your favourites or click a Mentor to discover more about them, to ask them questions and to book them. </p>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
            Why should I use Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body className={css.faqCardBody}>
              <p>For Mentees </p>
              <p>Just imagine, you want to make the next step in your career, and you have guiding you, someone who has made that same precise step and performed that role with excellence. The advice they could provide on positioning yourself to gain an interview, the help they would provide in preparing you for the interview and on-going independent and situation specific help for doing the role. This is what you can access through Tryamentor.com
              </p> 

              <p>For Mentors</p>
              <p>Imagine you knew what you know now when you first started your career. How successful would you be today? This is what you have to offer, and it is obviously valuable both to others and in making the world more effective. So, through Tryamentor.com share it. You will find people excited to hear and be guided by you and simultaneously generate a new revenue stream. 
              </p> 
              <p>As a Mentor you can be full-time, part-time or use it to enrich your retirement, or as we describe it – to create your Encore!</p>
              <p>You can discover and browse Mentors without creating an account. To message a Mentor, request a booking, or list yourself as aMentor you will be prompted to create a user account.</p>
              <p>All user accounts require an email verification. You must also add further verification and payment information when listing as a Mentor.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
            Is it free to sign up as a Mentee? (Short Answer - Yes)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body className={css.faqCardBody}>
              <p>Yes. The only cost relating to using this site is when you book a Mentor (for their time). This is something that each Mentor sets on an hourly basis, and you will see the full cost for the time you are requesting before you book
              </p> 
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="5">
            Is it free to be a Mentor / to list my experience? (Short Answer - Yes)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="5">
            <Card.Body className={css.faqCardBody}>
              <p>Yes, there is no cost to listing yourself as a Mentor. Try A Mentor receives a set percentage of the revenue you receive each time a booking is made.
              </p> 
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="6">
            What countries do you support?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="6">
            <Card.Body className={css.faqCardBody}>
              <p>Try A Mentor is worldwide. You can be a Mentor or Mentee from anywhere and our platform gives Mentors the options to choose all the languages they are capable of Mentoring through.
              </p> 
              <p>Our only limitation is that set by Stripe (Stripe is a completely independent technology platformthat Try A Mentor uses to allow you to make and receive payments over the Internet). Stripe allows nearly all credit cards; but for Mentors - it only supports certain countries bank accounts (link - https://stripe.com/global).  As a result, if you want to Mentor in one or more of those countries, you will need to create a Bank Account in a country that Stripe works with.  </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="7">
            Who started Try A Mentor? 
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="7">
            <Card.Body className={css.faqCardBody}>
              <p>Try A Mentor was started by Kenneth D. Glynn (founder). It is now a part of his overarching company, the Beacon HRM Group, which is in turn an international Talent Consultancy. Beacon supplies Training, Executive Coaching, eLearning, and Talent Management services across the globe. Visit our parent website by clicking this link (http://www.beaconhrm.com/). Try A Mentor’s offices are found in Ireland.
              </p> 
            </Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>

    </div>
  );
};

Faq.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

Faq.propTypes = {
  rootClassName: string,
  className: string,
};

export default Faq;
