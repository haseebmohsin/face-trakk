import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import makeRequest from '@/utils/makeRequest';
import axios from 'axios';
import Image from 'next/image';
import Button from '@/components/Button';

const Clusters = () => {
  const router = useRouter();

  const [isTrainingLoading, setIsTrainingLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClusterDataFetchLoading, setIsClusterDataFetchLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [clusterData, setClusterData] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setError('');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please choose a file.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/video/upload`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadPercentage(progress);
        },
      });

      if (response) {
        setIsLoading(false);
        setFile(null);
        setUploadPercentage(0);

        setClusterData(response?.data?.clusters);

        toast.success(response?.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      setError('Error uploading the file.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeRequest({ path: `api/video/getClustersData` });

        setClusterData(response?.clusters);
      } catch (error) {
        toast.error(error?.message || 'Something went wrong!');
      }

      setIsClusterDataFetchLoading(false);
    };

    fetchData();
  }, []);

  const handleStartTraining = async () => {
    setIsTrainingLoading(true);

    try {
      const response = await makeRequest({
        method: 'POST',
        path: 'api/video/startTraining',
        data: {},
      });

      if (response) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong!');
    } finally {
      setIsTrainingLoading(false);
    }
  };

  return (
    <main className='max-w-7xl mx-auto p-2'>
      <div className='flex justify-end items-center gap-2 mb-3 text-lg'>
        {isTrainingLoading && <p>Training is in progress...</p>}

        <Button isLoading={isTrainingLoading} onClick={handleStartTraining}>
          Start Training
        </Button>
      </div>

      <div className='flex flex-col items-center'>
        <div className='flex items-center justify-center w-full'>
          {/* File Upload */}
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            {/* File Upload Icon */}
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <svg
                aria-hidden='true'
                className='w-10 h-10 mb-3 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'></path>
              </svg>
              <p className='mb-2 text-sm text-gray-500'>
                <span className='font-semibold'>Click to upload</span> or drag and drop
              </p>
              <p className='text-xs text-gray-500'>Video formats only</p>
            </div>

            {/* File Input */}
            <input id='dropzone-file' type='file' accept='video/*' className='hidden' onChange={handleFileChange} />
          </label>
        </div>

        {file && <p className='mt-2 text-gray-500'>Selected file: {file.name}</p>}
        {error && <p className='mt-2 text-red-500'>{error}</p>}

        {/* Upload Button */}
        <button
          className={`w-full px-4 py-2 mt-4 rounded-md ${
            isLoading ? 'cursor-not-allowed bg-blue-200' : 'bg-blue-500 text-white'
          }`}
          onClick={handleUpload}
          disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Upload'}
        </button>

        {/* Progress Bar */}
        {isLoading && uploadPercentage != 100 && (
          <div className='w-full h-2 mt-2 bg-gray-300 rounded'>
            <div className='h-full bg-blue-500' style={{ width: `${uploadPercentage}%` }}></div>
            <div className='text-center p-2 text-xl font-semibold'>{uploadPercentage}%</div>
          </div>
        )}

        {isClusterDataFetchLoading && <div className='m-6 text-lg'>Loading data...</div>}

        {!isClusterDataFetchLoading && clusterData?.length === 0 && <div className='m-14 text-lg'>No data found.</div>}

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10'>
          {clusterData?.map((item, index) => (
            <div key={item._id} className='flex flex-col items-center' onClick={() => router.push(`/training/${item._id}`)}>
              <div className='p-2 rounded-md relative cursor-pointer'>
                <Image
                  className='cursor-pointer rounded-md transition-transform hover:scale-105'
                  src={`data:item/jpeg;base64,${item.faceImagesArray[0]?.faceImage}`}
                  alt='person'
                  width={180}
                  height={80}
                  objectFit='cover'
                />

                <p className='text-center mt-2 text-xl'>{item.faceImagesArray[0]?.faceName.replace(/[0-9]/g, '')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Clusters;
