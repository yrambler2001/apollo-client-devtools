import React from 'react';
import PropTypes from 'prop-types';

const SaveIcon = ({ isSaved = false }) => {
  return (
    <svg className={isSaved ? "icon icon-heart unsaved" : "icon icon-heart saved"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
      <path d="M50,94,9.3,53.3A27.71,27.71,0,0,1,48.49,14.11L50,15.63l1.51-1.52A27.71,27.71,0,0,1,90.7,53.3Z"/>
    </svg>
  );
};

SaveIcon.propTypes = {
  isSaved: PropTypes.bool.isRequired,
};

export default SaveIcon;