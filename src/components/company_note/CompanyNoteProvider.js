import React, { useState } from 'react';

export const CompanyNoteContext = React.createContext();

export const CompanyNoteProvider = (props) => {
  const [companyNoteList, setCompanyNoteList] = useState([]);

  // Get all Company Notes
  const getCompanyNotes = () => (
    fetch('https://apptrakz-api.herokuapp.com/company_notes', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setCompanyNoteList)
  );

  // Create new Company Note
  const createCompanyNote = (companyNoteDetails) => (
    fetch('https://apptrakz-api.herokuapp.com/company_notes', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(companyNoteDetails),
    })
  );

  // Update Company Note
  const updateCompanyNote = (companyNoteId, companyNoteDetails) => (
    fetch(`https://apptrakz-api.herokuapp.com/company_notes/${companyNoteId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(companyNoteDetails),
    })
  );

  // Delete a Company Note (actually a soft-delete)
  const deleteCompanyNote = (companyNoteId) => (
    fetch(`https://apptrakz-api.herokuapp.com/company_notes/${companyNoteId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
  );

  return (
    <CompanyNoteContext.Provider value={{
      getCompanyNotes,
      createCompanyNote,
      updateCompanyNote,
      deleteCompanyNote,
      companyNoteList,
      setCompanyNoteList,
    }}>
      { props.children}
    </CompanyNoteContext.Provider>
  );
};
