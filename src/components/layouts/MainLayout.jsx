import ToastProvider from '@/providers/ToastProvider';
import Header from '../Header';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Facial Recognition</title>
      </Head>

      <ToastProvider />
      <Header />

      <main className='pb-32 pt-28' style={{ minHeight: 'calc(100vh - 84px)' }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
