import React from 'react';

const SmallTable = ({ title, data }) => {
  return (
    <div className='p-2'>
      <table className='table-auto'>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className='border px-4 py-2 font-semibold'>{item.label}</td>
              <td className='border px-4 py-2'>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SmallTable;
