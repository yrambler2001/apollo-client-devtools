import { gql } from '@apollo/client';

export const GET_RANDOM_COLOR = gql`
  query GetRandomColor {
    random {
      color {
        hex
      }
    }
  }
`;

export const GET_RANDOM_SCHEME = gql`
  query GetRandomScheme {
    random {
      scheme {
        result
      }
    }
  }
`;

export const GET_COLOR = gql`
  query GetColor($hex: String, $rgb: String) {
    color(hex: $hex, rgb: $rgb) {
      name {
        value
      }
      hex {
        value
      }
      rgb {
        value
      }
      contrast {
        value
      }
    }
  }
`;

export const GET_SAVED_COLORS = gql`
query GetSavedColors {
  savedColors {
    color {
      name {
        value
      }

      hex {
        value
      }

      rgb {
        value
      }
    }
  }
}
`;