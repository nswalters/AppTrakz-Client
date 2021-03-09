/* eslint-disable max-len */
import React from 'react';

export const CreateForm = (props) => {
  const val = 1;

  return (
    <div className="min-h-(screen-16) bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Company Information</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Fill out the company's information here.
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              {/* <form action="#" method="POST"> */}
              <form>
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">

                      <div class="col-span-6">
                        <label for="name" class="block text-sm font-medium text-gray-700">Company Name*</label>
                        <input type="text" name="name" id="name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                      </div>

                      <div class="col-span-6">
                        <label for="address1" class="block text-sm font-medium text-gray-700">Street address*</label>
                        <input type="text" name="address1" id="address1" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                      </div>

                      <div class="col-span-6">
                        <label for="address2" class="block text-sm font-medium text-gray-700">Suite, Unit, Apt, etc.</label>
                        <input type="text" name="address2" id="address2" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label for="city" class="block text-sm font-medium text-gray-700">City*</label>
                        <input type="text" name="city" id="city" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label for="state" class="block text-sm font-medium text-gray-700">State*</label>
                        <input type="text" name="state" id="state" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label for="zipcode" class="block text-sm font-medium text-gray-700">ZIP / Postal*</label>
                        <input type="text" name="zipcode" id="zipcode" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="ml-4 my-auto text-gray-600">
                      <small>
                        * denotes required field
                      </small>
                    </div>
                    <div class="px-4 py-3 text-right sm:px-6">
                      <button onClick={() => { }} type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save
                    </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Job Information</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Fill out the Job's information here.
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              {/* <form action="#" method="POST"> */}
              <form>
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">

                      <div class="col-span-6">
                        <label for="role_title" class="block text-sm font-medium text-gray-700">Role Title*</label>
                        <input type="text" name="role_title" id="role_title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="company" class="block text-sm font-medium text-gray-700">Company*</label>
                        <select id="company" name="company" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                          <option>First Company</option>
                          <option>Second Company</option>
                          <option>Third Company</option>
                        </select>
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="type" class="block text-sm font-medium text-gray-700">Job Type*</label>
                        <select id="type" name="type" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                          <option>Full-Time</option>
                          <option>Part-Time</option>
                          <option>Contract</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="salary" class="block text-sm font-medium text-gray-700">Salary Expectation</label>
                        <input type="text" name="email_address" id="email_address" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div class="col-span-6">
                        <label for="qualifications" class="block text-sm font-medium text-gray-700">Important Qualifications*</label>
                        <input type="text" name="qualifications" id="qualifications" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div class="col-span-6">
                        <label for="post_link" class="block text-sm font-medium text-gray-700">Job Posting Link*</label>
                        <input type="text" name="post_link" id="post_link" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div class="col-span-6">
                        <label for="description" class="block text-sm font-medium text-gray-700">Job Description* <small>(supports linebreaks)</small></label>
                        <textarea name="description" id="descripton" rows="25" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm-text-sm border-gray-300 rounded-md whitespace-pre-wrap"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="ml-4 my-auto text-gray-600">
                      <small>
                        * denotes required field
                      </small>
                    </div>
                    <div class="px-4 py-3 text-right sm:px-6">
                      <button onClick={() => { }} type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
