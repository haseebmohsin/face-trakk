import { useRouter } from 'next/router';
import Image from 'next/image';

const ErrorPage = () => {
  const router = useRouter();
  const { status } = router.query;

  if (status === '500') {
    // Render the custom server error page
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-16 h-16 text-red-500 mb-6'
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

        <h1 className='text-4xl font-semibold text-gray-800 mb-4'>500 - Internal Server Error</h1>

        <p className='text-gray-600 text-lg mb-8'>Oops! Something went wrong on the server side. Please try again later.</p>

        <div
          className='flex justify-center items-center cursor-pointer border border-green-300 p-2'
          onClick={() => router.push('/')}>
          <Image src='/svg/home.svg' alt='home' width={25} height={25} />
          <p className='text-center mx-3'>Back to Home</p>
        </div>
      </div>
    );
  }

  // Render the custom 404 page
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-16 h-16 text-red-500 mb-6'
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

      <h1 className='text-4xl font-semibold text-gray-800 mb-4'>404 - Page Not Found</h1>

      <p className='text-gray-600 text-lg mb-8'>Oops! The page you're looking for does not exist.</p>

      <div
        className='flex justify-center items-center cursor-pointer border border-green-300 p-2'
        onClick={() => router.push('/')}>
        <Image src='/svg/home.svg' alt='home' width={25} height={25} />
        <p className='text-center mx-3'>Back to Home</p>
      </div>
    </div>
  );
};

// ErrorPage.getLayout = function getLayout(page) {
//   return <AuthLayout>{page}</AuthLayout>;
// };

export default ErrorPage;
