import React, { useState } from 'react';

export const JobContext = React.createContext();

export const JobProvider = (props) => {
  const [jobList, setJobList] = useState([]);

  // Get jobs
  const getJobs = () => (
    fetch('http://localhost:8000/jobs', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setJobList)
  );

  // Create a new job
  const createJob = (newJobDetails) => (
    fetch('http://localhost:8000/jobs', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJobDetails),
    })
  );

  return (
    <JobContext.Provider value={{ createJob, getJobs, jobList }}>
      { props.children}
    </JobContext.Provider>
  );
};
