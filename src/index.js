import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import gameReducer from './reducers';
import promiseMiddleware from 'redux-promise';

let middleware;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middleware = compose(applyMiddleware(promiseMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
  middleware = applyMiddleware(promiseMiddleware);
}

let store = createStore(
  gameReducer,
  middleware
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
