import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import makeRequest from '@/utils/makeRequest';
import Select from '@/components/customComponents/Select';
import InputModel from '@/components/InputModel';
import Button from '@/components/customComponents/Button';

const ClusterDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isInputModelOpen, setIsInputModelOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [personNames, setPersonNames] = useState([]);
  const [clusterDetailsData, setClusterDetailsData] = useState(null);
  const [correctedName, setCorrectedName] = useState(clusterDetailsData?.faceImagesArray[0]?.faceName.replace(/[0-9]/g, ''));

  // State to store the selected item _ids
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  useEffect(() => {
    fetchPersonNames();
  }, []);

  const fetchPersonNames = async () => {
    try {
      const response = await makeRequest({ path: 'api/person/getAllPersonNames' });

      if (response) {
        setPersonNames(response?.personNames);
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong while fetching Names!');
    }
  };

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

      if (response) {
        toast.success('Thanks for the correction');
        router.push('/');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong!');
    }

    setIsSubmitLoading(false);
  };

  // Function to handle checkbox selection
  const handleCheckboxChange = (itemId) => {
    setSelectedItemIds((prevIds) => {
      if (prevIds.includes(itemId)) {
        return prevIds.filter((id) => id !== itemId);
      } else {
        return [...prevIds, itemId];
      }
    });
  };

  const handleMoveToCluster = async () => {
    try {
      const response = await makeRequest({
        method: 'POST',
        path: 'api/video/moveToCluster',
        data: { selectedItemIds },
      });

      if (response) {
        toast.success(response?.message);
        router.push('/');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong!');
    }
  };

  const handleAddNewName = () => {
    setIsInputModelOpen(true);
  };

  return (
    <div className='max-w-7xl mx-auto p-4'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-3 w-full my-6'>
        <div className='flex items-center justify-center gap-3 w-full md:w-[40%]'>
          <Button className='px-3 py-1 bg-blue-500 text-white rounded-md whitespace-nowrap' onClick={() => handleAddNewName()}>
            {isSubmitLoading ? 'Processing...' : 'Add New Name'}
          </Button>

          <div className='flex w-full gap-3'>
            <div className='w-full'>
              <Select options={personNames} selected={correctedName} onChange={(selected) => setCorrectedName(selected)} />
            </div>

            <Button
              className='px-3 py-1 bg-blue-500 text-white rounded-md'
              onClick={() => handleSubmit(clusterDetailsData?._id, clusterDetailsData?.clusterName)}
              disabled={isSubmitLoading}>
              {isSubmitLoading ? 'Processing...' : 'Submit'}
            </Button>
          </div>
        </div>

        <Button className='mr-5' onClick={handleMoveToCluster}>
          Move to Cluster
        </Button>
      </div>

      {isPageLoading && <div>Loading Details...</div>}

      {!isPageLoading && clusterDetailsData && (
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-2'>
          {clusterDetailsData.faceImagesArray.map((item) => (
            <div key={item._id} className='p-1 rounded-md relative select-none'>
              <div className='absolute top-0 right-3 rounded-full bg-gray-300 px-1'>
                <input
                  className='h-4 w-4 cursor-pointer mt-1'
                  type='checkbox'
                  checked={selectedItemIds.includes(item._id)}
                  onChange={() => handleCheckboxChange(item._id)}
                />
              </div>

              {/* <div
                className='absolute top-0 right-3 cursor-pointer rounded-full bg-gray-400 px-2'
                onClick={() => handleOnDiscard(item.faceName)}>
                <strong className='text-2xl text-red-600'>&times;</strong>
              </div> */}

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

      <InputModel isOpen={isInputModelOpen} closeModal={() => setIsInputModelOpen(false)} />
    </div>
  );
};

export default ClusterDetails;
