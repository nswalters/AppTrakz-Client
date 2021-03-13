import React, { useState } from 'react';

export const JobContactContext = React.createContext();

export const JobContactProvider = (props) => {
  const [jobContactList, setJobContactList] = useState([]);

  // Get JobContacts
  const getJobContacts = () => (
    fetch('http://localhost:8000/job_contacts', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setJobContactList)
  );

  return (
    <JobContactContext.Provider value={{ getJobContacts, jobContactList }}>
      { props.children}
    </JobContactContext.Provider>
  );
};
