import React, { useState } from "react";
import { FaMoon, FaSun, FaEdit } from "react-icons/fa";

const MyProfile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Jimmy Scott",
    email: "jimmysco283@gmail.com",
    gender: "Male",
    dob: "August 02, 1987",
    phone: "(+1) 012 345 6789",
    emergencyContact: "Not provided",
  });

  const handleEdit = (field) => {
    const newValue = prompt(`Enter new ${field}:`, profile[field]);
    if (newValue) {
      setProfile((prev) => ({ ...prev, [field]: newValue }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 p-4 border-r">
            <ul className="space-y-4">
              <li className="font-bold text-yellow-600">Personal info</li>
              <li>My Orders</li>
              <li>Update Password</li>
              <li>Saved Address</li>
            </ul>
            <div className="mt-6 flex items-center space-x-2">
              <span>Night Mode</span>
              <button onClick={() => setDarkMode(!darkMode)} className="text-yellow-500">
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
            <button className="mt-6 text-red-600">Sign out</button>
          </div>

          {/* Profile Details */}
          <div className="w-3/4 p-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="w-20 h-20 rounded-full border"
              />
              <button className="text-gray-500">
                <FaEdit />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {Object.entries(profile).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span>{value}</span>
                  <button className="text-blue-500 text-sm" onClick={() => handleEdit(key)}>Edit</button>
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
