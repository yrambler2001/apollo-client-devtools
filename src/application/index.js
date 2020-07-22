import React from "react";
import { render } from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, ApolloLink } from "@apollo/client";
// import Panel from './components/Panel';

const client = new ApolloClient({
  link: ApolloLink.empty(),
  cache: new InMemoryCache(),
});

export const writeQuery = options => client.writeQuery(options);

const App = () => (<div>Hello, I am the Apollo Client Devtools.</div>);

export const initDevTools = () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>, 
    document.getElementById("app")
  );
};
