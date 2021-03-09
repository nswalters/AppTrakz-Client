/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';

export const CompanyListCard = (props) => {
  const { company } = props;

  return (
    <>
      <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow mx-16 sm:mx-4 md:mx-0">
        <div className="p-2 ml-auto flex">
          <button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">Open options</span>
            {/* <!-- Heroicon name: solid/dots-vertical --> */}
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
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
    </>
  );
};
