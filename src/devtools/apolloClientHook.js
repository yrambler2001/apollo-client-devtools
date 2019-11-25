import renderer from './renderer.js';

const interval = 1000;
const hook = window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__;
let client;

export function ready() {
  if (!hook.ApolloClient) {
    console.log('not ready');
    setTimeout(ready, interval);
    return false;
  }
  client = hook.ApolloClient;
  console.log('ready');
  getQueries();
  return true;
}

setTimeout(ready, interval);

export function getQueries() {
  const queries = client.queryManager.queryStore.getStore();
  console.log('queries', queries);
  return queries;
}
