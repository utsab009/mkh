import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './CommunityGuidelines.css';

const CommunityGuidelines = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Updated on July 29th, 2020</p>

      <p>
        Tryamentor.com is a place and means for people, who have experience performing a role, to
        mentor people new to these roles or who hope to enter them. They can equally help a person
        already in that role to further excel in it. Both Mentors and Mentees use Tryamentor.com as
        a meeting place, or an online marketplace to be precise, which in turn delivers a Community
        of Mentors and Mentees, and this is the purpose of Try A Mentor. Try A Mentor is designed to
        build and sustain relationships between Mentors and Mentees and for this to occur the
        critical component is trust.
      </p>

      <p>
        Try A Mentor, as a result, has created Community Guidelines that are actively enforced to
        enable effective Trust, and its critical components of safety and effective behaviour, to be
        adhered to. Try A Mentor (TAM) takes violations of these Community Guidelines seriously and
        may suspend or terminate an Account for ongoing or serious violations. Try A Mentor reserves
        the right to also edit or remove content on our site that violates these Community
        Guidelines or if we believe it adversely affects the integrity of the Try A Mentor platform
        or its users.
      </p>

      <p>
        By using Try A Mentor / tryamentor.com, you agree to strictly observe and follow these
        Community Guidelines. If you have any questions about these Community Guidelines, or if you
        believe that a user has violated these Community Guidelines, please email us immediately at
        admin@tryamentor.com
      </p>

      <h2>Mentors must:</h2>
      <ul className={css.numberList}>
        <li>
          Not take bookings or payment directly:
          <p>
            This is not just part of our Community Guidelines but it against the rules and
            conditions for using this site. But there are also common-sense reasons as to why you
            should not do this:
            <ul className={css.circleList}>
              <li>
                Using our site is about gaining a steady stream of Mentees, and as such, revenue.
                Once a Mentee and you finish working together, they will leave a review. The more
                reviews you have, the more future Mentees will pick you. By moving a Mentee to work
                with you directly, they can no longer leave a review and future bookings will
                decrease.
              </li>
              <li>
                You are signalling to the Mentee, or they are signalling to you, that they are
                willing to be unethical. So, when payment is needed, you and they will need to share
                financial information with one another. Would you like to give such details to
                someone who has already shown themselves to be unethical?
              </li>
              <li>
                The payment system on Try A Mentor means that all financial payments are automatic,
                all financial information safe and you are working with an independent (Stripe) and
                highly secure payment system. Having a place to find a steady stream of mentors and
                mentees, and the system to support this process, makes continuing to work through us
                easy, profitable, and very safe.
              </li>
            </ul>
          </p>
        </li>
        <li>
          Comply with local and international laws and tax laws always.
          <p>
            Try A Mentor acts as a communication platform and as such is not liable for ensuring
            compliance by Mentors. It is the responsibility of Mentors and each listing owner to
            ensure all local and international laws, and tax compliance is met. Any payments that
            you collect that originate through our communications, booking requests, or otherwise
            from Try A Mentor, are also subject to any business reporting for which you are required
            and currently responsible for. If you are responsible for charging local or national
            taxes on services, you must also comply with these regulations and let all users know of
            any applicable taxes that they may be charged off our platform.
          </p>
        </li>
        <li>
          Accurately represent themselves in terms of Experience, Education, Pricing, and the
          Services they are capable of offering.
          <p>
            Mentors must accurately present their education, educational awards / accreditation and
            working experience (their accrediting body, institution or organisation in which they
            studied through, time to gain award, if only partially awarded, level of award, where
            they worked, the role they did, what this involved, examples of how they approached this
            work and length of time in each role/ organisation etc.) and their experience of
            Mentoring others in the past. Their photograph must also be an accurate representation
            of themselves and be a photograph representative of a business professional. The Mentor
            must accurately present the services that they can credibly offer and should not
            misrepresent pricing or dishonestly make claims by any means. Try A Mentor will take
            proactive action if it is reported or discovered that you are misrepresenting yourself
            or the services that you offer.
          </p>
        </li>
        <li>
          Behaviour
          <p>
            Whilst communicating through Try A Mentor, or when providing the on-line Mentoring (in
            fact having any contact with anyone who is part of the Try A Mentor community, including
            Mentees) your behaviour should be guided by what professional conduct dictates in a
            professional workplace. Your language should be polite and respectful, your behaviour
            positive in all aspects and absolutely nothing of a sexual nature should be said or
            done. No alcohol or illegal drugs should be consumed. You are not allowed to use
            discriminatory language or gestures and you are not allowed to discriminate on the
            grounds of Gender, Age, Marital Status, Family Status, Sexual Orientation, Religion,
            Race, Disability, or membership of the Travelling Community or any other category of
            person as defined by local / national laws. It is strictly forbidden to form any type of
            sexual / dating relationship with other members of the Try A Mentor Community / Users of
            Tryamentor.com
          </p>
        </li>
        <li>
          Only list and offer Mentoring that you are permissioned to offer.
          <p>
            You must only list Role Profiles / Job Roles that you have permission and authority to
            do so. If a previous or current employer has the right to prevent you discussing what
            you have learnt while in their employ then you must follow this direction, and as such
            do not offer it on Try A Mentor without consent to do so. If it is discovered that you
            are offering information that you do not have permission to offer, the listing will be
            immediately removed, and your account will be subject to removal from our site.
          </p>
        </li>
        <li>Never engage in illegal or prohibited activity to or with a Mentee</li>
        <li>Never meet a Mentee in person (except for on-line / “virtual” Mentor meetings)</li>
        <li>
          It is the responsibility of the Mentor to ensure that they have all the required equipment
          and internet speed to have a successful on-line Mentoring Meeting. If your equipment fails
          or your internet speed becomes ineffective (not capable to delivering clear video picture
          and sound) then all monies paid for the Mentoring meeting impacted are to be refunded
        </li>
        <li>
          It is the responsibility of the Mentor to ensure that they are using an effective on-line
          meeting platform that works correctly (produces an effective video picture of both Mentor
          and Mentee and does so in a way that ensures confidentiality and safety for all). If this
          fails all monies paid for the Mentoring meeting impacted are to be refunded.{' '}
        </li>
        <li>Confidentiality is critical aspect of safety on Try A Mentor.</li>
      </ul>

      <h2>Mentees must:</h2>
      <ul className={css.numberList}>
        <li>
          Not ask the Mentor to take bookings directly (not using the Try A Mentor website) or
          direct payments (not using the Try A Mentor website) or accepting this request from a
          Mentor.{' '}
          <p>
            This is not just part of our Community Guidelines, but it is against the rules and
            conditions for using this site. But there are also common-sense reasons as to why you
            should not do this:
            <ul className={css.circleList}>
              <li>
                You are signalling to the Mentor, or they are signalling to you, that they are
                willing to be unethical. So, when payment is needed you and they will need to share
                financial information with one another. Would you like to give such details to
                someone who has already shown themselves to be unethical?
              </li>
              <li>
                The payment system on Try A Mentor means that all financial payments are automatic,
                all financial information safe (Try A Mentor uses Stripe, an independent and highly
                secure system) and you are working with a robust booking system. Having a place to
                easily find and book effective Mentors who need to abide to a set of rules to remain
                on the site. This means your safety is a critical element of Try A Mentor
              </li>
              <li>
                If you have a complaint, requesting a refund etc., Try A Mentor will not be able to
                help and you will have to make this request to a Mentor who has shown themselves to
                be unethical.
              </li>
              <li>
                Adjudication can only occur through the Try A Mentor process. If you have
                communicated through any other medium other than the Try A Mentor communication
                system you have broken the Terms and Conditions of the website and as such Try A
                Mentor is no longer in a position to mediate on your behalf with the mentor. As
                such, any action to gain a refund must be performed with the mentor.
              </li>
            </ul>
          </p>
        </li>
        <li>
          Understand the Role of “Try A Mentor” / What “Try A Mentor” offers.
          <p>
            Try A Mentor acts as a communication platform and as such is not liable for ensuring
            compliance by Mentors. Your Mentoring purchase is directly with the Mentor (your Mentor
            is the Service provider not Try A Mentor) and as such Try A Mentor’s ability to ensure
            Mentor’s compliance is limited to:
            <ul className={css.circleList}>
              <li>
                For a limited time period being able to with-hold payment to a Mentor while an issue
                is investigated, and within this limited period, if the investigation sides with the
                Mentee, to permanently withhold payment and to refund the Mentee (please see terms
                and conditions).
              </li>
              <li>The removal of the Mentor from the Try A Mentor platform.</li>
            </ul>
          </p>
        </li>
        <li>
          Accurately represent themselves to the Mentor
          <p>
            Mentees must accurately present their education, educational awards / accreditation and
            working experience
          </p>
        </li>
        <li>
          Behaviour
          <p>
            Whilst communicating through Try A Mentor, or when on-line receiving Mentoring (in fact
            having any contact with anyone who is part of the Try A Mentor community), your
            behaviour should be guided by what professional conduct dictates in a professional
            workplace. Your language should be polite and respectful, your behaviour positive in all
            aspects and absolutely nothing of a sexual nature should be said or done. No alcohol or
            illegal substances should be consumed. You are not allowed to use discriminatory
            language or gestures and you are not allowed to discriminate on the grounds of Gender,
            Age, Marital Status, Family Status, Sexual Orientation, Religion, Race, Disability, or
            membership of the Travelling Community or any other category of person as defined by
            local / national laws. It is strictly forbidden to form any type of sexual / dating
            relationship with other members of the Try A Mentor Community / Users of Tryamentor.com
          </p>
        </li>
        <li>
          Only ask for Mentoring that you have the permission to receive.
          <p>
            You must only receive mentoring for Job Roles that you have permission and authority to
            receive. If a current or past employer has the right to prevent you from discussing what
            you have learnt while in their employ with an outside third party and if they so direct
            you not to receive mentoring then you must follow this direction. If it is discovered
            that you are offering information or receiving Mentoring that you do not have permission
            to receive, your account will be subject to removal from our site.
          </p>
        </li>
        <li>You must offer both Fair and Accurate Feedback.</li>
        <li>Never engage in illegal or prohibited activity to or with your Mentor.</li>
        <li>
          Never meet a Mentor in person (except for on-line / “virtual” Mentor meetings).
          <p>
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
            </ul>
          </p>
        </li>
      </ul>

      <h2>Everyone must:</h2>
      <ul className={css.numberList}>
        <li>
          Communicate honestly with others.
          <p>
            Try A Mentor is a trusted marketplace and depends on the honesty, integrity, and best
            interest of everyone that uses the platform. Only message others with the best intent in
            mind, do not make false claims, misrepresentations, do not engage in fraudulent
            activity, and do not willingly be deceitful.
          </p>
        </li>
        <li>
          Use our platform for the intended use of Try A Mentor.
          <p>
            Try A Mentor is a communication platform with the intended use for Mentees to discover,
            message and request to book, and receive confirmation of booking requests with Mentors
            directly. It is also for Mentors to easily be able to list their ability to Mentor and
            services they are offering to others. Any messages that are not intended for this
            purpose, are misrepresented, have fraudulent intent, or otherwise deemed harmful to
            either user will be immediately reviewed and if necessary, appropriate, and legal, may
            result in legal action being taken by Try A Mentor. All users and booking requests are
            also applicable to the Terms of Service that is agreed upon by using the platform.
          </p>
        </li>
        <li>
          Respect others privacy and information.
          <p>
            Many Mentors are world-renowned professionals. Some Mentors may also have well-known
            Mentees. It is professional and common courtesy to respect the privacy of the Mentors or
            Mentees. In some cases, Mentee and even Mentors may require the signing of a
            Non-Disclosure Agreement (NDA) prior to their booking. It is the choice of the person as
            to whether they sign this document but in turn the person requesting it, can decide not
            to pursue the Mentoring.
          </p>
        </li>
        <li>
          Maintaining all information received as Confidential
          <p>
            When Mentors meet with Mentees a relationship is formed. This is a professional
            relationship and one whose foundation is trust. As such, it is possible, in a
            professional context, that items are discussed that may be deemed confidential by either
            party involved. As the relationship is built on trust one party may share something with
            the other, believing it to be being relayed as confidential but not necessarily stating
            this. As a result, all information shared in Mentoring Sessions / Meetings should be
            considered as confidential. If either party is shown to have broken this trust in this
            context then that person’s listings will be immediately removed, and their account is
            subject to be removed from our site. This is the clear essence of what is required here,
            but for a more defined definition of the requirements, please read on (please note: what
            follows is not a legally binding agreement or a legal document at all, rather it is
            designed to give both Mentor and Mentee further clarity in this area):
            <ul className={css.bulletList}>
              <li>
                Confidential Information “means all business or technical information of Discloser,
                whether it is received, accessed or viewed by Disclosee in writing, visually,
                electronically or orally. Confidential Information includes, but is not limited to,
                the following types of information, and other information of a similar nature
                (whether or not reduced to writing or still in development): designs, concepts,
                drawings, inventions, specifications, techniques, discoveries, models, data, content
                material, source code, object code, documentation, diagrams, flow charts, research,
                development, processes, procedures, know-how, new product or new technology
                information, marketing techniques and materials, marketing plans, timetables,
                strategies and development plans (including prospective trade names or trademarks),
                customer names and other information related to customers, pricing policies, and
                financial information, as well as analyses, compilations, studies or documents
                prepared by Discloser or its Representatives which contain or reflect the
                Confidential information.
              </li>
              <li>
                Either Party may disclose Confidential Information to the other Party in confidence
                provided that the Discloser identifies such information as proprietary and
                confidential either by marking it, in the case of written materials, or, in the case
                of information that is disclosed orally or written materials that are not marked, by
                notifying the other Party of the proprietary and confidential nature of the
                information, such notification to be done orally, by e-mail or written
                correspondence, or via other means of communication as might be appropriate within a
                reasonable time (not to exceed thirty (30) days) after the disclosure, or provided
                the disclosed information would, under the circumstances, appear to a reasonable
                person to be confidential or proprietary.
              </li>
              <li>
                Exceptions. Notwithstanding the above, this direction on Confidentiality while
                operating on the Try a Mentor platform and when in Mentoring Sessions / Meetings
                does not impose obligations of secrecy if:{' '}
                <ul className={css.alphaList}>
                  <li>
                    Was known to the Disclosee, without restriction, at the time of disclosure, as
                    demonstrated by files in existence at the time of disclosure;
                  </li>
                  <li>The information in question is an object of public knowledge; </li>
                  <li>
                    The information in question is approved for disclosure through prior written
                    authorization from the Discloser;{' '}
                  </li>
                  <li>
                    The information in question was independently developed by the Disclosee without
                    any use of the Confidential Information of the Discloser and by employees of the
                    Disclosee who have not had access to the Confidential Information, as
                    demonstrated by files created at the time of such independent development;
                  </li>
                  <li>
                    The information in question shall be disclosed in order to fulfil obligations
                    under agreements between parties;{' '}
                  </li>
                  <li>
                    The information in question is disclosed to the Disclosee by a third party who
                    has the right to make such a disclosure, or
                  </li>
                  <li>
                    The information in question is disclosed in response to a valid order of a court
                    or other governmental agency or any political subdivision, but only to the
                    extent of and for the purpose of such an order; provided, however, that the
                    Disclosee shall first notify the Discloser in writing to seek a protective order
                    or take other appropriate and necessary action.
                  </li>
                </ul>
              </li>
              <li>
                <p>
                  Obligations. The Disclosee should:
                  <ul className={css.circleList}>
                    <li>Hold the Discloser’s Confidential Information in strict confidence;</li>
                    <li>
                      Not disclose such Confidential Information to any third party except as
                      specifically authorized herein or as specifically authorized by the Discloser
                      in writing;
                    </li>
                    <li>
                      further agrees that in protecting Confidential Information against
                      unauthorised use, dissemination or publication, it shall use the same degree
                      of care as it uses in protecting its own information of similar nature, but no
                      less than reasonable care; and
                    </li>
                    <li>
                      not to use any Confidential Information for any purpose other than for the
                      purpose of giving or receiving mentoring
                    </li>
                    <li>
                      inform the other party immediately upon becoming aware or suspecting that an
                      unauthorised person has become aware of Confidential Information;
                    </li>
                  </ul>
                </p>
                <p>
                  The Disclosee shall:
                  <ul className={css.circleList}>
                    <li>
                      inform anyone to whom it discloses Confidential Information that the
                      information is confidential; and
                    </li>
                    <li>
                      procure that anyone to whom it discloses the Confidential Information complies
                      with this agreement as if they were a party and shall, in any event, remain
                      liable to the Discloser or for any breach of this Agreement committed by any
                      party to whom the Disclosee has disclosed the Confidential Information.
                    </li>
                  </ul>
                </p>
              </li>
            </ul>
          </p>
        </li>
      </ul>

      <p>
        If there is ever an issue with privacy, Mentor security, or Mentor rules, please send us an
        email immediately at admin@tryamentor.com.
      </p>
    </div>
  );
};

CommunityGuidelines.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

CommunityGuidelines.propTypes = {
  rootClassName: string,
  className: string,
};

export default CommunityGuidelines;
