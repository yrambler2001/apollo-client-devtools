const getManifest = chrome.runtime.getManifest;
const version = (getManifest && getManifest().version) || 'electron-version';
let passedApolloConnected = false;


const js = `
let isConnected = false;

const hookLogger = (logItem) => {
  if (typeof logItem.action.type !== 'string' || logItem.action.type.split('_')[0] !== 'APOLLO') {
    return;
  }

  console.log(logItem);
  /*
  if (!!window.__APOLLO_CLIENT__) {
    var testDate = new Date();
    logItem.state.queries[2].variables.date = testDate;
    logItem.state.queries[2].variables.testFunc = function() {
      console.log('queries');
    }

    //if (logItem.state.mutations.s {
    if (Object.keys(logItem.state.mutations)) {
      console.log('in mutations if');
      /*
      logItem.state.mutations[1].variables.mutDate = testDate;
      logItem.state.mutations[1].variables.testFunc = function() {
        console.log('mutations');
      }
      */
    }

    console.log('queries: ', logItem.state.queries, 'queryObjectType', typeof logItem.state.queries);
    //const queryVars = logItem.state.queries[2].variables;
    const queries = logItem.state.queries;
    const mutations = logItem.state.mutations;
    for (var query in queries) {
      const queryVars = logItem.state.queries[query].variables;
      for (var field in queryVars) {
      // stringify date objects
        if (Object.prototype.toString.call(queryVars[field]) == '[object Date]') {
          queryVars[field] = queryVars[field].toString();
        }
      
      // wrap functions in eval and stringify
        else if (typeof queryVars[field] == 'function') {
          queryVars[field] = 'eval(' + queryVars[field] + ');';
        }
      }
    }

    for (var mut in mutations) {
      const mutationVars = logItem.state.queries[mut].variables;
      for (var field in mutationVars) {
        if (Object.prototype.toString.call(mutationVars[field]) == '[object Date]') {
          mutationVars[field] = mutationVars[field].toString();
        }
      
      // wrap functions in eval and stringify
        else if (typeof mutationVars[field] == 'function') {
          mutationVars[field] = 'eval(' + mutationVars[field] + ');';
        }
      }
    }
    */

    const trimmedObj = {
      queries: logItem.state.queries,
      mutations: logItem.state.mutations
    }

    console.log('trimmedObj ', trimmedObj);
    window.postMessage({ trimmedObj }, '*');
    window.__action_log__.push(logItem);    
  }
}

window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ = { version: "${version}" };

let __APOLLO_POLL_COUNT__ = 0;
const __APOLLO_POLL__ = setInterval(() => {
  if (!!window.__APOLLO_CLIENT__) {
    if (!window.__action_log__) {
      window.__action_log__ = [];
    }
    window.postMessage({ APOLLO_CONNECTED: true}, '*');
    isConnected = true;
    window.__APOLLO_CLIENT__.__actionHookForDevTools(hookLogger);
    clearInterval(__APOLLO_POLL__);
  } else {
    __APOLLO_POLL_COUNT__ += 1;
  }
  if (__APOLLO_POLL_COUNT__ > 20) clearInterval(__APOLLO_POLL__);
}, 500);
`;

let script = document.createElement('script');
script.textContent = js;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

// event.data has the data being passed in the message
window.addEventListener('message', event => {
  if (event.source != window) 
    return;

  if (event.data.APOLLO_CONNECTED) {
    if (!passedApolloConnected) {
      chrome.runtime.sendMessage({ APOLLO_CONNECTED: true}, function() {
        passedApolloConnected = true;
      });
    }
  }

  if (!!event.data.trimmedObj) {
    chrome.runtime.sendMessage({ trimmedObj: event.data.trimmedObj });
  }
  return;
});
