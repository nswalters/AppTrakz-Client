/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { CompanyContext } from '../company/CompanyProvider';
import { JobContext } from '../job/JobProvider';

export const CreateForm = (props) => {
  const { companyList, getCompanies } = useContext(CompanyContext);
  const { jobList } = useContext(JobContext);

  const [currentCompany, setCurrentCompany] = useState({
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    website: '',
  });

  const [currentJob, setCurrentJob] = useState({
    role_title: '',
    type: '',
    qualifications: '',
    post_link: '',
    salary: '',
    description: '',
    company: '',
  });

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleControlledInputChangeCompany = (event) => {
    const newCompanyState = { ...currentCompany };
    newCompanyState[event.target.name] = event.target.value;
    setCurrentCompany(newCompanyState);
  };

  const handleControlledInputChangeJob = (event) => {
    const newJobState = { ...currentJob };
    newJobState[event.target.name] = event.target.value;
    setCurrentJob(newJobState);
  };

  const submitCompany = (e) => {
    e.preventDefault();

    const newCompanyDetails = currentCompany;

    // TODO: Create POST submission for company
    console.error('Company Submission Completed');
    console.error(JSON.stringify(newCompanyDetails));

    // After submitting, make sure we call the `getCompanies` function again
    // to update our select list for the job section
    getCompanies();
  };

  const submitJob = (e) => {
    e.preventDefault();

    const newJobDetails = currentJob;
    newJobDetails.company = parseInt(currentJob.company, 10);

    console.error('Job Submission Completed');
    console.error(JSON.stringify(newJobDetails));
  };

  return (
    <div className="min-h-(screen-16) bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Company Information</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Fill out the company's information here.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={submitCompany}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">

                      <div className="col-span-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company Name*</label>
                        <input onChange={handleControlledInputChangeCompany} type="text" name="name" id="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={currentCompany.name} required />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Company Website*</label>
                        <input onChange={handleControlledInputChangeCompany} type="text" name="website" id="website" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={currentCompany.website} required />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Street address*</label>
                        <input onChange={handleControlledInputChangeCompany} type="text" name="address1" id="address1" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={currentCompany.address1} required />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="address2" className="block text-sm font-medium text-gray-700">Suite, Unit, Apt, etc.</label>
                        <input onChange={handleControlledInputChangeCompany} type="text" name="address2" id="address2" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={currentCompany.address2} />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City*</label>
                        <input onChange={handleControlledInputChangeCompany} type="text" name="city" id="city" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={currentCompany.city} required />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State*</label>
                        <select onChange={handleControlledInputChangeCompany} id="state" name="state" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={currentCompany.state || ''} required>
                          <option value="" disabled>Select a State...</option>
                          <option value="AL" >Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="DC">District Of Columbia</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">ZIP / Postal*</label>
                        <input onChange={handleControlledInputChangeCompany} type="text" name="zipcode" id="zipcode" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" defaultValue={currentCompany.zipcode} required />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="ml-4 my-auto text-gray-600">
                      <small>
                        * denotes required field
                      </small>
                    </div>
                    <div className="px-4 py-3 text-right sm:px-6">
                      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save
                    </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Job Information</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Fill out the Job's information here.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={submitJob}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">

                      <div className="col-span-6">
                        <label htmlFor="role_title" className="block text-sm font-medium text-gray-700">Role Title*</label>
                        <input onChange={handleControlledInputChangeJob} type="text" name="role_title" id="role_title" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company*</label>
                        <select onChange={handleControlledInputChangeJob} id="company" name="company" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={currentJob.company || ''} required>
                          <option value="" disabled>Select a Company...</option>
                          {companyList.map((company) => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type*</label>
                        <select onChange={handleControlledInputChangeJob} id="type" name="type" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={currentJob.type || ''} required>
                          <option value="" disabled>Select a Job Type...</option>
                          <option>Full-Time</option>
                          <option>Part-Time</option>
                          <option>Contract</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary Expectation</label>
                        <input onChange={handleControlledInputChangeJob} type="text" name="salary" id="salary" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">Important Qualifications*</label>
                        <input onChange={handleControlledInputChangeJob} type="text" name="qualifications" id="qualifications" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="post_link" className="block text-sm font-medium text-gray-700">Job Posting Link*</label>
                        <input onChange={handleControlledInputChangeJob} type="text" name="post_link" id="post_link" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description* <small>(supports linebreaks)</small></label>
                        <textarea onChange={handleControlledInputChangeJob} name="description" id="descripton" rows="25" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm-text-sm border-gray-300 rounded-md whitespace-pre-wrap"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="ml-4 my-auto text-gray-600">
                      <small>
                        * denotes required field
                      </small>
                    </div>
                    <div className="px-4 py-3 text-right sm:px-6">
                      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save
                    </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
