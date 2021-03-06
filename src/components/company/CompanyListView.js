/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { CompanyContext } from './CompanyProvider';
import { CompanyListTable } from './CompanyListTable';
import { CompanyListCard } from './CompanyListCard';

export const CompanyListView = (props) => {
  const { companyList, getCompanies } = useContext(CompanyContext);

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (companyList.length > 0) {
    return (
      <>
        {/* Table is shown on larger screens */}
        <div className="hidden container mx-auto mt-16 lg:block">
          <div className="flex justify-center">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block max-w-screen-lg sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {companyList && <CompanyListTable companyList={companyList} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Cards are shown on smaller screens (tablets or smaller) */}
        <div className="block container mx-auto mt-16 lg:hidden">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {companyList && companyList.map((company) => <CompanyListCard company={company} />)}
          </ul>
        </div>
      </>
    );
  }
  // Don't render anything unless we have at least 1 Company in our list
  return (
    <>
    </>
  );
};
