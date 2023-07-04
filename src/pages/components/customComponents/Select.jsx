import React, { useState } from 'react';

const options = [
  { value: 'unknown', label: 'Unknown' },
  { value: 'imran', label: 'Imran Khan' },
  { value: 'shahbaz', label: 'Shahbaz Shareef' },
  { value: 'hamid-mir', label: 'Hamid Mir' },
  { value: 'ahsan-iqbal', label: 'Ahsan Iqbal' },
  { value: 'zardari', label: 'Zardari' },
  { value: 'nawaz', label: 'Nawaz Shareef' },
  { value: 'bilawal', label: 'Bilawal' },
  { value: 'imran-riaz', label: 'Imran Riaz' },
];

function Select({ selected, onChange }) {
  const [selectedValue, setSelectedValue] = useState(selected);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
  };

  return (
    <select
      id='persons'
      className='bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5'
      value={selectedValue}
      onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
