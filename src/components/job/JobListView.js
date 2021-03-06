/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { JobContext } from './JobProvider';
import { JobListTable } from './JobListTable';
import { JobListCard } from './JobListCard';

export const JobListView = (props) => {
  const { jobList, getJobs } = useContext(JobContext);

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Table is shown on larger screens */}
      <div className="hidden container mx-auto mt-16 lg:block">
        <div className="flex justify-center">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block max-w-screen-lg sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {jobList && <JobListTable jobList={jobList} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cards are shown on smaller screens (tablets or smaller) */}
      <div className="block container mx-auto mt-16 lg:hidden">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {jobList && jobList.map((job) => <JobListCard key={job.id} job={job} />)}
        </ul>
      </div>
    </>
  );
};
