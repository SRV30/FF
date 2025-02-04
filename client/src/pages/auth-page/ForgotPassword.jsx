import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Email, Lock } from "@mui/icons-material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [sentPassword] = useState("123456"); // Mock password for validation
  const navigate = useNavigate();

  const handleEmailSubmit = () => {
    setEmailSubmitted(true);
  };

  const handlePasswordSubmit = () => {
    if (password === sentPassword) {
      navigate("/reset-password");
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white text-black dark:bg-gray-800 dark:text-white">
      <div className="w-96  p-6 rounded-lg shadow-md text-center bg-white text-black dark:bg-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4 bg-white text-black dark:bg-gray-900 dark:text-white">Forgot Password</h2>
        {!emailSubmitted ? (
          <>
            <p className="dark:text-white dark:bg-gray-900 mb-4 bg-white text-black ">Enter your registered email to receive a temporary password.</p>
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg  bg-white text-black dark:bg-gray-900 dark:text-white p-2">
                <Email className=" bg-white text-black dark:bg-gray-900 dark:text-white" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-2 w-full outline-none bg-white text-black dark:bg-gray-900 dark:text-white"
                />
              </div>
            </div>
            <button
              className="w-full bg-yellow-500 text-white font-bold py-2 rounded-lg hover:bg-yellow-600"
              onClick={handleEmailSubmit}
            >
              Send Code
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-4">Enter the temporary password sent to your email.</p>
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 p-2">
                <Lock className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Enter the code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ml-2 w-full bg-transparent outline-none"
                />
              </div>
            </div>
            <button
              className="w-full bg-yellow-500 text-white font-bold py-2 rounded-lg hover:bg-yellow-600"
              onClick={handlePasswordSubmit}
            >
              Verify and Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;