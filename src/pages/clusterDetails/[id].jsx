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
  const [correctedName, setCorrectedName] = useState(clusterDetailsData?.faceImagesArray[0]?.faceName.replace(/[0-9]/g, ''));

  useEffect(() => {
    if (id) {
      fetchClusterDetails();
    }
  }, [id]);

  const fetchClusterDetails = async () => {
    try {
      const response = await makeRequest({ path: `api/video/getClusterData/${id}` });
      setClusterDetailsData(response.cluster);
    } catch (error) {
      toast.error(error?.message || 'Something went wrong!');
    }

    setIsPageLoading(false);
  };

  const handleSubmit = async () => {
    setIsSubmitLoading(true);

    const data = {
      cluster_id: clusterDetailsData._id,
      xml_path: 'scripts/dataset_generate',
      old_names_array: clusterDetailsData?.faceImagesArray.map((item) => item.faceName),
      new_label: correctedName,
    };

    try {
      const response = await makeRequest({
        method: 'POST',
        path: 'api/video/xmlUpdate',
        data,
      });

      console.log(response);

      if (response) {
        toast.success('Thanks for the correction');
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || 'Something went wrong!');
    }

    setIsSubmitLoading(false);
  };

  const handleOnDiscard = (faceName) => {
    // Filter out the clicked item based on faceName
    const updatedFaceImagesArray = clusterDetailsData.faceImagesArray.filter((item) => item.faceName !== faceName);
    setClusterDetailsData((prevData) => ({
      ...prevData,
      faceImagesArray: updatedFaceImagesArray,
    }));
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex w-72 mb-3'>
        <Select selected={correctedName} onChange={(selected) => setCorrectedName(selected)} />

        <button
          className='ml-3 px-2 py-2 bg-blue-500 text-white rounded-md'
          onClick={() => handleSubmit(clusterDetailsData?._id, clusterDetailsData?.clusterName)}
          disabled={isSubmitLoading}>
          {isSubmitLoading ? 'Processing...' : 'Submit'}
        </button>
      </div>

      {isPageLoading && <div>Loading Details...</div>}

      {!isPageLoading && clusterDetailsData && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-2'>
          {clusterDetailsData.faceImagesArray.map((item) => (
            <div key={item.faceName} className='p-2 rounded-md relative'>
              <div
                className='absolute top-1 right-3 cursor-pointer rounded-full bg-gray-400'
                onClick={() => handleOnDiscard(item.faceName)}>
                <strong class='text-3xl text-red-600'>&times;</strong>
              </div>

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
