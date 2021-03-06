import React, { useState } from 'react';

export const CompanyContext = React.createContext();

export const CompanyProvider = (props) => {
  const [companyList, setCompanyList] = useState({});

  // Get companies
  const getCompanies = () => {
    fetch('http://localhost:8000/companies', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setCompanyList);
  };

  return (
    <CompanyContext.Provider value={{ companyList, getCompanies }} >
      { props.children}
    </CompanyContext.Provider>
  );
};
