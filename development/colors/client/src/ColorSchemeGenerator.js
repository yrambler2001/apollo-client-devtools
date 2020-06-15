import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_RANDOM_COLOR, GET_COLOR_SCHEME } from './queries';
import Color from './components/Color';

const ColorSchemeGenerator = ({ hexCode }) => {
  const { data, loading } = useQuery(GET_COLOR_SCHEME, { variables: {
    hex: hexCode,
  } });

  if (loading) {
    return null;
  }

  const scheme = data?.scheme?.color;
  return (
    <div>Color</div>
  );
};