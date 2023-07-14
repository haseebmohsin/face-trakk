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
  const [selectedValue, setSelectedValue] = useState(selected || 'unknown');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <select
      id='persons'
      className='bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5'
      value={selectedValue}
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
