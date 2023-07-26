import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Back() {
  const router = useRouter();

  return (
    <>
      <div className='relative w-10 h-10 cursor-pointer hover:scale-110 transition-transform' onClick={() => router.back()}>
        <Image src='/svg/back.svg' alt='back' fill />
      </div>
    </>
  );
}
