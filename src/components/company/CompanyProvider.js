import React, { useState } from 'react';

export const CompanyContext = React.createContext();

export const CompanyProvider = (props) => {
  const [companyList, setCompanyList] = useState([]);

  // Get companies
  const getCompanies = () => (
    fetch('http://localhost:8000/companies', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setCompanyList)
  );

  // Create a new compnay
  const createCompany = (newCompanyDetails) => (
    fetch('http://localhost:8000/companies', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCompanyDetails),
    })
  );

  return (
    <CompanyContext.Provider value={{ companyList, createCompany, getCompanies }} >
      { props.children}
    </CompanyContext.Provider>
  );
};
