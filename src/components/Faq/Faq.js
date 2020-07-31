import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Accordion, Card, Container, Toast } from 'react-bootstrap';
import css from './Faq.css';
import ExternalLink from '../ExternalLink/ExternalLink';

const Faq = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: November 22, 2019</p>

      <Accordion defaultActiveKey="0">
        <h2>General - Frequently Asked Questions</h2>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              What is a Mentor and Mentee?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={css.faqCardBody}>
            <p>On Try A Mentor, a Mentor is someone who has excelled at job role and is willing to share their experience of this with someone who aspires to have this role or someone who is doing it but wants to do it better. </p> 
            <p>A Mentee is someone who would value guidance on a specific job role from a Mentor either because they aspire to have this job or if they have it, they want to further excel in it.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
              What is Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body className={css.faqCardBody}>
            <p>Tryamentor.com is a place and means for people who have a successful track record performing a role, to mentor people new to these roles, or who hope to enter them. They can equally help a person already in a role to further excel in it. </p> 
            <p>Tryamentor.com empowers people to both share and monetize their experience, while simultaneously empowering others to directly gain from it – hence our tagline – “Their Experience, Your Success”.  </p>
            <p>So, if you are planning your next career step, simply search the site to find a wonderful Mentor who can credibly guide you on how to get and succeed in your desired Job Role. Or, if you are currently in a role and would like independent and highly effective support – you have found the right place.</p>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
            What does Try A Mentor do?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body className={css.faqCardBody}>
              <p>Try A Mentor does two things. First, if you hope to enter a new Job Role, or you are currently doing a Job Role but want to further excel in it, the website provides the means to find an independent Mentor who has a detailed track record performing this role and as such, can in turn aid you to find, successfully interview for, and excel in that role. To find this ideal Mentor, you need to first search by role, then to further narrow down the Mentors listed, you can filter them by:</p> 
              <ul>
                <li>-	The Sector they performed this role in</li>
                <li>-	By the level they performed this role at (operational, frontline management etc.)</li>
                <li>-	By cost</li>
              </ul>
            <p>Second, Try A Mentor provides a means for you to become a Mentor. A means to offer your experience in a specific job role to those looking to enter or excel in this role.It is a place for you to share and monetize the effective experience you gained from across your career to date, through finding people (Mentees) who would value support in knowing how to achieve similar career success for a specific Job Role. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
            How does Try A Mentor work?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body className={css.faqCardBody}>
              <p>It is simple. You have arrived hoping to find a Mentor capable of helping you with an interview or job role or both. Click on the button you desire. Then, type the name of the role you are interested in until it appears and click next. A list of Mentors who have had this role will appear. Instantly you will see a snapshot of the organisations each Mentor has worked for, the roles they have had, and average review score they have gained from those they have mentored. Add those of interest to your favourites or further filter this list to find Mentors who:</p> 
              <ul>
                <li>-	Have worked in both the role and sector you are focused on</li>
                <li>-	Have worked in both the role and the required organisational level that the role you are interested in is at</li>
                <li>-	Speaks the language you require</li>
                <li>-	Is within your price range</li>
              </ul>
            <p>Click into any Mentor you find to discover more detailed information on them, as well as a means toask your potential Mentor direct questions, and then to book them. They may even have a video of themselves discussing how they can help.</p>
            <p>If you want to be a Mentor, click the link at the top right of the landing page. Here Try A Mentor will collect key information on your career and education to date and allow you to define the roles you can Mentor. Then your listing will be published and as such available for booking by potential Mentees.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
            Why should I use Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body className={css.faqCardBody}>
              <p>For Mentees </p>
              <p>Just imagine, you want to make the next step in your career, and you have guiding you, someone who has made that same precise step and performed that role with excellence. Think of the brilliant advice and guidance they could provide on positioning yourself to gain an interview, the help they would provide in preparing you for the interview and on-going independent and situation specific help for doing the role. This is what you can access through Tryamentor.com
              </p> 

              <p>For Mentors</p>
              <p>Imagine you knew what you know now when you first started your career. How successful would you be today? This is what you have to offer, and it is obviously valuable both to others and in making the world more effective. So, through Tryamentor.com share it. You will find people excited to hear and be guided by you and simultaneously generate a new revenue stream. 
              </p> 
              <p>As a Mentor you can be full-time, part-time while in another job, or use it to enrich your retirement, or as we describe it – to create your Encore!</p>
              
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="5">
            Do I need to create an account?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="5">
            <Card.Body className={css.faqCardBody}>
              <p>You can discover and browse Mentors without creating an account. To message a Mentor, request a booking, or list yourself as aMentor then you do need to sign up. When you go to perform any of these things you will be prompted to create a user account.
              </p> 
              <p>All user accounts require an email verification. You must also add further verification and payment information when listing as a Mentor.
              </p> 
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="6">
            Is it free to sign up as a Mentee? (Short Answer - Yes)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="6">
            <Card.Body className={css.faqCardBody}>
              <p>Yes. The only cost relating to using this site is when you book a Mentor (for their time). This is something that each Mentor sets on an hourly basis, and you will see the full cost for the time you are requesting before you book.
              </p> 
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="7">
            Is it free to be a Mentor / to list my experience? (Short Answer - Yes)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="7">
            <Card.Body className={css.faqCardBody}>
              <p>Yes, there is no cost to listing yourself as a Mentor. Try A Mentor receives a set percentage of the revenue you receive each time a booking is made.
              </p> 
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="8">
            What countries do you support?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="8">
            <Card.Body className={css.faqCardBody}>
              <p>Try A Mentor is worldwide. You can be a Mentor or Mentee from anywhere and our platform gives Mentors the options to choose all the languages they are capable of Mentoring through.
              </p> 
              <p>Our only limitation is that set by Stripe (Stripe is a completely independent technology platformthat Try A Mentor uses to allow you to make and receive payments over the Internet). Stripe allows nearly all credit cards; but for Mentors - it only supports certain countries bank accounts (Link - <ExternalLink href="https://stripe.com/global">stripe.com/global</ExternalLink> ).  As a result, if you want to Mentor, you will need to create or have a Bank Account in a country that Stripe works with (on writing this Stripe covers 39 countries in terms of Bank Accounts).  </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="9">
            What is the Cancellation Policy?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="9">
            <Card.Body className={css.faqCardBody}>
              <p>A Mentee can cancel a session with their Mentor at no charge up to 48-hours before the session they are cancelling. After this, the fee is non-refundable. All monies are automatically refunded by the Stripe system.
              </p> 
              <p>If, however, a Mentee initially books the appointment within 48 hours of the appointment, then the Mentee will be charged unless such appointment is cancelled within the first 15 minutes of such booking (the “Cancellation Periods”). If a Mentee does not cancel a confirmed appointment within the applicable Cancellation Period, 100% of the cost of the services will be charged as a cancellation fee or in the case of a subscription the session credit will be deemed “used”.
              </p> 
              <p>An example of the above from a Mentee’s perspective is as follows:</p> 
              <p>You book a Mentor meeting for the following day. After making the booking you suddenly realise that you cannot make the meeting after all. You look at your watch. It was booked just ten minutes ago. So, you cancel the booking. Because you booked within the 48-hour window when you must pay the full fee when you cancel, you initially think your money is lost, but then you remember that that you booked the session and then cancelled it within the fifteen minutes grace period. So, you now know that you will get a refund. To get this refund you contact Try A Mentor on admin@tryamentor.com to tell us what has occurred. We check the system to see if the booking and the cancellation occurred within a fifteen-minute period. We see it has and we direct Skype (the independent payment system) to refund you your monies.
              </p> 
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="10">
            How do I get a Refund?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="10">
            <Card.Body className={css.faqCardBody}>
              <p>Yes, it is possible but what follows is extremely important for you to note. Try A Mentor does not provide Mentoring or Mentors. Try A Mentor’s service is to provide the means for Mentors and Mentees to find, book and pay for the Mentoring or Coaching Services offered by Mentors / Coaches. The service provider for Mentoring / Coaching is the Mentor / Coach.  As such, if this service is not satisfactory, or the conduct of those involved is not appropriate, this is an issue for the Mentor and Mentee to solve independent of Try A Mentor.  
              </p> 
              <p>This said, so that Try A Mentor is a safe place to deliver and receive Mentoring or Coaching, Try A Mentor has created an Arbitration Service so that refunds are possible under some clear conditions /stipulations. By using Try A Mentor you are agreeing to the process by which this arbitration operates and the outcome of the arbitration.
              </p> 
              <p>These stipulations referred to above are driven primarily by Stripe (Stripe is a completely independent technology platform that Try A Mentor uses to allow you to make and receive payments). Stripe was chosen due to it security and because it offers a delayed payment system. It will collect money from a Mentee and then deposit these funds into the Mentor’s bank account after a period of time (Try A Mentor has no access to these funds at any time). </p> 
              <p>What Try A Mentor can do, while these funds are being held by Stripe, is to arbitrate between Mentor and Mentee if a dispute occurs, and then depending on the outcome of the arbitration (which we will decide) to direct Stripe to pay either the Mentor or refund the Mentee. But Stripe has strict time limits on how long it will delay a payment which directly impact the rules of the arbitration. As such:
                <ol>
                  <li>	The very second after a Mentoring meeting (not booking) is conducted, Stripe will only hold the funds for payment of this meeting for fourteen calendar days. Once this fourteen-day period is concluded, Stripe will automatically deposit the funds due to the Mentor into the Mentor’s bank account, at which point Try A Mentor will no longer be able to arbitrate and make a refund. As a result of this, the following is the structure of the Arbitration process:
                    <ul>
                      <li>a)	The complaint / request for refund has to be e-mailed to admin@tryamentor.com within five calendar days of the Mentoring Session. The complaint must contain all the information that the Mentee has that illustrates that a refund should be made. It is important to note that any written evidence submitted, has to be information that was communicated through Try A Mentor communication system as it is a condition of using Try A Mentor that all written communication between a Mentor and Mentee must occur through the internal communication system. The only exception to this is the verbal communication that occurs in the Mentoring meetings itself</li>
                      <li>b)	If a request for a refund is made after the five calendar days, Try A Mentor will no longer be in the position to Arbitrate and the Mentor and Mentee will need to solve the issue independent of Try A Mentor (Try A Mentor will no longer be involved and will play no part in any refund)</li>
                      <li>c)	If the Mentee attempts to provide additional evidence after the initial five days, it will be not be reviewed. The reason is the overarching time limit. To be fair to the Mentor, we need to allow the Mentor adequate time to see the evidence presented against them and then time to respond.</li>
                      <li>d)	Once Try A Mentor has received the complaint and the evidence from the Mentee, it will then be sent unedited to the Mentor. </li>
                      <li>e)	The Mentor will now have a right to reply and is given three calendar days to prepare and send their defence. Again, any written evidence presented must be that found on Try A Mentor’s communication system (see reason above) and no evidence presented by the Mentor after this three-day period will be reviewed.</li>
                      <li>f)	If there is no response from the Mentor within this three-day period, for whatever reason, then unfortunately the arbitration will only take into account the evidence presented by the Mentee. The only reason for this, is that the Stripe system will only hold the funds for the fourteen days, so this drives these strict time limits.</li>
                      <li>g)	With the Mentees case made and hopefully the case of the Mentor presented to Try A Mentor within the stipulated time frames, Try A Mentor will impartially adjudicate the issue and come to a binding decision before the fourteen days deadline has been reached. The findings of Try A Mentor are binding (a stipulation of using this site for all users)</li>
                      <li>h)	Try A Mentor will communicate its decision to both Mentor and Mentee, but this communication will not contain the reasons for the decision but simply what has been decided. </li>
                    </ul>
                  </li>
                  <li>	The second impact that the Stripe system has on the arbitration process relates to the following rule that it has in place. Stripe will only hold monies for a maximum of 90 calendar days from the point of collection. In this case, the point of collection is when a Mentoring Meeting / Session has been booked. The fourteen-day rule is present from the point after the meeting occurs, but the ninety-day rule is from the point of booking. This means that if a Mentee requests a refund due to a complaint, and although it is made within five days of the meeting as outlined previously, if the meeting took place within fifteen days of the ninety day period concluding, then Try A Mentor is unable to arbitrate. As such, the refund request will be an issue for the Mentor and Mentee to solve independent of Try A Mentor.  </li>
                </ol>
              </p> 
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="11">
            Who started Try A Mentor? 
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="11">
            <Card.Body className={css.faqCardBody}>
              <p>Try A Mentor was started by Kenneth D. Glynn (founder). It is now a part of his overarching company, the Beacon HRM Group, which is in turn an international Talent Consultancy. Beacon supplies Training, Executive Coaching, eLearning, and Talent Management services across the globe. Visit our parent website by clicking this link <ExternalLink href="http://www.beaconhrm.com/">www.beaconhrm.com</ExternalLink>. Try A Mentor’s offices are found in Ireland.</p> 
              
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="12">
            Why does my Inbox have two sections – “From Mentees” and “From Mentors”
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="12">
            <Card.Body className={css.faqCardBody}>
              <p>Simple. You can be both a Mentor and a Mentee at the same time. So, the section of your Try A Mentor inbox labelled “From Mentees”, is messages from people who you may be Mentoring. The section labelled “From Mentors”, is messages from people who are Mentoring you. </p> 
              <p>If you are just a Mentor, then your “From Mentors” inbox will always be empty. If you are just a Mentee, then your “From Mentees” will always be empty.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>


      </Accordion>
      <Accordion defaultActiveKey="0">
        <h2>Mentor Specific - Frequently Asked Questions</h2>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            Once I have started Mentoring, can I have the mentee book and pay me directly
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={css.faqCardBody}>
              <p>No. This is against the rules of this site, but there are common sense reasons as to why you should not do this:</p> 
              <ul>
                <li>-	Using our site is about gaining a steady stream of Mentees and as such revenue. Once a Mentee and you finish working together, they will leave a review. The more reviews you have, the more future Mentees will pick you. By moving a Mentee to work with you directly, they can no longer leave a review and future bookings will decrease.</li>
                <li>-	You are signalling to the Mentee, or they are signalling to you, that they are willing to be unethical. So, when payment is needed, you and they will need to share financial information with one another. Would you like to give such details to someone who has already shown themselves to be unethical?</li>
                <li>-	The payment system on Try A Mentor means that all financial payments are automatic, all financial information safe and you are working with a robust booking and mentoring management system. Having a place to find a steady stream of mentors and mentees and the system to support this process makes continuing to work through us easy, profitable, and fun. </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
            Why do I need to be over eighteen to use Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body className={css.faqCardBody}>
              <p>There are many great reasons why someone below eighteen would benefit from having a Mentor, but for Try A Mentor, safety comes first. As such, all users (Mentors and Mentees), must be over eighteen
              </p> 
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
            How do I set my self-up as a Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body className={css.faqCardBody}>
              <p>Setting up as a Mentor is easy and only takes a few minutes. Follow this link to see a video explaining how to do just this. Here though are the written instructions:</p> 

              <p>You begin by clicking “Become a Mentor” (link), which is on the top righthand corner of the main page. Here you will be asked for your Name, E-mail address (which you will need to verify), Password, and confirmation that you are 18 years of age or over. You have now begun to create your Mentor Profile.</p> 

              <p>Next, we begin collecting the information that will help Mentees choose you. You will provide:</p> 
              <ul>
                <li>-	Starting from the most recent, the organisations you have worked for and the roles you have had in them</li>
                <li>-	Your Education to date (again starting from your most recent).  </li>
                <li>-	Your Skype address (this is for the Mentee so they can meet you through Skype – (you can change the meeting application at any point through editing this profile))– if you are unsure how to get your skype address, simply google this question and a range of videos will talk you through both signing up for Skype and then getting your individual skype address. Here is such a video that was available at the time of writing this (Link:.https://www.youtube.com/watch?v=l-QHGpmGiuc)</li>
              </ul>

              <p>If you do not have any of this information to hand, that is ok, you can skip it and enter this information later, along with a photo. This completes your Mentor Profile. You can access and edit this Mentor Profile by clicking on the circle / your photo (if you have given it) in the top right-hand corner of the screen.</p> 

              <p>Now, we need to help Mentees find you and the job roles you can help them with. On the top of the page is a new option “Roles I can Mentor”. Click this. Here you get to precisely define the Job Role, Sectors and Seniority Levels you can Mentor a Job Role at. You will be asked to define the languages you can Mentor in and the cost you will be charging per hour for providing this service for this precise Job Role. We will also ask for your address, as in the future we are thinking of enabling face to face Mentoring. Now you have created a “Role Profile”, but you may have other Job Roles you can provide mentoring for. So, you create new “Role Profiles” for each of these Job Roles. </p> 

              <p>Sound complicated? It is not, the system will guide you through each step. </p>

              <p>Please note that all listings are subject to review by our team to ensure the safety of our community. Once you submit your listing for review, we will approve it within 24 hours. If you need to expedite this process or need help with your listing, please email us at admin@tryamentor.com.</p>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
            How can I add the roles I can be a mentor for?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body className={css.faqCardBody}>
              <p>To do this you will have first had to sign-up (link) to be a Mentor and verified your e-mail address. You are now ready to add the roles you can be a Mentor for by creating what we call “Role Profiles”. On the top of the page is a new option “Roles I can Mentor”. Click this (link). Here you get to precisely define the Job Role, Sectors and Seniority Levels you can Mentor a Job Role at. You will be asked to define the languages you can Mentor in and the cost you will be charging per hour for providing this service for this precise Job Role. We will also ask for your address, as in the future we are thinking of enabling face to face Mentoring. Now you have created a “Role Profile”, but you may have other Job Roles you can provide mentoring for. So, you create new “Role Profiles” for each of these Job Roles. Sound complicated? It is not, the system will guide you through each step. </p> 
              <p>Please note that all listings are subject to review by our team to ensure the safety of our community. Once you submit your listing for review, we will approve it within 24 hours. If you need to expedite this process or need help with your listing, please email us at admin@tryamentor.com.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
            What should I put in my listing?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body className={css.faqCardBody}>
              <p>In Try A Mentor we asked – what would make a person choose one Mentor over another. The answer was dependent of their ability to answer the following questions:</p>
              <ul>
                <li>1.	Has the Mentor performed the Job Role I am interested in? </li>
                <li>2.	Have they performed it inmy required Sector?</li>
                <li>3.	Have they performed it at the necessary level in terms of seniority?</li>
                <li>4.	For whom did they work for when doing this role and for how long?</li>
                <li>5.	What Education do they have?</li>
                <li>6.	Is this Experience and Education provided real? – a means to check.</li>
                <li>7.	How well they clearly define how their experience can help me? (Can they tell me not just that they had this role, but also show me that they were particularly good at doing it?)</li>
                <li>8.	Do they come across as someone who is professional and approachable?</li>
              </ul>
              <p>Your listing is designed to aid you to answer each of these questions. </p>
              <p>Question 6 is achieved by having a Linked-in page and providing a link to it for potential Mentees (please see question on this later in this section with the answer describing how you provide a Linked-in page link). </p>
              <p>Question 7 is achieved through a section in the Role Profile in which you can provide a paragraph on your successes in that Job Role. This can be further added to by including a short YouTube video (optional) in which Mentees can see you discussing why you would make a great Mentor for the Job Role in question; while this and your Photograph, and the entire Role Profile, will have the potential of presenting you as both professional and approachable.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="5">
            What Type of Photograph should I use?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="5">
            <Card.Body className={css.faqCardBody}>
              <p>This is a professional service you are offering, so how you present yourself should reflect this. For further direction consider how a ‘Professional’ in the sector and job role you are focusing on would present themselves. Finally, you need to look friendly. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="6">
            Why have you asked for a LinkedIn Address / Link (Please note: this is optional)?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="6">
            <Card.Body className={css.faqCardBody}>
              <p>This is provided to Mentees so they can check if the skills and experience you claim to have, are also reflected in your LinkedIn profile. It adds credibility to your profile. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="7">
            How do I find my LinkedIn Address / Link (Please note: this is optional)?            </Accordion.Toggle>
          <Accordion.Collapse eventKey="7">
            <Card.Body className={css.faqCardBody}>
              <p>First, set up a Linked-in page detailing your career (there are many videos available showing how to do this well – just use google to find one you like). Then take a look at the following video (it will show you how to find and copy your LinkedIn link) Link (https://www.youtube.com/watch?v=qKim34HTd4U). Once you have copied your LinkedIn link, return to TryAMentor.com and go to your Mentor Profile not Role Profile (click on the circle with your initials or photo on it to reveal a link to your Mentor Profile). Then scroll down and paste the link into the section asking for your Linked-in Address. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="8">
            Why should I make a YouTube video to place on Try A Mentor (Please note: this is optional)?            </Accordion.Toggle>
          <Accordion.Collapse eventKey="8">
            <Card.Body className={css.faqCardBody}>
              <p>A picture tells a thousand words, but a video many, many more. By creating a short video (recommended 2 minutes) discussing how your experience can help a potential Mentee with a Job Role, they can see how approachable, positive, and effective you will be. It makes their decision to choose you as their Mentor, far easier. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="9">
            How do I make a YouTube video then place it on Try A Mentor (optional)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="9">
            <Card.Body className={css.faqCardBody}>
              <p>You make your video with your mobile phone or a camera if you have one. Plan what you will say, practice, dress well and have great lighting. </p>
              <p>Next, sign-up to a free YouTube account. The account allows you to post videos to be seen by who you wish. If you are unsure how to do this, just google “how to set-up a YouTube channel” and watch one of the many videos explaining how.</p>
              <p>Place / upload your video onto your YouTube channel and then copy the link to it. Here is a YouTube video explaining how (Link: https://www.youtube.com/watch?v=zWh3CShX_do). With the link copied, return to TryAMentor.com and go to theRole Profile (not Mentor Profile) that the video relates to. To find the relevant Role Profile click on the circle with your initials or photo on it on Try A Mentor to reveal a link to your Role Profile). Then paste the link into the section asking for your YouTube video Address.</p>
              <p>If it is the same video for each of the roles you can Mentor (you made your video general in nature), then paste the link into each of the Role Profiles you have created.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="10">
            How do I accept a booking request?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="10">
            <Card.Body className={css.faqCardBody}>
              <p>The system will send a message via e-mail to your personal e-mail address and to your Try A Mentor inbox (from Mentees section) to notify you a booking request from a potential Mentee has been made. In the e-mail message will be:</p>
              <ul>
                <li>-	The date and time of the booking</li>
                <li>-	The fee agreed and the final amount you will receive after the Try A Mentor fee (10%) is taken</li>
                <li>-	The time you have available to accept the booking by (Please note: if you do not accept the request within this time but then proceed to have this meeting, you will not get paid (the system will have automatically refunded the Mentee))</li>
                <li>-	A link to Accept or Decline the booking</li>
              </ul>
              <p>Please click on the link. When you do this the Try A Mentor website will launch in your browser. You will be taken to a page in which you can click on one of two buttons – to accept the booking or to decline it (it will always be your choice). You can also send a message to the person who is requesting your time, to thank them for the booking etc. or to explain why you are not available with a request to book you at an alternative time.</p>
              <p>If you see a booking request message in your Try A Mentor inbox before you see the e-mail, by opening the message you will be taken to the place on the website as above, in which you can accept or decline the booking.</p>
              <p>If you decline or accept a booking request, an automatic e-mail is sent to the Mentee telling them of your decision along with information on your Skype address (if you accepted the booking).</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="11">
              Do I have to accept a booking request?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="11">
            <Card.Body className={css.faqCardBody}>
              <p>You are NOT required to accept a request and may decline any request. If you take no action to accept or deny a request, the booking request will automatically expire in 24 hours. If you missed the request by accident, you can message the potential Mentee directly from their expired request and suggest that they make another request.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="12">
            Mentor: How long do I have to respond to booking requests?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="12">
            <Card.Body className={css.faqCardBody}>
              <p>You have seven calendar days to either accept or deny a booking request. After this period, the booking request will automatically expire, and the Mentee will receive an automatic refund.</p>
              <p>It is important for you to note thatif you proceed with the meeting without accepting the booking request you will not be paid. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="13">
            Mentor: I just had a great meeting with my Mentee and during the meeting we decided to extend our time together (or some similar scenario). Can my Mentee, although the time has passed, book this time so I can get paid for it?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="13">
            <Card.Body className={css.faqCardBody}>
              <p>The answer is No. The system does not allow for this to occur. As such, keep an eye on the time, and as the time booked starts to draw to a close (and it is clear that both of you wish to continue), ask the Mentee to go to Try A Mentor and book the additional time. You in turn must also pause and go to Try A Mentor and accept the booking request. Remember, if you do not accept the booking request, then the Mentee will gain an automatic refund.</p>
              <p>Alternatively, you can ask the Mentee to book a future session, with said meeting then not actually occurring (it would be payment for the time not booked). Be careful with this advice. You will need to get in writing (a message into your Try A Mentor inbox) from the Mentee that this was the intention of this booking. Otherwise, they will be entitled to a refund if they ask for one. Also, if the Mentee books a time slot, not one else can book this time.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="14">
            How can I modify a booking request?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="14">
            <Card.Body className={css.faqCardBody}>
              <p>Once a booking request is sent, the dates, amount, and details of the booking request cannot be modified. Please note that booking requests are not contractual booking agreements, but messages for requesting a booking. This said, by accepting a booking you are accepting the rates defined for conducting it.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="15">
            Do you charge transaction fees for bookings?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="15">
            <Card.Body className={css.faqCardBody}>
              <p>We charge 10% of the booking fee.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="16">
            Mentor:What fee should I charge per hour?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="16">
            <Card.Body className={css.faqCardBody}>
              <p>We put pricing in the hands of Mentors (you can charge as low as €1 euro). You can price your time at your discretion and please take local rates, taxes, Try A Mentor fees, and other fees into consideration when listing your hourly rate. It is a marketplace, so consider what others who are offering Mentoring for the same Job Role are charging. Is your experience more, less, or equivalent to them, how many reviews do you currently have and how good are they compared to yours? This can be a useful start when determining the relevant fee.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="17">
            I accepted a booking request. How do I collect the payment?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="17">
            <Card.Body className={css.faqCardBody}>
              <p>
              One of the clear advantages of Try A Mentor is our use of the Stripe payment system (link: https://stripe.com/). This is completely independent of Try A Mentor and keeps all financial information safe (Try A Mentor never has access to it). Specifically, Try A Mentor uses it for a delayed payment feature. Once the session is booked, Stripe collects the monies due but does not deposit them into the Mentor’s account until fourteen daysafter the session concludes. 
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="18">
            How do I charge for additional services?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="18">
            <Card.Body className={css.faqCardBody}>
              <p>
              Examples of such additional services could include doing a specific Job-related task for the Mentee outside of the meeting (to allow them to see how it is done effectively) which they would like to pay you to do. </p>
              <p>
              Everything on Try A Mentor is charged by the amount of time it takes to do it. If you are doing a task for a Mentee that does not involve meeting with them, you then either have them book this time from the available hours in your calendar, or create additional extra hours of availability within the Role Profile and have them book this, even though you won’t be meeting. You will need to get in writing (a message into your Try A Mentor inbox) from the Mentee that this was the intention of this booking. Otherwise, they will be entitled to a refund if they ask for one. Also, if the Mentee books a time slot, no one else can book this time, hence why returning to the role profile to open up additional time may be the best approach.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="19">
            Can I cancel a booked Mentoring Session?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="19">
            <Card.Body className={css.faqCardBody}>
              <p>Yes, it will mean that the monies are refunded to the Mentee. The key is to be considerate and if you absolutely have to cancel, do provide a credible reason while offering a new time as part of the cancellation message. </p>
              <p>You cancel by</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="20">
            What is the Cancellation Policy / Can I list my own Cancellation Policy?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="20">
            <Card.Body className={css.faqCardBody}>
              <p>At this stage, due to how Stripe operates (Stripe is a completely independent technology platform that Try A Mentor uses to allow you to make and receive payments) we are not in the position to enable you to choose an individual cancellation policy. Instead, a Mentee can cancel their session with you at no charge up to 48-hours before the session they are cancelling. All monies are automatically refunded if the request is made within this 48-hour period. Within a 48-hour of the meeting, cancellation will see the Mentee being charged for the full cost of the meeting. Here is the specific detail of the cancellation policy from Try A Mentor’s Terms and Conditions:</p>
              <p>A Mentee can cancel a session with their Mentor at no charge up to 48-hours before the session they are cancelling. After this, the fee is non-refundable. All monies are automatically refunded by the Stripe system.</p>
              <p>If, however, a Mentee initially books the appointment within 48 hours of the appointment, then the Mentee will be charged unless such appointment is cancelled within the first 15 minutes of such booking (the “Cancellation Periods”). If a Mentee does not cancel a confirmed appointment within the applicable Cancellation Period, 100% of the cost of the services will be charged as a cancellation fee or in the case of a subscription the session credit will be deemed “used”.</p>
              <p>An example of the above from a Mentee’s perspective is as follows:</p>
              <p>You book a Mentor meeting for the following day. After making the booking you suddenly realise that you cannot make the meeting after all. You look at your watch. It was booked just ten minutes ago. So, you cancel the booking. Because you booked within the 48-hour window when you must pay the full fee when you cancel, you initially think your money is lost, but then you remember that that you booked the session and then cancelled it within the fifteen minutes grace period. So, you now know that you will get a refund. To get this refund you contact Try A Mentor on admin@tryamentor.com to tell us what has occurred. We check the system to see if the booking and then cancellation occurred within a fifteen-minute period. We see it has and we direct Skype (the independent payment system) to refund you your monies.</p>
              
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="21">
            What if the Mentee wants a refund after our session together? (Try A Mentor’s Arbitration Service)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="21">
            <Card.Body className={css.faqCardBody}>
              <p>
              Yes, it is possible but what follows is extremely important for you to note. Try A Mentor does not provide Mentoring or Mentors. Try A Mentor’s service is to provide the means for Mentors and Mentees to find, book and pay for the Mentoring or Coaching Services offered by Mentors / Coaches. The service provider for Mentoring / Coaching is the Mentor / Coach. As such, if this service is not satisfactory, or the conduct of those involved is not appropriate, this is an issue for the Mentor and Mentee to solve independent of Try A Mentor.  
              </p>
              <p>This said, so that Try A Mentor is a safe place to deliver and receive Mentoring or Coaching, Try A Mentor has created an Arbitration Service so that refunds are possible under some clear conditions /stipulations. By using Try A Mentor you are agreeing to the process by which this arbitration operates and the outcome of the arbitration.</p>
              <p>These stipulations referred to above are driven primarily by Stripe (Stripe is a completely independent technology platform that Try A Mentor uses to allow you to make and receive payments). Stripe was chosen due to it security and because it offers a delayed payment system. It will collect money from a Mentee and then deposit these funds into the Mentor’s bank account after a period of time (Try A Mentor has no access to these funds at any time). </p>
              <p>What Try A Mentor can do, is while these funds are being held by Stripe, to arbitrate between Mentor and Mentee if a dispute occurs, and then depending on the outcome of the arbitration (which we will decide) to direct Stripe to pay either the Mentor or refund the Mentee. But Stripe has strict time limits on how long it will delay a payment which directly impact the rules of the arbitration. As such:</p>
              <ol>
                <li>The very second after a Mentoring meeting (not booking) is conducted, Stripe will only hold the funds for payment of this meeting for fourteen calendar days. Once this fourteen-day period is concluded, Stripe will automatically deposit the funds due to the Mentor into the Mentor’s bank account, at which point Try A Mentor will no longer be able to arbitrate and make a refund. As a result of this, the following is the structure of the Arbitration process:

                  <ul>
                    <li>i)	The complaint / request for refund has to be e-mailed to admin@tryamentor.com within five calendar days of the Mentoring Session. The complaint must contain all the information that the Mentee has that illustrates that a refund should be made. It is important to note that any written evidence submitted, has to be information that was communicated through Try A Mentor communication system as it is a condition of using Try A Mentor that all written communication between a Mentor and Mentee must occur through the internal communication system. The only exception to this is the verbal communication that occurs in the Mentoring meeting itself.</li>
                    <li>j)	If a request for a refund is made after the five calendar days, Try A Mentor will no longer be in the position to Arbitrate and the Mentor and Mentee will need to solve the issue independent of Try A Mentor (Try A Mentor will no longer be involved and will play no part in any refund).</li>
                    <li>k)	If the Mentee attempts to provide additional evidence after the initial five days, it will be not be reviewed. The reason is the overarching time limit. To be fair to the Mentor, we need to allow the Mentor adequate time to see the evidence presented against them and then time to respond.</li>
                    <li>l)	Once Try A Mentor has received the complaint and the evidence from the Mentee, it will then be sent unedited to the Mentor. </li>
                    <li>m)	The Mentor will now have a right to reply and is given three calendar days to prepare  and send their defence. Again, any written evidence presented must be that found on Try A Mentor’s communication system (see reason above) and no evidence presented by the Mentor after this three-day period will be reviewed.</li>
                    <li>n)	If there is no response from the Mentor within this three-day period, for whatever reason, then unfortunately the arbitration will only take into account the evidence presented by the Mentee. The only reason for this, is that the Stripe system will only hold the funds for the fourteen days, so this drives these strict time limits.</li>
                    <li>o)	With the Mentees case made and hopefully the case of the Mentor presented to Try A Mentor within the stipulated time frames, Try A Mentor will impartially adjudicate the issue and come to a binding decision before the fourteen days deadline has been reached. The findings of Try A Mentor are binding (a stipulation of using this site for all users)</li>
                    <li>p)	Try A Mentor will communicate its decision to both Mentor and Mentee, but this communication will not contain the reasons for the decision but simply what has been decided. </li>
                  </ul>
                </li>
                <li>The second impact that the Stripe system has on the arbitration process relates to the following rule that it has in place. Strip will only hold monies for a maximum of 90 calendar days from the point of collection. In this case, the point of collection is when a Mentoring Meeting / Session has been booked. The fourteen-day rule is present from the point after the meeting occurs, but the ninety-day rule is from the point of booking. This means that if a Mentees requests a refund due to a complaint, and although it is made within five days of the meeting as outlined previously, if the meeting took place within fifteen days of the ninety day period concluding, then Try A Mentor is unable to arbitrate. As such, the refund request will be an issue for the Mentor and Mentee to solve independent of Try A Mentor.  </li>
              </ol>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="22">
            What information is shared about me on Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="22">
            <Card.Body className={css.faqCardBody}>
              <p>
              A general search on Try A Mentor could provide the following Information:</p>
              <ul>
                <li>-	Name</li>
                <li>-	Education and Career / Job History</li>
                <li>-	How they find your LinkedIn page (if you provideda link to it)</li>
                <li>-	Your YouTube videos discussing how you can help (if you provide the associated links / make these videos)</li>
                <li>-	Your review scores and the reviews / comments that past Mentees gave you</li>
              </ul>
              <p>
              Once a Mentee has booked your time and you have confirmed said booking, they will receive:</p>
              <ul>
                <li>-	Your Skype address</li>
              </ul>
              <p>Like Try A Mentor itself, Mentees will have no access to the financial details you provide Stripe (a completely independent technology platform that Try A Mentor uses to allow you to make and receive payments)</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="23">
            Is my Financial Information Safe?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="23">
            <Card.Body className={css.faqCardBody}>
              <p>One of the clear advantages of Try A Mentor is our use of the Stripe payment system (link: https://stripe.com/).Stripe is a completely independent technology platform that Try A Mentor uses to allow you to make and receive payments on Try A Mentor This is completely independent of Try A Mentor and keeps all financial information safe. Try A Mentor has no access to your financial information at all. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="24">
            Do I have to report and pay taxes for Mentoring / Coaching income?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="24">
            <Card.Body className={css.faqCardBody}>
              <p>You must legally report all income generated from Try A Mentor bookings that might originate from the Try A Mentor platform. As a Mentor, it is your business and responsibility to do so. If you are responsible for charging or collecting any local taxes on services, you must also comply with these regulations and as such build these into the fee you charge per hour along with the Try A Mentor fee.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="25">
            Am I required to have a Skype Video Conferencing Account? (Short answer: Yes)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="25">
            <Card.Body className={css.faqCardBody}>
              <p>Yes. This is an on-line Mentoring marketplace and as such it is critical that this is your approach. Simply sign-up to Skype and then add the link into your Mentor Profile.If you are unsure how to get your skype address, simply google this question and a range of videos will talk you through both signing up for Skype and then getting your individual skype address. Here is one such a video that was available at the time of writing this (Link:. https://www.youtube.com/watch?v=l-QHGpmGiuc)</p>
              <p>If you prefer to use another video conferencing application (app) e.g. Zoom, no problem, but you still need a Skype account and to have entered it on your Mentor Profile page. </p>
              <p>If you decide to use another video conferencing application, You will need to contact the Mentee through the Try A Mentor communication system (Inbox) in advance of each meeting to tell them to use this other application and provide them a link to contact you on it. This contact is critical and especially important as the Mentee will be sent an e-mail with your Skype link in it, so without contact from you, they will attempt to meet you through Skype.</p>
              <p>If your internet is not capable of supporting a video conferencing application effectively (clear picture and sound), I am afraid this means you cannot use Try A Mentor.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="26">
            Which is best – Skype, Zoom etc.?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="26">
            <Card.Body className={css.faqCardBody}>
              <p>All applications have their strengths but usually the best is the one that you already are familiar with. After that, Skype is free, Zoom has some great features but meeting over 45 minutes mean you must pay for the service. They all have their own pros and cons. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="27">
            I am not so good on the technical side, how do I sign-up and use Skype, Zoom etc.?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="27">
            <Card.Body className={css.faqCardBody}>
              <p>One of the great things about the internet is the ability to find help on it. For your preferred application (Skype, Zoom, etc.) just type into your search engine – how do I use Zoom etc. or how do I sign up for Zoom etc. You will see many links to videos, and many offers of help.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="28">
            What equipment will I need?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="28">
            <Card.Body className={css.faqCardBody}>
              <p>You need an internet provider who offers speeds capable of offering Skype or Zoom or equivalent. You will then need a computer (laptop or desktop) with an camera (in-built or bought separately), microphone (in-built or bought separately), and speakers, and if these are not present, you will need these in the form of a headset and webcam. Good lighting is a plus.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="29">
            I have the experience, but I am not sure how to develop my approach to Mentoring, is there any help? (Short answer: Yes)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="29">
            <Card.Body className={css.faqCardBody}>
              <p>Once you have set up your Mentor Account, in the menu you can then access, “Mentor Supports”. Here you will find an ever-growing list to aid you to be the best Mentor you can be. One video found there is on how to Mentor. You will also see resources for Mentees, that by you familiarising yourself with them, will also help you Mentor. For example, one video we hope to make is on how to do a good interview. So, if you are helping a Mentee to interview for a Job Role, this video would be a good source of information to help your mentee with. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="30">
              How can I be safe and cautious when using Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="30">
            <Card.Body className={css.faqCardBody}>
              <p>While we do everything that we can to build the most trusted community of Mentees to book, we rely on our community of users to help us by being proactive and always reporting any suspicious activity on our platform. We also have Community Guidelines(link) that outlines this in more detail. We ask you to read / visit these now, but please remember, this is an on-line Mentoring platform. You should not meet face to face and should not share personal contact details (if asked, remind the Mentor that they cannot be given due to the rules of Try A Mentor). All communication, including payment and booking should be done through Try A Mentor. The only exception is the actual Mentoring sessions which will be conducted through the Mentor’s video conferencing application e.g. Skype. Zoom etc. If asked to join a video conferencing application you are unsure of (never heard of), go to the website of the application to ensure it is totally legitimate and search for independent reviews of the application. </p>
              <p>If you already have an account on the requested video conferencing application (e.g. Skype), if possible, create a new account to keep your personal account secret.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="31">
            Do I have to communicate on Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="31">
            <Card.Body className={css.faqCardBody}>
              <p>It is a rule of the site that all communication occurs on Try A Mentor with the only exception being the communication which occurs during Mentoring Sessions on the video conferencing application. You should not share personal contact details (if asked, remind the Mentee that they cannot be given due to the rules of Try A Mentor). </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="32">
            If a Mentee requires me to sign a Non-Disclosure agreement, do I have to sign it?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="32">
            <Card.Body className={css.faqCardBody}>
              <p>No. It may mean that they will then not progress with you. Also, if you are ok with signing it, it may be prudent to gain professional advice on what signing it will mean. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <h2>Mentee Specific - Frequently Asked Questions </h2>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            Once I have started working with a Mentor, can I stop using Try A Mentor and instead book and pay them directly? What if they make this suggestion to me?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={css.faqCardBody}>
            <p>This is against the rules of this site, but there are common sense reasons as to why you should not do this:</p>
            <ul>
              <li>-	You are signalling to the Mentor, or they are signalling to you, that they are willing to be unethical. So, when payment is needed, you and they will need to share financial information with one another. Would you like to give such details to someone who has already shown themselves to be unethical?</li>
              <li>-	The payment system on Try A Mentor means that all financial payments are automatic, all financial information safe and you are working with a robust booking system. Having a place to easily find and book effective Mentors who need to abide to a set of rules to remain on the site. This means your safety is a critical element of Try A Mentor </li>
            </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
            How do I request to book a Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body className={css.faqCardBody}>
            <p>It is simple. As you arrived onto the Website you saw two questions appear. The first was “I would like help with an Interview” and the other was “I would like help with a Job Role”. These are in fact buttons. By clicking them you will gain access to someone who has or had the Job Role you are interested in. To find such a mentor press on either button. First you will be asked which sector the Job is in. Then what the Job Role is called and finally the level of seniority of the role. A list of Mentors who have had this role in the sector and required seniority will appear.</p>
            <p>Instantly you will see a snapshot of the organisations they have worked for, roles they have had and average reviews from those they have mentored. Add those of interest to your favourites or click a Mentor to discover more about them, to ask them questions and to book them to work with you. Their charges can be seen clearly and is an hourly rate.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
            Is my Financial Information Safe?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body className={css.faqCardBody}>
            <p>Try A Mentor uses the Stripe payment system (link: https://stripe.com/).Stripe is a completely independent technology platform that Try A Mentor uses to allow you to make and receive payments on Try A Mentor This is completely independent of Try A Mentor and keeps all financial information safe. Try A Mentor has no access to your financial information at all and as such only Stripe has access to it.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
            What information is shared about me on Try A Mentor or used for other purposes? (none – just your reviews)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body className={css.faqCardBody}>
            <p>All Try A Mentor collects is your name, confirmation you are over eighteen, phone number (optional) and e-mail address. None of this is shared with any other party and is used by Try A Mentor for administration purposes only.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
            Why do I need to be over eighteen to use Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body className={css.faqCardBody}>
            <p>There are many great reasons why someone below eighteen would benefit from having a Mentor, but for Try A Mentor, safety comes first. As such all users (Mentors and Mentees) must be over eighteen)</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="5">
            Can I cancel a Mentoring Session I booked?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="5">
            <Card.Body className={css.faqCardBody}>
            <p>A Mentee (you) can cancel a session with their Mentor at no charge up to 48-hours before the session they are cancelling. After this, the fee is non-refundable. All monies are automatically refunded by the Stripe system. Here is more information from the Try A Mentor terms and conditions:</p>
            <p>A Mentee can cancel a session with their Mentor at no charge up to 48-hours before the session they are cancelling. After this, the fee is non-refundable. All monies are automatically refunded by the Stripe system.</p>
            <p>If, however, a Mentee initially books the appointment within 48 hours of the appointment, then the Mentee will be charged unless such appointment is cancelled within the first 15 minutes of such booking (the “Cancellation Periods”). If a Mentee does not cancel a confirmed appointment within the applicable Cancellation Period, 100% of the cost of the services will be charged as a cancellation fee or in the case of a subscription the session credit will be deemed “used”.</p>
            <p>An example of the above is as follows:</p>
            <p>You book a Mentor meeting for the following day. After making the booking you suddenly realise that you cannot make the meeting after all. You look at your watch. It was booked just ten minutes ago. So, you cancel the booking. Because you booked within the 48-hour window when you must pay the full fee when you cancel, you initially think your money is lost, but the you remember that that you booked the session and the cancelled it within the fifteen minutes grace period. So, you now know that you will get a refund. To get this refund you contact Try A Mentor on admin@tryamentor.com to tell us what has occurred. We check the system to see if the booking and then cancellation occurred within a fifteen-minute period. We see it has and we direct Skype (the independent payment system) to refund you your monies.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="6">
            How do I cancel a Mentoring Session I booked?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="6">
            <Card.Body className={css.faqCardBody}>
            <p>Before you cancel, make sure you know the cancellation policy (see previous question). Once you are then happy to cancel, you ….</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="7">
            What if am dissatisfied, can I get my money back?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="7">
            <Card.Body className={css.faqCardBody}>
            <p>Yes, it is possible but what follows is extremely important for you to note. Try A Mentor does not provide Mentoring or Mentors. Try A Mentor’s service is to provide the means for Mentors and Mentees to find, book and pay for the Mentoring or Coaching Services offered by Mentors / Coaches. The service provider for Mentoring / Coaching is the Mentor / Coach. As such, if this service is not satisfactory, or the conduct of those involved is not appropriate, this is an issue for the Mentor and Mentee to solve independent of Try A Mentor.  </p>
            <p>This said, so that Try A Mentor is a safe place to deliver and receive Mentoring or Coaching, Try A Mentor has created an Arbitration Service so that refunds are possible under some clear conditions /stipulations. By using Try A Mentor you are agreeing to the process by which this arbitration operates and the outcome of the arbitration.</p>
            <p>These stipulations referred to above are driven primarily by Stripe (Stripe is a completely independent technology platform that Try A Mentor uses to allow you to make and receive payments). Stripe was chosen due to it security and because it offers a delayed payment system. It will collect money from a Mentee and then deposit these funds into the Mentor’s bank account after a period of time (Try A Mentor has no access to these funds at any time). </p>
            <p>What Try A Mentor can do, is while these funds are being held by Stripe, to arbitrate between Mentor and Mentee if a dispute occurs, and then depending on the outcome of the arbitration (which we will decide) to direct Stripe to pay either the Mentor or refund the Mentee. But Stripe has strict time limits on how long it will delay a payment which directly impact the rules of the arbitration. As such:</p>
            <ul>
              <li>3.	The very second after a Mentoring meeting (not booking) is conducted, Stripe will only hold the funds for payment of this meeting for fourteen calendar days. Once this fourteen-day period is concluded, Stripe will automatically deposit the funds due to the Mentor into the Mentor’s bank account, at which point Try A Mentor will no longer be able to arbitrate and make a refund. As a result of this, the following is the structure of the Arbitration process:
                <ul>
                  <li>q)	The complaint / request for refund has to be e-mailed to admin@tryamentor.com within five calendar days of the Mentoring Session. The complaint must contain all the information that the Mentee has that illustrates that a refund should be made. It is important to note that any written evidence submitted, has to be information that was communicated through Try A Mentor communication system as it is a condition of using Try A Mentor that all written communication between a Mentor and Mentee must occur through the internal communication system. The only exception to this is the verbal communication that occurs in the Mentoring meetings itself</li>
                  <li>r)	If a request for a refund is made after the five calendar days, Try A Mentor will no longer be in the position to Arbitrate and the Mentor and Mentee will need to solve the issue independent of Try A Mentor (Try A Mentor will no longer be involved and will play no part in any refund)</li>
                  <li>s)	If the Mentee attempts to provide additional evidence after the initial five days, it will be not be reviewed. The reason is the overarching time limit. To be fair to the Mentor, we need to allow the Mentor adequate time to see the evidence presented against them and then time to respond.</li>
                  <li>t)	Once Try A Mentor has received the complaint and the evidence from the Mentee, it will then be sent unedited to the Mentor. </li>
                  <li>u)	The Mentor will now have a right to reply and is given three calendar days to prepare and send their defence. Again, any written evidence presented must be that found on Try A Mentor’s communication system (see reason above) and no evidence presented by the Mentor after this three-day period will be reviewed.</li>
                  <li>v)	If there is no response from the Mentor within this three-day period, for whatever reason, then unfortunately the arbitration will only take into account the evidence presented by the Mentee. The only reason for this, is that the Stripe system will only hold the funds for the fourteen day, so this drives these strict time limits</li>
                  <li>w)	With the Mentees case made and hopefully the case of the Mentor presented to Try A Mentor within the stipulated time frames, Try A Mentor will impartially adjudicate the issue and come to a binding decision before the fourteen days deadline has been reached. The findings of Try A Mentor are binding (a stipulation of using this site for all users)</li>
                  <li>x)	Try A Mentor will communicate its decision to both Mentor and Mentee, but this communication will not contain the reasons for the decision but simply what has been decided. </li>
                </ul>
              </li>
              <li>4.	The second impact that the Stripe system has on the arbitration process relates to the following rule that it has in place. Strip will only hold monies for a maximum of 90 calendar days from the point of collection. In this case, the point of collection is when a Mentoring Meeting / Session has been booked. The fourteen-day rule is present from the point after the meeting occurs, but the ninety-day rule is from the point of booking. This means that if a Mentees requests a refund due to a complaint, and although it is made within five days of the meeting as outlined previously, if the meeting took place within fifteen days of the ninety day period concluding, then Try A Mentor is unable to arbitrate. As such, the refund request will be an issue for the Mentor and Mentee to solve independent of Try A Mentor.  </li>
            </ul>
            
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="8">
            Can I have my company / organisation pay for my Mentoring? (Yes)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="8">
            <Card.Body className={css.faqCardBody}>
            <p>Simply have a person in your organisation with the authority to make this decision to e-mail Try A Mentor at admin@tryamentor.com for a specific organisational account to be established. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="9">
            Is a booking request binding?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="9">
            <Card.Body className={css.faqCardBody}>
            <p>A Mentee (you) can cancel a session with their Mentor at no charge up to 48-hours before the session they are cancelling. After this, the fee is non-refundable and as such seen as binding. All monies are automatically refunded by the Stripe system.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="10">
            How many booking requests can I send?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="10">
            <Card.Body className={css.faqCardBody}>
            <p>As many as you like, but remember it is a booking request. The Mentor must accept each session / meeting you are requesting. So, you will receive a booking confirmation for each Meeting you have requested (even though you booked them all at the same time). If you have not received a booking confirmation (or a message saying the booking has been refused) for each meeting / session, then check you spam folder, or more effectively look in your Try A Mentor inbox </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="11">
            How long will it take for a Mentor to respond to my request?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="11">
            <Card.Body className={css.faqCardBody}>
            <p>Mentors are typically very responsive and reply as soon as they receive a booking request. If you do not hear back from a Mentor regarding your request, you can also send them a message to gently remind them to respond. The Mentors have seven calendar days to respond before the booking is automatically cancelled.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="12">
            Is there a minimum or maximum booking duration?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="12">
            <Card.Body className={css.faqCardBody}>
            <p>The minimum is one hour, but there is no maximum. We recommend that you do not go over three hours. Meetings like this can require a lot of energy. So, our advice is to do a series of short meetings rather than one long meeting.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="13">
            Can I modify a booking once it has been sent as a booking request?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="13">
            <Card.Body className={css.faqCardBody}>
            <p>Once a booking request has been sent it cannot be modified but you can cancel it without charge (if it is outside of the 48 hours of the time of the meeting) and rebook. If you attempt to modify your booking inside the 48 hour period (any cancellations at this point will see you being fully charged),you will then need to message the Mentor directly, request for them to cancel, and then resubmit another booking request.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="14">
            When is a booking confirmed?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="14">
            <Card.Body className={css.faqCardBody}>
            <p>A booking is confirmed once indicated as completed by the Mentor. You will receive a message of booking confirmation for each of the meetings / sessions you have booked. Look for these in your Try A Mentor Inbox, just in case these messages end up in your e-mail’s spam folder etc.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="15">
            How can I be safe and cautious when using Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="15">
            <Card.Body className={css.faqCardBody}>
            <p>While we do everything that we can to build the most trusted community of Mentors to book, we rely on our community of users to help us by being proactive and always reporting any suspicious activity on our platform. We also have Community Guidelines (link) that outlines this in more detail. We ask you to read / visit these now, but please remember, this is an on-line Mentoring platform. You should not meet face to face and should not share personal contact details (if asked, remind the Mentor that they cannot be given due to the rules of Try A Mentor). All communication, including payment and booking should be done through Try A Mentor. The only exception is the actual Mentoring sessions which will be conducted through the Mentor’s video conferencing application e.g. Skype. Zoom etc. If asked to join a video conferencing application you are unsure of (never heard of), go to the website of the application to ensure it is totally legitimate and search for independent reviews of the application. </p>
            <p>If you already have an account on the requested video conferencing application (e.g. Skype), if possible, create a new account to keep your personal account secret.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="16">Do I have to communicate on Try A Mentor? (Short Answer: Yes)</Accordion.Toggle>
          <Accordion.Collapse eventKey="16">
            <Card.Body className={css.faqCardBody}>
            <p>It is a rule of the site that all communication occurs on Try A Mentor with the only exception being the communication that occurs during Mentoring Sessions on the video conferencing application. You should not share personal contact details (if asked, remind the Mentor that they cannot be given due to the rules of Try A Mentor). </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="17">I am being asked to meet my Mentor through a Video Conferencing application. How do I do this?</Accordion.Toggle>
          <Accordion.Collapse eventKey="17">
            <Card.Body className={css.faqCardBody}>
            <p>The wonderful thing about the internet is you can find videos on it explaining how to use any of the major video conferencing applications e.g. Skype, Zoom etc. Just search “how do I …” and a video will be found. If asked to join a video conferencing application you are unsure of (never heard of), go to the website of the application to ensure it is totally legitimate and search for independent reviews of the application. </p>
            <p>If you already have an account on the requested video conferencing application (e.g. Skype), if possible, create a new account to keep your personal account secret.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="18">
            Should I have my Mentor sign a Non-Disclosure agreement?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="18">
            <Card.Body className={css.faqCardBody}>
            <p>If you are in a Role and sharing information about it and about your organisation, then you and your organisation may feel it is prudent to have your Mentor sign such an agreement. Try A Mentor’s parent organisation, The Beacon HRM Group, supply Executive Coaches to organisations and employees found within them. It is rare that any Executive Coach has had to sign a Non-Disclosure but not unheard of. So, if you and your organisation think it would be prudent due to the type of information you will be sharing to have the Mentor sign a Non-Disclosure agreement, please do so. </p>
            <p>In turn the Mentor has the right to refuse and you then can decide not to use this person.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="19">
            What information is shared with the Mentor – Short answer – your Name
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="19">
            <Card.Body className={css.faqCardBody}>
            <p>All Try A Mentor collects is your name, confirmation you are over eighteen, phone number (optional) and e-mail address. None of this is shared with any other party and is used by Try A Mentor for administration purposes only. The Mentor only receives your Name.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="20">
            How do I know my payment and financial details are safe?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="20">
            <Card.Body className={css.faqCardBody}>
            <p>One of the clear advantages of Try A Mentor is our use of the Stripe payment system (link: https://stripe.com/). This is completely independent of Try A Mentor and keeps all financial information and monies safe (Try A Mentor never has access to it). Specifically, Try A Mentor uses it for a delayed payment feature. Once a session is booked, Stripe collects the monies due but does not deposit them into the Mentor’s account until fourteen days after the session occurs. So, if you need these funds returned please review how our arbitration process works (previous question)</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="21">
            What type of photograph should I use? – Short Answer – Photo is Optional
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="21">
            <Card.Body className={css.faqCardBody}>
            <p>
            There is no requirement to upload a photograph. If you do, just choose one that makes you happy.  
            </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <h2>Legal & Insurance</h2>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            Do I need insurance to be a Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={css.faqCardBody}>
            <p>Yes, it is always prudent to have insurance prior to listing on Try A Mentor.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
            Does Try A Mentor offer insurance?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body className={css.faqCardBody}>
            <p>No, Try A Mentor does not offer marketplace insurance for bookings and instead suggest that all Mentors adequately ensure themselves prior to listing it on Try A Mentor.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
            Can we require Mentees to have their own insurance to book me as a Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body className={css.faqCardBody}>
            <p>Yes, you can require that Mentees have their own insurance policy in place for them to book you as a Mentor, but it is extremely unlikely that any Mentee will then book you. If you require this, please mention this in your Role Profile descriptions, notify all booking requests of this requirement, and receive proof of insurance to verify this prior to accepting a booking.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
            Do I need Mentees to sign an agreement, sign a waiver, or any other form of agreement?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body className={css.faqCardBody}>
            <p>Your Booking request through Try A Mentor is not a contractual agreement, but a message requesting to use your service as defined in the listing for the date, time period, and for the price requested. If you have further requirements, please be sure to message Mentees directly to inform them of this but please note – no changes to the payment process can be made.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <h2>My Account – Frequently Asked Questions</h2>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            How do I create a Mentee account?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={css.faqCardBody}>
            <p>You can create a user account in seconds doing the following:</p>
            <p>
              Click “Try A Mentor” in the top right corner of the landing / first page<br />
              Enter your email address and create a secure password<br />
              Please check the email address you entered and confirm you email
            </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
            How do I log into my account?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body className={css.faqCardBody}>
            <p>
              Click “Log in” in the top right corner of the landing / first page<br />
              Enter your email address and secure password 
            </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
            How can I delete my account?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body className={css.faqCardBody}>
            <p>
            If you would like to permanently delete your Mentor or Mentee account, please email us at admin@tryamentor.com
            </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
            How do I report suspicious account activity?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body className={css.faqCardBody}>
            <p>
            Please report any suspicious activity or users immediately by sending us an email at admin@tryamentor.com
            </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
            How do I report other users for acting against “Try A Mentor” policies?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body className={css.faqCardBody}>
            <p>
            Please report any suspicious activity or users immediately by sending us an email at admin@tryamentor.com
            </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <p>PLEASE NOTE: THE CONTENTS OF THE FAQ IS SUPERSEDED BY THE INFORMATION FOUND IN THE TERMS OF SERVICE SECTION</p>
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
