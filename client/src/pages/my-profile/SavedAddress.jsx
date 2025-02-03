import React, { useState } from 'react';
import { MapPin, PlusCircle, Trash2 } from 'lucide-react';

const SavedAddress = () => {

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: 'Home',
      details: '123 Street Name, City, Country - 123456',
    },
    {
      id: 2,
      title: 'Work',
      details: '456 Office Avenue, Business Park, City - 654321',
    },
  ]);

  return (
    <div className='min-h-screen p-4 bg-gray-100 text-black dark:bg-gray-900 dark:text-white'>
      <div className='mx-auto max-w-4xl rounded-lg shadow-lg bg-gray-800 bg-white p-6 dark:bg-gray-900 dark:text-white'> 
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Saved Addresses</h1>
          
        </div>

        {/* Address List */}
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className='flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900'>
              <div>
                <h2 className="text-lg font-semibold flex items-center space-x-2">
                  <MapPin size={18} className="text-blue-500" />
                  <span>{address.title}</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400">{address.details}</p>
              </div>
              <button className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Address */}
        <button className="mt-6  flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
          <PlusCircle size={18} />
          <span>Add New Address</span>
        </button>
      </div>
    </div>
  );
};

export default SavedAddress;
