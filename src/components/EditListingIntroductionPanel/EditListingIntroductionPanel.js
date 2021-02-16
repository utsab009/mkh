import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '..';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { Link } from 'react-router-dom';
// import { EditListingDescriptionForm } from '../../forms';
import config from '../../config';

import css from './EditListingIntroductionPanel.css';
import Button from '../Button/Button';
import NamedLink from '../NamedLink/NamedLink';

const EditListingIntroductionPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    onManageDisableScrolling,
    history,
    isNewListingFlow,
    isEditPublished,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData } = currentListing.attributes;
  console.log('8888 publicData', currentListing.attributes);
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    // <FormattedMessage
    //   id="EditListingDescriptionPanel.title"
    //   values={{
    //     listingTitle: (
    //       <ListingLink listing={listing}>
    //         <FormattedMessage id="EditListingDescriptionPanel.listingTitle" />
    //       </ListingLink>
    //     ),
    //   }}
    // />
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  ); // Default Code

  // const panelTitle = (
  //   <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  // );

  return (
    <div className={classes}>
      <h1 className={css.title}>How to Create a Great Mentor Listing</h1>
      {/* <div className={css.titleSmall}>
        To make things straightforward we have a video that will explain this section fully and is
        found by clicking this link. You can watch this or read the “how to guide” below or click
        "skip / next below" and work it out as you go.
      </div> */}
      <div className={css.titleSmall}>
        To make things straightforward we have a video that will explain this section fully and is
        found by clicking this{' '}
        <a className={css.link} href="">
          link
        </a>
        . You can watch this or read the “how to guide” below or work it all out as you go by
        scrolling down and clicking “Next”.
      </div>

      <div className={css.headingMain1}>How To:</div>
      <div className={css.headingMain2}>What is Role listing?</div>
      <p className={css.textContent}>
        You have already signed up as a Mentor by giving your experience and education and verifying
        your e-mail. This information is a description of you and creates your{' '}
        <NamedLink className={css.link} name="ProfileSettingsPage">
          Mentor Profile
        </NamedLink>
        . The only thing missing is a photo. What we do not know is the types of Job Roles you want
        to Mentor, when, and how much will you charge. When this information is collected through
        the process that follows, a Role Listing is created. What is important to note is that you
        may need to create more than one Role Listing.
      </p>
      <div className={css.headingMain2}>Why would I need more than one Role Listing?</div>
      <p className={css.textContent}>
        Well, let me give you an example. A Mentor during their career to date has had two roles.
        The first as a Human Resources (HR) Administrator and then they became a HR Manager which is
        a more senior position. Due to their experience in both these Job Roles, this person can be
        a Mentor to people who want to be a HR Administrator or HR Manager or to someone who is
        currently in either of these roles. In this case, this Mentor needs to create a Role Listing
        for the HR Administrator Role so that when a Mentee searches for a Mentor by the key word HR
        Administrator they will find them. But they also need to create another Role Listing (do
        this process again) for the HR Manager Role so again if a Mentee searches by the keyword HR
        Manager they will find them also.
      </p>
      <p className={css.textContent}>
        Another reason for having more than one Mentor Listing, is sometimes a Job Position can be
        at more then one level of Seniority. For example, a HR Manager in one organisation can be a
        middle level position, but in another, it can be a very senior position. If this is the case
        for a Job Role you want to mentor, you may want to charge a different rate for HR Managers
        in a middle management position then those who are at a senior management position.
      </p>
      <p className={css.textContent}>
        So, you would create a Mentor Listing for HR Manager at a middle management level and a
        separate one for a HR Manager at a senior management level, assuming you have experience in
        both. The reason for the additional Mentor Listings in this case is so you can charge
        differently.
      </p>
      <div className={css.headingMain2}>Let us now explore how you create a Role Listing.</div>
      <div className={css.headingMain1}>
        Section One: Job Role or Government Position Classification{' '}
      </div>
      <div className={css.headingMain2}>Step One: Give this Role Listing a Name</div>
      <p className={css.textContent}>
        The first thing you will be asked to do is give this Role Listing a name. Remember
        previously when I told you that you could have more than one Role Listing, well by naming
        each one through this step will mean that you can tell them apart. Then you can up-date or
        change any of the information you place in them. For example, change how much you will
        charge per hour. You can make changes as often as you like to any Role Listing you create by
        going to the circle on the top right-hand corner of the screen. This will have your initials
        or your photo within it. When you click on this several options will appear but the one you
        should click on is labelled Role Listings. Click on the one you want to change (you will
        know which one it is because of this step in the process)
      </p>
      <div className={css.headingMain2}>
        Step Two: Type the name of the Job Role (or Government Position Classification){' '}
      </div>
      <p className={css.textContent}>
        First, a Job Role are such positions as an Accountant, a Lawyer, a Construction Laborer and
        so on, while a Government Position Classification are classifications that Governments put
        on positions that are found in the Federal / Civil Service, Public or Government Sectors
        etc. For example, Police Officer, Staff Nurse and Principle Officer are examples of such
        classifications.
      </p>
      <p className={css.textContent}>
        We use International classifications, so if your classification does not appear try and
        think of other names for it. For example, you type Cop, nothing appears, so you then type
        Police Officer, and this then appears, and you pick this.
      </p>
      <div className={css.headingMain2}>Step Three: Explain your experience</div>
      <p className={css.textContent}>
        When a Mentee chooses a Role that you have defined you can Mentor, you along with other
        Mentors will appear. By clicking on you, a page will then be launched that will contain the
        information your provided on your education and your career to date etc. Above this will be
        text written by you, explaining why you believe for this Job Role you would make a great
        Mentor. Step three is where you write this text. Make it wonderful, sell yourself and your
        experience and accomplishments as they relate to the specific Job Role, but our advice is to
        keep it as short as possible.
      </p>
      <div className={css.headingMain1}>Section Two and Three: Sectors and Seniority Levels</div>
      <p className={css.textContent}>
        In the previous section you picked a Job Role. But now what Sector or Sectors could help a
        Mentor in that Job Role excel in? At to what level of Seniority? You can pick all Sectors,
        several Sectors or just one and the same for Seniority Levels. For example, you pick the Job
        Role “Accountant” and because you were an Accountant within the Insurance Sector, you pick
        this Sector, and as this position was at a Middle Management Level, you also pick this also.
      </p>
      <p className={css.textContent}>
        Mentors who picked a Government Position Classification for example Firefighter. These
        classifications inherently tell you what level of seniority they are at and the sector they
        relate to and as such you will skip Sections Two and Three automatically. For example, if
        you decide to offer Mentoring to a “Police Commissioner”, a Mentee looking for Mentoring for
        this Government Position Classification will automatically know the sector and seniority by
        this title.
      </p>
      <div className={css.headingMain1}>Section Four: Languages / Video Link</div>
      <p className={css.textContent}>
        What language or languages do you speak? We ask this so that we can match you with Mentees
        who only speak the languages you want to Mentor in. Just tick on the language or languages
        you can Mentor through here.
      </p>
      <p className={css.textContent}>
        Video Link. Imagine you are a Mentee for a moment. You have found a few Mentors who may be
        able to help. You click on one and on the page that appears is a button called “Mentor
        Video”. You click this, and a video made by the Mentor appears. The Mentor explains how they
        will help you excel in your chosen role. Powerful.
      </p>
      <p className={css.textContent}>
        Today, so many of us can create a video with ease on our mobile phones, and then create a
        YouTube channel and post it there. Here is a{' '}
        <a href="" className={css.link}>
          link
        </a>{' '}
        to a video explaining just how simple this is. If you decide to create such a video, you can
        place the link for it in this section, and when Mentees press “Mentor Video” on your
        listing, it will appear.
      </p>

      <div className={css.headingMain1}>Section Five: Availability</div>
      <p className={css.textContent}>
        When will you be able to Mentor? Here you can pick the times you are available. Start by
        picking your time zone and then click the days and then times within those days that you
        will set aside to potentially Mentor. When a Mentee goes through the booking process and
        attempts to book you, a booking request is created and sent to you. So, if they pick a time
        that you designated for Mentoring, but you are now not free, you can decline the request and
        ask them to book a time you know you are available. You can also add exceptions to this
        schedule. Times, that you are not available. For example, you place in your schedule that
        you will Mentor on Tuesdays from 6pm to 8pm. This year an important holiday occurs on a
        Tuesday next month and on this day, you will not be able to Mentor, so on that date you
        create an exception preventing bookings. The other exception is when you want to make
        yourself available on a day of the week you normally are not. In other words, the system
        will be as flexible as you need it to be.
      </p>
      <div className={css.headingMain1}>Section Six: Pricing</div>
      <p className={css.textContent}>
        So, how much will you charge per hour in Euros? Place a figure between €1 and €1000 euro.
      </p>
      <p className={css.textContent}>
        How much should you charge? Well, we would advise you to examine what other Mentors are
        charging, who are offering Mentoring for the Role or similar Roles and consider the
        Seniority Level. The higher the level, the higher the charge.
      </p>
      <div className={css.headingMain1}>Publish</div>
      <p className={css.textContent}>
        The Role Profile is now ready to be published and as such you are nearly ready to be
        selected by Mentees. By pressing the Publish button you are transported to Stripe. Stripe is
        an independent financial management system (you can learn more about them through the
        following{' '}
        <a href="https://stripe.com/en-in" target="_blank" className={css.link}>
          link
        </a>
        ). They will collect your banking information so that payments can be made to you and are
        completely independent of Try A Mentor.
      </p>
      <p className={css.textContent}>
        Sometimes it can take Stripe a while to verify your information, so we advise that you check
        back 24 hours later. To do this, click the circle with your initials or photo in it at the
        top right-hand corner of the Try A Mentor page. When you click it, a drop-down menu will
        appear, on this click “Account Settings”. You will then see “Contact Details” in big
        writing. To the left of this is “Mentor Bank Details”. By clicking on this, you will see if
        Stripe has verified your banking details and if not, you can access Stripe again to see how
        you can help them further.
      </p>
      <p className={css.textContent}>
        You are now a Mentor on Try A Mentor. Congratulations. We wish you great success.
      </p>
      {!isEditPublished && (
        <Button
          inProgress={updateInProgress}
          className={css.submitButton}
          onClick={() => {
            if (isNewListingFlow) {
              history.push('/l/draft/00000000-0000-0000-0000-000000000000/new/description');
            } else {
              const updateValues = {
                publicData: { ...publicData },
              };
              onSubmit(updateValues);
            }
          }}
        >
          Next
        </Button>
      )}
    </div>
  );
};

EditListingIntroductionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingIntroductionPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingIntroductionPanel;
