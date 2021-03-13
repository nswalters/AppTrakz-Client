/* eslint-disable max-len */
import React from 'react';
import { Transition } from '@headlessui/react';
import { JobContactNewForm } from '../forms/JobContactNewForm';

export const JobContactNew = (props) => {
  const { showNewContactPanel, setShowNewContactPanel } = props;

  return (
    <Transition
      show={showNewContactPanel}
      enter="transform transition ease-in-out duration-500 sm:duration-700"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-500 sm:duration-700"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div className="fixed inset-0 overflow-hidden mt-32">
        <div className="absolute inset-0 overflow-hidden">
          <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16" aria-labelledby="slide-over-heading">
            <div className="w-screen max-w-md">
              <div className="min-h-1/4 flex flex-col bg-white shadow-xl overflow-hidden">
                <div className="px-4 py-6 sm:px-6 bg-gray-100 shadow">
                  <div className="flex items-start justify-between">
                    <h2 id="slide-over-heading" className="text-lg font-medium text-gray-900">
                      Job Contact
                    </h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button onClick={() => setShowNewContactPanel(false)} className="bg-gray-100 rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
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
                <JobContactNewForm setShowContactPanel={setShowNewContactPanel} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Transition >
  );
};
