import React, { useState } from 'react';

export const JobNoteContext = React.createContext();

export const JobNoteProvider = (props) => {
  const [jobNoteList, setJobNoteList] = useState([]);

  // Get all Job Notes
  const getJobNotes = () => (
    fetch('https://apptrakz-api.herokuapp.com/job_notes', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setJobNoteList)
  );

  // Create new Job Note
  const createJobNote = (jobNoteDetails) => (
    fetch('https://apptrakz-api.herokuapp.com/job_notes', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobNoteDetails),
    })
  );

  // Update Job Note
  const updateJobNote = (jobNoteId, jobNoteDetails) => (
    fetch(`https://apptrakz-api.herokuapp.com/job_notes/${jobNoteId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobNoteDetails),
    })
  );

  // Delete a Job Note (actually a soft-delete)
  const deleteJobNote = (jobNoteId) => (
    fetch(`https://apptrakz-api.herokuapp.com/job_notes/${jobNoteId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
  );

  return (
    <JobNoteContext.Provider value={{
      getJobNotes,
      createJobNote,
      updateJobNote,
      deleteJobNote,
      jobNoteList,
      setJobNoteList,
    }}>
      { props.children}
    </JobNoteContext.Provider>
  );
};
