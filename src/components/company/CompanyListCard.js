/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { ConfirmActionModal } from '../alerts/ConfirmActionModal';

export const CompanyListCard = (props) => {
  const { company, deleteCompany, getCompanies } = props;

  const [showOptions, setShowOptions] = useState(false);
  const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);
  const [target, setTarget] = useState(null);

  return (
    <>
      <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow mx-16 sm:mx-4 md:mx-0">
        <div className="relative inline-block text-left my-auto ml-auto mr-1">
          <div className="mt-4">
            <button onClick={() => setShowOptions((prev) => !prev)} type="button" className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true">
              <span className="sr-only">Open options</span>
              {/* <!-- Heroicon name: solid/dots-vertical --> */}
              <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className="py-1" role="none">
                <Link to={`${company.url}/edit`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit</Link>
                <button onClick={() => { setTarget(company.id); setShowConfirmActionModal(true); }} type="button" className="w-full px-4 py-2 text-sm font-bold text-red-700 text-left hover:bg-red-100 focus:outline-none" role="menuitem">Delete</button>
              </div>
            </div>
          </Transition>
        </div>
        <div className="flex-1 flex flex-col p-4">
          <Link to={company.url} className="mt-1 text-gray-900 text-xl font-medium hover:underline">{company.name}</Link>
          <dl className="mt-4 flex-grow flex flex-col justify-between">
            <dt className="sr-only">Address</dt>
            <dd className="text-gray-500 text-md">{company.address1} {company.address2}</dd>
            <dt className="sr-only">City, State Zipcode</dt>
            <dd className="text-gray-500 text-md">{company.city}, {company.state} {company.zipcode}</dd>
            <dd className="mb-8">
              <a href={`${company.website}`} className="text-gray-900 font-medium hover:text-gray-600 underline">Website</a>
            </dd>
          </dl>
        </div>
      </li>
      <ConfirmActionModal
        show={showConfirmActionModal}
        toggleShow={setShowConfirmActionModal}
        actionFunction={() => { deleteCompany(target).then(() => getCompanies()); }}
        actionName="delete"
      />
    </>
  );
};
