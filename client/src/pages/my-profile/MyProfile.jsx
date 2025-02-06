import { useState, useRef, useEffect } from "react";
import { User, ShoppingBag, Lock, MapPin, LogOut, Camera } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { getSingleDetail } from "@/store/auth-slice/user";
import { useDispatch, useSelector } from "react-redux";

const MyProfile = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [profileImage, setProfileImage] = useState(user?user.avatar: "https://placehold.co/150x150");

  useEffect(() => {
    dispatch(getSingleDetail());
  }, [dispatch]);

  // Update profile image when user data is available
  useEffect(() => {
    if (user?.avatar) {
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Invalid file. Please upload an image under 5MB.");
    }
  };

  const displayFields = ["name", "email"];

  return (
    <div className="min-h-screen p-4 transition-all bg-white dark:bg-gray-900 text-white dark:text-black">
      <div className="mx-auto max-w-6xl rounded-lg shadow-lg bg-white dark:bg-black p-6 text-black dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Account Settings</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <nav className="space-y-2">
              <NavLink to="/my-profile" className="block px-4 py-2 rounded-lg bg-yellow-500 text-white dark:bg-yellow-800">
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
              <NavLink to="/update-profile" className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <FaUserEdit size={16} className="inline-block mr-2" /> Update Profile
              </NavLink>
            </nav>
            <button className="w-full mt-6 flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-800 text-white rounded-lg">
              <LogOut size={16} className="mr-2" /> Sign out
            </button>
          </div>

          <div className="md:w-3/4">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="relative group">
                {/* <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                /> */}
                <div
                  className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* <button className="absolute bottom-0 right-0 p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                  <Camera size={16} className="text-white" />
                </button> */}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{loading ? "Loading..." : user?.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{loading ? "Loading..." : user?.role}</p>
              </div>
            </div>

            <div className="grid gap-4">
              {displayFields.map((field) => (
                <div key={field} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                  <p className="font-medium">{user ? user[field] : "Loading..."}</p>
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
