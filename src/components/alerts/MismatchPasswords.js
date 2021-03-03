/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Transition } from '@headlessui/react';

export const MismatchPasswords = (props) => {
  useEffect(() => {
    // Hides error after 5 seconds
    setTimeout(() => { props.setShowMismatchPasswordModal(false); }, 7000);
  });

  return (
    <Transition
      appear={true}
      show={props.showMismatchPasswordModal}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
    <div className="rounded-md bg-red-50 p-4 absolute min-w-full">
      <div className="flex">
        <div className="flex-shrink-0 ml-auto">
          {/* <!-- Heroicon name: solid/x-circle --> */}
          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 mr-auto">
          <h3 className="text-sm font-medium text-red-800">
            There were errors with your submission
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Your passwords did not match
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex justify-center">
              <button onClick={() => props.setShowMismatchPasswordModal(false)} className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              </button>
            </div>
          </div>
      </div>
    </div>
    </Transition>
  );
};
