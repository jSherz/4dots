import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import gameReducer from './reducers';
import promiseMiddleware from 'redux-promise';

const middleware = [applyMiddleware(promiseMiddleware)];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

let store = createStore(
  gameReducer,
  compose(middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
