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
      <Accordion defaultActiveKey="0">
        <h2>Mentors - Frequently Asked Questions</h2>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            Once I have started Mentoring, can I have the mentee book and pay me directly
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={css.faqCardBody}>
              <p>No. This is against the rules of this site, but there are common sense reasons as to why you should not do this:</p> 
              <ul>
                <li>- 	Using our site is about gaining a steady stream of Mentees and as such revenue. Once a Mentee and you finish working together, they will leave a review. The more reviews you have, the more future Mentees will pick you. By moving a Mentee to work with you directly, they can no longer leave a review and future bookings will decrease.</li>
                <li>- 	You are signalling to the Mentee, or they are signalling to you, that they are willing to be unethical. So, when payment is needed you and they will need to share financial information with one another. Would you like to give such details to someone who has already shown themselves to be unethical?</li>
                <li>- 	The payment system on Try A Mentor means that all financial payments are automatic, all financial information safe and you are working with a robust booking system. Having a place to find a steady stream of mentors and mentees and the system to support this process makes continuing to work through us easy, profitable, and fun. </li>
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
              <p>Setting up as a Mentor is easy and only takes a few minutes. </p> 
              <p>You begin by clicking “Become a Mentor” (link), which is on the top righthand corner of the main page. Here you will be asked for your Name, E-mail address (which you will need to verify), Password, and confirmation that you are 18 years of age or over. You have now begun to create your Mentor Profile.</p> 
              <p>Next, we begin collecting the information that will help Mentees choose you. You provide (starting from the most recent), the organisations you have worked for and the roles you have had, followed by your Education to date. If you do not have this information to hand, that is ok, you can skip this and enter this information later, along with a photo. This completes your Mentor Profile.</p> 
              <p>Now, we need to help Mentees find you and the roles you can help with. On the top of the page is a new option “Roles I can Mentor”. Click this (link). Here you get to precisely define the Sector and Level for each of the Roles you can Mentor. For each, role you create new Role Profiles, telling the system how much you will charge and when you are available. If you can Mentor a specific role at various seniority levels, you will need to create an individual Role Profile for each of these levels. Sound complicated? It is not, the system will guide you through each step.</p> 
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
              <p>To do this you will have first had to sign-up (link) to be a Mentor and verified your e-mail address. You are now ready to add the roles you can be a Mentor for by creating what we call Role Profiles. On the top of the page is a new option “Roles I can Mentor”. Click this (link). Here you get to precisely define the Sector and Level for each of the Roles you can Mentor. For each, role you create new Role Profiles, telling the system how much you will charge and when you are available. If you can Mentor a specific role at various seniority levels, you will need to create an individual Role Profile for each of these levels. Sound complicated? It is not, the system will guide you through each step.</p> 
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
                <li>1.	Has the Mentor performed the Job Role I am interested in, inmy required Sector and at the same Level?</li>
                <li>2.	For whom did they work for when doing this role and for how long?</li>
                <li>3.	What Education do they have?</li>
                <li>4.	Is this Experience and Education provided real? – a means to check.</li>
                <li>5.	How well they clearly define how their experience can help me? (Can they tell me not just that they had this role, but the successes they had doing it?)</li>
                <li>6.	Do they come across as someone who is professional and approachable?</li>
              </ul>
              <p>Your listing is designed to aid you to answer each of these questions. Question 4 is achieved by having a Linked-in page and you providing a link to it for potential Mentees. Question 5, through a section of your listing in which you can provide a paragraph on your successes in that Job Role. This will be further added to by including a short YouTube video (optional) in which Mentees can see you discussing why you would make a great Mentor for the Job Role in question; while this and your Photograph, and the entire listing, will have the potential of presenting you as both professional and approachable.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="5">
              What Type of Photograph should I use?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="5">
            <Card.Body className={css.faqCardBody}>
              <p>This is a professional service you are offering, so how you present yourself should reflect this. For further direction consider what ‘Professional’ in the sector you are focused on means. Finally, you need to look friendly. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="6">
              Why have you asked for a LinkedIn Address / Link (optional)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="6">
            <Card.Body className={css.faqCardBody}>
              <p>This is provided to Mentees so they can check if the skills and experience you claim to have, are also reflected in your LinkedIn profile. It adds credibility to your profile.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="7">
              Why should I make a YouTube video to place on Try A Mentor (optional)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="7">
            <Card.Body className={css.faqCardBody}>
              <p>A picture tells a thousand words, but a video many, many more. By creating a short video (recommended 2 minutes) discussing how your experience can help a potential Mentee with a Job Role, they can see how approachable, positive, and effective you will be. It makes their decision to choose you as their Mentor, far easier.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="8">
              How do I make a YouTube then place it on Try A Mentor (optional)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="8">
            <Card.Body className={css.faqCardBody}>
              <p>You make your video with your mobile phone. Plan what you will say, practice, dress well and have great lighting. Next create become a member of YouTube, Post and get the Link. The best way to see how this is done … well here is a YouTube video explaining (Link: https://www.youtube.com/watch?v=zWh3CShX_do) </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="9">
            How do I accept a booking request?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="9">
            <Card.Body className={css.faqCardBody}>
              <p>The system will send an e-mail to you to notify you a booking request has been made. Then log in and:</p>
              <ul>
                <li>- 	Click on “Messages” in the top right navigation bar. </li>
                <li>- 	On the left side navigation of your Messages Inbox, select the “Booking Requests” tab.</li>
                <li>- 	Click on the booking request messages directly and you will see the option to accept or deny the booking request </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="10">
              Do I have to accept a booking request?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="10">
            <Card.Body className={css.faqCardBody}>
              <p>You are not required to accept a request and may decline any request. If you take no action to accept or deny a request, the booking request will automatically expire in 24 hours. If you missed the request by accident, you can message the potential Mentee directly from their expired request and suggest that they make another request.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="11">
              Mentor: How long do I have to respond to booking requests?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="11">
            <Card.Body className={css.faqCardBody}>
              <p>You have 24 hours to either accept or deny a booking request. After 24 hours, the booking request will automatically expire. If you missed the request by accident, you can then message the potential Mentee directly from their expired request and suggest that they make another request.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="12">
              How can I modify a booking request?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="12">
            <Card.Body className={css.faqCardBody}>
              <p>Once a booking request is sent, the dates, amount, and details of the booking request cannot be modified. Please note that booking requests are not contractual booking agreements, but messages for requesting a booking.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="13">
              Do you charge transaction fees for bookings?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="13">
            <Card.Body className={css.faqCardBody}>
              <p>We charge 10% of the booking fee.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="14">
              Mentor:What fee should I charge per hour?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="14">
            <Card.Body className={css.faqCardBody}>
              <p>We put pricing in the hands of Mentors (you can charge as low as €1 euro). You can price your time at your discretion and please take local rates, taxes, Try A Mentor fees, and other fees into consideration when listing your hourly rate. It is a marketplace, so consider what others who are offering Mentoring for the same Job Role are charging. Is your experience more, less, or equivalent to them, how many reviews do you currently have and how good are they compared to yours? This can be a useful start when determining the relevant fee.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="15">
              I accepted a booking request. How do I collect the payment?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="15">
            <Card.Body className={css.faqCardBody}>
              <p>One of the clear advantages of Try A Mentor is our use of the Stripe payment system (link: https://stripe.com/). This is completely independent of Try A Mentor and keeps all financial information safe (Try A Mentor never has access to it). Specifically, Try A Mentor uses it for a delayed payment feature. Once the session is booked, Stripe collects the monies due but does not deposit them into the Mentor’s account until <span className={css.largeText}>X</span> time after the session occurs.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="16">
            How do I charge for additional services?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="16">
            <Card.Body className={css.faqCardBody}>
              <p>Examples of such additional services could include doing a specific Job-related task for the Mentee to allow them to see how it is done effectively. Everything on Try A Mentor is charged by the amount of time it takes to do it. If you are doing a task for a Mentee that does not involve meeting with them, you then either have them book this time from the available hours in your calendar, or create additional extra hours of availability within the Role Profile and have them book this, even though you won’t be meeting. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="17">
            How do I charge for additional services?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="17">
            <Card.Body className={css.faqCardBody}>
              <p>
              Yes, it will mean that the monies are refunded to the Mentee. The key is to be considerate and if you absolutely have to cancel, do provide a credible reason while offering a new time as part of the cancellation message. 
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="18">
            What is the Cancellation Policy / Can I list my own Cancellation Policy?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="18">
            <Card.Body className={css.faqCardBody}>
              <p>
              At this stage, due to how Stripe operates (Stripe is a completely independent technology platform that Try A Mentor uses to allow you to make and receive payments) we are not in the position to enable you to choose an individual cancellation policy. Instead, a Mentee can cancel their session with you at no charge up to 48-hours before the session they are cancelling. All monies are automatically refunded if the request is made within this 48-hour period.
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="19">
            What if the Mentee complains and wants a refund after our session together?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="19">
            <Card.Body className={css.faqCardBody}>
              <p>Yes it is possible that a refund is made, but with the following stipulations:</p>
              <ul>
                <li>1.	The complaint has to be e-mailed to admin@tryamentor.com within five days of the Mentoring Session (please note: this is five calendar days)</li>
                <li>2.	On receiving the complaint, Try A Mentor will adjudicate the issue. All information to enable Try A Mentor to arbitrate must be with Try A Mentor within Eight Days of the date of the Mentoring Session (please note: this is eight calendar days)</li>
                <li>3.	Try A Mentor will be impartial, and utilise the information received from both parties (whatever is sent to us within this eight-day period) to reach a final decision (if the refund is to be made). The findings of Try A Mentor are binding (a stipulation of using this site for all users)</li>
              </ul>
              <p>Why is this address system structured in this way? One of the clear advantages of Try A Mentor is our use of the Stripe payment system (link: https://stripe.com/). This is completely independent of Try A Mentor and keeps all financial information safe (Try A Mentor never has access to it). Specifically, Try A Mentor uses it for a delayed payment feature. Once the session is booked, Stripe collects the monies due but does not deposit them into the Mentor’s account until fourteen days after the session occurs. If a Mentee does not complain within the first five days, Try A Mentor is not able to pause the payment. If a complaint has been made within the five-day time-period, then payment is paused but not cancelled. Hence Try A Mentor needs to collect all the information from both parties within eight days so that it can be carefully considered before the fourteen-day time limit expires. If Try A Mentor rules in favour of the Mentee, the monies are no longer transferred to the Mentor and instead transferred back to the Mentee. If Try A Mentor rules in favour of the Mentor, the payment goes ahead on the fourteenth day. At this point Try A Mentor is not capable of getting a return of monies regardless of any new information presented. </p>
              <p>At this point, to gain a refund it will revert to the Mentor deciding to make a refund or the Mentee gaining a refund through successful legal action against the Mentor. It is important to note, Try A Mentor is not the service provider, the Mentor is. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="20">
            What information is shared about me on Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="20">
            <Card.Body className={css.faqCardBody}>
              <p>A general search on Try A Mentor could provide the following Information:</p>
              <ul>
                <li>-	Name</li>
                <li>-	Education and Career / Job History</li>
                <li>-	How they find your LinkedIn page (if you provideda link to it)</li>
                <li>-	Your YouTube videos discussing how you can help (if you provide the associated links)</li>
                <li>-	Your review scores and the reviews / comments that past Mentees gave you</li>
              </ul>
              
              <p>Once a Mentee has booked your time and you have confirmed said booking, they will receive:</p>
              <ul>
                <li>-	Your Skype / Zoom or other video conferencing address</li>
              </ul>
              <p>Like Try A Mentor, Mentees will have no access to the financial details you provide Stripe</p>
              <p>One of the clear advantages of Try A Mentor is our use of the Stripe payment system (link: https://stripe.com/).Stripe is a completely independent technology platform that Try A Mentor uses to allow you to make and receive payments on Try A Mentor This is completely independent of Try A Mentor and keeps all financial information safe. Try A Mentor has no access to your financial information at all. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="21">
            Do I have to report and pay taxes for Mentoring income?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="21">
            <Card.Body className={css.faqCardBody}>
              <p>
              You must legally report all income generated from Try A Mentor bookings that might originate from the Try A Mentor platform. As a Mentor, it is your business and responsibility to do so. If you are responsible for charging or collecting any local taxes on services, you must also comply with these regulations and as such build these into the fee you charge per hour along with the Try A Mentor fee.
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="22">
            Am I required to have a Skype, Zoom or other Video Conferencing Account? (Short answer: Yes)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="22">
            <Card.Body className={css.faqCardBody}>
              <p>
              Yes. This is an on-line Mentoring marketplace and as such it is critical that this is your approach. Simply sign-up with your preferred application and provide us with a link. If your internet is not capable of supporting this approach, I am afraid this means you cannot use Try A Mentor.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="23">
            Which is best – Skype, Zoom etc.?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="23">
            <Card.Body className={css.faqCardBody}>
              <p>One of the great things about the internet is the ability to find help on it. For your preferred application (Skype, Zoom, etc.) just type into your search engine – how do I use Zoom etc. or how do I sign up for Zoom etc. You will see many links, and many offers of help.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="24">
            I am not so good on the technical side, how do I sign-up and use Skype, Zoom etc.?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="24">
            <Card.Body className={css.faqCardBody}>
              <p>All applications have their strengths but usually the best is the one that you already are familiar with. After that, Skype is free, Zoom has some great features but meeting over 45 minutes mean you must pay for the service. They all have their own pros and cons and specifically from your perspective.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="25">
            What equipment will I need?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="25">
            <Card.Body className={css.faqCardBody}>
              <p>You need an internet provider who offers speeds capable of offering Skype or Zoom or equivalent. You will then need a computer (laptop or desktop) with an inbuilt camera, microphone, and speakers and if these are not present, you will need these in the form of a headset and webcam. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="26">
            I have the experience, but I am not sure how to develop my approach to Mentoring, is there any help? (Short answer: Yes)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="26">
            <Card.Body className={css.faqCardBody}>
              <p>Once you have set up your Mentor Account, in the menu you can then access, you will see “Mentor Supports”. Here you will find an ever-growing list to aid you to be the best Mentor you can be. One video found there is on how to Mentor. You will also see resources for Mentees, that by you familiarising yourself with them, will also help you Mentor. For example, one video we hope to make is on how to do a good interview. So, if you are helping a Mentee to interview for a Job Role, this video would be a good source of information to help your mentee with. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="27">
            How can I be safe and cautious when using Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="27">
            <Card.Body className={css.faqCardBody}>
              <p>While we do everything that we can to build the most trusted community of Mentees to book, we rely on our community of users to help us by being proactive and always reporting any suspicious activity on our platform. We also have Community Guidelines (link) that outlines this in more detail. We ask you to read / visit these now, but please remember, this is an on-line Mentoring platform. You should not meet face to face and should not share personal contact details (if asked, remind the Mentor that they cannot be given due to the rules of Try A Mentor). All communication, including payment and booking should be done through Try A Mentor. The only exception is the actual Mentoring sessions which will be conducted through the Mentor’s video conferencing application e.g. Skype. Zoom etc. If asked to join a video conferencing application you are unsure of (never heard of), go to the website of the application to ensure it is totally legitimate and search for independent reviews of the application.  </p>
              <p>If you already have an account on the requested video conferencing application (e.g. Skype), if possible, create a new account to keep your personal account secret. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="28">
            Do I have to communicate on Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="28">
            <Card.Body className={css.faqCardBody}>
              <p>It is a rule of the site that all communication occurs on Try A Mentor with the only exception being the communication that occurs during Mentoring Sessions on the video conferencing application. You should not share personal contact details (if asked, remind the Mentee that they cannot be given due to the rules of Try A Mentor). </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="29">
            If a Mentee requires me to sign a Non-Disclosure agreement, do I have to sign it?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="29">
            <Card.Body className={css.faqCardBody}>
              <p>No. It may mean that they will then not progress with you. Also, if you are ok with signing it, it may be prudent to gain professional advice on what signing it will mean. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <h2>Mentees</h2>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            Once I have started working with a Mentor, can I stop using Try A Mentor and instead book and pay them directly? What if they make this suggestion to me?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={css.faqCardBody}>
            <p>This is against the rules of this site, but there are common sense reasons as to why you should not do this:</p>
            <ul>
              <li>-	You are signalling to the Mentor, or they are signalling to you, that they are willing to be unethical. So, when payment is needed you and they will need to share financial information with one another. Would you like to give such details to someone who has already shown themselves to be unethical?</li>
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
            <p>Try A Mentor uses of the Stripe payment system (link: https://stripe.com/).Stripe is a completely independent technology platform that Try A Mentor uses to allow you to make and receive payments on Try A Mentor This is completely independent of Try A Mentor and keeps all financial information safe. Try A Mentor has no access to your financial information at all and as such only Stripe has access to it.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
            What information is shared about me on Try A Mentor or used for other purposes (none – just your reviews)?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body className={css.faqCardBody}>
            <p>All Try A Mentor collects is your name, confirmation you are over eighteen, phone number (optional) and e-mail address. None of this is shared with any other party and is used by Try A Mentor for administration purposes only.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
            Why do I need to be over eighteen to use Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body className={css.faqCardBody}>
            <p>There are many great reasons why someone below eighteen would benefit from having a Mentor, but for Try A Mentor, safety comes first. As such all users (Mentors and Mentees) must be over eighteen)</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
            Can I cancel a Mentoring Session I booked?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body className={css.faqCardBody}>
            <p>A Mentee (you) can cancel a session with their Mentor at no charge up to 48-hours before the session they are cancelling. After this, the fee is non-refundable. All monies are automatically refunded by the Stripe system within XX period.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="5">
            What if am dissatisfied, can I get my money back?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="5">
            <Card.Body className={css.faqCardBody}>
            <p>Yes, but with the following stipulations:</p>
            <ul>
              <li>1.	The complaint has to be e-mailed to admin@tryamentor.com within five days of the Mentoring Session (please note: this is five calendar days).</li>
              <li>2.	On receiving the complaint, Try A Mentor will adjudicate the issue. All information to enable Try A Mentor to adjudicate must be with Try A Mentor within Eight Days of the date of the Mentoring Session (please note: this is eight calendar days).</li>
              <li>3.	Try A Mentor will be impartial, and utilise the information received from both parties (whatever is sent to us within this eight-day period) to reach a final decision (if the refund is to be made). After this point, if the Mentee is still unhappy with the decision, they can then pursue legal action against the Mentor (the provider of the service).</li>
            </ul>
            <p>Why is this address system structured in this way? One of the clear advantages of Try A Mentor is our use of the Stripe payment system (link: https://stripe.com/). This is completely independent of Try A Mentor and keeps all financial information safe (Try A Mentor never has access to it). Specifically, Try A Mentor uses it for a delayed payment feature. Once the session is booked, Stripe collects the monies due but does not deposit them into the Mentor’s account until fourteen days after the session occurs. If a Mentee does not complain within the first five days, Try A Mentor is not able to pause the payment. If a complaint has been made within the five-day time-period, then payment is paused but not cancelled. Hence Try A Mentor needs to collect all the information from both parties within eight days so that it can be carefully considered before the fourteen-day time limit expires. If Try A Mentor rules in favour of the Mentee, the monies are no longer transferred to the Mentor and instead transferred back to the Mentee. If Try A Mentor rules in favour of the Mentor, the payment goes ahead on the fourteenth day. At this point, Try A Mentor is not capable of getting a return of monies regardless of any new information presented. </p>
            <p>At this point, to gain a refund it will revert to the Mentor deciding to make a refund or the Mentee gaining a refund through successful legal action against the Mentor. It is important to note, Try A Mentor is not the service provider, the Mentor is. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="6">
            Can I have my company / organisation pay for my Mentoring? (Yes)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="6">
            <Card.Body className={css.faqCardBody}>
            <p>Simply have your manager or a member of your organisation e-mail Try A Mentor at admin@tryamentor.com for a specific organisational account to be established. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="7">
            Is a booking request binding?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="7">
            <Card.Body className={css.faqCardBody}>
            <p>A Mentee (you) can cancel a session with their Mentor at no charge up to 48-hours before the session they are cancelling. After this, the fee is non-refundable and as such seen as binding. All monies are automatically refunded by the Stripe system within XX period.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="8">
            How many requests can I send?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="8">
            <Card.Body className={css.faqCardBody}>
            <p>You can send multiple requests, but we strongly recommend that you wait to hear back from a Mentor once you send a request. If the request is urgent, you can also send them a message regarding the booking request directly from their listing.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="9">
            How long will it take for a Mentor to respond to my request?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="9">
            <Card.Body className={css.faqCardBody}>
            <p>Mentors are typically very responsive and reply as soon as they receive a booking request. If you do not hear back from a Mentor regarding your request, you can also send them a message regarding the booking request directly from their listing.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="10">
            Is there a minimum or maximum booking duration?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="10">
            <Card.Body className={css.faqCardBody}>
            <p>The minimum is one hour, but there is no maximum. We recommend that you do not go over three hours. Meetings like this can require a lot of energy. So, our advice is to do a series of short meetings rather than one long meeting.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="11">
            Can I modify a booking once it has been sent as a booking request?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="11">
            <Card.Body className={css.faqCardBody}>
            <p>Once a booking request has been sent it cannot be modified. You can however message the Mentor directly, request for them to cancel, and resubmit another booking request. If your request to cancel or modify a booking comes within a 48-hour period prior to the Mentoring session, the Mentor cannot charge you for the cancellation, but thereafter the session will be charged fully. If a mentor is refusing to cancel a session, or you notice they failed to cancel before the 48-hour period, please contact us at admin@tryamentor.com and we will make the cancellation for you.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="12">
            When is a booking confirmed?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="12">
            <Card.Body className={css.faqCardBody}>
            <p>A booking is confirmed once indicated as completed by the Mentor.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="13">
            How can I be safe and cautious when using Try A Mentor?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="13">
            <Card.Body className={css.faqCardBody}>
            <p>While we do everything that we can to build the most trusted community of Mentors to book, we rely on our community of users to help us by being proactive and always reporting any suspicious activity on our platform. We also have Community Guidelines (link) that outlines this in more detail. We ask you to read / visit these now, but please remember, this is an on-line Mentoring platform. You should not meet face to face and should not share personal contact details (if asked, remind the Mentor that they cannot be given due to the rules of Try A Mentor). All communication, including payment and booking should be done through Try A Mentor. The only exception is the actual Mentoring sessions which will be conducted through the Mentor’s video conferencing application e.g. Skype. Zoom etc. If asked to join a video conferencing application you are unsure of (never heard of), go to the website of the application to ensure it is totally legitimate and search for independent reviews of the application. </p>
            <p>If you already have an account on the requested video conferencing application (e.g. Skype), if possible, create a new account to keep your personal account secret.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="14">Do I have to communicate on Try A Mentor? (Short Answer: Yes)
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="14">
            <Card.Body className={css.faqCardBody}>
            <p>It is a rule of the site that all communication occurs on Try A Mentor with the only exception being the communication that occurs during Mentoring Sessions on the video conferencing application. You should not share personal contact details (if asked, remind the Mentor that they cannot be given due to the rules of Try A Mentor). </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="15">I am being asked to meet my Mentor through a Video Conferencing application. How do I do this?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="15">
            <Card.Body className={css.faqCardBody}>
            <p>The wonderful thing about the internet is you can find videos on it explaining how to use any of the major video conferencing applications e.g. Skype, Zoom etc. Just search “how do I …” and a video will be found. If asked to join a video conferencing application you are unsure of (never heard of), go to the website of the application to ensure it is totally legitimate and search for independent reviews of the application. </p>
            <p>If you already have an account on the requested video conferencing application (e.g. Skype), if possible, create a new account to keep your personal account secret.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="16">
            Should I have my Mentor sign a Non-Disclosure agreement?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="16">
            <Card.Body className={css.faqCardBody}>
            <p>If you are in a Role and sharing information it and about your organisation, then you and your organisation may feel it is prudent to have your Mentor sign such an agreement. Try A Mentor’s parent organisation, The Beacon HRM Group, supply Executive Coaches to organisations and employees found within them. It is rare that any Executive Coach has had to sign a Non-Disclosure but not unheard of. So, if you and your organisation think it would be prudent due to the type of information you will be sharing to have the Mentor sign a Non-Disclosure agreement, please do so. </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="17">
            What information is shared with the Mentor – Short answer – your Name
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="17">
            <Card.Body className={css.faqCardBody}>
            <p>All Try A Mentor collects is your name, confirmation you are over eighteen, phone number (optional) and e-mail address. None of this is shared with any other party and is used by Try A Mentor for administration purposes only. The Mentor only receives your Name.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="18">
            How do I know my payment is safe?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="18">
            <Card.Body className={css.faqCardBody}>
            <p>One of the clear advantages of Try A Mentor is our use of the Stripe payment system (link: https://stripe.com/). This is completely independent of Try A Mentor and keeps all financial information and monies safe (Try A Mentor never has access to it). Specifically, Try A Mentor uses it for a delayed payment feature. Once a session is booked, Stripe collects the monies due but does not deposit them into the Mentor’s account until fourteen days after the session occurs. So if you need these funds returned due to a complaint and you do so within the first five days of having had the Mentoring Session, then Try A Mentor is able to pause the payment to the Mentor and investigate your claim. For more information on this process, please see the question “What if am dissatisfied, can I get my money back?” and its answer which is found in this section of the Try A Mentor platform.</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="19">
            What type of photograph should I use? – Short Answer – Photo is Optional
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="19">
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
        <h2>My Account </h2>
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            How do I create a Mentee account?
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={css.faqCardBody}>
            <p>You can create a user account in seconds doing the following:</p>
            <p>
              Click “Try A Mentor” in the top right corner of the landing / first page <br />
              Enter your email address and create a secure password <br />
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
              Click “Log in” in the top right corner of the landing / first page <br />
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
