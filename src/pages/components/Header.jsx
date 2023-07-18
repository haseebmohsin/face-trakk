import Back from '@/components/Back';
import Image from 'next/image';
import React from 'react';

export default function Header() {
  return (
    <div className='relative'>
      <header className='py-6 px-4 bg-white shadow fixed inset-x-0 z-50'>
        <Image className='select-none' src='/logo.png' alt='logo' width={160} height={100} />
      </header>

      <div className='sticky max-w-6xl mx-auto w-full mt-6 h-12 flex z-50'>
        <Back />
      </div>
    </div>
  );
}
