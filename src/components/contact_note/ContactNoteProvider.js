import React, { useState } from 'react';

export const ContactNoteContext = React.createContext();

export const ContactNoteProvider = (props) => {
  const [contactNoteList, setContactNoteList] = useState([]);

  // Get all Contact Notes
  const getContactNotes = () => (
    fetch('https://apptrakz-api.herokuapp.com/contact_notes', {
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
      .then((res) => res.json())
      .then(setContactNoteList)
  );

  // Create new Contact Note
  const createContactNote = (contactNoteDetails) => (
    fetch('https://apptrakz-api.herokuapp.com/contact_notes', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactNoteDetails),
    })
  );

  // Update Contact Note
  const updateContactNote = (contactNoteId, contactNoteDetails) => (
    fetch(`https://apptrakz-api.herokuapp.com/contact_notes/${contactNoteId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactNoteDetails),
    })
  );

  // Delete a Contact Note (actually a soft-delete)
  const deleteContactNote = (contactNoteId) => (
    fetch(`https://apptrakz-api.herokuapp.com/contact_notes/${contactNoteId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('apptrakz_token')}`,
      },
    })
  );

  return (
    <ContactNoteContext.Provider value={{
      getContactNotes,
      createContactNote,
      updateContactNote,
      deleteContactNote,
      contactNoteList,
      setContactNoteList,
    }}>
      { props.children}
    </ContactNoteContext.Provider>
  );
};
