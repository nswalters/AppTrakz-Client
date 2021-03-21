/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MismatchPasswords } from '../alerts/MismatchPasswords';

export const Register = (props) => {
  const [showMismatchPasswordModal, setShowMismatchPasswordModal] = useState(false);
  const [ifMismatchPassword, setIfMismatchPassword] = useState(false);
  const username = React.createRef();
  const email = React.createRef();
  const password = React.createRef();
  const verifyPassword = React.createRef();
  const firstName = React.createRef();
  const lastName = React.createRef();

  // eslint-disable-next-line consistent-return
  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      return fetch('https://apptrakz-api.herokuapp.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((res) => {
          if ('token' in res) {
            localStorage.setItem('apptrakz_token', res.token);
            props.history.push('/');
          }
        });
    }
    setShowMismatchPasswordModal(true);
    setIfMismatchPassword(true);
  };

  return (
    <>
      <MismatchPasswords showMismatchPasswordModal={showMismatchPasswordModal} setShowMismatchPasswordModal={setShowMismatchPasswordModal} {...props} />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleRegister}>

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1">
                  <input ref={firstName} id="firstName" name="firstName" type="text" autoComplete="firstName" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1">
                  <input ref={lastName} id="lastName" name="lastName" type="text" autoComplete="lastName" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input ref={email} id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input ref={username} id="username" name="username" type="username" autoComplete="username" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div>
                {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700"> */}
                <label htmlFor="password" className={`block text-sm font-medium ${ifMismatchPassword ? 'text-red-600' : 'text-gray-700'}`}>
                  Password
                </label>
                <div className="mt-1">
                  <input ref={password} id="password" name="password" type="password" autoComplete="current-password" required className={`appearance-none block w-full px-3 py-2 border ${ifMismatchPassword ? 'border-red-600 shadow-error' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} />
                </div>
              </div>

              <div>
                {/* <label htmlFor="verifyPassword" className="block text-sm font-medium text-gray-700">
            Verify Password
          </label> */}
                <label htmlFor="verifyPassword" className={`block text-sm font-medium ${ifMismatchPassword ? 'text-red-600' : 'text-gray-700'}`}>
                  Verify Password
                </label>
                <div className="mt-1">
                  <input ref={verifyPassword} id="verifyPassword" name="verifyPassword" type="password" autoComplete="verify-password" required className={`appearance-none block w-full px-3 py-2 border ${ifMismatchPassword ? 'border-red-600 shadow-error' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm mx-auto">
                  <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Already have an account?
                  </Link>
                </div>
              </div>

              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
