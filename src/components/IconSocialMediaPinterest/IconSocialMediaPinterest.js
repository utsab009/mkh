import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSocialMediaPinterest.css';

const IconSocialMediaPinterest = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    // <svg className={classes} width="16" height="17" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M186.4 142.4c0 19-15.3 34.5-34.2 34.5 -18.9 0-34.2-15.4-34.2-34.5 0-19 15.3-34.5 34.2-34.5C171.1 107.9 186.4 123.4 186.4 142.4zM181.4 201.3h-57.8V388.1h57.8V201.3zM273.8 201.3h-55.4V388.1h55.4c0 0 0-69.3 0-98 0-26.3 12.1-41.9 35.2-41.9 21.3 0 31.5 15 31.5 41.9 0 26.9 0 98 0 98h57.5c0 0 0-68.2 0-118.3 0-50-28.3-74.2-68-74.2 -39.6 0-56.3 30.9-56.3 30.9v-25.2H273.8z"/>
    // </svg>
    <svg 
    enable-background="new 0 0 56.693 56.693" 
    height="17" 
    id="Layer_1"
    version="1.1"
    viewBox="0 0 56.693 56.693" 
    width="16" 
    xmlns="http://www.w3.org/2000/svg">
    <path d="M30.374,4.622c-13.586,0-20.437,9.74-20.437,17.864c0,4.918,1.862,9.293,5.855,10.922c0.655,0.27,1.242,0.01,1.432-0.715 c0.132-0.5,0.445-1.766,0.584-2.295c0.191-0.717,0.117-0.967-0.412-1.594c-1.151-1.357-1.888-3.115-1.888-5.607 c0-7.226,5.407-13.695,14.079-13.695c7.679,0,11.898,4.692,11.898,10.957c0,8.246-3.649,15.205-9.065,15.205 c-2.992,0-5.23-2.473-4.514-5.508c0.859-3.623,2.524-7.531,2.524-10.148c0-2.34-1.257-4.292-3.856-4.292 c-3.058,0-5.515,3.164-5.515,7.401c0,2.699,0.912,4.525,0.912,4.525s-3.129,13.26-3.678,15.582 c-1.092,4.625-0.164,10.293-0.085,10.865c0.046,0.34,0.482,0.422,0.68,0.166c0.281-0.369,3.925-4.865,5.162-9.359 c0.351-1.271,2.011-7.859,2.011-7.859c0.994,1.896,3.898,3.562,6.986,3.562c9.191,0,15.428-8.379,15.428-19.595 C48.476,12.521,41.292,4.622,30.374,4.622z"/>
    </svg>
    
  );
};

IconSocialMediaPinterest.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconSocialMediaPinterest.propTypes = { rootClassName: string, className: string };

export default IconSocialMediaPinterest;
