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

  // Update a company
  const updateCompany = (companyId, newCompanyDetails) => (
    fetch(`http://localhost:8000/companies/${companyId}`, {
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
    fetch(`http://localhost:8000/companies/${companyId}`, {
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
