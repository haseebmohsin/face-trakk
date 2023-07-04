import ToastProvider from '@/providers/ToastProvider';
import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <>
      <ToastProvider />
      <Header />

      <div className='pb-32 pt-28' style={{ minHeight: 'calc(100vh - 84px)' }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
