/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { ConfirmActionModal } from '../alerts/ConfirmActionModal';

export const JobListCard = (props) => {
  const { deleteJob, getJobs, job } = props;

  const [showOptions, setShowOptions] = useState(false);
  const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);
  const [target, setTarget] = useState(null);

  return (
    <>
      <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow mx-16 sm:mx-4 md:mx-0">
        <div class="relative inline-block text-left my-auto ml-auto mr-1">
          <div class="mt-4">
            <button onClick={() => setShowOptions((prev) => !prev)} type="button" class="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true">
              <span class="sr-only">Open options</span>
              {/* <!-- Heroicon name: solid/dots-vertical --> */}
              <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>

          <Transition
            show={showOptions}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div class="py-1" role="none">
                <Link to={`${job.url}/edit`} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit</Link>
                <button onClick={() => { setTarget(job.id); setShowConfirmActionModal(true); }} type="button" class="w-full px-4 py-2 text-sm text-left font-bold text-red-700 hover:bg-red-100 focus:outline-none" role="menuitem">Delete</button>
              </div>
            </div>
          </Transition>
        </div>

        <div className="flex-1 flex flex-col p-4">
          <a href={job.url} className="text-gray-900 text-xl font-medium underline">{job.role_title}</a>
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
      <ConfirmActionModal
        show={showConfirmActionModal}
        toggleShow={setShowConfirmActionModal}
        actionFunction={() => { deleteJob(target).then(() => getJobs()); }}
        actionName="delete"
      />
    </>
  );
};
