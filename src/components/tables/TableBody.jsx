import React, { useState } from 'react';
import Image from 'next/image';
import Loader from '../Loader';
import TableDropdown from './TableDropdown';
import VideoPlayerModal from '../modals/VideoPlayerModal';

export default function TableBody(props) {
  const { data, fields, isLoading, actions, handleDetails, handleEdit, handleDelete } = props;

  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  const [startTime, setStartTime] = useState('');

  const openVideoPlayer = (item) => {
    setStartTime(item.startTime);
    setIsVideoPlayerOpen(true);
  };

  const closeVideoPlayer = () => {
    setIsVideoPlayerOpen(false);
  };

  const renderLoadingRow = () => (
    <tr>
      <td colSpan={fields.length + 1} className='py-4 px-2 text-lg'>
        <div className='flex items-center justify-center'>
          <Loader height='50' isLoading={isLoading} />
        </div>
      </td>
    </tr>
  );

  const renderDataRow = () =>
    data?.map((item) => (
      <tr key={item._id} className='border-b dark:border-gray-700 text-center whitespace-nowrap'>
        {fields?.map((field) => {
          if (field.includes('Date')) {
            item[field] = item[field].toString().substring(0, 10);
          }

          let fieldValue = item[field];

          if (field === 'startTime') {
            fieldValue = fieldValue[0];
          }

          if (field === 'endTime') {
            fieldValue = fieldValue[fieldValue.length - 1];
          }

          const renderValue = () => {
            if (fieldValue === '') {
              return <span>----</span>;
            }

            if (field === 'thumbnail') {
              return (
                <div className='flex justify-center items-center'>
                  <Image
                    className='cursor-pointer'
                    src={`data:item/jpeg;base64,${fieldValue}`}
                    alt='thumbnail'
                    width={60}
                    height={50}
                    onClick={() => openVideoPlayer(item)}
                  />
                </div>
              );
            }

            if (fieldValue?.length > 20) {
              return <span>{fieldValue?.substring(0, 20)}&hellip;</span>;
            }

            return fieldValue;
          };

          return (
            <td key={field} className='p-2'>
              {renderValue()}
            </td>
          );
        })}
        {actions && (
          <TableDropdown
            id={item._id}
            actions={actions}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </tr>
    ));

  const renderEmptyRow = () => (
    <tr>
      <td colSpan={fields.length + 1} className='py-4 px-2 text-lg'>
        No data found
      </td>
    </tr>
  );

  return (
    <>
      <tbody>{isLoading ? renderLoadingRow() : data?.length > 0 ? renderDataRow() : renderEmptyRow()}</tbody>

      <VideoPlayerModal
        isOpen={isVideoPlayerOpen}
        closeVideoPlayer={closeVideoPlayer}
        videoUrl='/videos/output.mp4'
        startTime={startTime[0]}
      />
    </>
  );
}
