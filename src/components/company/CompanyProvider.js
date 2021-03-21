import React, { useState } from 'react';

export const CompanyContext = React.createContext();

export const CompanyProvider = (props) => {
  const [companyList, setCompanyList] = useState([]);

  // Get companies
  const getCompanies = () => (
    fetch('https://apptrakz-api.herokuapp.com/companies', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setCompanyList)
  );

  // Create a new compnay
  const createCompany = (newCompanyDetails) => (
    fetch('https://apptrakz-api.herokuapp.com/companies', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCompanyDetails),
    })
  );

  // Update a company
  const updateCompany = (companyId, newCompanyDetails) => (
    fetch(`https://apptrakz-api.herokuapp.com/companies/${companyId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCompanyDetails),
    })
  );

  // Delete a company (actually soft-delete)
  const deleteCompany = (companyId) => (
    fetch(`https://apptrakz-api.herokuapp.com/companies/${companyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
  );

  return (
    <CompanyContext.Provider value={{
      companyList, createCompany, deleteCompany, getCompanies, updateCompany,
    }} >
      { props.children}
    </CompanyContext.Provider>
  );
};
