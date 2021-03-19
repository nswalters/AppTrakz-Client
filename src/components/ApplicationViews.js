import React from 'react';
import { Route } from 'react-router-dom';
import { Profile } from './profile/Profile';
import { ApplicationListView } from './application/ApplicationListView';
import { ApplicationProvider } from './application/ApplicationProvider';
import { CompanyDetails } from './company/CompanyDetails';
import { CompanyListView } from './company/CompanyListView';
import { CompanyNoteProvider } from './company_note/CompanyNoteProvider';
import { CompanyProvider } from './company/CompanyProvider';
import { CreateAndEditForm } from './forms/CreateAndEditForm';
import { Dashboard } from './dashboard/Dashboard';
import { JobContactList } from './job_contact/JobContactList';
import { JobContactProvider } from './job_contact/JobContactProvider';
import { JobDetails } from './job/JobDetails';
import { JobListView } from './job/JobListView';
import { JobNoteProvider } from './job_note/JobNoteProvider';
import { JobProvider } from './job/JobProvider';
import { StatusProvider } from './status/StatusProvider';

export const ApplicationViews = () => (
  <>
    <Route exact path="/user/profile">
      <Profile />
    </Route>

    <CompanyProvider>
      <JobProvider>
        <ApplicationProvider>
          <Route exact path={['/', '/dashboard']}>
            <Dashboard />
          </Route>
        </ApplicationProvider>
      </JobProvider>
    </CompanyProvider>

    <CompanyProvider>
      <Route exact path="/companies">
        <CompanyListView />
      </Route>
      <CompanyNoteProvider>
        <Route exact path="/companies/:companyId(\d+)" render={
          (props) => <CompanyDetails {...props} />
        } />
      </CompanyNoteProvider>
    </CompanyProvider>

    <JobProvider>
      <ApplicationProvider>
        <Route exact path="/jobs">
          <JobListView />
        </Route>
        <JobNoteProvider>
          <Route exact path="/jobs/:jobId(\d+)" render={
            (props) => <JobDetails {...props} />
          } />
        </JobNoteProvider>
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

    <JobProvider>
      <JobContactProvider>
        <Route exact path="/job_contacts">
          <JobContactList />
        </Route>
      </JobContactProvider>
    </JobProvider>
  </>
);
