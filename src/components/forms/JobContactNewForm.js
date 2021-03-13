/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { JobContext } from '../job/JobProvider';
import { JobContactContext } from '../job_contact/JobContactProvider';

export const JobContactNewForm = (props) => {
  const { setShowContactPanel } = props;
  const { createJobContact, getJobContacts } = useContext(JobContactContext);
  const { getJobs, jobList } = useContext(JobContext);

  const [editingContact, setEditingContact] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    job: '',
  });

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleControlledInputChange = (event) => {
    const newContactDetail = { ...editingContact };
    newContactDetail[event.target.name] = event.target.value;
    setEditingContact(newContactDetail);
  };

  const submitNewJobContact = (e) => {
    e.preventDefault();
    const newContactDetails = editingContact;
    newContactDetails.job = parseInt(editingContact.job, 10);
    createJobContact(newContactDetails)
      .then(() => setShowContactPanel(false))
      .then(getJobContacts);
  };

  return (
    <form className="space-y-8 divide-y divide-gray-200 border-t border-gray-200 shadow-inner">
      <div className="m-8 sm:space-y-5 border border-gray-200 pb-4">
        <div className="text-center text-lg font-semibold text-gray-500 pt-4">
          Create New Job Contact
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 pr-4">
          <label htmlFor="job" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:text-right">
            Job
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select onChange={handleControlledInputChange} id="job" name="job" className="max-w-lg sm:max-w-xs mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={editingContact.job || ''} required>
              <option value="" disabled>Select a Job...</option>
              {jobList.map((job) => (
                <option key={job.id} value={job.id}>{job.company.name} - {job.role_title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 pr-4">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:text-right">
            First name
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input onChange={handleControlledInputChange} type="text" name="first_name" id="first_name" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" value={editingContact && editingContact.first_name} required />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 pr-4">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:text-right">
            Last name
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input onChange={handleControlledInputChange} type="text" name="last_name" id="last_name" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" value={editingContact && editingContact.last_name} required />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 pr-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:text-right">
            Phone
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input onChange={handleControlledInputChange} type="text" name="phone" id="phone" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" value={editingContact && editingContact.phone} required />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 pr-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:text-right">
            Email
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input onChange={handleControlledInputChange} type="email" name="email" id="email" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" value={editingContact && editingContact.email} required />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="px-4 py-3 text-right sm:px-6">
            <button onClick={() => setShowContactPanel(false)} type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
          </div>
          <div className="px-4 py-3 text-right sm:px-6">
            <button onClick={(e) => submitNewJobContact(e)} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
