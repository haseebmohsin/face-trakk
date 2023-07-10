import React, { useState } from 'react';
import Image from 'next/image';
import Select from './components/customComponents/Select';
import { toast } from 'react-hot-toast';
import { facesData } from '@/data/data';
import axios from 'axios';

const Home = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState({});
  const [error, setError] = useState('');
  const [showPhotos, setShowPhotos] = useState(false);
  const [data, setData] = useState(facesData);
  const [uploadPercentage, setUploadPercentage] = useState(0);

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

  const handleUpload = () => {
    if (!file) {
      setError('Please choose a file.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('video', file);

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/video/upload`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadPercentage(progress);
        },
      })
      .then((response) => {
        setIsLoading(false);
        setShowPhotos(true);
        setFile(null);
        setUploadPercentage(0);

        toast.success('Video uploaded successfully');
      })
      .catch((error) => {
        console.error({ error });
        setIsLoading(false);
        setError('Error uploading the file.');
      });
  };

  const handleSubmit = (itemId) => {
    setIsSubmitLoading((prevLoadingState) => ({
      ...prevLoadingState,
      [itemId]: true, // Set the loading state of the specific item to true
    }));

    // Simulating submitting time
    setTimeout(() => {
      // Filter out the clicked item from the data array
      const updatedData = data.filter((item) => item._id !== itemId);
      setData(updatedData);

      setIsSubmitLoading((prevLoadingState) => ({
        ...prevLoadingState,
        [itemId]: false, // Set the loading state of the specific item to false
      }));

      toast.success('Thanks for the correction');
    }, 1000);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <main className='max-w-7xl mx-auto p-4'>
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
        <button className='w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md' onClick={handleUpload}>
          {isLoading ? 'Processing...' : 'Upload'}
        </button>

        {/* Progress Bar */}
        {isLoading && (
          <div className='w-full h-2 mt-2 bg-gray-300 rounded'>
            <div className='h-full bg-blue-500' style={{ width: `${uploadPercentage}%` }}></div>
            <div className='text-center p-2 text-xl font-semibold'>{uploadPercentage}%</div>
          </div>
        )}

        {showPhotos && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-10'>
            {data.map((image) => (
              <div className='flex flex-col items-center' key={image.id}>
                <div className='relative mb-3 w-full h-full'>
                  <Image
                    className='object-cover w-full h-full select-none'
                    src={image.imagePath}
                    alt='person'
                    width={100}
                    height={100}
                  />
                  <div className='absolute top-0 right-0 bg-gray-800 px-2 py-1 rounded'>
                    <p className={`text-sm font-semibold ${image.percentage > 50 ? 'text-green-300' : 'text-red-400'}`}>
                      {image.percentage}%
                    </p>
                  </div>
                </div>

                <div className='flex flex-row items-center justify-between w-full'>
                  <Select selected={image.id} />

                  <button
                    className='ml-3 px-2 py-2 bg-blue-500 text-white rounded-md'
                    onClick={() => handleSubmit(image._id)}
                    disabled={isSubmitLoading[image._id]}>
                    {isSubmitLoading[image._id] ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
