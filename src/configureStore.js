import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistenceMiddleware, persistenceRestore } from './middleware/persistence'
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      persistenceMiddleware,
    )
  );

  const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;

  ipcRenderer.on('response', (event, arg) => {
    store.dispatch(JSON.parse(arg));
  });

  persistenceRestore(store);

  return store;
}
