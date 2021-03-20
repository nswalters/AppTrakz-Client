/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import { Transition } from '@headlessui/react';
import { JobContactContext } from './JobContactProvider';
import { JobContactDetailForm } from '../forms/JobContactDetailForm';
import { ConfirmActionModal } from '../alerts/ConfirmActionModal';
import { ContactNoteList } from '../contact_note/ContactNoteList';

export const JobContactDetail = (props) => {
  const { selectedContact, showContactPanel, setShowContactPanel } = props;

  const { getJobContacts, deleteJobContact } = useContext(JobContactContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);
  const [target, setTarget] = useState(null);

  return (
    <>
      <Transition
        show={showContactPanel}
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="fixed inset-0 overflow-hidden mt-32">
          <div className="absolute inset-0 overflow-hidden">
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 overflow-y-scroll" aria-labelledby="slide-over-heading">
              <div className="w-screen max-w-md">
                <div className="min-h-1/4 flex flex-col bg-white shadow-xl overflow-hidden">
                  <div className="px-4 py-6 sm:px-6 bg-gray-100 shadow">
                    <div className="flex items-start justify-between">
                      <h2 id="slide-over-heading" className="text-lg font-medium text-gray-900">
                        Job Contact
                    </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button onClick={() => { setShowContactPanel(false); setShowNotes(false); setIsEditing(false); }} className="bg-gray-100 rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                          <span className="sr-only">Close panel</span>
                          {/* <!-- Heroicon name: outline/x --> */}
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Main --> */}
                  <div>
                    <div className="pb-1 sm:pb-6">
                      <div>
                        <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                          <div className="sm:flex-1">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">{selectedContact.contact && selectedContact.contact.first_name} {selectedContact.contact && selectedContact.contact.last_name}</h3>
                              </div>
                            </div>
                            <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                              <a href={`mailto:${selectedContact.contact && selectedContact.contact.email}`} className="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1">
                                Email
                              </a>
                              <a href={`tel:${selectedContact.contact && selectedContact.contact.phone}`} className="flex-1 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Call
                              </a>
                              <span className="ml-3 inline-flex sm:ml-0">
                                <div className="relative inline-block text-left">
                                  <button onClick={() => setShowDropdown((prev) => (!prev))} id="options-menu" type="button" className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span className="sr-only">Open options menu</span>
                                    {/* <!-- Heroicon name: solid/dots-vertical --> */}
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                  </button>
                                  <Transition
                                    show={showDropdown}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <p onClick={() => { setIsEditing(true); setShowDropdown((prev) => !prev); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer" role="menuitem">Edit Contact</p>
                                        <p onClick={() => { setTarget(selectedContact.id); setShowConfirmActionModal(true); }} className="w-full px-4 py-2 text-sm text-left text-red-700 hover:bg-red-100 hover:text-red-900 cursor-pointer" role="menuitem">Delete Contact</p>
                                      </div>
                                    </div>
                                  </Transition>
                                </div>
                              </span>
                            </div>
                            <p onClick={() => setShowNotes((prev) => !prev)} className="flex-shrink-0 w-full inline-flex items-center justify-center mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1">
                              {showNotes ? (
                                'Hide Notes'
                              ) : (
                                'View Notes'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                      <dl className="space-y-8 px-4 sm:px-6 sm:space-y-6">
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Company
                        </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {selectedContact.job && selectedContact.job.company.name}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Email Address
                        </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {selectedContact.contact && selectedContact.contact.email}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Phone
                        </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {selectedContact.contact && selectedContact.contact.phone}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  {isEditing ? (
                    <JobContactDetailForm setIsEditing={setIsEditing} selectedContact={selectedContact} setShowContactPanel={setShowContactPanel} />
                  ) : ''}
                  {showNotes ? (
                    <ContactNoteList contactId={selectedContact.contact.id} />
                  ) : ('')}
                </div>
              </div>
            </section>
          </div>
        </div>
      </Transition >
      <ConfirmActionModal
        show={showConfirmActionModal}
        toggleShow={setShowConfirmActionModal}
        actionFunction={() => { deleteJobContact(target).then(() => getJobContacts()); setShowContactPanel(false); }}
        actionName="delete"
      />
    </>
  );
};
