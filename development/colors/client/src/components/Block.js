import React from 'react';
import PropTypes from 'prop-types';

const Block = ({ className, hexCode }) => {
  return (
    <div className={className} style={{backgroundColor: hexCode}} />
  );
};

Block.propTypes = {
  hexCode: PropTypes.string.isRequired,
};

export default Block;