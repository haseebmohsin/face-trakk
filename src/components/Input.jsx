import React from 'react';

export default function Input({ label, type = 'text', ...rest }) {
  return (
    <>
      {label && (
        <label htmlFor={label} className='block mb-2 text-md font-medium text-gray-900 dark:text-white ml-1'>
          {label}
        </label>
      )}

      <input
        id='base-input'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        type={type}
        {...rest}
      />
    </>
  );
}
