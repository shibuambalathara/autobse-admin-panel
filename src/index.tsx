import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


import { BrowserRouter as Router } from 'react-router-dom';
import store, { persistor } from './store/store';
import ApolloProviderWrapper from './utils/appoloProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProviderWrapper>
          <Router>
            <App />
          </Router>
        </ApolloProviderWrapper>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
