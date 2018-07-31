import {loadRequests, loadSettings} from '../actions';

export const persistenceMiddleware = store => next => action => {
  const oldState = store.getState();
  const result = next(action);
  const newState = store.getState();

  if (oldState.storage.requests !== newState.storage.requests)
    window.localStorage.setItem('requests', JSON.stringify(newState.storage.requests));

  if (oldState.settings !== newState.settings)
    window.localStorage.setItem('settings', JSON.stringify(newState.settings));

  return result;
};

export function persistenceRestore(store) {
  const requestsJSON = window.localStorage.getItem('requests');
  let requests = {};
  if (requestsJSON)
    requests = JSON.parse(requestsJSON);

  if (requests)
    store.dispatch(loadRequests(requests));

  const settingsJSON = window.localStorage.getItem('settings');
  let settings = {};
  if (settingsJSON)
    settings = JSON.parse(settingsJSON);

  if (settings)
    store.dispatch(loadSettings(settings));
}
