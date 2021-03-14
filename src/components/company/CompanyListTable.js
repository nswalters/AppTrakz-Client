/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmActionModal } from '../alerts/ConfirmActionModal';

export const CompanyListTable = (props) => {
  const { companyList, deleteCompany, getCompanies } = props;

  const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);
  const [target, setTarget] = useState(null);

  return (
    <>
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
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {companyList.map((company, idx) => (
            // Alternate background colors of table rows
            <tr key={company.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="px-4 py-4 whitespace-wrap text-sm font-medium text-gray-900 underline">
                <Link to={companyList && company.url}>{companyList && company.name}</Link>
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
              <td className="pr-4 py-4 whitespace-wrap text-sm font-medium">
                <Link to={`${company.url}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
              </td>
              <td className="pr-4 py-4 whitespace-wrap text-sm font-medium">
                <button onClick={() => { setTarget(company.id); setShowConfirmActionModal(true); }} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmActionModal
        show={showConfirmActionModal}
        toggleShow={setShowConfirmActionModal}
        actionFunction={() => { deleteCompany(target).then(() => getCompanies()); }}
        actionName="delete"
      />
    </>
  );
};
