/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { CompanyContext } from './CompanyProvider';

export const CompanyDetails = (props) => {
  const { companyList, getCompanies } = useContext(CompanyContext);

  const [singleCompany, setSingleCompany] = useState({});

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const company = companyList.find((c) => c.id === parseInt(props.match.params.companyId, 10)) || {};
    setSingleCompany(company);
  }, [companyList, props.match.params.companyId]);

  return (
    <div className="min-h-(screen-16) bg-gray-100">
      <main className="py-10">
        {/* <!-- Page header --> */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{singleCompany.name}</h1>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* <!-- Description list--> */}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                    Company Information
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Specific details about the company.
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Street Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {singleCompany.address1}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Suite, Apt, Unit, etc.
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {singleCompany.address2 ? singleCompany.address2 : '-'}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        City
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {singleCompany.city}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        State
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {singleCompany.state}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Zipcode
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {singleCompany.zipcode}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Company Website
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 underline hover:text-gray-500">
                        <a href={singleCompany.website}>{singleCompany.website}</a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            {/* <!-- Notes --> */}
            {/* <section aria-labelledby="notes-title">
              <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="notes-title" className="text-lg font-medium text-gray-900">Notes</h2>
                  </div>
                  <div className="px-4 py-6 sm:px-6">
                    <ul className="space-y-8">
                      <li>
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=WAfJ9TzjUY&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                          </div>
                          <div>
                            <div className="text-sm">
                              <a href="/" className="font-medium text-gray-900">Leslie Alexander</a>
                            </div>
                            <div className="mt-1 text-sm text-gray-700">
                              <p>Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.</p>
                            </div>
                            <div className="mt-2 text-sm space-x-2">
                              <span className="text-gray-500 font-medium">4d ago</span>
                              <span className="text-gray-500 font-medium">&middot;</span>
                              <button type="button" className="text-gray-900 font-medium">Reply</button>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=WAfJ9TzjUY&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                          </div>
                          <div>
                            <div className="text-sm">
                              <a href="/" className="font-medium text-gray-900">Michael Foster</a>
                            </div>
                            <div className="mt-1 text-sm text-gray-700">
                              <p>Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.</p>
                            </div>
                            <div className="mt-2 text-sm space-x-2">
                              <span className="text-gray-500 font-medium">4d ago</span>
                              <span className="text-gray-500 font-medium">&middot;</span>
                              <button type="button" className="text-gray-900 font-medium">Reply</button>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixqx=WAfJ9TzjUY&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                          </div>
                          <div>
                            <div className="text-sm">
                              <a href="/" className="font-medium text-gray-900">Dries Vincent</a>
                            </div>
                            <div className="mt-1 text-sm text-gray-700">
                              <p>Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.</p>
                            </div>
                            <div className="mt-2 text-sm space-x-2">
                              <span className="text-gray-500 font-medium">4d ago</span>
                              <span className="text-gray-500 font-medium">&middot;</span>
                              <button type="button" className="text-gray-900 font-medium">Reply</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <form action="#">
                        <div>
                          <label for="comment" className="sr-only">About</label>
                          <textarea id="comment" name="comment" rows="3" className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md" placeholder="Add a note"></textarea>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <a href="/" className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                            <!-- Heroicon name: solid/question-mark-circle -->
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            <span>
                              Some HTML is okay.
                            </span>
                          </a>
                          <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
          </div>

          {/* <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2 id="timeline-title" className="text-lg font-medium text-gray-900">Timeline</h2> */}

          {/* TODO: Make this a separate component?? */}
          {/* <!-- Activity Feed --> */}
          {/* <div className="mt-6 flow-root">
                <ul className="-mb-8">
                  <li>
                    <div className="relative pb-8">
                      {jobApplication.statuses && (jobApplication.statuses).length <= 1 ? '' : (
                        <span className="absolute top-3 left-3 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-6 w-6 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"> */}
          {/* <!-- Heroicon name: solid/user --> */}
          {/* <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
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
                  </li> */}
          {/*
                    - For every record in jobApplication.statuses -- sorted by updated_at ascending (so oldest first)
                    - Create an 'ApplicationActivityFeedItem' component to render the proper feed item
                  */}
          {/* {jobApplication.statuses && sortApplicationStatusesByUpdatedAt(jobApplication.statuses).map((status, idx, arr) => {
                    if (status.name === 'Applied') {
                      return '';
                    }
                    return (
                      <li>
                        <div className="relative pb-8"> */}
          { /* Don't show the connector line if the status
                            is the last one */}
          {/* {idx === arr.length - 1 ? '' : (
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
                                <time dateTime={(status.updated_at).split('T')[0]}>{new Date(status.updated_at).toLocaleString('en-us', { month: 'short', day: 'numeric' })}</time>
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
          </section> */}
        </div>
      </main>
    </div>
  );
};
