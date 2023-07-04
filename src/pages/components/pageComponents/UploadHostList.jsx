export default function UploadHostList() {
  return (
    <div className='max-w-4xl mx-auto mt-32'>
      <div className='flex flex-col items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-16 h-16 text-gray-600 mb-6'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <circle cx='12' cy='12' r='10' />
          <line x1='12' y1='16' x2='12' y2='12' />
          <line x1='12' y1='8' x2='12' y2='8' />
        </svg>

        <h1 className='text-4xl font-semibold text-gray-800 mb-4'>Coming Soon.</h1>

        <p className='text-gray-600 text-lg mb-8'>Please visit in a while.</p>
      </div>
    </div>
  );
}
