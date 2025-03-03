import { useState } from "react";
import { Lock } from "@mui/icons-material";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = () => {
    if (password === confirmPassword) {
      alert("Password reset successful!");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-96 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Reset Password</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Enter your new password below.</p>

        <div className="mb-4">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 p-2">
            <Lock className="text-gray-500 dark:text-gray-400" />
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-2 w-full bg-transparent outline-none text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 p-2">
            <Lock className="text-gray-500 dark:text-gray-400" />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="ml-2 w-full bg-transparent outline-none text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <button
          className="w-full bg-yellow-500 text-white font-bold py-2 rounded-lg hover:bg-yellow-600"
          onClick={handleReset}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
