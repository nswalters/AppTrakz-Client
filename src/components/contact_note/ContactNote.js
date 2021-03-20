/* eslint-disable max-len */
import React from 'react';

export const ContactNote = (props) => {
  const {
    note,
    setIsEditing,
    setNoteContent,
    setEditingNoteId,
    setShowConfirmActionModal,
  } = props;

  return (
    <li>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <svg className="h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <div className="mt-1 text-sm text-gray-700">
            <p>{note.content}</p>
          </div>
          <div className="mt-2 text-sm space-x-2">
            <span className="text-gray-500 font-medium">{new Date(note.created_at).toLocaleString('en-US')}</span>
            <span className="text-gray-500 font-medium">&middot;</span>
            <button onClick={() => { setIsEditing(); setNoteContent({ content: note.content }); setEditingNoteId(note.id); }} type="button" className="text-gray-900 font-medium">Edit</button>
            <span className="text-gray-500 font-medium">&middot;</span>
            <button onClick={() => { setEditingNoteId(note.id); setShowConfirmActionModal(true); }} type="button" className="text-red-600 font-medium">Delete</button>
          </div>
        </div>
      </div>
    </li >
  );
};
