import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { NavBar } from '../components/nav/NavBar';
import { Register } from '../components/auth/Register';
import { ApplicationViews } from '../components/ApplicationViews';
import { ProfileProvider } from '../components/profile/ProfileProvider';

import './App.css';

export const Apptrakz = () => (
  <>
    <Route render={() => {
      if (localStorage.getItem('apptrakz_token')) {
        return <>
          <ProfileProvider>
            <Route component={NavBar} />
            <Route render={(props) => <ApplicationViews {...props} /> } />
          </ProfileProvider>
        </>;
      }

      return <Redirect to="/login" />;
    }} />

    <Route path="/register" render={(props) => <Register {...props} />} />
    <Route path="/login" render={(props) => <Login {...props} />} />
  </>
);
