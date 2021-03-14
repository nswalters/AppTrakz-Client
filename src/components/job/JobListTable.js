/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmActionModal } from '../alerts/ConfirmActionModal';

export const JobListTable = (props) => {
  const { jobList, deleteJob, getJobs } = props;

  const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);
  const [target, setTarget] = useState(null);

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Role
          </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
          </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Salary
          </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Post Link
          </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
          </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Application Status
          </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {jobList.map((job, idx) => (
            // Alternate background colors of table rows
            <tr key={job.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="px-4 py-4 whitespace-wrap text-sm font-medium text-gray-900 underline">
                <Link to={jobList && job.url}>{jobList && job.role_title}</Link>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {job.type}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {job.salary ? job.salary : '-'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 underline text-center">
                <a href={job.post_link}>Link</a>
              </td>
              <td className="px-4 py-4 whitespace-wrap text-sm text-gray-500 text-center underline">
                <Link to={job.company.url}>{job.company.name}</Link>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {job.application ? (
                  <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{job.application.current_status.status.name}</span>
                ) : (
                  <div className="flex-shrink-0">
                    <button onClick={() => { props.createApplication({ job: job.id }).then(props.getJobs()).then(props.getApplications()); }} className="relative inline-flex items-center px-4 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span>Apply</span>
                    </button>
                  </div>
                )}
              </td>
              <td className="pr-4 py-4 whitespace-wrap text-sm font-medium">
                <Link to={`${job.url}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
              </td>
              <td className="pr-4 py-4 whitespace-wrap text-sm font-medium">
                <button onClick={() => { setTarget(job.id); setShowConfirmActionModal(true); }} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmActionModal
        show={showConfirmActionModal}
        toggleShow={setShowConfirmActionModal}
        actionFunction={() => { deleteJob(target).then(() => getJobs()); }}
        actionName="delete"
      />
    </>
  );
};
