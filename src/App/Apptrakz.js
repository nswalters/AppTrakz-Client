import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from '../components/Auth';
import { Register } from '../components/Register';

import './App.css';

export const Apptrakz = () => (
  <>
    <Route render={() => {
      if (localStorage.getItem('apptrakz_token')) {
        return <> </>;
      }

      return <Redirect to="/login" />;
    }} />

    <Route path="/register" render={Register} />
    <Route path="/login" render={Auth} />
  </>
);
