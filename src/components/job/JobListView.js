/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../application/ApplicationProvider';
import { JobContext } from './JobProvider';
import { JobListTable } from './JobListTable';
import { JobListCard } from './JobListCard';

export const JobListView = (props) => {
  const { jobList, getJobs, deleteJob } = useContext(JobContext);
  const { createApplication, getApplications } = useContext(ApplicationContext);

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-(screen-16) bg-gray-100">
      {/* Table is shown on larger screens */}
      <div className="hidden container mx-auto lg:block">
        <div className="flex justify-center">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block max-w-screen-lg sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-16">
                {jobList && <JobListTable
                  createApplication={createApplication}
                  getApplications={getApplications}
                  getJobs={getJobs}
                  jobList={jobList}
                  deleteJob={deleteJob}
                />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cards are shown on smaller screens (tablets or smaller) */}
      <div className="block container mx-auto lg:hidden">
        <div className="flex justify-center">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16">
            {jobList && jobList.map((job) => <JobListCard
              key={job.id}
              createApplication={createApplication}
              getApplications={getApplications}
              getJobs={getJobs}
              job={job}
              deleteJob={deleteJob}
            />)}
          </ul>
        </div>
      </div>
    </div>
  );
};
