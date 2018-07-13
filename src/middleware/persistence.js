import {loadRequests, setPreferredMailClient} from '../actions';

export const persistenceMiddleware = store => next => action => {
  const oldState = store.getState();
  const result = next(action);
  const newState = store.getState();

  if (oldState.storage.requests !== newState.storage.requests)
    window.localStorage.setItem('requests', JSON.stringify(newState.storage.requests));


  if (oldState.mail.preferredMailClient !== newState.mail.preferredMailClient)
    window.localStorage.setItem('preferredMailClient', newState.mail.preferredMailClient);

  return result;
};

export function persistenceRestore(store) {
  const requestsJSON = window.localStorage.getItem('requests');
  let requests = {};
  if (requestsJSON)
    requests = JSON.parse(requestsJSON);

  if (requests)
    store.dispatch(loadRequests(requests));


  const preferredMailClient = window.localStorage.getItem('preferredMailClient');
  if (preferredMailClient)
    store.dispatch(setPreferredMailClient(preferredMailClient));

}
