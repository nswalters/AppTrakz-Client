import React from 'react';
import { Route } from 'react-router-dom';
import { Profile } from './profile/Profile';
import { ApplicationListView } from './application/ApplicationListView';
import { ApplicationProvider } from './application/ApplicationProvider';
import { CompanyDetails } from './company/CompanyDetails';
import { CompanyListView } from './company/CompanyListView';
import { CompanyProvider } from './company/CompanyProvider';
import { CreateAndEditForm } from './forms/CreateAndEditForm';
import { JobDetails } from './job/JobDetails';
import { JobListView } from './job/JobListView';
import { JobProvider } from './job/JobProvider';
import { StatusProvider } from './status/StatusProvider';

export const ApplicationViews = () => (
  <>
    <Route exact path="/user/profile">
      <Profile />
    </Route>

    <CompanyProvider>
      <Route exact path="/companies">
        <CompanyListView />
      </Route>
      <Route exact path="/companies/:companyId(\d+)" render={
        (props) => <CompanyDetails {...props} />
      } />
    </CompanyProvider>

    <JobProvider>
      <ApplicationProvider>
        <Route exact path="/jobs">
          <JobListView />
        </Route>
        <Route exact path="/jobs/:jobId(\d+)" render={
          (props) => <JobDetails {...props} />
        } />
      </ApplicationProvider>
    </JobProvider>

    <ApplicationProvider>
      <StatusProvider>
        <Route exact path="/applications">
          <ApplicationListView />
        </Route>
      </StatusProvider>
    </ApplicationProvider>

    <CompanyProvider>
      <JobProvider>
        <Route path={['/create', '/companies/:companyId/edit', '/jobs/:jobId/edit']} render={(props) => <CreateAndEditForm {...props} />} />
      </JobProvider>
    </CompanyProvider>

  </>
);
