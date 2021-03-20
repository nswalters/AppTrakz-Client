/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { ContactNoteContext } from '../contact_note/ContactNoteProvider';
import { JobContactContext } from './JobContactProvider';
import { JobContactListCard } from './JobContactListCard';
import { JobContactDetail } from './JobContactDetail';
import { JobContactNew } from './JobContactNew';

export const JobContactList = (props) => {
  const { getJobContacts, jobContactList } = useContext(JobContactContext);
  const {
    getContactNotes,
    contactNoteList,
  } = useContext(ContactNoteContext);

  const [showContactPanel, setShowContactPanel] = useState(false);
  const [showNewContactPanel, setShowNewContactPanel] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});

  useEffect(() => {
    getJobContacts();
    getContactNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16 mx-16">
        {/* Put add new contact button at the beginning of the list so it's always easily visible and accessible regardless of the number of contacts someone might have */}
        <li onClick={() => setShowNewContactPanel(true)} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
          <button className="h-full w-full flex items-center justify-center p-6 space-x-6 hover:bg-gray-50 cursor-pointer focus:outline-none">
            <div className="truncate">
              <div className="flex items-center justify-center text-gray-900">
                {/* <!-- Heroicon name: plus --> */}
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <h3 className="text-gray-900 text-sm font-medium truncate">Add New Contact</h3>
              </div>
            </div>
          </button>
        </li>
        {/* Put the rest of the contacts behind this one */}
        {jobContactList.map((jobContact) => (
          <JobContactListCard
            key={jobContact.id}
            jobContact={jobContact}
            setShowContactPanel={setShowContactPanel}
            setSelectedContact={setSelectedContact}
            notes={contactNoteList.filter((note) => note.contact.id === jobContact.id)}
          />
        ))}
      </ul>
      <JobContactDetail
        showContactPanel={showContactPanel}
        setShowContactPanel={setShowContactPanel}
        selectedContact={selectedContact}
      />
      <JobContactNew
        showNewContactPanel={showNewContactPanel}
        setShowNewContactPanel={setShowNewContactPanel}
      />
    </>
  );
};
