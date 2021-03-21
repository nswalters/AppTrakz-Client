import React, { useState } from 'react';

export const JobContext = React.createContext();

export const JobProvider = (props) => {
  const [jobList, setJobList] = useState([]);

  // Get jobs
  const getJobs = () => (
    fetch('https://apptrakz-api.herokuapp.com/jobs', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setJobList)
  );

  // Create a new job
  const createJob = (newJobDetails) => (
    fetch('https://apptrakz-api.herokuapp.com/jobs', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJobDetails),
    })
  );

  // Update a job
  const updateJob = (jobId, newJobDetails) => (
    fetch(`https://apptrakz-api.herokuapp.com/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJobDetails),
    })
  );

  // Delete a job (actually a soft-delete)
  const deleteJob = (jobId) => (
    fetch(`https://apptrakz-api.herokuapp.com/jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
  );

  return (
    <JobContext.Provider value={{
      createJob, deleteJob, getJobs, jobList, updateJob,
    }}>
      { props.children}
    </JobContext.Provider>
  );
};
