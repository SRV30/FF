import React, { useEffect } from 'react';
import { MapPin, PlusCircle, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { userAddress } from '@/store/address-slice/addressSlice';


const SavedAddress = () => {
  const dispatch = useDispatch();
  const { address, loading, error } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(userAddress());
  }, [dispatch]);
  useEffect(() => {
    console.log(address);  // Log the address data
  }, [address]);
  return (
    <div className='min-h-screen p-4 bg-gray-100 text-black dark:bg-gray-900 dark:text-white'>
      <div className='mx-auto max-w-4xl rounded-lg shadow-lg bg-white p-6 dark:bg-gray-800 dark:text-white'>
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Saved Addresses</h1>
        </div>

        {/* Address List */}
        {loading && <p className='text-center'>Loading...</p>}
        {error && <p className='text-center text-red-500'>{error.message}</p>}
        <div className='space-y-4'>
          {address?.length > 0 ? (
            address.map((item) => (
              <div key={item.id} className='flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700'>
                <div>
                  <h2 className='text-lg font-semibold flex items-center space-x-2'>
                    <MapPin size={18} className='text-blue-500' />
                    <span>{item.address_line}</span>
                  </h2>
                  <p className='text-gray-500 dark:text-gray-400'>{item.city}, {item.state}, {item.zipcode}</p>
                </div>
                <button className='p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors'>
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className='text-center text-gray-500'>No addresses found.</p>
          )}
        </div>

        {/* Add New Address */}
        <button className='mt-6 flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors'>
          <PlusCircle size={18} />
          <span>Add New Address</span>
        </button>
      </div>
    </div>
  );
};

export default SavedAddress;
