import React, { useState, useRef, useEffect } from 'react';
import { User, Camera, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile, getSingleDetail,uploadAvatar } from '@/store/auth-slice/user';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(user?.avatar || "https://placehold.co/150x150");
  const [isImageError, setIsImageError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    emergencyContact: "",
    address: "",
    avatar: null,
  });

  useEffect(() => {
    dispatch(getSingleDetail());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth || "",
        phone: user.phone || "",
        emergencyContact: user.emergencyContact || "",
        address: user.address || "",
        avatar: user.avatar||null, 
      });

      if (user.avatar) {
        setProfileImage(user.avatar);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
  
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
  
      dispatch(uploadAvatar(file))
        .unwrap()
        .then((data) => {
          toast.success("Avatar updated successfully!");
        })
        .catch((error) => {
          toast.error(error || "Failed to update avatar");
        });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }

    dispatch(updateProfile(formDataToSend))
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully! 🎉');
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to update profile');
      });
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-white text-black dark:bg-gray-900 dark:text-white'>
      <div className='mx-auto max-w-6xl rounded-lg shadow-lg dark:bg-gray-900 bg-white text-black dark:text-white p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Account Settings</h1>
        </div>

        <div className='flex justify-center'>
          <div className='md:w-3/4'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Profile Image Upload */}
              <div className='flex justify-center mb-6'>
                <div className='relative group'>
                  <input type='file' ref={fileInputRef} onChange={handleImageUpload} accept='image/*' className='hidden' />
                  <div className='w-32 h-32 rounded-full overflow-hidden relative bg-gray-200'>
                    <img src={profileImage} alt='Profile' className='w-full h-full object-cover cursor-pointer' onClick={handleImageClick} />
                  </div>
                  <button type='button' onClick={handleImageClick} className='absolute bottom-0 right-0 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-lg'>
                    <Camera size={16} />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg dark:bg-gray-900 bg-white'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium'>Full Name</label>
                  <div className='relative'>
                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                    <input type='text' name='name' value={formData.name} onChange={handleChange} className='w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-black' />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium'>Email</label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                    <input type='email' name='email' value={formData.email} onChange={handleChange} className='w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-black' />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium'>Phone Number</label>
                  <div className='relative'>
                    <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                    <input type='tel' name='phone' value={formData.phone} onChange={handleChange} className='w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-black' />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium'>Address</label>
                  <div className='relative'>
                    <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                    <input type='text' name='address' value={formData.address} onChange={handleChange} className='w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-black' />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className='flex justify-center'>
                <button type='submit' disabled={loading} className={`px-6 py-2 rounded-lg text-white font-medium ${loading ? 'bg-yellow-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'}`}>
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
    </div>
  );
};

export default UpdateProfile;
