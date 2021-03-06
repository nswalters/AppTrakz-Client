import React from 'react';
import { Route } from 'react-router-dom';
import { Profile } from './profile/Profile';
import { ApplicationListView } from './application/ApplicationListView';
import { ApplicationProvider } from './application/ApplicationProvider';
import { CompanyListView } from './company/CompanyListView';
import { CompanyProvider } from './company/CompanyProvider';
import { JobDetails } from './job/JobDetails';
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
      <ApplicationProvider>
        <Route exact path="/jobs/:jobId(\d+)" render={
          (props) => <JobDetails {...props} />
        } />
      </ApplicationProvider>
    </JobProvider>

    <ApplicationProvider>
      <Route exact path="/applications">
        <ApplicationListView />
      </Route>
    </ApplicationProvider>

  </>
);
