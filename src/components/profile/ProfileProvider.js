import React, { useState } from 'react';

export const ProfileContext = React.createContext();

export const ProfileProvider = (props) => {
  const [userProfile, setUserProfile] = useState({});

  const getProfile = () => (
    fetch('http://localhost:8000/user/profile', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setUserProfile)
  );

  const updateProfile = (newProfileData) => (
    fetch('http://localhost:8000/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
      body: JSON.stringify(newProfileData),
    })
      .then(getProfile)
  );

  return (
    <ProfileContext.Provider value={{ userProfile, getProfile, updateProfile }} >
      { props.children }
    </ProfileContext.Provider>
  );
};
