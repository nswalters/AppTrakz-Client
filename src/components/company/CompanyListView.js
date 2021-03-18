/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CompanyContext } from './CompanyProvider';
import { CompanyListTable } from './CompanyListTable';
import { CompanyListCard } from './CompanyListCard';

export const CompanyListView = (props) => {
  const { companyList, getCompanies, deleteCompany } = useContext(CompanyContext);

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (companyList.length > 0) {
    return (
      <div className="min-h-(screen-16) bg-gray-100">
        {/* Table is shown on larger screens */}
        <div className="hidden container mx-auto lg:block">
          <div className="flex justify-center">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block max-w-screen-lg sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-16">
                  {companyList && <CompanyListTable companyList={companyList} deleteCompany={deleteCompany} getCompanies={getCompanies} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Cards are shown on smaller screens (tablets or smaller) */}
        <div className="block container mx-auto lg:hidden">
          <div className="flex justify-center">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16">
              {companyList && companyList.map((company) => <CompanyListCard key={company.id} company={company} deleteCompany={deleteCompany} getCompanies={getCompanies} />)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  // Render a default Call-To-Action if we have no companies
  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block">Create your first company now.</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link to="/create" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Create Company
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
