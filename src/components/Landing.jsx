import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Button from './Button';

function Landing() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className={`${styles.header} h-screen bg-cover bg-center flex flex-col`}>
      {/* Background Overlay */}
      <div className={styles.overlay}></div>

      {/* Background image */}
      <Image src='/background.jpg' alt='Background' fill className='object-cover h-full w-full absolute inset-0 z-0' />

      {/* Navigation */}
      <div className='z-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6 md:justify-start md:space-x-10'>
            <div className='flex justify-start lg:w-0 lg:flex-1 text-2xl font-semibold'>
              <Image src='/facetrakk-tr-logo.png' alt='logo' width={200} height={100} className='mb-12' />
            </div>

            <nav className='hidden md:flex space-x-10 text-lg font-medium'>
              {/* <div
                className='text-white hover:text-gray-100 cursor-pointer'
                onClick={() => signIn('credentials', { redirect: false })}>
                Login
              </div> */}

              <Link className='text-white hover:text-gray-100' href='/login'>
                Login
              </Link>

              <Link className='text-white hover:text-gray-100' href='/register'>
                Register
              </Link>
            </nav>

            <div className='-mr-2 -my-2 md:hidden'>
              <button
                type='button'
                className='p-2 inline-flex items-center justify-center rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none border-none'
                aria-expanded={isOpen}
                onClick={toggleMenu}>
                <span className='sr-only'>Open menu</span>

                <svg
                  className={`block h-6 w-6 ${isOpen ? 'hidden' : ''}`}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                </svg>

                <svg
                  className={`block h-6 w-6 ${isOpen ? '' : 'hidden'}`}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Render mobile menu when isOpen state is true */}
        {isOpen && (
          <div className='md:hidden absolute inset-x-0 bg-gray-600 h-24'>
            <div className='flex flex-col items-center pt-2 pb-3 space-y-3 sm:px-3'>
              <Link
                className='text-base font-medium text-white hover:text-gray-200 bg-gray-500 hover:bg-gray-400 w-full text-center py-1'
                href='/login'>
                Login
              </Link>

              <Link
                className='text-base font-medium text-white hover:text-gray-200 bg-gray-500 hover:bg-gray-400 w-full text-center py-1'
                href='/register'>
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* Navigation ends */}

      <div className='flex flex-col items-center justify-center w-10/12 md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto z-10 text-white space-y-8 my-auto'>
        <h1 className='text-3xl text-center font-bold text-white md:text-5xl md:tracking-widest'>
          Unlock with a glance. Experience seamless facial recognition today!
        </h1>

        <Link href='/register'>
          <Button className='py-2 px-10' variant='contained'>
            Register
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default Landing;
