import React from 'react';
import Pagination from './Pagination';

export default function Table({ children, noAction }) {
  return (
    <div className={`overflow-x-auto ${noAction ? 'pb-6' : 'pb-40'}`}>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 my-2'>{children}</table>

      {/* <Pagination /> */}
    </div>
  );
}
