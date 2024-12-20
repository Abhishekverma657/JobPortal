import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/lib/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion"; // Importing Framer Motion
import toast from 'react-hot-toast';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth);

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changefilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
     
        toast.success(res.data.message)
        navigate('/login');
      }
    } catch (e) {
      console.log(e);
      toast.error('Error creating user')
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
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
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
          variants={containerVariants}
        >
          <motion.h1
            className="font-bold text-2xl mb-5 text-center"
            variants={itemVariants}
          >
            Sign Up
          </motion.h1>

          {/* Full Name */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={input.fullname}
              onChange={changeEventhandler}
              placeholder="Enter your full name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </motion.div>

          {/* Email */}
          <motion.div className="mb-4" variants={itemVariants}>
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

          {/* Phone Number */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventhandler}
              placeholder="Enter your phone number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </motion.div>

          {/* Password */}
          <motion.div className="mb-4" variants={itemVariants}>
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
          <motion.div className="mb-4" variants={itemVariants}>
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
          </motion.div>

          {/* Profile Photo */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              accept="image/*"
              onChange={changefilehandler}
              className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div className="text-center" variants={itemVariants}>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Please wait
                </div>
              ) : (
                "Signup"
              )}
            </button>
            <p className="mt-4">
              Already have an account?{" "}
              <Link to={'/login'}>
                <span className="text-blue-500 underline">Login</span>
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
