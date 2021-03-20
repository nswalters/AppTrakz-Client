/* eslint-disable max-len */
import React from 'react';

export const JobContactListCard = (props) => {
  const {
    jobContact,
    setSelectedContact,
    setShowContactPanel,
    notes,
  } = props;

  return (
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      <div onClick={() => { setSelectedContact(jobContact); setShowContactPanel(true); }} className="w-full flex items-center justify-center p-6 space-x-6 hover:bg-gray-50 cursor-pointer">
        <div className="truncate">
          <div className="flex items-center space-x-3 justify-center">
            <h3 className="text-gray-900 text-sm font-medium truncate">{jobContact.contact && jobContact.contact.first_name} {jobContact.contact.last_name}</h3>
          </div>
          <span className="flex-shrink-0 inline-block my-2 px-6 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full text-center">{jobContact.job.company.name}<br />{jobContact.job.role_title}</span>
          <div className="w-full text-center text-xs text-gray-400">
            Notes: {notes.length}
          </div>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex">
            <a href={`mailto:${jobContact.contact.email}`} className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 hover:bg-gray-50">
              {/* <!-- Heroicon name: solid/mail --> */}
              <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="ml-3">Email</span>
            </a>
          </div>
          <div className="-ml-px w-0 flex-1 flex">
            <a href={`tel:${jobContact.contact.phone}`} className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 hover:bg-gray-50">
              {/* <!-- Heroicon name: solid/phone --> */}
              <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="ml-3">Call</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};
