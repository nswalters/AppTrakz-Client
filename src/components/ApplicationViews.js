import React from 'react';
import { Route } from 'react-router-dom';
import { Profile } from './profile/Profile';
import { ApplicationListView } from './application/ApplicationListView';
import { ApplicationProvider } from './application/ApplicationProvider';
import { CompanyListView } from './company/CompanyListView';
import { CompanyProvider } from './company/CompanyProvider';
import { JobListView } from './job/JobListView';
import { JobProvider } from './job/JobProvider';

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

    <JobProvider>
      <Route exact path="/jobs">
        <JobListView />
      </Route>
    </JobProvider>

    <ApplicationProvider>
      <Route exact path="/applications">
        <ApplicationListView />
      </Route>
    </ApplicationProvider>

  </>
);
