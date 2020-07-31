import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: July 30th, 2020</p>

      <p>
        Owner and Data Controller
        <ul className={css.bulletList}>
          <li>Data Controller, The Beacon HRM Group</li>
          <li>Owner contact email: admin@tryamentor.com</li>
        </ul>
      </p>

      <p>
        At Try A Mentor we take your privacy and the protection of your information seriously. We
        have created this policy in line with the Data Protection Commissioner to demonstrate this
        commitment and to tell you how we handle and use your data.
      </p>

      <p>
        If after reading this policy, you have any questions please contact us using the details
        above{' '}
        <u>
          but please know we do not share any information to any third parties for any commercial
          gain purposes
        </u>
        .
      </p>

      <p>
        Please review this statement periodically as we will amend and update it from time to time.
        This policy relates to transactions and activities in which you voluntarily engage, and it
        relates to data gathered on our websites, but it does not extend to any offline activities
        between you and any of our third party advertisers or news items.
      </p>

      <p>
        Please note that the Site may contain links to other websites. For example, if you click on
        a banner or advertisement on the site and link to another website, then this privacy policy
        will not apply to any information collected on that website. We recommend that you read the
        privacy policies of each website that you visit.
      </p>

      <p>
        We may transfer, sell, or assign data to another company because of a merger, sale, or
        company re-organisation.
      </p>

      <p>
        We endeavour to comply with the guidelines laid out by Ireland’s Data Commissioner in the
        collection, protection, and distribution of data we may collect about you on our website.
        You should be aware of your rights and your right to contact us;
      </p>

      <h2>Persons under the age of 18</h2>
      <p>
        Try A Mentor is not aimed at users under the age of 18. We do not to the best of our
        knowledge collect information from or relating to persons under the age of 18. If we
        discover that we have collected personal information from a person below the age of 18 we
        will delete that information as quickly as possible. If you believe we might have any
        information from or about a person under the age of 18, please contact us at
        admin@tryamentor.com
      </p>

      <h2>What information do we collect?</h2>
      <p>
        <ul className={css.bulletList}>
          <li>
            We only request information which is necessary for us to fulfil our service obligations
            on the website.
          </li>
          <li>
            We do require that you register to receive our services but to view our content on
            desktop or mobile this is not a requirement.
          </li>
          <li>You may opt to register using a form on the website.</li>
          <li>
            If you sign up for a news alert or newsletter you will also be registering a profile
            with us.
          </li>
          <li>We may also keep a record of any contact you have with us.</li>
          <li>
            With your consent, we may use your mobile number or email address to send you
            promotions, notifications, or other services. You have the option to unsubscribe or
            opt-out of all communications on every text or email we send you.
          </li>
        </ul>
      </p>

      <h2>By registering with us you promise to:</h2>
      <p>
        <ul className={css.bulletList}>
          <li>Inform us if you think someone has accessed your account without your permission</li>
        </ul>
      </p>

      <h2>What do we use this information for?</h2>
      <p>
        Any of the information we collect from you may be used in one of the following ways:
        <ul className={css.bulletList}>
          <li>To notify you of any changes to the website or service</li>
          <li>
            To notify you of offers/news within any newsletter or communication we may produce which
            you voluntarily register for
          </li>
          <li>
            To analyse our audience demographically for internal use and behaviour tracking, we
            never disclose personal information to any 3rd party
          </li>
          <li>
            To improve our customer service levels to you – having your information and knowing how
            you use the website helps us to respond efficiently and effectively to your support
            requests
          </li>
          <li>
            We can tell using registration information and cookies we have collected a bit more
            about you and your interests – this helps us to develop additional content we know you
            will like and want to read. By remembering who you are it makes it easier for you to
            (use the site and its services) comment or share articles to social media.
          </li>
          <li>
            Your information, whether public or private will not be sold to any other company for
            any reason whatsoever without your express consent.
          </li>
          <li>
            You are always in control of your data – we are relying on you to help us deliver a
            service our users want to avail of. We need to know more about you to improve our
            service to you.
          </li>
          <li>
            Please do not submit your personal information if you do not want us to collect it.
          </li>
        </ul>
      </p>

      <h2>Information you post</h2>
      <p>
        <ul className={css.bulletList}>
          <li>
            Any personal information which you volunteer in your public profile either through
            Social Media or on our website you post as a comment that will be available worldwide to
            anyone with access to the website.
          </li>
          <li>
            Please do not post any information you are not happy to leave up indefinitely or turn up
            in Google search results. Please do not post any offensive or discriminatory information
            (commenting house rules.) We recommend you do not post your name, address, telephone
            number, email address or anything else that may lead someone to identify you if this is
            something you would not wish to have publicly accessible.
          </li>
          <li>
            Please note that certain information (such as profile photographs) which you may choose
            to provide might reveal your gender, ethnic origin, nationality, religion, and/or sexual
            orientation.
          </li>
        </ul>
      </p>

      <h2>Site Security</h2>
      <p>
        At Try A Mentor we make every effort to protect the data which you provide to us. We
        consistently monitor our servers for unauthorised access, and we have appropriate security
        management systems in place to safeguard this. Anti-virus software and Firewalls are
        installed on all areas of the site. If we ask anyone else to do some work for us on our
        websites or servers, we ensure they have the same prominent levels of security in place.
      </p>
      <p>
        We do recognise however that, unfortunately, no data transmission over the internet can be
        guaranteed to be 100% secure. As a result, we cannot ensure or warrant the security of any
        information you provide to us. You do so at your own risk.
      </p>

      <h2>IP Addresses and Cookies</h2>
      <p>
        Like most other websites we will collect information about your computer including, if
        available, your IP Address, Operating System, Browser Type and Location for statistical and
        behavioural tracking. This information helps us to enhance our service to you. This does not
        identify any individual; it is used as a tool to gather broad levels of data for analysis
        and to measure audience size and patterns of usage such as visitor numbers and how unique
        they are.
      </p>
      <p>
        We may also collect a cookie file for the same reason. These are small files that a site or
        service provider transfers to your hard drive through your browser which essentially enables
        us to remember certain non-identifiable information. You can disable cookies through
        Internet Options on your browser menu at any time.
      </p>
      <p>
        We also use outside providers for web-site statistics. The primary provider we use is Google
        Analytics. You can find further information on the information which it collects at
        http://www.google.com/analytics/.
      </p>
      <p>
        If you access us via a mobile browser, we may identify the location of your device, the
        browser type you accessed with and the operating system.
      </p>

      <h2>Types of Data collected</h2>
      <p>
        In working with our clients and when they provide us with their details in a commercial
        transaction, we only use the information provided for the purposes of serving the client. No
        confidential information is shared publicly. The information provided to us by a client that
        is shared publicly by us is done solely for the promotion of our clients across our
        publications and platforms and with their agreement and is never used by us or allowed by us
        to be used by third parties for mailing lists or direct marketing purposes
      </p>
      <p>
        Among the types of Personal Data that this Application collects, by itself or through third
        parties, there are Cookies, Usage Data name, phone number and email address.
      </p>
      <p>
        Complete details on each type of Personal Data collected are provided in the dedicated
        sections of this privacy policy or by specific explanation texts displayed prior to the Data
        collection.
      </p>
      <p>
        The Personal Data may be freely provided by the User, or, in case of Usage Data, collected
        automatically when using this Application.
      </p>
      <p>
        All Data requested by this Application is mandatory and failure to provide this Data may
        make it impossible for this Application to provide its services. In cases where this
        Application specifically states that some Data is not mandatory, Users are free not to
        communicate this Data without any consequences on the availability or the functioning of the
        service.
      </p>
      <p>
        Users who are uncertain about which Personal Data is mandatory are welcome to contact the
        Owner.
      </p>
      <p>
        Any use of Cookies – or of other tracking tools – by this Application or by the owners of
        third-party services used by this Application serves the purpose of providing the service
        required by the User, in addition to any other purposes described in the present document
        and in the Cookie Policy, if available.
      </p>
      <p>
        Users are responsible for any third-party Personal Data obtained, published, or shared
        through this Application and confirm that they have the third party’s consent to provide the
        Data to the Owner.
      </p>

      <h2>Mode and place of processing the Data</h2>
      <p>Methods of processing</p>
      <p>
        The Data Controller processes the Data of Users in a proper manner and shall take
        appropriate security measures to prevent unauthorized access, disclosure, modification, or
        unauthorized destruction of the Data.
      </p>
      <p>
        The Data processing is carried out using computers and/or IT enabled tools, following
        organizational procedures and modes strictly related to the purposes indicated. In addition
        to the Data Controller, in some cases, the Data may be accessible to certain types of
        persons in charge, involved with the operation of the site (administration, sales,
        marketing, legal, system administration) or external parties (such as third-party technical
        service providers, mail carriers, hosting providers, IT companies, communications agencies)
        appointed, if necessary, as Data Processors by the Owner. The updated list of these parties
        may be requested from the Data Controller at any time.
      </p>

      <h2>Place</h2>
      <p>
        The Data is processed at the Data Controller’s operating offices and in any other places
        where the parties involved in the processing are located. For further information, please
        contact the Data Controller.
      </p>

      <h2>Retention time</h2>
      <p>
        The Data is kept for the time necessary to provide the service requested by the User, or
        stated by the purposes outlined in this document, and the User can always request that the
        Data Controller suspend or remove the data.
      </p>

      <h2>The use of the collected Data</h2>
      <p>
        The Data concerning the User is collected to allow the Owner to provide its services and so
        that Mentees are capable of choosing Mentors effectively, as well as for the following
        purposes: Analytics, Contacting the User and Displaying content from external platforms,
        managing contacts and sending messages and Platform services and hosting.
      </p>
      <p>
        The Personal Data used for each purpose is outlined in the specific sections of this
        document.
      </p>

      <h2>Detailed information on the processing of Personal Data</h2>
      <p>
        Personal Data is collected for the following purposes and using the following services:
        <ul className={css.bulletList}>
          <li>
            Analytics
            <ul className={css.circleList}>
              <li>
                The services contained in this section enable the Owner to monitor and analyse web
                traffic and can be used to keep track of User behaviour.
              </li>
            </ul>
          </li>
          <li>
            Google Analytics (Google Inc.)
            <ul className={css.circleList}>
              <li>
                Google Analytics is a web analysis service provided by Google Inc. (“Google”).
                Google utilizes the Data collected to track and examine the use of this Application,
                to prepare reports on its activities and share them with other Google services.
              </li>
              <li>
                Google may use the Data collected to contextualize and personalize the ads of its
                own advertising network.
              </li>
            </ul>
          </li>
          <li>Personal Data collected: Cookies and Usage Data.</li>
          <li>Place of processing: United States, Ireland, and Finland – Privacy Policy.</li>
        </ul>
      </p>

      <h2>Contacting the User</h2>
      <p>
        <ul className={css.bulletList}>
          <li>Contact form (this Application)</li>
          <li>
            By filling in the contact form with their Data, the User authorizes this Application to
            use these details to reply to requests for information, quotes, or any other kind of
            request as indicated by the form’s header.
          </li>
          <li>Personal Data collected: email address, name, and phone number.</li>
        </ul>
      </p>

      <h2>Displaying content from external platforms</h2>
      <p>
        <ul className={css.bulletList}>
          <li>
            This type of service allows you to view content hosted on external platforms directly
            from the pages of this Application and interact with them.
          </li>
          <li>
            This type of service might still collect web traffic data for the pages where the
            service is installed, even when Users do not use it.
          </li>
          <li>Google Maps widget (Google Inc.)</li>
          <li>
            Google Maps is a maps visualization service provided by Google Inc. that allows this
            Application to incorporate the content of this kind on its pages.
          </li>
          <li>Personal Data collected: Cookies and Usage Data.</li>
          <li>Place of processing: United States Ireland and Finland – Privacy Policy.</li>
        </ul>
      </p>

      <h2>Managing contacts and sending messages</h2>
      <p>
        <ul className={css.bulletList}>
          <li>
            This type of service makes it possible to manage a database of email contacts, phone
            contacts or any other contact information to communicate with the User.
          </li>
          <li>
            These services may also collect data concerning the date and time when the message was
            viewed by the User, as well as when the User interacted with it, such as by clicking on
            links included in the message. Our provider is SendGrid and you can find out more
            information on their policy here – General Data Protection Regulation
          </li>
          <li>MailChimp (The Rocket Science Group, LLC.)</li>
          <li>
            MailChimp is an email address management and message sending service provided by The
            Rocket Science Group, LLC.
          </li>
          <li>Personal Data collected: first name, last name, email address.</li>
          <li>Place of processing: United States, Ireland, and Finland – Privacy Policy.</li>
          <li>WordPress.com (Automattic Inc.)</li>
          <li>
            WordPress.com is a platform provided by Automattic Inc. that allows the Owner to build,
            run and host this Application.
          </li>
          <li>
            Personal Data collected: several types of Data as specified in the privacy policy of the
            service.
          </li>
          <li>Place of processing: United States, Ireland and Finland – Privacy Policy.</li>
        </ul>
      </p>

      <h2>Additional information about Data collection and processing</h2>
      <p>
        Legal action
        <ul className={css.bulletList}>
          <li>
            The User’s Personal Data may be used for legal purposes by the Data Controller, in Court
            or in the stages leading to possible legal action arising from improper use of this
            Application or the related services.
          </li>
          <li>
            The User declares to be aware that the Data Controller may be required to reveal
            personal data upon request of public authorities.
          </li>
        </ul>
      </p>

      <h2>Additional information about User’s Personal Data</h2>
      <p>
        In addition to the information contained in this privacy policy, this Application may
        provide the User with additional and contextual information concerning services or the
        collection and processing of Personal Data upon request.
      </p>

      <h2>Affiliates or 3rd party organisations</h2>
      <p>
        We may partner with co-branded organisations or other companies to supply services for our
        users. If you opt to sign up to those companies or purchase from them you should familiarise
        yourself with their privacy policy and terms and conditions. They may pass information
        regarding what you have purchased back to us for tracking purposes or so that your account
        is up to date when you log in. They may not share, resell or use the data for their own
        direct marketing purposes.
      </p>
      <p>
        We reserve the right to disclose your opt-out information to third parties so they can
        suppress your name from future contact lists, in accordance with relevant laws. We may
        occasionally release personal information as required by law, for example, to comply with a
        court order or subpoena
      </p>

      <h2>System logs and maintenance</h2>
      <p>
        For operation and maintenance purposes, this Application and any third-party services may
        collect files that record interaction with this Application (System logs) use other Personal
        Data (such as the IP Address) for this purpose.
      </p>

      <h2>Information not contained in this policy</h2>
      <p>
        More details concerning the collection or processing of Personal Data may be requested from
        the Data Controller at any time. Please see the contact information at the beginning of this
        document.
      </p>

      <h2>The rights of Users</h2>
      <p>
        Users have the right, at any time, to know whether their Personal Data has been stored and
        can consult the Data Controller to learn about their contents and origin, to verify their
        accuracy or to ask for them to be supplemented, cancelled, updated or corrected, or for
        their transformation into anonymous format or to block any data held in violation of the
        law, as well as to oppose their treatment for all legitimate reasons. Requests should be
        sent to the Data Controller at the contact information set out above.
      </p>
      <p>This Application does not support “Do Not Track” requests.</p>
      <p>
        To determine whether any of the third-party services it uses honour the “Do Not Track”
        requests, please read their privacy policies.
      </p>

      <h2>Changes to this privacy policy</h2>
      <p>
        The Data Controller reserves the right to make changes to this privacy policy at any time by
        giving notice to its Users on this page. It is strongly recommended to check this page
        often, referring to the date of the last modification listed at the bottom. If a User
        objects to any of the changes to the Policy, the User must cease using this Application and
        can request that the Data Controller remove the Personal Data. Unless stated otherwise, the
        then-current privacy policy applies to all Personal Data the Data Controller has about
        Users.
      </p>

      <h2>Information about this privacy policy</h2>
      <p>The Data Controller is responsible for this privacy policy.</p>
      <p>
        We may use helpful links to third party sites, but we have no responsibility to how your
        data is used on these sites. Refer to the individual privacy policy of the site your
        visiting to find out more details.
      </p>

      <h2>Definitions and legal references</h2>
      <p>
        <ul className={css.bulletList}>
          <li>
            Personal Data (or Data)
            <ul className={css.circleList}>
              <li>
                Any information regarding a natural person, a legal person, an institution, or an
                association, which is, or can be, identified, even indirectly, by reference to any
                other information, including a personal identification number.
              </li>
            </ul>
          </li>
          <li>
            Usage Data
            <ul className={css.circleList}>
              <li>
                Information collected automatically through this Application (or third-party
                services employed in this Application), which can include: the IP addresses or
                domain names of the computers utilized by the Users who use this Application, the
                URI addresses (Uniform Resource Identifier), the time of the request, the method
                utilized to submit the request to the server, the size of the file received in
                response, the numerical code indicating the status of the server’s answer
                (successful outcome, error, etc.), the country of origin, the features of the
                browser and the operating system utilized by the User, the various time details per
                visit (e.g., the time spent on each page within the Application) and the details
                about the path followed within the Application with special reference to the
                sequence of pages visited, and other parameters of the device operating system
                and/or the User’s IT environment.
              </li>
            </ul>
          </li>
          <li>
            User
            <ul className={css.circleList}>
              <li>
                The individual using this Application, which must coincide with or be authorized by
                the Data Subject, to whom the Personal Data refers.
              </li>
            </ul>
          </li>
          <li>
            Data Subject
            <ul className={css.circleList}>
              <li>The legal or natural person to whom the Personal Data refers.</li>
            </ul>
          </li>
          <li>
            Data Processor (or Data Supervisor)
            <ul className={css.circleList}>
              <li>
                The natural person, legal person, public administration or any other body,
                association or organization authorized by the Data Controller to process the
                Personal Data in compliance with this privacy policy.
              </li>
            </ul>
          </li>
          <li>
            Data Controller (or Owner)
            <ul className={css.circleList}>
              <li>
                The natural person, legal person, public administration or any other body,
                association or organization with the right, also jointly with another Data
                Controller, to make decisions regarding the purposes, and the methods of processing
                of Personal Data and the means used, including the security measures concerning the
                operation and use of this Application. The Data Controller, unless otherwise
                specified, is the Owner of this Application.
              </li>
            </ul>
          </li>
          <li>
            This Application
            <ul className={css.circleList}>
              <li>How the Personal Data of the User is collected.</li>
            </ul>
          </li>
        </ul>
      </p>

      <h2>Web browser cookies</h2>
      <p>
        Our application may use “cookies” to enhance user experience. User’s web browser places
        cookies on their hard drive for record-keeping purposes and sometimes to track information
        about them. Users may choose to set their web browser to refuse cookies or to alert you when
        cookies are being sent. If they do so, note that some parts of the Site may not function
        properly.
      </p>

      <h2>Legal information</h2>
      <p>
        Notice to European Users: this privacy statement has been prepared in fulfilment of the
        obligations under Art. 10 of EC Directive n. 95/46/EC, and under the provisions of Directive
        2002/58/EC, as revised by Directive 2009/136/EC, on the subject of Cookies.
      </p>

      <p>This privacy policy relates solely to this Application.</p>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default PrivacyPolicy;
