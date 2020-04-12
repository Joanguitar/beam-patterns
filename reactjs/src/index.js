import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import "./assets/scss/black-dashboard-react.scss";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";
document.body.classList.add("white-content");

const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

ReactDOM.render(
  <React.StrictMode>
    <Router basename={'/beam-patterns'}>
      <Route path={IS_DEV ? '/' : '${process.env.PUBLIC_URL}/'} component={App} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//serviceWorker.unregister();
serviceWorker.register();
