import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SaveIcon from './SaveIcon';
import cx from 'classnames';
import { useMutation } from '@apollo/client';
import { ADD_COLOR_TO_FAVORITES, REMOVE_COLOR_FROM_FAVORITES } from '../mutations';

const Color = ({ 
  className, 
  contrast, 
  hexCode, 
  name, 
  isSaved = false, 
}) => {
  const [saved, setSaved] = useState(isSaved);
  const variables = { color: { name, hex: hexCode, contrast } };
  const [addColor] = useMutation(ADD_COLOR_TO_FAVORITES, {
    variables,
    update(cache, { data: { favoriteColors } }) {

    }
  });
  const [removeColor] = useMutation(REMOVE_COLOR_FROM_FAVORITES, { variables });

  function onClick() {
    if (saved) {
      setSaved(false);
      removeColor();
    } else {
      setSaved(true);
      addColor();
    }
  }

  return (
    <div className={cx('color', className, {
      'contrast-dark': contrast === '#000000',
      'contrast-light': contrast === '#ffffff',
    })} style={{backgroundColor: hexCode}}>
      <div className="color__save-icon" onClick={onClick}>
        <SaveIcon isSaved={saved}  />
      </div>
      {name && <span className="color__name">{name}</span>}
      <span className="color__hexCode">{hexCode}</span>
    </div>
  );
};

Color.propTypes = {
  className: PropTypes.string,
  constrast: PropTypes.string,
  hexCode: PropTypes.string.isRequired,
  isSaved: PropTypes.bool,
  name: PropTypes.string,
};

export default Color;