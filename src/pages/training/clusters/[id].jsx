import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import makeRequest from '@/utils/makeRequest';
import Button from '@/components/Button';
import Select from '@/components/Select';
import InputModal from '@/components/modals/InputModal';
import MoveToNewClusterModal from '@/components/mui/modals/MoveToNewClusterModal';

const ClusterDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isMoveToNewClusterModalOpen, setIsMoveToNewClusterModalOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [personNames, setPersonNames] = useState([]);
  const [clusterDetailsData, setClusterDetailsData] = useState(null);
  const [correctedName, setCorrectedName] = useState(clusterDetailsData?.faceImagesArray[0]?.faceName.split('_')[0]);

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
      const response = await makeRequest({ path: `api/training/getClusterData/${id}` });
      setClusterDetailsData(response.cluster);
    } catch (error) {
      toast.error(error?.message || 'Something went wrong!');
    }

    setIsPageLoading(false);
  };

  const handleSubmit = async () => {
    if (selectedItemIds.length < 5) {
      toast.error('You must select minimum 5 images');
      return;
    }

    setIsSubmitLoading(true);

    const data = {
      cluster_id: clusterDetailsData._id,
      selectedItemIds,
      label: correctedName.replace(/\s+/g, '_'),
    };

    try {
      const response = await makeRequest({
        method: 'POST',
        path: 'api/training/createAdditionalTrainingDatasets',
        data,
      });

      if (response) {
        toast.success(response?.message || 'Done!');
        router.push('/training/clusters');
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

  const handleMoveToNewCluster = async (clusterId) => {
    const data = {
      clusterId: clusterId || '',
      selectedItemIds,
    };

    try {
      const response = await makeRequest({
        method: 'POST',
        path: 'api/training/moveToNewCluster',
        data,
      });

      if (response) {
        toast.success(response?.message);
        router.push('/training/clusters');
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong!');
    }
  };

  const handleAddNewName = () => {
    setIsInputModalOpen(true);
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

        {selectedItemIds.length > 0 && (
          <Button className='' onClick={() => setIsMoveToNewClusterModalOpen(true)}>
            Move to New Cluster
          </Button>
        )}
      </div>

      {isPageLoading && <p className='text-center text-xl'>Loading Data...</p>}

      {!isPageLoading && clusterDetailsData && (
        <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-8 mt-2'>
          {clusterDetailsData.faceImagesArray.map((item) => (
            <div key={item._id} className='p-1 rounded-md  select-none'>
              <div className='relative w-32 h-32 cursor-pointer' onClick={() => handleCheckboxChange(item._id)}>
                <div className='absolute -top-1 -right-1 rounded-full bg-gray-300 px-1 z-50'>
                  <input
                    className='h-4 w-5 cursor-pointer mt-1'
                    type='checkbox'
                    checked={selectedItemIds.includes(item._id)}
                    readOnly
                  />
                </div>

                <Image src={`data:image/jpeg;base64,${item.faceImage}`} alt={item.faceName} fill />

                <p className='text-center mt-2 absolute z-50 -bottom-6 left-0'>{item.faceName}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <InputModal isOpen={isInputModalOpen} closeModal={() => setIsInputModalOpen(false)} />

      <MoveToNewClusterModal
        isOpen={isMoveToNewClusterModalOpen}
        closeModal={() => setIsMoveToNewClusterModalOpen(false)}
        handleMoveToNewCluster={handleMoveToNewCluster}
      />
    </div>
  );
};

export default ClusterDetails;
