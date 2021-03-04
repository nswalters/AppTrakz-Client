import React from 'react';
import { Route } from 'react-router-dom';
import { Profile } from './profile/Profile';

export const ApplicationViews = () => (
    <>
      <Route exact path="/user/profile">
          <Profile />
      </Route>
    </>
);
