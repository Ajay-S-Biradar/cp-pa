import React, { useEffect, useState } from 'react';

const Id = ({id,setId}) => {
  const [alert,setAlert] = useState(false);

  useEffect(()=>{
    id?.length<4?setAlert(true):setAlert(false);
  },[id])

  function generateUniqueId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    setId(result);
  }

  return (
    <div className='mt-10'>
      <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Write Id for the link or click on random to generate random id
      </label>
      <div className='flex justify-start items-center gap-4'>
        <input
          type="text"
          id="helper-text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter the id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          type="button"
          onClick={generateUniqueId}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2"
        >
          Random
        </button>
      </div>
      <p id="helper-text-explanation" className={`${alert?"text-red-500 ":"text-gray-400 "} "ml-3 mt-1 text-sm text-gray-400 dark:text-gray-400"`}>
        The Id should be at least 4 characters. See our <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">demo</a>.
      </p>
    </div>
  );
}

export default Id;
