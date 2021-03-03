import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Apptrakz } from './App/Apptrakz';

import './assets/main.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Apptrakz />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
