import React, { useState } from 'react';

export const JobContext = React.createContext();

export const JobProvider = (props) => {
  const [jobList, setJobList] = useState([]);

  // Get jobs
  const getJobs = () => {
    fetch('http://localhost:8000/jobs', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setJobList);
  };

  return (
    <JobContext.Provider value={{ getJobs, jobList }}>
      { props.children}
    </JobContext.Provider>
  );
};
