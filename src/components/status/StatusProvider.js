import React, { useState } from 'react';

export const StatusContext = React.createContext();

export const StatusProvider = (props) => {
  const [statusList, setStatusList] = useState([]);

  // Get Statuses
  const getStatuses = () => (
    fetch('https://apptrakz-api.herokuapp.com/statuses', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setStatusList)
  );

  return (
    <StatusContext.Provider value={{ getStatuses, statusList }}>
      { props.children}
    </StatusContext.Provider>
  );
};
