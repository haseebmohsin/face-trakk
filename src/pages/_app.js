import 'tw-elements/dist/css/tw-elements.min.css';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '@/components/layouts/MainLayout';

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(
        <>
          <Component {...pageProps} />
        </>
      )}
    </SessionProvider>
  );
}
