import React, { useState } from 'react';

export const ApplicationContext = React.createContext();

export const ApplicationProvider = (props) => {
  const [applicationList, setApplicationList] = useState([]);

  // Get applications
  const getApplications = () => {
    fetch('http://localhost:8000/applications', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setApplicationList);
  };

  return (
    <ApplicationContext.Provider value={{ applicationList, getApplications }}>
      { props.children}
    </ApplicationContext.Provider>
  );
};
