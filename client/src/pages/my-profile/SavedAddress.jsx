import React, { useState } from 'react';
import { MapPin, PlusCircle, Trash2, Sun, Moon } from 'lucide-react';

const SavedAddress = () => {
  const [darkMode, setDarkMode] = useState(false);
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
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`mx-auto max-w-4xl rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}> 
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Saved Addresses</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 
              ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Address List */}
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className={`flex justify-between items-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
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
        <button className="mt-6 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
          <PlusCircle size={18} />
          <span>Add New Address</span>
        </button>
      </div>
    </div>
  );
};

export default SavedAddress;
