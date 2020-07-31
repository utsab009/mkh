import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>
        These Terms and Conditions are effective as of July 29, 2020.
      </p>

      <p>
        These Terms and Conditions affect your legal rights and obligations. If you do not agree to
        be bound by all these Terms and Conditions, do not access, or use our services.
      </p>

      <hr />

      <p>
        <ul className={css.bulletList}>
          <li>
            To understand the terms of and conditions of Try A Mentor, it must be fully understood
            what in fact Try A Mentor and its platform is and offers. Try A Mentor acts as a
            communication platform. It does not supply either Mentors, Executive Coaches or Mentees,
            rather it provides a Meeting place for Mentors and Executive Coaches and Mentees. It is
            a Meeting Place which enables communication between these types of users and this in
            turn enables Mentors to offer their Mentoring Services to Mentees. Try A Mentor does not
            offer a Mentoring of Executive Coaching service, Mentors (a term now which will mean
            Mentors, Business Mentors, Executive Coaches and Life Coaches) using Try A Mentor do,
            and as such they are the service provider for these services. Try A Mentor is therefore
            not liable for the behaviour, actions, conduct or the service offered or provided, or
            the service received from Mentors on this platform, nor the behaviour, actions or
            conduct as the service is received by Mentees.
          </li>
          <li>
            A Mentor is not allowed to request or receive both direct bookings and payment for
            Mentoring Services or Services they offer on Try A Mentor and a Mentee is not allowed to
            request direct bookings and payment (all bookings must be made through the Try A Mentor
            platform (tryamentor.com). If such actions are taken, Try A Mentor reserves the right to
            pursue legal action.
          </li>
          <li>
            Mentor or Mentees are not allowed to meet in person – this is a platform that allows
            Mentors and Mentees meet and communicate with one another, and then through such
            external platforms as Skype, Zoom (and similar) to meet virtually to conduct Mentoring
            sessions.
          </li>
          <li>
            You must be eighteen years of age or over to use the services of Try A Mentor and those
            offered by Mentors and Executive Coaches found there.
          </li>
          <li>
            ARBITRATION NOTICE: Except if you opt-out and except for certain types of disputes
            described in the arbitration section below, you agree that disputes between mentor and
            mentee will be resolved by binding, individual arbitration and you waive your right to
            participate in a class action lawsuit or class-wide arbitration.
          </li>
          <li>
            There may be times when Try A Mentor offers a special feature that has its own terms and
            conditions that apply in addition to these Terms and Conditions. In those cases, the
            terms specific to the special feature control the extent there is a conflict with these
            Terms and Conditions.
          </li>
          <li>
            These Terms and Conditions (this “Agreement”) govern your use of Try A Mentor. Member
            of: (1) the Try A Mentor website at{' '}
            <a href="http://www.tryamentor.com">http://www.tryamentor.com</a> (the “Website”), (2)
            mobile application for smartphone devices (the “App”), (3) the appointment booking
            platform or mentor/mentee portal made available through the Website and the App (the
            “Try A Mentor Platform”), (4) the payment for services made available through the App or
            website (the “Payment Services”), (5) any other services or features made available to
            Members through the Website or the App, (6) any individual or group Mentoring of
            Executive Coaching offered by Try A Mentor as a service, 7) any Mentoring or Executive
            Coaching offered via virtual meeting platforms offered by Mentors or Executive Coaches
            (collectively, the services in (1) through (7) which you order from Try A Mentor , the
            “Member Services”).
          </li>
          <li>
            In this Agreement, “Try A Mentor ”, “we” or “us” mean Try A Mentor which is a Trading
            Name of Beacon Ventures / the Beacon HRM Group which is a Irish limited company, and
            “Member” and “you” mean any person, or company using the Try A Mentor services to
            receive mentoring or executive coaching services from mentors (“Try A Mentor Mentors”)
            through the Website, App or via group or individual on-line meeting platforms (e.g.
            Skype, Zoom etc.).
          </li>
          <li>
            We may update or revise this Agreement from time to time and it is your responsibility
            to check back periodically to review any updates. You are free to decide whether to
            accept a modified version of this Agreement, but accepting this Agreement, as modified,
            is required for you to continue using the Member Services. If you do not agree to the
            terms of this Agreement or any modified version of this Agreement, your sole recourse is
            to terminate your use of the Member Services, in which case you will no longer have
            access to the Member Services or your Member Account. Any use of the Member Services is
            subject to the version of this Agreement in effect at the time of use.
          </li>
          <li>
            By accessing or using the Member Services or clicking “accept” or “agree” to this
            Agreement, (1) you acknowledge that you have read, understand, and agree to be bound by
            this Agreement, and (2) you represent and warrant that you are of legal age and not
            prohibited by law from accessing or using the Member Services.
          </li>
          <li>
            Try A Mentor makes no guarantees or representations regarding the availability of
            appointments for any particular Try A Mentor “Mentor”, to any members of this site. You
            understand and acknowledge that all communications made through the member services are
            at your sole risk and this includes communications that occur while conducting an
            on-line Mentoring or Executive Coaching session.{' '}
          </li>
          <li>
            It is the responsibility of the Mentee to ensure that they have all the required
            equipment and internet speed to have a successful on-line Mentoring Meeting. If this
            equipment fails to function or your internet connection fails to offer an effective
            session, then as this was your responsibility and the Mentor has already given up this
            time, no refund of monies paid for this session will be made. The only exception to this
            is:
            <ul className={css.circleList}>
              <li>It was the Mentor’s equipment and/or internet service that failed</li>
              <li>
                The Mentor, having seen that you attempted in good faith to attend the Mentoring
                Session but technical issues on your side prevented this from being successful, then
                your Mentor (within five days of this meeting occurring) can contact Try A Mentor
                (admin@tryamentor.com) to request a refund for you.{' '}
              </li>
              <li>
                It is the responsibility of the Mentor to ensure that they are using an effective
                on-line meeting platform that works correctly (produces an effective video picture
                of both Mentor and Mentee and does so in a way that ensures confidentiality and
                safety for all). It is also the responsibility of the Mentor to ensure they have all
                the required equipment and internet speed to have a successful on-line Mentoring
                meeting. If either the equipment fails, or the service provided through the meeting
                application fail, all monies paid for the Mentoring meeting impacted are to be
                refunded.{' '}
              </li>
              <li>
                Confidentiality is critical aspect of safety on Try A Mentor. If it is proven that a
                Mentor has failed to keep a Mentee’s information safe, secure and confidentiality
                the all monies paid for Mentoring across the entire period of Mentor and Mentee
                working together must be completely refunded. Further, this may see the Mentor’s
                account suspended or deleted permanently If this fails all monies paid for the
                Mentoring meeting impacted are to be refunded.{' '}
              </li>
            </ul>
          </li>
        </ul>
      </p>

      <h2>1. GENERAL DESCRIPTION OF TRY A MENTOR SERVICES</h2>
      <p>
        Tryamentor.com is a place and means, for people who have a successful track record
        performing a role, to mentor people new to these roles, or who hope to enter them. They can
        equally help a person already in a role to further excel in it.
      </p>
      <p>
        Tryamentor.com empowers people to both share and monetize their experience, while
        simultaneously empowering others to directly gain from it – hence our tagline – “Their
        Experience, Your Success”.{' '}
      </p>
      <p>
        So, if you are planning your next career step, simply search the site to find a wonderful
        Mentor who can credibly guide you on how to get and succeed in your desired Job Role. Or, if
        you are currently in a role and would like independent and highly effective support – you
        have found the right place.
      </p>
      <p>
        The Try A Mentor technology platform allows users to search and select the appropriate
        mentor for their needs, schedule an appointment at a mutually agreeable time and meet
        through an on-line meeting platform and pay for Member Services directly through the
        platform. Likewise, mentors can post the business mentoring and coaching services they
        offer, and their schedule, for view by Try A Mentor users and then collect payment directly
        through the platform.
      </p>
      <p>
        The Website, App and Member Services can only be used to offer business and career
        development mentoring and coaching, and for no other purpose. Try A Mentor is a platform
        designed to serve as a conduit to connect users seeking business or career development
        mentors and executive coaches and as such Try A Mentor mentors and coaches are not employees
        of Try A Mentor and Try A Mentor is not hiring a Try A Mentor mentor for any Try A Mentor
        Mentee.
      </p>

      <h2>2. BASIC TERMS</h2>
      <p>
        You must be at least 18 years old to use the Member Services and any use by anyone under 18
        years old is strictly prohibited.
      </p>
      <p>
        If you are invited to participate in the Member Services by your Employer, you must register
        using your corporate e-mail address where you received the invitation to join.
      </p>
      <p>
        You are responsible for any activity that occurs through your account and you agree you will
        not sell, transfer, license or assign your account, followers, username, or any account
        rights. With the exception of people or businesses that are expressly authorized to create
        accounts on behalf of their employers or clients, Try A Mentor prohibits the creation of and
        you agree that you will not create an account for anyone other than yourself. You also
        represent that all information you provide or provided to Try A Mentor upon registration and
        at all other times will be true, accurate, current and complete and you agree to update your
        information as necessary to maintain its truth and accuracy.
      </p>
      <p>
        You agree that you will not solicit, collect, or use the login credentials of other Try A
        Mentor Members.
      </p>
      <p>You are responsible for keeping your password secret and secure.</p>
      <p>
        You may not use the Member Services for any illegal or unauthorized purpose. You agree to
        comply with all laws, rules and regulations (for example, federal, state, local and
        provincial) applicable to your use of the Member Services), including but not limited to,
        copyright laws. You recognize that your behaviour and interactions with the end-users of the
        Member Services must conform to best practices and applicable laws.
      </p>
      <p>
        You are solely responsible for your conduct and any data, text, files, information,
        usernames, images, graphics, photos, profiles, works of authorship, applications, links and
        other content or materials (collectively, "Content") that you submit, post or display on or
        via the Member Services.
      </p>
      <p>
        You must not change, modify, adapt, or alter the Member Services or change, modify, or alter
        another website so as to falsely imply that it is associated with the Member Services or Try
        A Mentor.
      </p>
      <p>
        You must not access Try A Mentor 's private API without the written consent of Try A Mentor.
      </p>
      <p>
        You must not use domain names or web URLs in your username without prior written consent
        from Try A Mentor.
      </p>
      <p>
        You must not interfere or disrupt the Member Services or servers, or networks connected to
        the Member Services, including by transmitting any worms, viruses, spyware, malware, or any
        other code of a destructive or disruptive nature. You may not inject content or code or
        otherwise alter or interfere with the way any page is rendered or displayed in a user's
        browser or device.
      </p>
      <p>
        You must not create accounts with the Member Services through unauthorized means, including
        but not limited to, by using an automated device, script, bot, spider, crawler or scraper.
      </p>
      <p>
        You must not attempt to restrict another user from using or enjoying the Member Services and
        you must not encourage or facilitate violations of these Terms and Conditions.
      </p>
      <p>
        Violation of this Agreement may, in Try A Mentor's sole discretion, result in termination of
        your Try A Mentor account, which we reserve the right to do in our sole and absolute
        discretion.
      </p>
      <p>
        You understand and agree that Try A Mentor cannot and will not be responsible for the
        Content posted on the Member Services and you use the Member Services at your own risk. If
        you violate the letter or spirit of these Terms and Conditions, or otherwise create risk or
        possible legal exposure for Try A Mentor, we can stop providing all or part of the Member
        Services to you.
      </p>
      <p>
        Any resources to aid you to provide Mentoring services or to be an effective Mentee (or to
        be more effective) are used at your own risk.
      </p>

      <h2>3. TRY A MENTOR PLATFORM</h2>
      <p>
        Try A Mentor provides the Try A Mentor Platform to Members for the purpose of assisting
        Members in securing the services of a Mentor who can credibly guide you on how to get and
        succeed in your desired Job Role. Or, if you are currently in a role, provide independent
        and highly effective support. The Try A Mentor technology platform allows you to search for
        a person by sector, role and level, who can aid you to find, successfully interview for, and
        excel in that role.
      </p>
      <p>
        For Mentors and Coaches, it is a place for them to share and monetize the effective
        experience they gained from across their career, through finding people who would value
        support in knowing how to achieve similar career success for a specific Job Role or for a
        Business or Organisation. Subject to the terms and conditions of this Agreement, Try A
        Mentor grants you a non-exclusive, non-transferable license to access the features and
        functions on the Site solely for the purposes of obtaining access, or authorizing employee
        access, to Member Services available via the Site in accordance with this Agreement. Try A
        Mentor reserves the right at any time and for any reason it deems sufficient, in its sole
        discretion, to terminate this Agreement, revoke the licenses granted hereunder, to deny you
        future access to the Site, or to impose conditions on your future access, including but not
        limited to requiring payment of subscription or license fees as a prerequisite for future
        access.
      </p>
      <p>
        In response to a Member’s request to book a Mentor or Member Service through the Website or
        App, Try A Mentor directly notifies the Mentor of the booking request through the Try A
        Mentor Platform. A Mentor may accept or reject a Member’s booking request at his or her sole
        discretion. Try A Mentor Mentors / Coaches or other service providers at no time shall be
        required to accept a Member’s booking request.{' '}
      </p>
      <p>
        Each Mentor shall be free in his or her sole discretion to determine at what times and on
        what dates he or she shall make himself or herself available on the Try A Mentor Platform to
        accept booking requests from Mentees.{' '}
      </p>
      <p>
        Try A Mentor requires each Mentor to provide and maintain valid certifications and/or
        insurance while providing Try A Mentor Services. However, Try A Mentor does not guarantee or
        warrant, and makes no representations regarding, the accuracy, reliability, quality or
        suitability of such Try A Mentor mentors. WHEN INTERACTING WITH TRY A MENTOR mentors, YOU
        SHOULD EXERCISE CAUTION AND COMMON SENSE TO PROTECT YOUR PERSONAL SAFETY AND PROPERTY, JUST
        AS YOU WOULD WHEN INTERACTING WITH OTHER PERSONS WHOM YOU DON'T KNOW. By using the Services,
        you agree to hold Try A Mentor free from the responsibility for any liability or damage that
        might arise out of the transaction involved. You understand and agree that Try A Mentor has
        no control over and is not responsible for the acts or omissions of any Members, Mentors or
        Mentees, on or off the Site.
      </p>

      <h2>4. PAYMENT MECHANICS AND TERMS</h2>
      <p>
        You, as a Member, agree to pay those amounts for the Member Services as are listed on the
        Site which may be updated from time to time, or as otherwise communicated to you by Try A
        Mentor in writing. One of the clear advantages of Try A Mentor is our use of the Stripe
        payment system (link: https://stripe.com/). This is completely independent of Try A Mentor
        and keeps all financial information safe (Try A Mentor never has access to it).
        Specifically, Try A Mentor uses it for a delayed payment feature. Once the session is
        booked, Stripe collects the monies due but does not deposit them into the Mentor’s account
        until fourteen days after the session occurs or ninety days after the booking (whichever
        comes first). By Try A Mentor, you are agreeing to this delayed payment process and the
        reasons for it.
      </p>
      <p>
        In order to use the Mobile and Desktop Payment Services, you must provide credit card or
        debit card information for at least one operational and valid credit card or debit card
        through the App. You may add, delete, and edit the credit card or debit card information you
        have provided from time to time through the App / Website. All charges are due immediately
        and payment will be facilitated by Try A Mentor using the preferred payment method
        designated in your Account. If your primary Account payment method is determined to be
        expired, invalid or otherwise not able to be charged, you agree that Try A Mentor may, as
        the Third Party Provider’s limited payment collection agent, use a secondary payment method
        in your Account, if available. When a Member books an appointment via credit card, a
        temporary authorization may be placed on the authorized credit card. Upon confirmation to
        Try A Mentor that an appointment with a Member has been completed, such Member’s credit card
        or debit card is immediately charged in full for the service.
      </p>
      <p>
        Payment Services offered to Employers and corporate members may be processed via credit card
        or EFT / ACH transfer. All charges are due immediately and payment will be facilitated by
        Try A Mentor using the preferred payment method designated in your Account. If your primary
        Account payment method is determined to be expired, invalid or otherwise not able to be
        charged, you agree that Try A Mentor may, as the Third Party Provider’s limited payment
        collection agent, use a secondary payment method in your Account, if available.
      </p>

      <h2 className={css.cancelColor}>CANCELLATIONS AND REFUNDS</h2>
      <p className={css.cancelColor}>
        A Mentee (you) can cancel a session with their Mentor at no charge up to 48-hours before the
        session they are cancelling. After this, the fee is non-refundable. All monies are
        automatically refunded by the Stripe system.
      </p>
      <p className={css.cancelColor}>
        If, however, a Mentee initially books the appointment within 48 hours of the appointment,
        then the Mentee will be charged unless such appointment is cancelled within the first 15
        minutes of such booking (the “Cancellation Periods”). If a Mentee does not cancel a
        confirmed appointment within the applicable Cancellation Period, 100% of the cost of the
        services will be charged as a cancellation fee or in the case of a subscription the session
        credit will be deemed “used”.{' '}
      </p>
      <p className={css.cancelColor}>
        Once the Mentoring session’s time and date has passed the fee collected by Try A Mentor
        through Stripe will be made less the Try A Mentor fees (the "Admin Fee") in Try A Mentor ’s
        sole and absolute discretion. Try A Mentor will remit the amount of payment by the Mentee,
        less the Admin Fee to the Try A Mentor mentor using the account information provided by the
        Try A Mentor Mentor. Any refunds made to a Mentee will be deducted from any amounts paid to
        the Try A Mentor mentor. Try A Mentor mentors may not accept payment from Mentees associated
        with Try A Mentor and doing so will result in termination from Try A Mentor.{' '}
      </p>
      <p className={css.cancelColor}>
        Please note, a Mentee can cancel a Mentoring session up to two times a year and will still
        be refunded the Try A Mentor admin fee, but from the third time onwards, the admin fee will
        be charged in Try A Mentor ’s sole and absolute discretion.
      </p>
      <p>
        To the extent permitted by applicable law and subject to our privacy policy, you acknowledge
        and agree that we may use certain third-party vendors and service providers to process
        payments. Try A Mentor uses Stripe Inc. for payment processing. In order for you to use
        Stripe’s payment processing services, you must read and agree to Stripe’s Terms & Conditions
        available at <a herf="https://stripe.com/us/legal">https://stripe.com/us/legal</a>.
      </p>
      <p>
        At Try A Mentor’s sole and absolute discretion, refunds or credits may be granted in
        extenuating circumstances, as a result of specific refund guarantee promotions, or to
        correct any errors made by Try A Mentor. All fees are exclusive of all taxes, levies, or
        duties imposed by taxing authorities, and the Mentor shall be responsible for payment of all
        taxes, levies, or duties associated with his or her fees hereunder, including all
        international, local, federal or state taxes. You may not pay your Try A Mentor mentor or
        arrange for mentoring sessions with your Try A Mentor mentor outside of the Try A Mentor
        platform and doing so will result in termination of the Member Services and potential legal
        action.
      </p>
      <p>
        Arbitration can only occur through the Try A Mentor process. If you have communicated in
        writing through any other medium other than the Try A Mentor communication system you have
        broken the Terms and Conditions of the website and as such Try A Mentor is no longer in a
        position to adjudicate on your behalf with the mentor or mentee. As such, any action to gain
        a refund must be performed with the mentor or mentee.
      </p>

      <p>Arbitration Process:</p>
      <p>
        Try A Mentor does not provide Mentoring or Mentors. Try A Mentor’s service is to provide the
        means for Mentors and Mentees to find, book and pay for the Mentoring or Coaching Services
        offered by Mentors / Coaches (a communication platform). The service provider for Mentoring
        / Coaching is the Mentor / Coach. As such, if this service is not satisfactory, or the
        conduct of those involved is not appropriate, this is an issue for the Mentor and Mentee to
        solve independent of Try A Mentor.{' '}
      </p>
      <p>
        This said, so that Try A Mentor is a safe place to deliver and receive Mentoring or
        Coaching, Try A Mentor has created an Arbitration Service so that refunds are possible under
        some clear conditions /stipulations. By using Try A Mentor you are agreeing to the process
        by which this arbitration operates and the outcome of the arbitration.
      </p>
      <p>
        These stipulations referred to above are driven primarily by Stripe (Stripe is a completely
        independent technology platform that Try A Mentor uses to allow you to make and receive
        payments). Stripe was chosen due to it security and because it offers a delayed payment
        system. It will collect money from a Mentee and then deposit these funds into the Mentor’s
        bank account after a period of time (Try A Mentor has no access to these funds at any time).{' '}
      </p>
      <p>
        What Try A Mentor can do, is while these funds are being held by Stripe, to arbitrate
        between Mentor and Mentee if a dispute occurs, and then depending on the outcome of the
        arbitration (which we will decide) to direct Stripe to pay either the Mentor or refund the
        Mentee. But Stripe has strict time limits on how long it will delay a payment which directly
        impact the rules of the arbitration. As such:
        <ol className={css.numberList}>
          <li>
            The very second after a Mentoring meeting (not booking) is conducted, Stripe will only
            hold the funds for payment of this meeting for fourteen calendar days. Once this
            fourteen-day period is concluded, Stripe will automatically deposit the funds due to the
            Mentor into the Mentor’s bank account, at which point Try A Mentor will no longer be
            able to arbitrate and make a refund. As a result of this, the following is the structure
            of the Arbitration process:
            <ol className={css.alphaList}>
              <li>
                The complaint / request for refund has to be e-mailed to admin@tryamentor.com within
                five calendar days of the Mentoring Session. The complaint must contain all the
                information that the Mentee has that illustrates that a refund should be made. It is
                important to note that any written evidence submitted, has to be information that
                was communicated through Try A Mentor communication system as it is a condition of
                using Try A Mentor that all written communication between a Mentor and Mentee must
                occur through the internal communication system. The only exception to this is the
                verbal communication that occurs in the Mentoring meetings itself
              </li>
              <li>
                If a request for a refund is made after the five calendar days, Try A Mentor will no
                longer be in the position to Arbitrate and the Mentor and Mentee will need to solve
                the issue independent of Try A Mentor (Try A Mentor will no longer be involved and
                will play no part in any refund)
              </li>
              <li>
                If the Mentee attempts to provide additional evidence after the initial five days,
                it will be not be reviewed. The reason is the overarching time limit. To be fair to
                the Mentor, we need to allow the Mentor adequate time to see the evidence presented
                against them and then time to respond.
              </li>
              <li>
                Once Try A Mentor has received the complaint and the evidence from the Mentee, it
                will then be sent unedited to the Mentor.{' '}
              </li>
              <li>
                The Mentor will now have a right to reply and is given three calendar days to
                prepare and send their defence. Again, any written evidence presented must be that
                found on Try A Mentor’s communication system (see reason above) and no evidence
                presented by the Mentor after this three-day period will be reviewed.
              </li>
              <li>
                If there is no response from the Mentor within this three-day period, for whatever
                reason, then unfortunately the arbitration will only take into account the evidence
                presented by the Mentee. The only reason for this, is that the Stripe system will
                only hold the funds for the fourteen day, so this drives these strict time limits
              </li>
              <li>
                With the Mentees case made and hopefully the case of the Mentor presented to Try A
                Mentor within the stipulated time frames, Try A Mentor will impartially adjudicate
                the issue and come to a binding decision before the fourteen days deadline has been
                reached. The findings of Try A Mentor are binding (a stipulation of using this site
                for all users)
              </li>
              <li>
                Try A Mentor will communicate its decision to both Mentor and Mentee, but this
                communication will not contain the reasons for the decision but simply what has been
                decided.{' '}
              </li>
            </ol>
          </li>
          <li>
            The second impact that the Stripe system has on the arbitration process relates to the
            following rule that it has in place. Strip will only hold monies for a maximum of 90
            calendar days from the point of collection. In this case, the point of collection is
            when a Mentoring Meeting / Session has been booked. The fourteen-day rule is present
            from the point after the meeting occurs, but the ninety-day rule is from the point of
            booking. This means that if a Mentees requests a refund due to a complaint, and although
            it is made within five days of the meeting as outlined previously, if the meeting took
            place within fifteen days of the ninety day period concluding, then Try A Mentor is
            unable to arbitrate. As such, the refund request will be an issue for the Mentor and
            Mentee to solve independent of Try A Mentor.{' '}
          </li>
        </ol>
      </p>

      <h2>5. CONFIDENTIAL</h2>
      <p>
        When Mentors meet with Mentees a relationship is formed. This is a professional relationship
        and one whose foundation is trust. As such, it is possible, in a professional context, that
        items are discussed that may be deemed confidential by either party involved. As the
        relationship is built on trust one party may share something with the other, believing it to
        be being relayed as confidential but not necessarily stating this. As a result, all
        information shared in Mentoring Sessions / Meetings should be considered as confidential. If
        either party is shown to have broken this trust in this context then that person’s listings
        will be immediately removed, and their account is subject to be removed from our site. This
        is the clear essence of what is required here, but for a more defined definition of the
        requirements, please read Community Guideline. If it is proven that a Mentor has failed to
        keep a Mentee’s information safe, secure and confidentiality then all monies paid for
        Mentoring across the entire period of Mentor and Mentee working together must be completely
        refunded. Further, this may see the Mentor’s account suspended or deleted permanently.{' '}
      </p>

      <h2>6. PRIVACY</h2>
      <p>
        We are committed to helping you safeguard your privacy online. Please review our privacy /
        GDPR policy for details about how we collect, use, and disclose information in connection
        with the Member Services. Try A Mentor may receive, use, maintain, store or disclose your
        personal information, solely as permitted by applicable laws and regulations, with specific
        direction being European Law as it relates to GDPR (please see our section covering GDPR).
        Try A Mentor will protect the privacy and security of such data, and such data will be
        subject to the terms of our Privacy Policy. By downloading, installing, and/or using the Try
        A Mentor Materials / Website / Mobile Application, you acknowledge and agree that Try A
        Mentor will collect, use, and disclose data relating to your use of the Try A Mentor
        materials in accordance with Try A Mentor’s Privacy Policy.
      </p>

      <h2>7. ONLY LIST AND OFFER MENTORING THAT YOU ARE PERMISSIONED TO OFFER.</h2>
      <p>
        You must only list Role Profiles / Job Roles that you have permission and authority to do
        so. If a previous or current employer has the right to prevent you discussing what you have
        learnt while in their employ then you must follow this direction, and as such do not offer
        it on Try A Mentor without consent to do so. If it is discovered that you are offering
        information that you do not have permission to offer, the listing will be immediately
        removed, and your account will be subject to removal from our site.
      </p>

      <h2>8. ONLY ASK FOR MENTORING THAT YOU HAVE THE PERMISSION TO RECEIVE.</h2>
      <p>
        You must only receive mentoring for Job Roles that you have permission and authority to
        receive. If a current or past employer has the right to prevent you from discussing what you
        have learnt while in their employ with an outside third party and if they so direct you not
        to receive mentoring then you must follow this direction. If it is discovered that you are
        offering information or receiving Mentoring that you do not have permission to receive, your
        account will be subject to removal from our site.
      </p>

      <h2>9. EFFECTIVE EQUIPMENT AND CONFERENCE / MEETING APPLICATION</h2>
      <p>
        It is the responsibility of the Mentor to ensure that they are using an effective on-line
        meeting platform that works correctly (produces an effective video picture of both Mentor
        and Mentee and does so in a way that ensures confidentiality and safety for all). If this
        fails all monies paid for the Mentoring meeting impacted are to be refunded. Similarly, if a
        Mentor’s equipment fails all monies paid for the Mentoring meeting impacted are to be
        refunded.
      </p>
      <p>
        It is the responsibility of the Mentee to ensure that they have all the required equipment
        and internet speed to have a successful on-line Mentoring Meeting. If this equipment fails
        to function or your internet connection fails to offer an effective session, then as this
        was your responsibility and the Mentor has already given up this time, no refund of monies
        paid for this session will be made. The only exception to this is:
        <ul className={css.circleList}>
          <li>It was the Mentor’s equipment and/or internet service that failed</li>
          <li>
            The Mentor, having seen that you attempted in good faith to attend the Mentoring Session
            but technical issues on your side prevented this from being successful, then your Mentor
            (within five days of this meeting occurring) can contact Try A Mentor
            (admin@tryamentor.com) to request a refund for you.{' '}
          </li>
        </ul>
      </p>

      <h2>10. MEMBER ACCOUNT</h2>
      <p>
        You are required to register and create a Try A Mentor Member account with Try A Mentor
        through a services contract, the Website or App (“Try A Mentor Member Account”) in order to
        receive any of the Member Services. When registering for a Try A Mentor Member Account, you
        must provide true, accurate, current, and complete data about yourself or company (“Try A
        Mentor Member Registration Data”). You also agree to promptly update the Try A Mentor Member
        Registration Data to keep it true, accurate, current, and complete. You are solely
        responsible for maintaining the confidentiality of your Try A Mentor Member Account and the
        information in your Try A Mentor Member Account, and, except as otherwise required by
        applicable law, you are solely responsible for all use of your Try A Mentor Member Account,
        whether or not authorized by you. You agree to immediately notify Try A Mentor of any
        unauthorized use of your Try A Mentor Member Account or any other breach of security related
        to your use of the Member Services.
      </p>

      <h2>11. MOBILE; LOCATION SERVICES</h2>
      <p>
        The App may use GPS locator capabilities to identify your current location. You hereby
        expressly consent to receive SMS text messages from Try A Mentor regarding the Member
        Services and as otherwise described in our privacy policy. The communication standards for
        the Member Services include, but are not limited to SMS, GPS, and web-based browser
        technology. In order to use the App, you must maintain an active account with a carrier of
        electronic communications through mobile devices.
      </p>
      <p>
        Use of the Member Services requires Internet access through your mobile device. You are
        responsible for all mobile carrier charges resulting from your use of the Member Services,
        including from any notifications provided by the Member Services. Try A Mentor does not
        guarantee that the Member Services will be compatible with all devices or will be supported
        by all mobile carriers.
      </p>

      <h2>12. TRY A MENTOR CONTENT</h2>
      <p>
        The features, information, and materials provided and depicted through the Member Services
        are protected by copyright, trademark, patent, and other intellectual property laws. All
        text, graphical content, video, data, and other content made available through the Member
        Services (collectively, the “Try A Mentor Content”) are provided to Members by Try A Mentor
        solely to support the Member’s permitted use of the Member Services. The Try A Mentor
        content may be modified from time to time by us at our sole discretion. Except as expressly
        set forth herein, no license is granted to Members for any other purpose, and any other use
        of the Members Services or the Try A Mentor Content by Members shall constitute a material
        breach of this Agreement. Try A Mentor retains all rights in the Members Services and Try A
        Mentor Content and any associated patents, trademarks, copyrights, mask work rights, trade
        secrets, or other intellectual property rights. No license, right, or interest in any
        trademarks of Try A Mentor or any third party is granted under this Agreement.
      </p>
      <p>
        Subject to the terms and conditions of this Agreement, Try A Mentor grants Try A Mentor
        Members a non-exclusive, non-transferable, revocable license to use the Try A Mentor
        Application, in object code form only, on a Try A Mentor Member’s compatible mobile devices,
        solely to support the Try A Mentor Member’s permitted use of the Try A Mentor Member
        Services.
      </p>
      <p>
        The resources offered by Try A Mentor to aid members to either be an effective Mentor or
        Mentee are used at members own risk.
      </p>

      <h2>13. MEMBER CONTENT</h2>
      <p>
        You own all content and information you post or share using the Member Services (referred to
        as "Member Content"). You hereby grant Try A Mentor and its Affiliates a non-exclusive,
        perpetual, fully paid, royalty free license to use, copy, or display your Member Content in
        connection with the Member Services throughout the world in any media now known or hereafter
        developed. We may display advertisements in connection with your Member Content or on pages
        where your Member Content may be viewed by you or others and we may use your Member Content
        to advertise and promote Try A Mentor, any of the Member Services or any of our Affiliates
        or third-parties with whom we are partnered.
      </p>
      <p>
        You represent and warrant that: (i) you own or otherwise have all necessary rights to your
        Member Content; (ii) you have paid and will pay in full any fees or other payments that may
        be related to your use of the Member Content; and (iii) your Member Content does not
        infringe the intellectual property rights, privacy rights, publicity rights, or other legal
        rights of any third party.
      </p>
      <p>
        We may refuse to accept or transmit any Member Content. We may remove Member Content from
        the Member Services for any reason in our sole and absolute discretion.
      </p>
      <p>
        Other than Member Content, we own or license all of the other content on the site,
        including, but not limited to the Try A Mentor Content.
      </p>

      <h2>14. MEMBER REPRESENTATIONS AND WARRANTIES; INDEMNIFICATION</h2>
      <p>
        You represent and warrant: (1) the accuracy and truthfulness of all information you provide
        to Try A Mentor for uploading to the Website and App or otherwise, and (2) no information
        you upload to the Website or App shall infringe any third-party rights (including, without
        limitation, intellectual property rights and rights of privacy or publicity).
      </p>
      <p>
        You will indemnify, hold harmless, and (at Try A Mentor ’s request) defend Try A Mentor ,
        and its representatives, agents, directors, managers, officers, employees, and shareholders
        (collectively, the “Try A Mentor Parties”) from and against any and all claims, liabilities,
        damages, losses, costs, expenses, and fees of any kind (including reasonable attorneys’ fees
        and legal costs) (collectively “Claims”), arising from, relating to resulting from a) any
        information (including your Content or any other content) that you or anyone using your
        account submit, post, or transmit on or through the Member Services; (b) the use of the
        Member Services by you or anyone using your account; (c) the violation of this Agreement by
        you or anyone using your account; or (d) the violation of any rights of any third party,
        including intellectual property, privacy, publicity, or other proprietary rights by you or
        anyone using your account (2) any Claim made by a Try A Mentor Mentor against the Try A
        Mentor Parties directly or indirectly or allegedly arising out of or relating to the acts or
        omissions of a Member receiving mentoring services from a Try A Mentor Mentor, or (3) any
        breach or alleged breach by you of this Agreement. Try A Mentor reserves the right, at its
        own expense, to assume the exclusive defence and control of any matter otherwise subject to
        indemnification by you. If we do assume the defence of such a matter, you will reasonably
        cooperate with Try A Mentor in such defence.
      </p>

      <h2>15. DISCLAIMERS AND LIMITATION OF LIABILITY</h2>
      <p>
        YOU UNDERSTAND THAT YOUR USE OF THE MEMBER SERVICES IS AT YOUR OWN RISK. THE MEMBER SERVICES
        ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE FULLEST EXTENT PERMITTED BY
        APPLICABLE LAW, TRY A MENTOR AND ITS OFFICERS, EMPLOYEES, DIRECTORS, SHAREHOLDERS, PARENTS,
        SUBSIDIARIES, AFFILIATES, AGENTS, AND LICENSORS (REFERRED TO COLLECTIVELY AS "AFFILIATES")
        DISCLAIM ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, WITH RESPECT TO THE WEBSITE, APP
        AND MEMBER SERVICES (INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR USE OR PURPOSE, AND NON-INFRINGEMENT).
      </p>
      <p>
        TRY A MENTOR AND ITS AFFILIATES MAKE NO REPRESENTATIONS OR WARRANTIES ABOUT THE ACCURACY OR
        COMPLETENESS OF CONTENT AVAILABLE ON OR THROUGH THE WEBSITE, APP OR MEMBER SERVICES
        (INCLUDING, WITHOUT LIMITATION, ANY RECOMMENDATIONS OR OTHER CONTENT AVAILABLE ON OR THROUGH
        THE MEMBER SERVICES, OR THE CONTENT OF ANY WEBSITES OR RESOURCES LINKED TO THE SITE OR
        SERVICES. TRY A MENTOR AND ITS AFFILIATES WILL HAVE NO LIABILITY FOR ANY: (A) ERRORS,
        MISTAKES, OR INACCURACIES OF CONTENT; (B) PERSONAL INJURY OR PROPERTY DAMAGE RESULTING FROM
        YOUR ACCESS TO OR USE OF THE SITE OR SERVICES; (C) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR
        SERVERS OR OF ANY PERSONAL OR FINANCIAL INFORMATION; (D) ANY INTERRUPTION OF TRANSMISSION TO
        OR FROM THE SITE OR SERVICES; (E) ANY COMPUTER VIRUSES OR MALICIOUS CODE THAT MAY BE
        TRANSMITTED ON OR THROUGH THE SITE OR SERVICES; OR (F) ANY LOSS OR DAMAGE OF ANY KIND
        INCURRED AS A RESULT OF THE USE OF ANY FUNCTIONALITY OR CONTENT POSTED, E-MAILED,
        TRANSMITTED, OR OTHERWISE MADE AVAILABLE ON OR THROUGH THE SITE OR SERVICES.
      </p>
      <p>
        TRY A MENTOR AND ITS AFFILIATES DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY
        FOR ANY THIRD PARTY PRODUCT OR SERVICES, INCLUDING, WITHOUT LIMITATION, ANY CORPORATE
        WELLNESS INITIATIVES OR SERVICES OFFERED BY MENTORS, SERVICE PROVIDERS, PAYMENT SERVICES,
        RECOMMENDED, ADVERTISED, OR OFFERED ON OR THROUGH THE SITE OR SERVICES OR ANY LINKED
        WEBSITE.
      </p>
      <p>
        YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER USERS (INCLUDING BOTH MENTORS
        AND MENTEES). TO THE MAXIMUM EXTENT PERMITTED BY LAW IN NO EVENT SHALL THE TRY A MENTOR
        PARTIES BE LIABLE FOR ANY INJURIES, LOSSES, CLAIMS, OR DIRECT DAMAGES OR ANY SPECIAL,
        EXEMPLARY, PUNITIVE, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY KIND, WHETHER BASED IN
        CONTRACT, TORT, OR OTHERWISE, AND EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, WHICH
        ARISE OUT OF OR ARE ANY WAY CONNECTED WITH (1) THIS AGREEMENT, (2) ANY USE OF THE MEMBER
        SERVICES BY THE MEMBER, (3) ANY FAILURE OR DELAY (INCLUDING, BUT NOT LIMITED TO, THE USE OR
        INABILITY TO USE ANY COMPONENT OF THE TRY A MENTOR PORTAL) OR (4) A TRY A MENTOR MENTOR’S
        ACTS OR OMISSIONS AT A MENTEE’S COMPANY, RESIDENCE OR OTHER LOCATION WHETHER RELATED TO THE
        TRY A MENTOR MENTOR’S PROVISION OF MENTORING SERVICES TO A MENTEE OR OTHERWISE.
      </p>
      <p>
        TRY A MENTOR EXPRESSLY DISCLAIMS ALL REPRESENTATIONS, WARRANTIES, CONDITIONS, OR
        INDEMNITIES, EXPRESS OR IMPLIED IN RESPECT OF THE MEMBER SERVICES, INCLUDING, WITHOUT
        LIMITATION, ANY REPRESENTATION OR WARRANTY AS TO THE INFORMATION PROVIDED ABOUT TRY A MENTOR
        MENTORS AND THE ACTS OR OMISSIONS OF TRY A MENTOR MENTORS.
      </p>
      <p>
        THE QUALITY OF THE TRY A MENTOR MENTOR SERVICES OR OTHER MEMBER SERVICES MADE AVAILABLE BY
        THIRD PARTY SERVICE PROVIDERS IS ENTIRELY THE RESPONSIBILITY OF THE TRY A MENTOR MENTOR OR
        SERVICE PROVIDER WHO PROVIDES SUCH FITNESS SERVICES OR OTHER MEMBER SERVICES TO YOU. YOU
        UNDERSTAND, THEREFORE, THAT BY USING THE SERVICES OF A TRY A MENTOR MENTOR OR OTHER SERVICE
        PROVIDER, YOU AND/OR YOUR EMPLOYEES MAY BE EXPOSED TO FITNESS SERVICES THAT ARE POTENTIALLY
        DANGEROUS, UNSAFE OR OTHERWISE OBJECTIONABLE, AND THAT YOUR USE OF THE MEMBER SERVICES AND
        BOOKING OF A TRY A MENTOR MENTOR IS AT YOUR OWN RISK.
      </p>
      <p>
        YOU ACKNOWLEDGE THAT YOUR RELIANCE ON ANY INFORMATION PROVIDED BY TRY A MENTOR OR BY ANY TRY
        A MENTOR MENTOR OR ANY OTHER TRY A MENTOR SERVICE PROVIDER TO YOU IS SOLELY AT YOUR OWN RISK
        AND YOU ASSUME FULL RESPONSIBILITY FOR ALL RISK ASSOCIATED THEREWITH, AS ALLOWABLE TO THE
        EXTENT OF THE LAW.
      </p>
      <p>
        ALTHOUGH TRY A MENTOR PROVIDES INFORMATION ABOUT TRY A MENTOR MENTORS, TRY A MENTOR DOES NOT
        PROVIDE THE SERVICES RENDERED BY TRY A MENTOR MENTORS. TRY A MENTOR MAY REQUEST BACKGROUND
        INFORMATION OF ITS TRY A MENTOR MENTORS OR OTHER PARTNERS OR THIRD PARTY SERVICE PROVIDERS,
        BUT TRY A MENTOR DOES NOT AND CANNOT GUARANTEE THE ACCURACY OR COMPLETENESS OF ANY SUCH
        INFORMATION-GATHERING OR THAT A PARTICULAR TRY A MENTOR MENTOR IS ADEQUATELY QUALIFIED TO
        PERFORM ANY GIVEN SERVICE. YOU UNDERSTAND THAT TRY A MENTOR MAY NOT CONDUCT CRIMINAL
        BACKGROUND CHECKS OR SCREENINGS ON OR ANY OTHER SCREENING OF CLIENTS OR MENTORS. TRY A
        MENTOR ALSO MAY NOT INQUIRE INTO THE BACKGROUNDS OF ALL CLIENTS OR MENTORS OR ATTEMPT TO
        VERIFY THE STATEMENTS OF CLIENTS OR MENTORS. TRY A MENTOR MAKES NO REPRESENTATIONS OR
        WARRANTIES AS TO THE CONDUCT OF CLIENTS OR MENTORS OR THEIR COMPATIBILITY WITH ANY CURRENT
        OR FUTURE CLIENTS OR MENTORS. TRY A MENTOR RESERVES THE RIGHT TO CONDUCT ANY CRIMINAL
        BACKGROUND CHECK OR OTHER SCREENINGS (SUCH AS SEX OFFENDER REGISTER SEARCHES), AT ANY TIME
        AND USING AVAILABLE PUBLIC RECORDS.
      </p>
      <p>
        EXCEPT AS MAY BE OTHERWISE AGREED IN WRITING BETWEEN YOU AND TRY A MENTOR , IN NO EVENT WILL
        TRY A MENTOR BE LIABLE TO YOU OR TO ANY OTHER PERSON FOR ANY DIRECT, INDIRECT, SPECIAL,
        INCIDENTAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES ARISING OUT OF THE USE OR
        INABILITY TO USE MEMBER SERVICES, INCLUDING THE TRY A MENTOR PLATFORM, OR FOR ANY LOSS OF
        USE, INTERRUPTION OF BUSINESS, LOST PROFITS, LOST DATA, OR OTHER LOSSES, EVEN IF TRY A
        MENTOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      </p>
      <p>
        IN THE EVENT THE ABOVE LIMITATION IS NOT ENFORCEABLE IN WHOLE OR IN PART FOR ANY REASON, TRY
        A MENTOR SHALL IN NO EVENT BE LIABLE ON ANY GROUND FOR MORE THAN TEN DOLLARS ($10.00 USD).
      </p>
      <p>
        SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL
        DAMAGES, SO THESE LIMITATIONS MAY NOT APPLY TO YOU.
      </p>

      <h2>16. ARBITRATION</h2>
      <p>
        Any and all controversies, disputes, demands, counts, claims, or causes of action (including
        the interpretation and scope of this clause, and the arbitrability of the controversy,
        dispute, demand, count, claim, or cause of action) between you and Try A Mentor shall
        exclusively be settled through binding and confidential arbitration. The legislation which
        governs all arbitrations in Ireland, both domestic and international, is the Arbitration Act
        2010. The Act incorporates the UNCITRAL Model Law on International Commercial Arbitration
        (“the Model Law”) into Irish law, subject to the specific provisions of the Act.
      </p>

      <h2>17. LINKS</h2>
      <p>
        The Member Services may contain links to other websites or third-party services or allow
        others to send you such links. A link to a third party’s website does not mean that we
        endorse it or that we are affiliated with it. We are not responsible or liable for any
        damage or loss related to the use of any third-party website. You should always read the
        terms and conditions and privacy policy of a third-party website before using it.
      </p>

      <h2>18. CHANGES TO THE MEMBER SERVICES</h2>
      <p>
        Try A Mentor reserves the right, in its sole discretion, to modify the Member Services and
        the pricing structure for the provision of such services from time to time and without
        notice, including, without limitation, by removing, adding or modifying portions of the
        Service, Website and App. Try A Mentor shall have no liability to you for any of the
        foregoing actions. If you object to any such changes, your sole recourse shall be to cease
        using the Member Services. Continued use of the Member Services following any such changes
        shall indicate your acknowledgment of such changes and satisfaction with all the Member
        Services, including the pricing structure in relation thereto.
      </p>

      <h2>19. COPYRIGHT POLICY</h2>
      <p>Notice of Copyright Infringement</p>
      <p>
        We respect the intellectual property rights of others. Please notify us in writing, by
        e-mail or mail to our designated agent listed below, if you believe that a user of the Site
        or Services has infringed your intellectual property rights. We provide this policy pursuant
        to Section 512 of the Copyright Revision Act, as enacted through the Digital Millennium
        Copyright Act ("DMCA").
      </p>
      <p>
        To be effective the notification should include: (i) identification of the copyrighted work
        claimed to have been infringed, or, if multiple copyrighted works are covered by a single
        notification, a representative list of such works; identification of the claimed infringing
        material and information reasonably sufficient to permit Try A Mentor to locate the material
        on the Member Services; (ii) information reasonably sufficient to permit us to contact you,
        such as an address, telephone number, and, if available, an e-mail address; (iii) a
        statement by you that you have a good faith belief that the disputed use is not authorized
        by the copyright owner, its agent, or the law; (iv) a statement by you, made under penalty
        of perjury, that the above information in your notification is accurate and that you are the
        copyright owner or authorized to act on the copyright owner’s behalf; and (v) your physical
        or electronic signature.
      </p>
      <p>
        You acknowledge and agree that upon receipt and notice of a claim of infringement, we may
        immediately remove the identified materials from the Member Services without liability.
      </p>

      <h2>COUNTER-NOTICE BY ACCUSED USER</h2>
      <p>
        If we have taken down your materials due to suspicion of copyright infringement, you may
        dispute the alleged infringement by sending a written communication by e-mail or mail to our
        designated agent below. That written communication should include the following: (i) your
        physical or electronic signature; (ii) identification of the material that has been removed
        or to which access has been disabled and the location at which the material appeared before
        it was removed or access to it was disabled; (iv) a statement under penalty of perjury that
        you have a good faith belief that the material was removed or disabled as a result of
        mistake or misidentification of the material to be removed or disabled; and (v) your name,
        address, and telephone number, and a statement that you consent to the jurisdiction of Irish
        and European law, and that you will accept service of process from the person who provided
        notification of copyright infringement or an agent of such person.
      </p>
      <p>
        Please send all notices under the above copyright infringement policies by e-mail or mail to
        the following office, designated as Try A Mentor ’s receipt of notifications of claimed
        infringement:
      </p>
      <p>Via email to: admin@tryamentor.com </p>
      <p>Repeat Infringers</p>
      <p>
        Your account will be terminated if, in our discretion, you are determined to be a repeat
        infringer. Repeat infringers are users who have been the subject of more than one valid
        takedown request that has not been successfully rebutted.
      </p>

      <h2>20. ADDITIONAL TERMS</h2>
      <p>
        The Member Services and Try A Mentor Content are offered solely for Member’s personal or
        company use for the purposes described in this Agreement. Any and all other uses are
        prohibited. Try A Mentor expressly reserves all its rights and remedies under applicable
        International, European, local, state and federal laws. Try A Mentor reserves the right, in
        its sole discretion, to refuse service, terminate Member Accounts, remove or edit content,
        cancel bookings, or deny access to the Member Services. You agree not to (and not to allow
        any third party to): (1) use any robot, spider, scraper, or other automatic or manual
        device, process, or means to access the Member Services or copy any Try A Mentor Content,
        except as expressly authorized by Try A Mentor ; (2) utilize any device, software, or
        routine that will interfere or attempt to interfere with the functionality of the Member
        Services; (3) use the Member Services or Try A Mentor Content for any illegal purpose; or
        (4) publicly disseminate information regarding the performance of the Member Services or Try
        A Mentor Content.
      </p>
      <p>
        Try A Mentor may suspend your ability to use all or any element of the Member Services or
        may terminate this Agreement effective immediately, without notice or explanation. Without
        limiting the foregoing, Try A Mentor may suspend your access to the Member Services if we
        believe you to be in violation of any part of this Agreement. After any suspension or
        termination, you may or may not be granted permission to use the Member Services or
        re-establish a Member Account. You agree that Try A Mentor shall not be liable to you for
        any termination of this Agreement or for any effects of any termination of this Agreement.
        You are always free to discontinue your use of the Member Services at any time. You
        understand that any termination of your Member Account may involve deletion of any content
        stored in your Member Account for which Try A Mentor will have no liability whatsoever.
      </p>
      <p>
        Under no circumstances will Try A Mentor be held liable for any delay or failure in
        performance due in whole or in part to any acts of nature or other causes beyond its
        reasonable control. This Agreement is made under and shall be governed by and construed in
        accordance with the laws of Ireland and the European Union, without giving effect to any
        principles that provide for the application of the law of another jurisdiction. You agree
        that any action of whatever nature arising from or relating to these Terms, the Site, or any
        Services will be filed only in the Irish courts. You consent and submit to the personal
        jurisdiction of such courts for the purposes of any such action.
      </p>
      <p>
        If any of the provisions, or portions thereof, of this Agreement are found to be invalid
        under any applicable statute or rule of law, then, that provision (or portion thereof)
        notwithstanding, this Agreement shall remain in full force and effect and such provision or
        portion thereof shall be deemed omitted.
      </p>
      <p>
        This Agreement and the rights granted and obligations undertaken hereunder may not be
        transferred, assigned, or delegated in any manner by operation of law or otherwise by
        Members, but may be freely transferred, assigned, or delegated by Try A Mentor .
      </p>
      <p>
        Any waiver of any provision of this Agreement, or a delay by any party in the enforcement of
        any right hereunder, shall neither be construed as a continuing waiver nor create an
        expectation of non-enforcement of that or any other provision or right.
      </p>
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
