import React, { useState } from 'react';
import Input from './customComponents/Input';
import Button from './customComponents/Button';
import makeRequest from '@/utils/makeRequest';
import { toast } from 'react-hot-toast';

const InputModel = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true });

    if (name.trim() === '') {
      setErrors({ name: 'Name is required' });
      return;
    }

    try {
      const response = await makeRequest({
        method: 'POST',
        path: 'api/person/addPersonName',
        data: { name },
      });

      if (response) {
        toast.success(response?.message || 'Name Saved!');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong!');
    }

    setFormSubmitLoading(true);

    setFormSubmitLoading(false);
    closeModal();
  };

  const handleChange = (e) => {
    setName(e.target.value);
    setErrors({ ...errors, name: '' });
  };

  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[30%] flex items-center justify-center z-50 rounded-lg bg-gray-50 shadow-xl border'>
      <div className='relative w-full h-full max-w-3xl p-3'>
        <strong
          className='absolute top-0 right-0 p-2 pr-3 cursor-pointer text-red-600 hover:text-red-700 text-3xl'
          onClick={closeModal}>
          &times;
        </strong>

        <div className='p-6'>
          <form onSubmit={handleSubmit}>
            <div>
              <div className='my-4'>
                <Input label='Enter Name' id='name' name='name' placeholder='Enter Name' value={name} onChange={handleChange} />

                {errors.name && touched.name && <div className='text-red-500 text-sm mt-2 ml-1'>{errors.name}</div>}
              </div>
            </div>
            {/* footer */}
            <div className='flex justify-end gap-2 mt-16'>
              <Button variant='default' onClick={closeModal}>
                Cancel
              </Button>

              <Button isLoading={formSubmitLoading}>Save</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputModel;
