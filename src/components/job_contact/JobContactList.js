/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { JobContactContext } from './JobContactProvider';
import { JobContactListCard } from './JobContactListCard';
import { JobContactDetail } from './JobContactDetail';

export const JobContactList = (props) => {
  const { getJobContacts, jobContactList } = useContext(JobContactContext);

  const [showContactPanel, setShowContactPanel] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});

  useEffect(() => {
    getJobContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16 mx-16">
        {jobContactList.map((jobContact) => (
          <JobContactListCard
            key={jobContact.id}
            jobContact={jobContact}
            setShowContactPanel={setShowContactPanel}
            setSelectedContact={setSelectedContact}
          />
        ))}
      </ul>
      <JobContactDetail
        showContactPanel={showContactPanel}
        setShowContactPanel={setShowContactPanel}
        selectedContact={selectedContact}
      />
    </>
  );
};
