/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import { JobContactContext } from '../job_contact/JobContactProvider';

export const JobContactDetailForm = (props) => {
  const { selectedContact, setIsEditing, setShowContactPanel } = props;
  const { getJobContacts, updateJobContact } = useContext(JobContactContext);

  const [editingContact, setEditingContact] = useState({
    first_name: selectedContact && selectedContact.contact.first_name,
    last_name: selectedContact && selectedContact.contact.last_name,
    phone: selectedContact && selectedContact.contact.phone,
    email: selectedContact && selectedContact.contact.email,
  });

  const handleControlledInputChange = (event) => {
    const newContactDetail = { ...editingContact };
    newContactDetail[event.target.name] = event.target.value;
    setEditingContact(newContactDetail);
  };

  const submitJobContact = (e) => {
    e.preventDefault();
    updateJobContact(selectedContact.id, editingContact)
      .then(setIsEditing(false))
      .then(() => setShowContactPanel(false))
      .then(getJobContacts);
  };

  return (
    <form className="space-y-8 divide-y divide-gray-200 border-t border-gray-200 shadow-inner">
      <div class="m-8 sm:space-y-5 border border-gray-200 pb-4">
        <div class="text-center text-lg font-semibold text-gray-500 pt-4">
          Edit Contact Details
          <div className="text-sm text-center">
            <small class="w-full text-gray-400"><em>To change companies, delete and re-create.</em></small>
          </div>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 pr-4">
          <label for="first_name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 text-right">
            First name
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input onChange={handleControlledInputChange} type="text" name="first_name" id="first_name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" value={editingContact && editingContact.first_name} required />
          </div>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 pr-4">
          <label for="last_name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 text-right">
            Last name
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input onChange={handleControlledInputChange} type="text" name="last_name" id="last_name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" value={editingContact && editingContact.last_name} required />
          </div>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 pr-4">
          <label for="phone" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 text-right">
            Phone
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input onChange={handleControlledInputChange} type="text" name="phone" id="phone" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" value={editingContact && editingContact.phone} required />
          </div>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 pr-4">
          <label for="email" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 text-right">
            Email
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input onChange={handleControlledInputChange} type="email" name="email" id="email" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" value={editingContact && editingContact.email} required />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="px-4 py-3 text-right sm:px-6">
            <button onClick={() => setIsEditing(false)} type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
          </div>
          <div className="px-4 py-3 text-right sm:px-6">
            <button onClick={(e) => submitJobContact(e)} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
