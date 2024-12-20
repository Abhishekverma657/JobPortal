import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios';
import { USER_API_END_POINT } from '@/lib/Constant';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'; // Import Framer Motion

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth);

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);  
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  // Framer Motion Variants
  const formVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputVariants = {
    focus: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.02, backgroundColor: "#444", transition: { duration: 0.2 } },
    click: { scale: 0.98 },
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto mt-10">
        <motion.form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <h1 className="font-bold text-2xl mb-5 text-center">Log In</h1>

          {/* Email */}
          <motion.div
            className="mb-4"
            whileFocus="focus"
            variants={inputVariants}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventhandler}
              placeholder="Enter your email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            className="mb-4"
            whileFocus="focus"
            variants={inputVariants}
          >
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={changeEventhandler}
              placeholder="Enter your password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </motion.div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventhandler}
                  className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Student</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventhandler}
                  className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Recruiter</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <motion.button
              type="submit"
              className="w-full bg-gray-800 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              disabled={loading}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="click"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Please wait
                </div>
              ) : (
                "Login"
              )}
            </motion.button>
            <p className="mt-4">
              Don't have an account?{" "}
              <Link to={'/signup'}>
                <span className="text-blue-500 underline">Sign up</span>
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
