import React, { useState } from 'react';

const options = [
  { value: 'Unknown', label: 'Unknown' },
  { value: 'Imran Khan', label: 'Imran Khan' },
  { value: 'Nawaz Shareef', label: 'Nawaz Shareef' },
  { value: 'Shahbaz Shareef', label: 'Shahbaz Shareef' },
  { value: 'Zardari', label: 'Zardari' },
  { value: 'Bilawal Bhutto', label: 'Bilawal Bhutto' },
  { value: 'Hamid Mir', label: 'Hamid Mir' },
  { value: 'Ahsan Iqbal', label: 'Ahsan Iqbal' },
  { value: 'Attaullah Tarar', label: 'Attaullah Tarar' },
];

function Select({ selected, setCorrectedName }) {
  const handleChange = (event) => {
    setCorrectedName(event.target.value);
  };

  return (
    <select
      id='persons'
      className='bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5'
      value={selected}
      onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
