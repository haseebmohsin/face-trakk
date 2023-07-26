import React, { useEffect, useRef } from 'react';

const VideoPlayerModal = ({ isOpen, closeVideoPlayer, videoUrl, startTime }) => {
  const videoRef = useRef(null);

  const parseTimeToSeconds = (time) => {
    const timeParts = time.split(':').map(parseFloat);
    const [hours, minutes, seconds] = timeParts;

    return hours * 3600 + minutes * 60 + seconds;
  };

  useEffect(() => {
    // Define the onCanPlay function
    const onCanPlay = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        const startTimeInSeconds = parseTimeToSeconds(startTime);
        videoElement.currentTime = startTimeInSeconds;
        videoElement.removeEventListener('canplay', onCanPlay);
      }
    };

    if (isOpen) {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.addEventListener('canplay', onCanPlay);
      }
    }

    return () => {
      // Clean up the event listener when the component is unmounted or isOpen is false.
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.removeEventListener('canplay', onCanPlay);
      }
    };
  }, [isOpen, startTime]);

  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-gray-800'>
      <div className='relative w-70vw h-70vh max-w-5xl p-14'>
        <button
          className='absolute top-0 right-8 p-2 text-red-600 hover:text-red-700 text-3xl bg-gray-400 rounded-full'
          onClick={closeVideoPlayer}>
          X
        </button>

        <video controls width='800' height='550' ref={videoRef}>
          <source src={videoUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
