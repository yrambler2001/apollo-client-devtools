/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import { render } from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql, makeVar } from "@apollo/client";
import "@apollo/space-kit/reset.css";
import { colors } from "@apollo/space-kit/colors";
import { SidebarLayout } from "./Layouts/SidebarLayout";

export enum ColorThemes {
  Light = 'light',
  Dark = 'dark'
}

type ColorTheme = ColorThemes;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        queries() {
          return queriesVar();
        },
        mutations() {
          return mutationsVar();
        },
        cache() {
          return cacheVar();
        },
        colorTheme() {
          return colorTheme();
        },
        graphiQLQuery() {
          return graphiQLQuery();
        },
      }
    }
  }
});

const queriesVar = makeVar(null);
const mutationsVar = makeVar(null);
const cacheVar = makeVar(null);
export const colorTheme = makeVar<ColorTheme>(ColorThemes.Light);
export const graphiQLQuery = makeVar<string>('');

export const client = new ApolloClient({
  cache,
});

export const writeData = ({ queries, mutations, cache }) => {
  queriesVar(queries);
  mutationsVar(mutations);
  cacheVar(cache);
};

const GET_THEME = gql`
  query GetTheme {
    colorTheme @client
  }
`;

const themes = {
  [ColorThemes.Light]: {
    primary: colors.indigo.darkest
  },
  [ColorThemes.Dark]: {
    primary: colors.black.base
  },
};

const App = () => {
  const { data = { colorTheme: ColorThemes.Light } } = useQuery(GET_THEME);

  return (
    <ThemeProvider theme={{ theme: themes[data.colorTheme] }}>
      <SidebarLayout>
        <SidebarLayout.Sidebar>Sidebar</SidebarLayout.Sidebar>
        <SidebarLayout.Main>Main</SidebarLayout.Main>
      </SidebarLayout>
    </ThemeProvider>
  )
};

export const initDevTools = () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("app")
  );
};
