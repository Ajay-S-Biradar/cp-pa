import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../utils/constant';
import CreateSection from '../components/CreateSection';

const TextPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [timer,setTimer] = useState();
  const [text, setText] = useState('');
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [isUpdateEnabled, setIsUpdateEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const ids = JSON.parse(sessionStorage.getItem("link_id")) || [];


  useEffect(() => {
    if (ids.includes(id)) {
      setIsEditEnabled(true);
    }
    fetchMessage();
  }, [id]);

  const fetchMessage = async () => {
    try {
      const res = await axios.get(`${API_URL}${id}`);
      if (res?.data.invalid) {
        navigate('/notfound');
      } else {
        setText(res.data?.linkExists?.text);
      }
    } catch (error) {
      console.error('Error fetching the message:', error);
      navigate('/notfound');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 5000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };


  return (
    <div className="mx-[10%]">
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleCopy}
          className="m-1 mt-8 px-4 h-10 col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex justify-center items-center"
        >
          <span id="default-message" className={copySuccess ? 'hidden' : ''}>
            Copy
          </span>
          <span id="success-message" className={`inline-flex items-center ${copySuccess ? '' : 'hidden'}`}>
            <svg
              className="w-3 h-3 text-white me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
            Copied!
          </span>
        </button>
        {isEditEnabled && !isEditing && (
          <button
            onClick={() => {
              setIsEditEnabled(false);
              setIsEditing(true);
              setIsUpdateEnabled(true);
            }}
            className="m-1 px-4 col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex justify-center items-center"
          >
            Edit
          </button>
        )}
        {isUpdateEnabled && isEditing && (
          <CreateSection setIsEditing={setIsEditing} isEditing={isEditing} text={text} timer={timer} setTimer={setTimer} id={id} />
        )}
      </div>
      <div className="mb-10 mt-5">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your message
        </label>
        <textarea
          id="message"
          rows="25"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={text}
          readOnly={!isEditing}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      
    </div>
  );
};

export default TextPage;
