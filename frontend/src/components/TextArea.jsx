import React from 'react'

const TextArea = ({text, setText}) => {
  return (
    <div className='mt-10'>     
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
        <textarea id="message" rows="20" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Write your thoughts here..."></textarea>
    </div>
  )
}

export default TextArea