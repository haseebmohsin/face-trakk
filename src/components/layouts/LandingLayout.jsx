import Head from 'next/head';
import LandingHeader from '../Landing';

function LandingLayout({ children }) {
  return (
    <>
      <Head>
        <title>Facial Recognition</title>
      </Head>

      <div>{children}</div>
    </>
  );
}

export default LandingLayout;
