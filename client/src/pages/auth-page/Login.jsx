import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Email, Lock, Visibility, VisibilityOff, Person } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupMode, setSignupMode] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm  p-6 rounded-lg shadow-xl text-center bg-white text-black dark:bg-gray-900 dark:text-white"
      >
        <h2 className="text-2xl font-bold  mb-4 bg-white text-black dark:bg-gray-900 dark:text-white">
          {signupMode ? "Create Account" : "Welcome Back"}
        </h2>

        {signupMode && (
          <div className="mb-3 flex items-center border rounded-lg bg-white text-black dark:bg-gray-900 dark:text-white px-3">
            <Person className="text-gray-400" />
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full  p-2 focus:outline-none bg-white text-black dark:bg-gray-900 dark:text-white"
            />
          </div>
        )}

        <div className="mb-3 flex items-center border rounded-lg bg-white text-black dark:bg-gray-900 dark:text-white px-3">
          <Email className="text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full  p-2 focus:outline-none bg-white text-black dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div className="mb-3 flex items-center border rounded-lg  px-3 bg-white text-black dark:bg-gray-900 dark:text-white">
          <Lock className="text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full bg-transparent p-2 focus:outline-none"
          />
          {showPassword ? (
            <VisibilityOff
              className="text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <Visibility
              className="text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>

        {!signupMode && (
          <div className="flex justify-between items-center mb-3">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-1 " /> Keep me logged in
            </label>
            <Link to="/forgot-password" className="text-sm text-yellow-500 hover:underline">
              Forgot password?
            </Link>
          </div>
        )}

        <button
          className="w-full bg-yellow-500 text-white font-bold py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-yellow-600"
        >
          {signupMode ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-gray-600 mt-4">
          {signupMode ? "Already have an account?" : "Not a member yet?"}
          <span
            className="text-yellow-500 font-bold cursor-pointer"
            onClick={() => setSignupMode(!signupMode)}
          >
            {signupMode ? " Login" : " Register now"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;