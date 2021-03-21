/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InvalidLoginModal } from '../alerts/InvalidLoginModal';

export const Login = (props) => {
  const [showInvalidLoginModal, setShowInvalidLoginModal] = useState(false);
  const username = React.createRef();
  const password = React.createRef();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch('https://apptrakz-api.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if ('valid' in res && res.valid && 'token' in res) {
          localStorage.setItem('apptrakz_token', res.token);
          props.history.push('/');
        } else {
          setShowInvalidLoginModal(true);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <InvalidLoginModal showInvalidLoginModal={showInvalidLoginModal} setShowInvalidLoginModal={setShowInvalidLoginModal} {...props} />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <svg className="mx-auto h-20 w-20" viewBox="0 0 39.688 39.688" xmlns="http://www.w3.org/2000/svg"><g style={{ mixBlendMode: 'multiply' }}><path d="M33.422 27.103l-13.95 6.888-13.976-6.847-.028-13.737 13.95-6.889 13.977 6.848z" fill="#818cf8" style={{ mixBlendMode: 'overlay' }} /><path d="M27.954 32.8l-13.95 6.889L.029 32.84 0 19.104l13.95-6.889 13.977 6.848z" fill="#6366f1" style={{ mixBlendMode: 'overlay' }} /><path d="M39.687 20.586l-13.95 6.889-13.977-6.848-.027-13.737L25.683 0 39.658 6.85z" fill="#a5b4fc" style={{ mixBlendMode: 'overlay' }} /></g></svg>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
    </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
          </label>
              <div className="mt-1">
                <input ref={username} id="username" name="username" type="text" autoComplete="username" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
          </label>
              <div className="mt-1">
                <input ref={password} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm mx-auto">
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Don't have an account?
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
    </div >
  );
};
