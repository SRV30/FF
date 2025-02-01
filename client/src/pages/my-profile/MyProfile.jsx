import React, { useState, useRef } from 'react';
import { Moon, Sun, User, ShoppingBag, Lock, MapPin, LogOut, Camera } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
const MyProfile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState("https://placehold.co/150x150");

  const profile = {
    "Full Name": "Jimmy Scott",
    "Email": "jimmysco283@gmail.com",
    "Gender": "Male",
    "Date Of Birth": "August 02, 1987",
    "Phone": "(+1) 012 345 6789",
    "Emergency Contact": "Not provided",
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert('Invalid file. Please upload an image under 5MB.');
    }
  };

  return (
    <div className={`min-h-screen p-4 transition-all ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`mx-auto max-w-6xl rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>  
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-yellow-600" />}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <nav className="space-y-2">
              <NavLink to="/my-profile" className="block px-4 py-2 rounded-lg bg-yellow-500 text-white">
                <User size={16} className="inline-block mr-2" /> Profile Info
              </NavLink>
              <NavLink to="/my-orders" className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <ShoppingBag size={16} className="inline-block mr-2" /> My Orders
              </NavLink>
              <NavLink to="/update-password" className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Lock size={16} className="inline-block mr-2" /> Update Password
              </NavLink>
              <NavLink to="/saved-address" className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <MapPin size={16} className="inline-block mr-2" /> Saved Address
              </NavLink>
              <NavLink to="/update-profile" className={`block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}><FaUserEdit size={16} className="inline-block mr-2"/>Update Profile
              </NavLink>
            </nav>
            <button className="w-full mt-6 flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
              <LogOut size={16} className="mr-2" /> Sign out
            </button>
          </div>

          <div className="md:w-3/4">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="relative group">
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 cursor-pointer" onClick={() => fileInputRef.current.click()}>
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                  <Camera size={16} className="text-white" />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{profile["Full Name"]}</h2>
                <p className="text-gray-500 dark:text-gray-400">{profile["Email"]}</p>
              </div>
            </div>

            <div className="grid gap-4">
              {Object.entries(profile).map(([key, value]) => (
                <div key={key} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{key}</span>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
