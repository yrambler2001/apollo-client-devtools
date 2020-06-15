import React from 'react';
import PropTypes from 'prop-types';
import Block from './Block';
import SaveIcon from './SaveIcon';

const ColorBlock = ({ hexCode, isSaved, onSave }) => {
  return (
    <div className="color">
      {onSave && <SaveIcon isSaved={isSaved} onClick={onSave} />}
      <Block className="color__block" hexCode={hexCode} />
      <span className="color__hexCode">{hexCode}</span>
    </div>
  );
};

ColorBlock.propTypes = {
  hexCode: PropTypes.string.isRequired,
  onSave: PropTypes.func,
};

export default ColorBlock;