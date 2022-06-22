import React from 'react';

import {createRoot} from 'react-dom/client';

import {store} from './app/store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {I18nextProvider} from 'react-i18next';

import App from './App';

import './styles/index.css';
import i18next from './i18n/i18n';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </I18nextProvider>
    </React.StrictMode>);
