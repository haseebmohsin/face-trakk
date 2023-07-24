import React, { useState } from 'react';
import Image from 'next/image';
import Button from './customComponents/Button';
import makeRequest from '@/utils/makeRequest';
import { toast } from 'react-hot-toast';

export default function Header() {
  const [isTrainingLoading, setIsTrainingLoading] = useState(false);

  const handleStartTraining = async () => {
    setIsTrainingLoading(true);

    try {
      const response = await makeRequest({
        method: 'POST',
        path: 'api/video/startTraining',
        data: {},
      });

      console.log(response);

      if (response) {
        toast.success(response?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || 'Something went wrong!');
    } finally {
      setIsTrainingLoading(false);
    }
  };

  return (
    <div className='relative'>
      <header className='flex items-center gap-10 py-6 px-4 bg-white shadow fixed inset-x-0 z-50'>
        <Image className='select-none' src='/logo.png' alt='logo' width={160} height={100} />

        <Button isLoading={isTrainingLoading} onClick={handleStartTraining}>
          Start Training
        </Button>
      </header>

      {/* <div className='sticky max-w-6xl mx-auto w-full h-12 flex z-50'>
        <Back />
      </div> */}
    </div>
  );
}
