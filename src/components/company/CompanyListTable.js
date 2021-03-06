/* eslint-disable max-len */
import React from 'react';

export const CompanyListTable = (props) => {
  const { companyList } = props;

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Address
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            City, State, Zip
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Website
          </th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {companyList.map((company, idx) => (
          // Alternate background colors of table rows
          <tr className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <td className="px-4 py-4 whitespace-wrap text-sm font-medium text-gray-900">
              {companyList && company.name}
            </td>
            <td className="px-4 py-4 whitespace-wrap text-sm text-gray-500">
              {company.address1} {company.address2}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {company.city}, {company.state} {company.zipcode}
            </td>
            <td className="px-4 py-4 whitespace-wrap text-sm text-gray-500 hover:underline">
              <a href={company.website}>{company.website}</a>
            </td>
            <td class="pr-4 py-4 whitespace-wrap text-sm font-medium">
              <a href="/" class="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
