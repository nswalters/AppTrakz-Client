/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';

export const JobListTable = (props) => {
  const { jobList } = props;

  return (
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
        </tr>
      </thead>
      <tbody>
        {jobList.map((job, idx) => (
          // Alternate background colors of table rows
          <tr key={job.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <td className="px-4 py-4 whitespace-wrap text-sm font-medium text-gray-900">
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
              <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{job.application.current_status.status.name}</span>
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
