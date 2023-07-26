import React from 'react';

export default function TableHead({ entries }) {
  return (
    <thead className='text-sm text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap'>
      <tr>
        {entries.map((item, index) => (
          <th key={index} scope='col' className='p-2'>
            {item}
          </th>
        ))}

        <th scope='col' className='p-2'>
          <span className=''></span>
        </th>
      </tr>
    </thead>
  );
}
