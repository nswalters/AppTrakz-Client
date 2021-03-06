import React from 'react';
import { Route } from 'react-router-dom';
import { Profile } from './profile/Profile';
import { CompanyListView } from './company/CompanyListView';
import { CompanyProvider } from './company/CompanyProvider';

export const ApplicationViews = () => (
  <>
    <Route exact path="/user/profile">
      <Profile />
    </Route>

    <CompanyProvider>
      <Route exact path="/companies">
        <CompanyListView />
      </Route>
    </CompanyProvider>
  </>
);
