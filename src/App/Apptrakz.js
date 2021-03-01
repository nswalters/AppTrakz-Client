import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from '../components/Auth';

import './App.css';

export const Apptrakz = () => (
  <>
    <Route render={() => {
      if (localStorage.getItem('apptrakz_token')) {
        return <> </>;
      }

      return <Redirect to="/login" />;
    }} />

    <Route path="/login" render={Auth} />
  </>
);
