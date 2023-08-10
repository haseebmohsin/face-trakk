import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';
import bcrypt from 'bcryptjs';
import Router from 'next/router';
import Button from '@/components/Button';
import Image from 'next/image';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = {
      id: Math.floor(Math.random() * 10) + 1,
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 12),
    };

    console.log(user);

    setIsLoading(false);
    Router.push('/login');
  };

  return (
    <>
      <section className='h-screen'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <Image src='/forbmax-logo.jpg' alt='logo' width={150} height={80} className='mb-12' />

          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Register your Account
              </h1>

              <form className='space-y-4 md:space-y-6' action='#'>
                <div>
                  <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Username
                  </label>
                  <input
                    type='username'
                    name='username'
                    id='username'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <Button className='w-full py-3' isLoading={isLoading} onClick={handleSubmit}>
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>

            <div className='flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 dark:border-gray-700'>
              <span className='text-sm font-medium text-gray-900 dark:text-white'>Already have an account?</span>
              <Link
                href='/login'
                className='ml-2 text-sm font-medium text-primary-600 hover:text-primary-500 dark:hover:text-blue-500'>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Register.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Register;
