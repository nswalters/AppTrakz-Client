/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from './ApplicationProvider';
import { ApplicationListTable } from './ApplicationListTable';

export const ApplicationListView = (props) => {
  const { applicationList, getApplications } = useContext(ApplicationContext);

  useEffect(() => {
    getApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Table is shown on larger screens */}
      {/* < div className="hidden container mx-auto mt-16 lg:block" > */}
      < div className="container mx-auto mt-16 block" >
        <div className="flex justify-center">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block max-w-screen-lg sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {applicationList && <ApplicationListTable applicationList={applicationList} />}
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};
