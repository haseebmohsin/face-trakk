import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const TableDropdown = (props) => {
  const {
    id,
    actions,
    handleAssignToCrop,
    handleAssignResources,
    handleScheduleDetails,
    handleDetails,
    handleEdit,
    handleDelete,
  } = props;

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action) => {
    if (action === 'Assign to Crop') {
      handleAssignToCrop(id);
    }

    if (action === 'Assign Resources') {
      handleAssignResources(id);
    }

    if (action === 'Schedule Details') {
      handleScheduleDetails(id);
    }

    if (action === 'Details') {
      handleDetails(id);
      setIsOpen(false);
    }

    if (action === 'Edit') {
      handleEdit(id);
    }

    if (action === 'Delete') {
      handleDelete(id);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <td className='p-4 flex items-center justify-end text-left'>
      <div className='relative' ref={dropdownRef}>
        <button
          id={`dropdown-button-${id}`}
          data-dropdown-toggle={`dropdown-${id}`}
          className='inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100'
          onClick={handleToggle}>
          <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
          </svg>
        </button>

        {isOpen && (
          <div
            id='dropdown'
            className='z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-8 right-0'>
            <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefaultButton'>
              {actions.map((action) => (
                <li
                  key={action}
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                  onClick={() => handleActionClick(action)}>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </td>
  );
};

export default TableDropdown;
