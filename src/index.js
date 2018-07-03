import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './containers/App/App';

import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root'),
  document.addEventListener('dragover', event => event.preventDefault()), // Disable redirect after drag in MOST cases (TODO)
  document.addEventListener('drop', event => event.preventDefault()),
);
