/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ProfileContext } from './ProfileProvider';

export const Profile = (props) => {
  const { userProfile, getProfile, updateProfile } = useContext(ProfileContext);
  const history = useHistory();

  const [currentUserProfile, setCurrentUserProfile] = useState({
    username: '',
    bio: '',
    firstName: '',
    lastName: '',
    email: '',
    dateJoined: '',
    profileImage: '',
  });

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // If the user has a profile image, convert the image at the image
    // path into a blob format so that we can pass it to 'getBase64'
    // and allow us to keep the same image that was there originally
    // when we change another field in a user profile.
    if (userProfile.profile_image) {
      fetch(userProfile.profile_image)
        .then((res) => res.blob())
        .then((blob) => {
          getBase64(blob, (b64img) => {
            setCurrentUserProfile({
              username: userProfile.user && userProfile.user.username,
              bio: userProfile.bio,
              firstName: userProfile.user && userProfile.user.first_name,
              lastName: userProfile.user && userProfile.user.last_name,
              email: userProfile.user && userProfile.user.email,
              dateJoined: userProfile.user && userProfile.user.date_joined.split('T')[0],
              profileImage: b64img,
            });
          });
        });
    } else {
      setCurrentUserProfile({
        username: userProfile.user && userProfile.user.username,
        bio: userProfile.bio,
        firstName: userProfile.user && userProfile.user.first_name,
        lastName: userProfile.user && userProfile.user.last_name,
        email: userProfile.user && userProfile.user.email,
        dateJoined: userProfile.user && userProfile.user.date_joined.split('T')[0],
      });
    }
  }, [userProfile]);

  const handleControlledInputChange = (event) => {
    const newProfileState = { ...currentUserProfile };
    newProfileState[event.target.name] = event.target.value;
    setCurrentUserProfile(newProfileState);
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createProfileImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      const newProfileState = { ...currentUserProfile };
      newProfileState.profileImage = base64ImageString;
      setCurrentUserProfile(newProfileState);
    });
  };

  return (
    <div className="container mx-auto divide-y">
      <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">Profile</h2>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you share.
              </p>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row">
            <div className="flex-grow space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                  </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                    apptrakz.com/
                    </span>
                  <input onChange={handleControlledInputChange} type="text" name="username" id="username" autoComplete="username" className="focus:ring-light-blue-500 focus:border-light-blue-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300" defaultValue={currentUserProfile.username} />
                </div>
              </div>

              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  About You
                  </label>
                <div className="mt-1">
                  <textarea onChange={handleControlledInputChange} id="bio" name="bio" rows="3" className="shadow-sm focus:ring-light-blue-500 focus:border-light-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" defaultValue={currentUserProfile.bio}></textarea>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Tell us a little about yourself.
                  </p>
              </div>
            </div>

            <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
              <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                Photo
                </p>
              <div className="mt-1 lg:hidden">
                <div className="flex items-center">
                  <div className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12" aria-hidden="true">
                    {currentUserProfile && currentUserProfile.profileImage ? (
                      <img className="rounded-full h-full w-full" src={currentUserProfile.profileImage} alt="" />
                    ) : (
                      <svg className="rounded-full h-full w-full text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-5 rounded-md shadow-sm">
                    <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-light-blue-500">
                      <label htmlFor="user_photo" className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none">
                        <span>Change</span>
                        <span className="sr-only"> user photo</span>
                      </label>
                      <input onChange={createProfileImageString} id="user_photo" name="user_photo" type="file" className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden relative rounded-full overflow-hidden lg:block">
                {currentUserProfile && currentUserProfile.profileImage ? (
                  <img className="relative h-40 w-40 rounded-full" src={currentUserProfile.profileImage} alt="" />
                ) : (
                  <svg className="relative h-40 w-40 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
                <label htmlFor="user-photo" className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100">
                  <span>Change</span>
                  <span className="sr-only">user photo</span>
                  <input onChange={createProfileImageString} type="file" id="profileImage" name="profileImage" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md" />
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First name</label>
              <input onChange={handleControlledInputChange} type="text" name="firstName" id="first_name" autoComplete="given-name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm" defaultValue={currentUserProfile.firstName} />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last name</label>
              <input onChange={handleControlledInputChange} type="text" name="lastName" id="last_name" autoComplete="family-name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm" defaultValue={currentUserProfile.lastName} />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input onChange={handleControlledInputChange} type="email" name="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm" defaultValue={currentUserProfile.email} />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label htmlFor="date_joined" className="block text-sm font-medium text-gray-700 opacity-75">Date Joined</label>
              <input type="text" name="date_joined" id="date_joined" autoComplete="organization" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm disabled:opacity-50" defaultValue={currentUserProfile.dateJoined} disabled />
            </div>
          </div>
        </div>
      </form>
      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
        <button onClick={() => history.goBack()} type="button" className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
        <button onClick={() => { updateProfile(currentUserProfile); history.push('/'); }} type="submit" className="ml-5 bg-indigo-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
      </div>
    </div>
  );
};
