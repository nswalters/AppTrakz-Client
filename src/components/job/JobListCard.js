/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';

export const JobListCard = (props) => {
  const { job } = props;

  return (
    <>
      <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow mx-16 sm:mx-4 md:mx-0">
        <div className="p-2 ml-auto flex">
          <button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">Open options</span>
            {/* <!-- Heroicon name: solid/dots-vertical --> */}
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 3 0 010 4z" />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col p-4">
          <a href={job.url} className="text-gray-900 text-xl font-medium hover:underline">{job.role_title}</a>
          <p className="my-4 text-gray-700 text-md font-medium underline">
            <Link to={job.company.url}>{job.company.name}</Link>
          </p>
          <dl className="mt-2 flex-grow flex flex-col justify-end">
            <dd className="mb-6">
              {job.application ? (
                <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{job.application && job.application.current_status.status.name}</span>
              ) : (
                <div className="flex-shrink-0">
                  <button onClick={() => { props.createApplication({ job: job.id }).then(props.getJobs()).then(props.getApplications()); }} className="relative inline-flex items-center px-4 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span>Apply</span>
                  </button>
                </div>
              )}
            </dd>
            <dt className="sr-only">Type, Salary</dt>
            <dd className="text-gray-500 text-md">
              <strong>Type: </strong>
              {job.type}
            </dd>
            <dd className="text-gray-500 text-md">
              <strong>Salary: </strong>
              {job.salary ? job.salary : '-'}
            </dd>
            <dt className="sr-only">Job Post Link</dt>
            <dd className="mt-2">
              <a href={`${job.post_link}`} className="text-gray-900 font-medium hover:text-gray-600 underline">Job Posting</a>
            </dd>
          </dl>
        </div>
      </li>
    </>
  );
};
