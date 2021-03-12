/* eslint-disable max-len */
import React from 'react';
import { ApplicationListTable } from './ApplicationListTable';

export const ApplicationListView = (props) => (
  <div className="min-h-(screen-16) bg-gray-100">
    {/* Table is shown on larger screens */}
    {/* < div className="hidden container mx-auto mt-16 lg:block" > */}
    < div className="container mx-auto block" >
      <div className="flex justify-center">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block max-w-screen-lg sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-16">
              <ApplicationListTable />
            </div>
          </div>
        </div>
      </div>
    </div >
  </div>
);
