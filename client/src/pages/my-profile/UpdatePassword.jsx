import { useState, useEffect } from "react";
import { Eye, EyeOff, Moon, Sun, Lock, KeyRound, Shield } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

const UpdatePassword = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return false;
    }

    if (formData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password updated successfully! 🎉");
    } catch (err) {
      toast.error("Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-200 bg-white dark:bg-black text-black dark:text-white">
      <div className="w-full max-w-lg  rounded-xl shadow-2xl p-8 transition-all duration-200 transform hover:scale-[1.02] bg-gray-100 text-black dark:bg-gray-800 dark:text-white">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Lock className="h-8 w-8 text-yellow-800" />
            <h2 className="text-2xl font-bold">Update Password</h2>
          </div>
        </div>

        <div
          className={`flex items-center gap-2 p-4 mb-6 rounded-lg bg-gray-200 dark:gray-700 text-black dark:text-white`}
        >
          <Shield className="text-yellow-800" />
          <p>
            Ensure your new password is at least 8 characters long for better
            security
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Current Password
            </label>
            <div className="relative group">
              <KeyRound
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 
                ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              />
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-200
                  ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-600 focus:border-blue-600"
                  }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 
                  ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {showPasswords.current ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">New Password</label>
            <div className="relative group">
              <KeyRound
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 
                ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              />
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-200
                  ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-600 focus:border-blue-600"
                  }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 
                  ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {showPasswords.new ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Confirm New Password
            </label>
            <div className="relative group">
              <KeyRound
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 
                ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              />
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-200
                  ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-600 focus:border-blue-600"
                  }`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 
                  ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 transform hover:translate-y-[-1px] bg-yellow-500 dark:bg-yellow-800">
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
