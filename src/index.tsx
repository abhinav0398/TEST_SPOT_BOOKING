import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';
import { Provider } from 'react-redux';
import reportWebVitals from 'utils/reportWebVitals';
import * as Sentry from '@sentry/react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import 'index.css';
import store from 'store';

// initialize the Sentry React SDK as soon as possible
Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event) => {
        const sw = event?.target as ServiceWorker;
        if (sw?.state === 'activated') {
          window.location.reload();
        }
      });
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
