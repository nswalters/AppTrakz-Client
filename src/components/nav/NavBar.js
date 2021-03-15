/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../profile/ProfileProvider';

import './NavBar.css';

export const NavBar = (props) => {
  const { userProfile, getProfile } = useContext(ProfileContext);

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const path = props.history.location.pathname;
  const selectedNavClasses = 'border-indigo-500 text-gray-900';
  const notSelectedNavClasses = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  const mobileSelectedNavClasses = 'border-indigo-500 text-indigo-700 bg-indigo-50';
  const mobileNotSelectedNavClasses = 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300';

  return (
    <nav className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {(localStorage.getItem('apptrakz_token') !== null) ? (
              <div className="-ml-2 mr-2 flex items-center md:hidden">
                {/* <!-- Mobile menu button --> */}
                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false" onClick={() => setMenuOpen(!menuOpen)}>
                  <span className="sr-only">Open main menu</span>

                  {menuOpen ? (
                    // "When menu is open (x icon)"
                    // Menu Open: block, Menu closed: hidden
                    <svg className={`${menuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    // "When menu is closed (menu (hamburger) icon)"
                    // Menu Open: hidden, Menu closed: block
                    <svg className={`${menuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            ) : ''}
            <div className="flex-shrink-0 flex items-center">
              <h2 className="text-xl font-semibold text-gray-900">AppTrakz</h2>
            </div>
            {(localStorage.getItem('apptrakz_token') !== null) ? (
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {/* Selected (selectedNavClasses): border-indigo-500 text-gray-900 */}
                {/* Not Selected (notSelectedNavClasses): border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 */}
                <Link to="/dashboard" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${path.startsWith('/dashboard') || path === '/' ? selectedNavClasses : notSelectedNavClasses}`}>
                  Dashboard
                </Link>
                <Link to="/companies" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${path.startsWith('/companies') ? selectedNavClasses : notSelectedNavClasses}`}>
                  Companies
                </Link>
                <Link to="/jobs" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${path.startsWith('/jobs') ? selectedNavClasses : notSelectedNavClasses}`}>
                  Jobs
                </Link>
                <Link to="/applications" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${path.startsWith('/applications') ? selectedNavClasses : notSelectedNavClasses}`}>
                  Applications
                </Link>
                <Link to="/job_contacts" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${path.startsWith('/job_contacts') ? selectedNavClasses : notSelectedNavClasses}`}>
                  Contacts
                </Link>
              </div>
            ) : ''}
          </div>
          {(localStorage.getItem('apptrakz_token') !== null) ? (
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/create" className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {/* <!-- Heroicon name: plus --> */}
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>New...</span>
                </Link>
              </div>
              <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                {/* <!-- Profile dropdown --> */}
                <div className="ml-3 relative" onClick={() => setIsOpen(!isOpen)}>
                  <div>
                    <button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      {userProfile && userProfile.profile_image ? (
                        <img className="h-8 w-8 rounded-full" src={userProfile && userProfile.profile_image} alt="" />
                      ) : (
                        <svg className="h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {/* <!--
                                        Profile dropdown panel, show/hide based on dropdown state.

                                        Entering: "transition ease-out duration-200"
                                            From: "transform opacity-0 scale-95"
                                            To: "transform opacity-100 scale-100"
                                        Leaving: "transition ease-in duration-75"
                                            From: "transform opacity-100 scale-100"
                                            To: "transform opacity-0 scale-95"
                                        --> */}
                  <Transition
                    show={isOpen}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                      <Link to="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</Link>
                      <a onClick={() => {
                        localStorage.removeItem('apptrakz_token');
                        props.history.push({ pathname: '/' });
                      }} href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          ) : ''}
        </div>
      </div>

      {/* <!--
            Mobile menu, toggle classes based on menu state.

            Menu open: "block", Menu closed: "hidden"
            --> */}
      {(localStorage.getItem('apptrakz_token') !== null) ? (
        <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {/* Selected (mobileSelectedNavClasses): border-indigo-500 text-indigo-700 bg-indigo-50 */}
            {/* NotSelected (mobileNotSelectedNavClasses): border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 */}
            <Link to="/dashboard" onClick={() => { setMenuOpen(!menuOpen); }} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 ${path.startsWith('/dashboard') || path === '/' ? mobileSelectedNavClasses : mobileNotSelectedNavClasses}`}>Dashboard</Link>
            <Link to="/companies" onClick={() => { setMenuOpen(!menuOpen); }} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 ${path.startsWith('/companies') ? mobileSelectedNavClasses : mobileNotSelectedNavClasses}`}>Companies</Link>
            <Link to="/jobs" onClick={() => { setMenuOpen(!menuOpen); }} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 ${path.startsWith('/jobs') ? mobileSelectedNavClasses : mobileNotSelectedNavClasses}`}>Jobs</Link>
            <Link to="/applications" onClick={() => { setMenuOpen(!menuOpen); }} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 ${path.startsWith('/applications') ? mobileSelectedNavClasses : mobileNotSelectedNavClasses}`}>Applications</Link>
            <Link to="/job_contacts" onClick={() => { setMenuOpen(!menuOpen); }} className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 ${path.startsWith('/job_contacts') ? mobileSelectedNavClasses : mobileNotSelectedNavClasses}`}>Contacts</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 sm:px-6">
              <div className="flex-shrink-0">
                {userProfile && userProfile.profile_image ? (
                  <img className="h-10 w-10 rounded-full" src={userProfile && userProfile.profile_image} alt="" />
                ) : (
                  <svg className="h-10 w-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{userProfile.user && userProfile.user.first_name} {userProfile.user && userProfile.user.last_name}</div>
                <div className="text-sm font-medium text-gray-500">{userProfile.user && userProfile.user.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <a href="/" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6">Your Profile</a>
              <a onClick={() => {
                localStorage.removeItem('apptrakz_token');
                props.history.push({ pathname: '/' });
              }} href="/" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6">Sign out</a>
            </div>
          </div>
        </div>
      ) : ''}
    </nav>
  );
};
