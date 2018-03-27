import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );

  const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;

  ipcRenderer.on('response', (event, arg) => {
    console.log('Response: ', arg);
    store.dispatch(JSON.parse(arg));
  });

  return store;
}
