import Head from 'next/head';

function AuthLayout({ children }) {
  return (
    <>
      <Head>
        <title>Login or Register</title>
      </Head>

      <div className='h-screen'>{children}</div>
    </>
  );
}

export default AuthLayout;
