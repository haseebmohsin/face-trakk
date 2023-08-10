import 'tw-elements/dist/css/tw-elements.min.css';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '@/components/layouts/MainLayout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
