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
      name
      hex
      rgb
      contrast
    }
  }
`;

export const GET_COLOR_SCHEME = gql`
  query GetColorScheme($hex: String, $rgb: String, $mode: Mode, $count: Int) {
    scheme(hex: $hex, rgb: $rgb, mode: $mode, count: $count) {
      mode
      count
      colors {
        name
        hex
        rgb
        contrast
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