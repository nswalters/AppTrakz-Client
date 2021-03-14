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

  // Update JobContact
  const updateJobContact = (jobContactId, newJobContact) => (
    fetch(`http://localhost:8000/job_contacts/${jobContactId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJobContact),
    })
  );

  // Create new JobContact
  const createJobContact = (newJobContact) => (
    fetch('http://localhost:8000/job_contacts', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJobContact),
    })
  );

  // Delete a job contact (actually soft-delete)
  const deleteJobContact = (jobContactId) => (
    fetch(`http://localhost:8000/job_contacts/${jobContactId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
  );

  return (
    <JobContactContext.Provider value={{
      createJobContact,
      deleteJobContact,
      getJobContacts,
      jobContactList,
      updateJobContact,
    }}>
      { props.children}
    </JobContactContext.Provider>
  );
};
