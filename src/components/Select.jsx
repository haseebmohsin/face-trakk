import React from 'react';

const Select = ({ options, selected, onChange }) => {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <select
      className='bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-2.5'
      value={selected}
      onChange={handleSelectChange}>
      <option value='Unknown'>Unknown</option>

      {options.map((option) => (
        <option key={option._id} value={option.personName}>
          {option.personName}
        </option>
      ))}
    </select>
  );
};

export default Select;
