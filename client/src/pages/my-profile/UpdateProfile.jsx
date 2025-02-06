import { useState, useRef } from "react";
import {
  User,
  MapPin,
  Camera,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "https://placehold.co/150x150"
  );
  const [isImageError, setIsImageError] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Jimmy Scott",
    email: "jimmysco283@gmail.com",
    gender: "Male",
    dateOfBirth: "1987-08-02",
    phone: "012-345-6789",
    emergencyContact: "",
    address: "123 Main St, New York, NY 10001",
  });

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

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        setIsImageError(false);
      };

      reader.onerror = () => {
        setIsImageError(true);
        setProfileImage("https://placehold.co/150x150");
        toast.error("Error reading file");
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageError = () => {
    setIsImageError(true);
    setProfileImage("https://placehold.co/150x150");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully! 🎉");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-6xl rounded-lg shadow-lg dark:bg-gray-900 bg-white text-black dark:text-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Account Settings</h1>
        </div>

        <div className="flex justify-center">
          {/* Profile Update Form */}
          <div className="md:w-3/4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-32 h-32 rounded-full overflow-hidden relative bg-gray-200">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover cursor-pointer transition-opacity duration-200 group-hover:opacity-75"
                      onClick={handleImageClick}
                      onError={handleImageError}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleImageClick}
                    className="absolute bottom-0 right-0 p-2 rounded-full 
                      dark:bg-gray-900 bg-gray-100 
                      hover:bg-gray-200 dark:hover:bg-gray-900
                      transition-colors duration-200 ease-in-out
                      shadow-lg"
                  >
                    <Camera size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg dark:bg-gray-900 dark:text-white bg-white text-black">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border transition-colors
                      dark:bg-gray-900 dark:text-white border-gray-500 text-white focus:border-yellow-400 bg-white"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border transition-colors
                      dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border transition-colors
                      dark:bg-gray-900 dark:text-white "
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border transition-colors
                      dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border transition-colors
                      dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Emergency Contact
                  </label>
                  <div className="relative">
                    <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="Emergency contact number"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border transition-colors
                      dark:bg-gray-900 dark:text-white "
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border transition-colors
                      dark:bg-gray-900 dark:text-white "
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg text-white font-medium transition-all duration-200
                    ${
                      loading
                        ? "bg-yellow-400 cursor-not-allowed"
                        : "bg-yellow-600 hover:bg-yellow-700"
                    }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </div>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="dark:text-black text-white"
      />
    </div>
  );
};

export default UpdateProfile;
