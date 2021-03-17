/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../application/ApplicationProvider';
import { CompanyContext } from '../company/CompanyProvider';
import { JobContext } from '../job/JobProvider';

export const Dashboard = (props) => {
  const { applicationList, getApplications } = useContext(ApplicationContext);
  const { companyList, getCompanies } = useContext(CompanyContext);
  const { getJobs, jobList } = useContext(JobContext);

  const [totalJobs, setTotalJobs] = useState('-');
  const [totalCompanies, setTotalCompanies] = useState('-');
  const [activeApplications, setActiveApplications] = useState('-');
  const [submissionsPast30Days, setSubmissionsPast30Days] = useState('-');

  useEffect(() => {
    getApplications();
    getCompanies();
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /* Updated everytime 'jobList' state value is updated */
    const jobsAppliedFor = jobList.filter((job) => job.application);

    // setTotalJobs(jobList.length);
    setTotalJobs(jobsAppliedFor.length);
  }, [jobList]);

  useEffect(() => {
    /* Updated everytime 'companylist' state value is updated */

    // Get array of all companies that have an application
    const companiesAppliedTo = jobList.filter((job) => job.application).map((job) => job.company);

    // Get unique companies that have an application
    const companies = {};
    const uniqueCompanies = companiesAppliedTo.filter((entry) => {
      if (companies[entry.id]) {
        return false;
      }
      companies[entry.id] = true;
      return true;
    });

    setTotalCompanies(uniqueCompanies.length);
  }, [companyList, jobList]);

  useEffect(() => {
    /* Updated everytime 'applicationList' state value is updated */

    // Iterate over our application list and count how many are active
    setActiveApplications(applicationList.filter((app) => (app.is_active === true)).length);

    // We get the current time, and calculate 30 days ago
    const currentTime = new Date();
    const thirtyDaysAgo = currentTime.setMonth(currentTime.getMonth() - 1);

    // We then get all of the statuses which have a name of 'Applied'
    // and we push the unix-formatted times into an array.
    const appliedTimes = [];

    applicationList.filter((app) => (
      appliedTimes.push(new Date(app.submitted_at).valueOf())
    ));

    // Finally, we iterate over that array and find any timestamps which
    // are greater than 30 days ago (i.e. within the last 30 days)
    // and count them and update the proper state value.
    setSubmissionsPast30Days(appliedTimes.filter((appTime) => appTime >= thirtyDaysAgo).length);
  }, [applicationList]);

  return (
    <div className="container mx-auto mt-16">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Overview
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              {/* <!-- Heroicon name: outline/users --> */}
              {/* Heroicon name: briefcase */}
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">Total Jobs Applied For</p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">
              {totalJobs}
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link to="/jobs" className="font-medium text-indigo-600 hover:text-indigo-500"> View all<span className="sr-only">Total Jobs Applied For</span></Link>
              </div>
            </div>
          </dd>
        </div>

        <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              {/* Heroicon name: office-building */}
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">Total Companies Applied To</p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">
              {totalCompanies}
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link to="/companies" className="font-medium text-indigo-600 hover:text-indigo-500"> View all<span className="sr-only">Total Companies Applied To</span></Link>
              </div>
            </div>
          </dd>
        </div>

        <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              {/* Heroicon: document-text */}
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">Active Applications</p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">
              {activeApplications}
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link to="/applications" className="font-medium text-indigo-600 hover:text-indigo-500"> View all<span className="sr-only"> Active Applications</span></Link>
              </div>
            </div>
          </dd>
        </div>

        <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              {/* Heroicon: mail-open */}
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate whitespace-pre-wrap">Submissions - Past 30 Days</p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">
              {submissionsPast30Days}
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link to="/applications" className="font-medium text-indigo-600 hover:text-indigo-500">View all<span className="sr-only"> Submissions past 30 days</span></Link>
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
};
