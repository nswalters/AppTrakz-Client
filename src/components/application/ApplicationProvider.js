import React, { useState } from 'react';

export const ApplicationContext = React.createContext();

export const ApplicationProvider = (props) => {
  const [applicationList, setApplicationList] = useState([]);

  // Get applications
  const getApplications = () => (
    fetch('http://localhost:8000/applications', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setApplicationList)
  );

  // Create application
  const createApplication = (applicationDetails) => (
    fetch('http://localhost:8000/applications', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationDetails),
    })
      .then(getApplications())
  );

  return (
    <ApplicationContext.Provider value={{ applicationList, createApplication, getApplications }}>
      { props.children}
    </ApplicationContext.Provider>
  );
};
