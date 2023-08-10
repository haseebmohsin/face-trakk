import Link from 'next/link';
import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import Image from 'next/image';

export default function Header() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { data: session, status } = useSession();

  const toggleDropdown = () => {
    setIsDropdownVisible((prevIsDropdownVisible) => !prevIsDropdownVisible);
  };

  const hideDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <>
      <nav
        className='fixed top-0 z-50 w-full px-12 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'
        style={{ zIndex: 99 }}>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-10'>
              <Image className='select-none' src='/forbmax-logo.jpg' alt='logo' width={80} height={100} />

              <div className='text-lg flex justify-center items-center gap-6'>
                <Link href='/training/clusters'>Training</Link>
                <Link href='/dashboard'>Dashboard</Link>
              </div>
            </div>

            <div className='flex items-center relative'>
              <div className='flex items-center ml-3'>
                <div
                  className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600 cursor-pointer'
                  aria-expanded={isDropdownVisible}
                  onClick={toggleDropdown}>
                  <span className='sr-only'>Open user menu</span>

                  <span className='font-medium select-none text-gray-600 dark:text-gray-300'>U</span>
                </div>

                {isDropdownVisible && (
                  <div
                    className='z-50 absolute top-12 right-0 mb-1 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 '
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='dropdown-user'
                    onBlur={hideDropdown}>
                    <div className='px-4 py-3' role='none'>
                      {/* <p className='text-sm text-gray-900 dark:text-white' role='none'>
                        Username
                      </p> */}

                      <p className='text-sm font-medium text-gray-900 truncate dark:text-gray-300' role='none'>
                        {session?.user?.email}
                      </p>
                    </div>

                    <ul className='py-1' role='none'>
                      <li>
                        <a
                          href='#'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                          role='menuitem'
                          onClick={async () => {
                            const data = await signOut({ redirect: false, callbackUrl: '/login' });
                            Router.push(data.url);
                          }}>
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
