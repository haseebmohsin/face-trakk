import Landing from '@/components/Landing';
import LandingLayout from '@/components/layouts/LandingLayout';
import Head from 'next/head';
export default function Home() {
  return (
    <>
      <Head>
        <title>Facial Recognition</title>

        <meta name='description' content='Facial Recognition Application' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />

        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Landing />
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};
