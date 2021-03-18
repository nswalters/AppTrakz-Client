/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from './ApplicationProvider';
import { StatusContext } from '../status/StatusProvider';

export const ApplicationListTable = (props) => {
  const { applicationList, getApplications, updateApplication } = useContext(ApplicationContext);
  const { statusList, getStatuses } = useContext(StatusContext);

  const [editingApplication, setEditingApplication] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newStatusDetails, setNewStatusDetails] = useState({
    is_active: '',
    status: '',
    reason: '',
  });

  useEffect(() => {
    getApplications();
    getStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setNewStatusDetails({
      is_active: editingApplication.is_active,
      status: editingApplication.statuses && statusList.find((sl) => sl.name === editingApplication.statuses[0].name).id,
      reason: editingApplication.statuses && editingApplication.statuses[0].reason,
    });
  }, [editingApplication, statusList]);

  const handleControlledInputChange = (event) => {
    const updatedDetails = { ...newStatusDetails };
    updatedDetails[event.target.name] = event.target.value;
    setNewStatusDetails(updatedDetails);
  };

  const submitApplicationUpdate = (e) => {
    e.preventDefault();
    const newDetails = newStatusDetails;
    newDetails.status = parseInt(newStatusDetails.status, 10);
    if (newStatusDetails.is_active === '0' || newStatusDetails.is_active === '1') {
      newDetails.is_active = parseInt(newStatusDetails.is_active, 10);
    }
    updateApplication(editingApplication.id, newDetails)
      .then(() => getApplications());
  };

  if (applicationList.length > 0) {
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Role
          </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submitted Date
          </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Status
          </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reason
          </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Is Active
          </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {applicationList.map((application, idx) => (
            <React.Fragment key={application.id}>
              {/*
              If this is an application we're editing, we need to make the
              proper fields as input fields for updating.
            */}
              {isEditing && editingApplication.id === application.id ? (
                <tr className={`${idx % 1 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-4 py-4 whitepace-nowrap text-sm font-medium text-gray-900 underline">
                    <Link to={application.job.url}>{application.job.role_title}</Link>
                  </td>
                  <td className="px-4 py-4 whitepace-nowrap text-sm font-medium text-gray-500 text-center">
                    {(application.submitted_at).split('T')[0]}
                  </td>
                  <td className="px-4 py-4 whitepace-nowrap text-sm font-medium text-gray-500 text-center">
                    <select onChange={handleControlledInputChange} id="status" name="status" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={newStatusDetails.status > 1 ? newStatusDetails.status : ''} required>
                      <option value="" disabled>Select an Option...</option>
                      {statusList.map((status) => {
                        if (status.name !== 'Applied') {
                          return (<option key={status.id} value={status.id}>{status.name}</option>);
                        }
                        return '';
                      })}
                    </select>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-500">
                    <textarea onChange={handleControlledInputChange} id="reason" name="reason" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={newStatusDetails.reason || ''} rows="10" />
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-500">
                    <select onChange={handleControlledInputChange} id="is_active" name="is_active" className="mt-1 block w-24 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={(newStatusDetails.is_active === true || newStatusDetails.is_active === '1') ? '1' : '0'} required>
                      <option value="" disabled>Choose...</option>
                      <option value="0">Inactive</option>
                      <option value="1">Active</option>
                    </select>
                  </td>
                  <td className="pr-4 py-4 whitespace-wrap text-sm font-medium">
                    <button onClick={(e) => { setIsEditing((prev) => !prev); submitApplicationUpdate(e); }} type="button" className="font-semibold text-indigo-600 hover:text-indigo-900 focus:outline-none">Save</button>
                    <button onClick={() => { setIsEditing((prev) => !prev); setEditingApplication({}); }} type="button" className="mt-16 font-semibold text-indigo-600 hover:text-indigo-900 focus:outline-none">Cancel</button>
                  </td>
                </tr>
              ) : (
                // Otherwise, we don't create the editing fields
                <tr className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-4 py-4 whitepace-nowrap text-sm font-medium text-gray-900 underline">
                    <Link to={application.job.url}>{application.job.role_title}</Link>
                  </td>
                  <td className="px-4 py-4 whitepace-nowrap text-sm font-medium text-gray-500 text-center">
                    {(application.submitted_at).split('T')[0]}
                  </td>
                  <td className="px-4 py-4 whitepace-nowrap text-sm font-medium text-gray-500 text-center">
                    <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full whitespace-nowrap">
                      {((application.statuses).filter((appStatus) => appStatus.is_current === true))[0].name}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-500">
                    {((application.statuses).filter((appStatus) => appStatus.is_current === true))[0].reason}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-500">
                    {application.is_active ? 'Active' : 'Inactive'}
                  </td>
                  <td className="pr-4 py-4 whitespace-wrap text-sm font-medium">
                    {isEditing ? '' : (
                      <button onClick={() => { setIsEditing((prev) => !prev); setEditingApplication(application); }} type="button" className="font-semibold text-indigo-600 hover:text-indigo-900 focus:outline-none">Edit</button>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table >
    );
  }
  // Render a default view if we have no applications
  return (
    <>
      <div class="bg-white">
        <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span class="block">No Applications Yet.</span>
            <span class="block mt-4">Head over to your jobs and apply now!</span>
          </h2>
          <div class="mt-8 flex justify-center">
            <div class="inline-flex rounded-md shadow">
              <Link to="/jobs" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Go to Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
