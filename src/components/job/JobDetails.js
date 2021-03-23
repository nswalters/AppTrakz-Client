/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { ApplicationContext } from '../application/ApplicationProvider';
import { JobContext } from './JobProvider';
import { JobNote } from '../job_note/JobNote';
import { JobNoteContext } from '../job_note/JobNoteProvider';
import { ConfirmActionModal } from '../alerts/ConfirmActionModal';

export const JobDetails = (props) => {
  const { jobList, getJobs } = useContext(JobContext);
  const { applicationList, createApplication, getApplications } = useContext(ApplicationContext);
  const {
    jobNoteList,
    createJobNote,
    getJobNotes,
    updateJobNote,
    deleteJobNote,
  } = useContext(JobNoteContext);

  const [singleJob, setSingleJob] = useState({});
  const [jobApplication, setJobApplication] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [currentJobNotes, setCurrentJobNotes] = useState(null);
  const [noteContent, setNoteContent] = useState({
    content: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noNoteContent, setNoNoteContent] = useState(false);
  const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);

  useEffect(() => {
    getJobs();
    getApplications();
    getJobNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    jobNoteList && setCurrentJobNotes(jobNoteList.filter((note) => note.job.id === parseInt(props.match.params.jobId, 10)));
  }, [jobList, jobNoteList, props.match.params.jobId]);

  useEffect(() => {
    const job = jobList.find((j) => j.id === parseInt(props.match.params.jobId, 10)) || {};
    setSingleJob(job);
  }, [jobList, jobNoteList, props.match.params.jobId]);

  useEffect(() => {
    const application = applicationList.find((a) => a.job.id === parseInt(props.match.params.jobId, 10)) || {};
    setJobApplication(application);
  }, [jobList, applicationList, props.match.params.jobId]);

  const sortApplicationStatusesByCreatedAt = (statuses) => (
    statuses.sort((a, b) => (a.created_at > b.created_at ? 1 : -1))
  );

  const handleControlledInputChange = (event) => {
    const newNoteContent = { ...noteContent };
    newNoteContent[event.target.name] = event.target.value;
    setNoteContent(newNoteContent);
  };

  const submitNote = (e) => {
    e.preventDefault();
    setNoNoteContent(false);
    if (noteContent.content !== '') {
      const newNote = {
        job: props.match.params.jobId,
        content: noteContent.content,
      };
      createJobNote(newNote)
        .then(getJobNotes)
        .then(setNoteContent({ content: '' }));
    } else {
      setNoNoteContent(true);
    }
  };

  const updateNote = (e) => {
    e.preventDefault();
    setNoNoteContent(false);
    updateJobNote(editingNoteId, noteContent)
      .then(getJobNotes)
      .then(setNoteContent({ content: '' }));
  };

  return (
    <div className="min-h-(screen-16) bg-gray-100">
      <main className="py-10">
        {/* <!-- Page header --> */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{singleJob.role_title}</h1>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* <!-- Description list--> */}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="flex justify-between">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                      Job Information
                  </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Specific details about the job.
                  </p>
                  </div>
                  {singleJob.application ? '' : (
                    <div className="my-auto mr-8 flex-shrink-0 ml-auto">
                      <button onClick={() => { createApplication({ job: singleJob.id }).then(getJobs()).then(getApplications()); }} className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span>Apply</span>
                      </button>
                    </div>
                  )}
                  <div className="relative inline-block text-left my-auto mr-4">
                    <div>
                      <button onClick={() => setShowOptions((prev) => !prev)} type="button" className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true">
                        <span className="sr-only">Open options</span>
                        {/* <!-- Heroicon name: solid/dots-vertical --> */}
                        <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>

                    <Transition
                      show={showOptions}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div className="py-1" role="none">
                          {singleJob && <Link to={`${singleJob.url}/edit`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit</Link>}
                          <button onClick={() => setShowConfirmActionModal(true)} type="button" className="w-full text-left block px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100 hover:text-gray-900" role="menuitem">Delete</button>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Company
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 underline">
                        {singleJob.company && <Link to={singleJob.company.url}>{singleJob.company && singleJob.company.name}</Link>}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Requested Qualifications
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {singleJob.qualifications}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Type
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {singleJob.type}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Salary expectation
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {singleJob.salary ? singleJob.salary : '-'}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Current Application Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <strong>{singleJob.application && singleJob.application.is_active ? 'Active: ' : 'Inactive - '}</strong> {singleJob.application && singleJob.application.current_status.status.name}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Job Posting
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 underline hover:text-gray-500">
                        <a href={singleJob.post_link}>{singleJob.post_link}</a>
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Job Description
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                        {singleJob.description}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            {/* <!-- Notes --> */}
            <section aria-labelledby="notes-title">
              <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="notes-title" className="text-lg font-medium text-gray-900">Notes</h2>
                  </div>
                  <div className="px-4 py-6 sm:px-6">
                    <ul className="space-y-8">
                      {currentJobNotes && currentJobNotes.length > 0 ? (
                        currentJobNotes.map((note) => (
                          <JobNote
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
                                <button onClick={() => { setIsEditing(false); setNoteContent(''); setNoNoteContent(false); }} type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-8">
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
            </section>
          </div>

          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2 id="timeline-title" className="text-lg font-medium text-gray-900">Application Timeline</h2>

              {/* TODO: Make this a separate component?? */}
              {/* <!-- Activity Feed --> */}
              <div className="mt-6 flow-root">
                <ul className="-mb-8">
                  {jobApplication.statuses ? (
                    <li>
                      <div className="relative pb-8">
                        {jobApplication.statuses && (jobApplication.statuses).length <= 1 ? '' : (
                          <span className="absolute top-3 left-3 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-6 w-6 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                              {/* <!-- Heroicon name: solid/user --> */}
                              {/* <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg> */}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">Applied to <a href={jobApplication.job && jobApplication.job.url} className="font-medium text-gray-900">{jobApplication.job && jobApplication.job.role_title}</a></p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={jobApplication.submitted_at && (jobApplication.submitted_at).split('T')[0]}>{new Date(jobApplication.submitted_at).toLocaleString('en-us', { month: 'short', day: 'numeric' })}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ) : <div className="pb-8 text-gray-500"><em>No Activity Yet</em></div>}
                  {/*
                    - For every record in jobApplication.statuses -- sorted by created_at ascending (so oldest first)
                    - Create an 'ApplicationActivityFeedItem' component to render the proper feed item
                  */}
                  {jobApplication.statuses && sortApplicationStatusesByCreatedAt(jobApplication.statuses).map((status, idx, arr) => {
                    if (status.name === 'Applied') {
                      return '';
                    }
                    return (
                      <li key={status.id}>
                        <div className="relative pb-8">
                          { /* Don't show the connector line if the status
                            is the last one */}
                          {idx === arr.length - 1 ? '' : (
                            <span className="absolute top-3 left-3 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>)}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-6 w-6 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">{status.name}</p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time dateTime={(status.created_at).split('T')[0]}>{new Date(status.created_at).toLocaleString('en-us', { month: 'short', day: 'numeric' })}</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      <ConfirmActionModal
        show={showConfirmActionModal}
        toggleShow={setShowConfirmActionModal}
        actionFunction={() => {
          deleteJobNote(editingNoteId)
            .then(() => getJobs())
            .then(() => getJobNotes());
        }}
        actionName="delete"
      />
    </div>
  );
};
