import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateSection = ({ timer, setTimer, id, text }) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [alert, setAlert] = useState(false);
  const [fillAll, setFillAll] = useState(false);

  const handleDropdownClick = () => {
    setDropdown(!dropdown);
  };

  const handleDurationSelect = (duration) => {
    setTimer(duration);
    setDropdown(false);
  };

  const convert = (duration) => {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  };

  const handleCreate = async () => {
    if (!text || !id || !timer) {
      setFillAll(true);
      setTimeout(() => {
        setFillAll(false);
      }, 3000);
      return;
    }

    const milisec = convert(timer);

    try {
      const res = await axios.post('http://localhost:2345/api/assistant/', {
        text: text,
        link_id: id,
        expiresAt: milisec,
      });

      if (res?.data?.exists) {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 6000);
      } else {
        navigate(`/${res?.data.link_id}`);
      }
    } catch (error) {
      console.error("Error creating link:", error);
      // Optionally, handle error state and display a user-friendly message
    }
  };

  return (
    <div className="flex items-center gap-6 mt-3">
      <form className="max-w-[13rem] mx-auto">
        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select time:
        </label>
        <div className="flex relative">
          <input
            type="time"
            id="time"
            className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setTimer(e.target.value)}
            value={timer}
            required
          />
          <button
            id="dropdown-duration-button"
            data-dropdown-toggle="dropdown-duration"
            className="relative border-s-0 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
            onClick={handleDropdownClick}
          >
            Duration
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown-duration"
            className={`${dropdown ? '' : 'hidden'} absolute right-0 top-5 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-duration-button"
            >
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  onClick={() => handleDurationSelect('00:30')}
                >
                  30 minutes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  onClick={() => handleDurationSelect('01:00')}
                >
                  1 hour
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                  onClick={() => handleDurationSelect('02:00')}
                >
                  2 hours
                </button>
              </li>
            </ul>
          </div>
        </div>
      </form>
      <div>
        <button
          type="button"
          onClick={handleCreate}
          className="mt-8 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Create
        </button>
      </div>
      {alert && (
        <div className="absolute mx-[15%] right-0 bottom-0 flex p-3 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">Alert! </span> Change the ID as it has already been taken and try creating again.
        </div>
      )}
      {fillAll && (
        <div className="absolute mx-[15%] right-0 bottom-0 flex p-3 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">Alert! </span> Please fill in all fields and try again.
        </div>
      )}
    </div>
  );
};

export default CreateSection;
