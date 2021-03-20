/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import { ContactNote } from './ContactNote';
import { ContactNoteContext } from './ContactNoteProvider';
import { ConfirmActionModal } from '../alerts/ConfirmActionModal';

export const ContactNoteList = (props) => {
  const { contactId } = props;

  const {
    getContactNotes,
    createContactNote,
    updateContactNote,
    deleteContactNote,
    contactNoteList,
  } = useContext(ContactNoteContext);

  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState({
    content: '',
  });
  const [noNoteContent, setNoNoteContent] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);

  const handleControlledInputChange = (event) => {
    const newContactNoteDetail = { ...noteContent };
    newContactNoteDetail[event.target.name] = event.target.value;
    setNoteContent(newContactNoteDetail);
  };

  const submitNote = (e) => {
    e.preventDefault();
    setNoNoteContent(false);
    if (noteContent.content !== '') {
      const newNote = {
        contact: contactId,
        content: noteContent.content,
      };
      createContactNote(newNote)
        .then(getContactNotes)
        .then(setNoteContent({ content: '' }));
    } else {
      setNoNoteContent(true);
    }
  };

  const updateNote = (e) => {
    e.preventDefault();
    setNoNoteContent(false);
    updateContactNote(editingNoteId, noteContent)
      .then(getContactNotes)
      .then(setNoteContent({ content: '' }));
  };

  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">Notes</h2>
          </div>
          <div className="px-4 py-6 sm:px-6">
            <ul className="space-y-8">
              {contactNoteList && contactNoteList.length > 0 ? (
                contactNoteList.map((note) => (
                  <ContactNote
                    key={note.id}
                    note={note}
                    setIsEditing={() => { setIsEditing(true); setNoNoteContent(false); }}
                    setNoteContent={setNoteContent}
                    setEditingNoteId={setEditingNoteId}
                    setShowConfirmActionModal={setShowConfirmActionModal}
                  />
                ))
              ) : (
                <div className="text-center text-gray-600">
                  <p><em>No notes yet</em></p>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-6 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <form action="#">
                <div>
                  <label htmlFor="content" className="sr-only">Note Content</label>
                  <textarea onChange={handleControlledInputChange} id="content" name="content" rows="3" className={`shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${noNoteContent ? 'border-red-300 border-4' : 'border-gray-300'} rounded-md`} placeholder="Add a note" value={noteContent && noteContent.content}></textarea>
                </div>
                <div className="mt-3 flex items-center justify-end">
                  <div className="mt-3 flex items-center justify-end">
                    {isEditing ? (
                      <>
                        <button onClick={() => { setIsEditing(false); setNoteContent(''); setNoNoteContent(false); setEditingNoteId(null); }} type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-8">
                          Cancel
                        </button>
                        <button onClick={(e) => { setIsEditing(false); updateNote(e); }} type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Update Note
                        </button>
                      </>
                    ) : (
                      <button onClick={(e) => submitNote(e)} type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Add Note
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ConfirmActionModal
        show={showConfirmActionModal}
        toggleShow={setShowConfirmActionModal}
        actionFunction={() => {
          deleteContactNote(editingNoteId)
            .then(() => getContactNotes());
        }}
        actionName="delete"
      />
    </section>
  );
};
