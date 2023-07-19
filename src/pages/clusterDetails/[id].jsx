import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import makeRequest from '@/utils/makeRequest';
import Select from '../components/customComponents/Select';

const ClusterDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [clusterDetailsData, setClusterDetailsData] = useState(null);
  const [correctedName, setCorrectedName] = useState('');

  useEffect(() => {
    if (id) {
      fetchClusterDetails();
    }
  }, [id]);

  const fetchClusterDetails = async () => {
    try {
      const response = await makeRequest({ path: `api/video/getClusterData/${id}` });
      setClusterDetailsData(response.cluster);
      console.log(response.cluster.faceImagesArray[0].faceName);
    } catch (error) {
      toast.error(error?.message || 'Something went wrong!');
    }

    setIsPageLoading(false);
  };

  const handleSubmit = (id, clusterName) => {
    setIsSubmitLoading(true);

    setTimeout(() => {
      // // Filter out the clicked item from the data array
      // const updatedData = data.filter((item) => item._id !== itemId);
      // setData(updatedData);

      // setIsSubmitLoading((prevLoadingState) => ({
      //   ...prevLoadingState,
      //   [itemId]: false, // Set the loading state of the specific item to false
      // }));

      const data = {
        clusterName,
        correctedName,
        oldNamesArray: clusterDetailsData?.faceImagesArray.map((item) => item.faceName),
      };

      console.log(data);

      toast.success('Thanks for the correction');
      setIsSubmitLoading(false);
    }, 2000);
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex w-72 mb-3'>
        <Select
          selected={clusterDetailsData?.faceImagesArray[0].faceName.replace(/[0-9]/g, '')}
          setCorrectedName={setCorrectedName}
        />

        <button
          className='ml-3 px-2 py-2 bg-blue-500 text-white rounded-md'
          onClick={() => handleSubmit(clusterDetailsData?._id, clusterDetailsData?.clusterName)}
          disabled={isSubmitLoading[clusterDetailsData?._id]}>
          {isSubmitLoading[clusterDetailsData?._id] ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {isPageLoading && <div>Loading Details...</div>}

      {!isPageLoading && clusterDetailsData && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-2'>
          {clusterDetailsData.faceImagesArray.map((item) => (
            <div key={item.faceName} className=' p-2 rounded-md'>
              <Image
                src={`data:image/jpeg;base64,${item.faceImage}`}
                alt={item.faceName}
                width={180}
                height={80}
                objectFit='cover'
              />
              <p className='text-center mt-2'>{item.faceName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClusterDetails;
