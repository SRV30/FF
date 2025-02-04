import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Person,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearError, signupUser } from "@/store/auth-slice/user";
import gsap from "gsap";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading, user } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {}, [user, isAuthenticated, loading, navigate, dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupUser({ name, email, password }));
  };
 
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/my-profile";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      toast.success("Successfully Register User");
      navigate(redirect);
    }

    gsap.from(".login-form", { opacity: 0, y: -30, duration: 1 });
  }, [dispatch, error, isAuthenticated, redirect, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm p-6 rounded-lg shadow-xl text-center bg-white text-black dark:bg-gray-900 dark:text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>

        <div className="mb-3 flex items-center border rounded-lg px-3 bg-white text-black dark:bg-gray-900 dark:text-white">
          <Person className="text-gray-400" />
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 focus:outline-none bg-transparent"
          />
        </div>

        <div className="mb-3 flex items-center border rounded-lg px-3 bg-white text-black dark:bg-gray-900 dark:text-white">
          <Email className="text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 focus:outline-none bg-transparent"
          />
        </div>

        <div className="mb-3 flex items-center border rounded-lg px-3 bg-white text-black dark:bg-gray-900 dark:text-white">
          <Lock className="text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 focus:outline-none bg-transparent"
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

        <button
          className="w-full bg-yellow-500 text-white font-bold py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-yellow-600"
          onClick={handleSubmit}
        >
          Sign Up
        </button>

        <p className="text-gray-600 mt-4">
          Already have an account?
          <Link
            to="/login"
            className="text-yellow-500 font-bold cursor-pointer ml-1"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
