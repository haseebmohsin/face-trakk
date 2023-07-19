import React from 'react';

const Select = ({ selected, onChange }) => {
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

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <select
      className='bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5'
      value={selected}
      onChange={handleSelectChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
