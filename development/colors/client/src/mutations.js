import { gql } from '@apollo/client';

export const SAVE_COLOR = gql`
  mutation SaveColor($hex: String!, $name: String!, $rgb: String!) {
    saveColor(name: $name, hex: $hex, rgb: $rgb) {
      name {
        value
      }
    }
  }
`;