/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { CompanyContext } from './CompanyProvider';

export const CompanyListView = (props) => {
  const { companyList, getCompanies } = useContext(CompanyContext);

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (companyList.length > 0) {
    return (
      <>
        {/* Table is only visible on larger screens */}
        <div className="hidden container mx-auto mt-16 lg:block">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                      </tr>
                    </thead>
                    <tbody>
                      {/* <!-- Odd row --> */}
                      <tr className="bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {companyList && companyList[0].name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {companyList[0].address1} {companyList[0].address2}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {companyList[0].city}, {companyList[0].state} {companyList[0].zipcode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {companyList[0].website}
                        </td>
                      </tr>

                      {/* <!-- Even row --> */}
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {companyList[1].name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {companyList[1].address1} {companyList[1].address2}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {companyList[1].city}, {companyList[1].state} {companyList[1].zipcode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {companyList[1].website}
                        </td>
                      </tr>

                      {/* <!-- Odd row --> */}
                      <tr className="bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {companyList[2].name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {companyList[2].address1} {companyList[2].address2}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {companyList[2].city}, {companyList[2].state} {companyList[2].zipcode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {companyList[2].website}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block container mx-auto mt-16 lg:hidden">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
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
                <a href="/" className="mt-1 text-gray-900 text-xl font-medium hover:underline">{companyList[0].name}</a>
                <dl className="mt-4 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Address</dt>
                  <dd className="text-gray-500 text-md">{companyList[0].address1} {companyList[0].address2}</dd>
                  <dt className="sr-only">City, State Zipcode</dt>
                  <dd className="text-gray-500 text-md">{companyList[0].city}, {companyList[0].state} {companyList[0].zipcode}</dd>
                  <dd className="mb-8">
                    <a href={`${companyList[0].website}`} class="text-gray-900 font-medium hover:text-gray-600 underline">Website</a>
                  </dd>
                </dl>
              </div>
            </li>

            <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
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
                <a href="/" className="mt-1 text-gray-900 text-xl font-medium hover:underline">{companyList[1].name}</a>
                <dl className="mt-4 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Address</dt>
                  <dd className="text-gray-500 text-md">{companyList[1].address1} {companyList[1].address2}</dd>
                  <dt className="sr-only">City, State Zipcode</dt>
                  <dd className="text-gray-500 text-md">{companyList[1].city}, {companyList[1].state} {companyList[1].zipcode}</dd>
                  <dd className="mb-8">
                    <a href={companyList[1].website} class="text-gray-900 font-medium hover:text-gray-600 underline">Website</a>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  }
  return (
    <>
    </>
  );
};
