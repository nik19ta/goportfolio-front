import React from 'react';
import { render } from "react-dom";

import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import App from './App';

import './styles/index.css';

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)