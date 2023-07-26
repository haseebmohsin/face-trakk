import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { ToggleSwitch } from '@/components/ToggleSwitch';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Table from '@/components/tables/Table';
import TableHead from '@/components/tables/TableHead';
import TableBody from '@/components/tables/TableBody';
import { data } from '@/data/data';
import { toast } from 'react-hot-toast';
import makeRequest from '@/utils/makeRequest';

const MyDatepicker = dynamic(() => import('@/components/MyDatepicker'), { ssr: false });
const MyTimepicker = dynamic(() => import('@/components/MyTimepicker'), { ssr: false });

const entries = ['Thumbnail', 'Person Name', 'Start Time', 'End Time', 'Coverage Time'];
const fields = ['thumbnail', 'name', 'startTime', 'endTime', 'coverageTime'];
// const actions = ['Details'];

const channelOptions = [
  {
    _id: '64ba601726d32df64af4385c',
    personName: 'Geo News',
  },
  {
    _id: '64ba619f26d32df64af43879',
    personName: 'Ary News',
  },
];

function Dashboard() {
  // const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [dummyData, setDummyData] = useState(data);
  const [personNames, setPersonNames] = useState([]);

  const [personsData, setPersonsData] = useState([]);
  const [selectedPersonName, setSelectedPersonName] = useState('Unknown');

  const [showData, setShowData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await makeRequest({ path: `api/facedash/getThumbnails` });

        setPersonsData(response?.thumbnails);
      } catch (error) {
        toast.error(error?.message || 'Something went wrong!');
      }

      setIsLoading(false);
    };

    fetchData();

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

  const onSearch = (e) => {
    console.log(e.target.value);
  };

  const handleToggleSwitchChange = async (checked) => {
    setSwitchChecked(checked); // Update the switch state when the user interacts with the switch

    if (checked) {
      setIsLoading(true);

      try {
        const response = await makeRequest({
          method: 'POST',
          path: 'api/facedash/liveVideo',
          data,
        });

        setPersonsData(response?.thumbnails);

        if (response) {
          toast.success(response?.message);
        }
      } catch (error) {
        toast.error(error?.message || 'Something went wrong!');
      }

      setShowData(true);
      setIsLoading(false);
    } else {
      setShowData(false);
    }
  };

  const handleDetails = (id) => {
    console.log(id);
  };

  return (
    <>
      <div className='flex justify-center p-6 mt-16 max-w-7xl mx-auto'>
        <div className='relative dark:bg-gray-800 overflow-hidden w-[90%]'>
          <div className='flex flex-col gap-6 p-1 mb-3'>
            <div className='flex flex-col md:flex-row justify-center items-center gap-2'>
              <div className='flex gap-2 w-[60%]'>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={onSearch} />
              </div>

              <div className='flex items-center justify-between gap-4 w-full'>
                <Select title='Choose Channel' options={channelOptions} />

                <Select
                  title='Choose Person Name'
                  options={personNames}
                  selected={selectedPersonName}
                  onChange={(selected) => setSelectedPersonName(selected)}
                />

                <ToggleSwitch checked={switchChecked} onChange={handleToggleSwitchChange} />
              </div>
            </div>

            <div className='flex flex-col md:flex-row justify-center md:items-center items-end gap-4'>
              {/* Date range */}
              {/* <div className='flex gap-2 w-full'>
                <MyDatepicker title='Start Date' />
                <MyDatepicker title='End Date' />
              </div> */}

              {/* Time range */}
              <div className='flex gap-2 w-full'>
                <MyTimepicker title='Start Time' />
                <MyTimepicker title='End Time' />
              </div>

              <div>
                <Button onClick={() => console.log('clicking apply')}>Apply</Button>
              </div>
            </div>
          </div>

          <div>
            <div className='ml-0.5'>
              <Button onClick={() => console.log('clicking create new label')}>Create Label</Button>
            </div>

            <Table>
              <TableHead entries={entries} />

              {/* Conditionally render TableBody based on the value of showData */}
              <TableBody fields={fields} data={personsData || []} isLoading={isLoading} handleDetails={handleDetails} />
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
