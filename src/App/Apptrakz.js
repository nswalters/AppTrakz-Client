import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { NavBar } from '../components/nav/NavBar';
import { Register } from '../components/auth/Register';

import './App.css';

export const Apptrakz = () => (
  <>
    <Route render={() => {
      if (localStorage.getItem('apptrakz_token')) {
        return <>
          <Route component={NavBar} />
        </>;
      }

      return <Redirect to="/login" />;
    }} />

    <Route path="/register">
      <Register />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
  </>
);
