/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';

export const ApplicationListTable = (props) => {
  const { applicationList } = props;

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Job Role
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Submitted Date
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Current Status
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Reason
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Is Active
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {applicationList.map((application, idx) => (
          <tr key={application.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <td className="px-4 py-4 whitepace-nowrap text-sm font-medium text-gray-900 underline">
              <Link to={application.job.url}>{application.job.role_title}</Link>
            </td>
            <td className="px-4 py-4 whitepace-nowrap text-sm font-medium text-gray-500 text-center">
              {(application.submitted_at).split('T')[0]}
            </td>
            <td className="px-4 py-4 whitepace-nowrap text-sm font-medium text-gray-500 text-center">
              <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full whitespace-nowrap">
                {((application.statuses).filter((appStatus) => appStatus.is_current === true))[0].name}
              </span>
            </td>
            <td className="px-4 py-4 text-sm font-medium text-gray-500">
              {((application.statuses).filter((appStatus) => appStatus.is_current === true))[0].reason}
            </td>
            <td className="px-4 py-4 text-sm font-medium text-gray-500">
              {application.is_active ? 'Active' : 'Inactive'}
            </td>
            <td className="pr-4 py-4 whitespace-wrap text-sm font-medium">
              <a href="/" className="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
