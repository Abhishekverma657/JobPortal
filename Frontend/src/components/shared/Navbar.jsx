import { USER_API_END_POINT } from '@/lib/Constant';
import { setUser } from '@/redux/authSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import axios from 'axios';
import React, { useState } from 'react';
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async (e) => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
       toast.success(res.data.message)
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message||"Somthing went wrong")
    }
  };

  // Button Animation Variants
  const buttonVariants = {
    initial: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, opacity: 0.9, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between px-10 max-w-7xl h-16">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === 'recruiter' ? (
              <>
                <Link to={'/admin/companies'}><li>Companies</li></Link>
                <Link to={'/admin/jobs'}><li>Jobs</li></Link>
              </>
            ) : (
              <>
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/jobs'}><li>Jobs</li></Link>
                <Link to={'/browse'}><li>Browse</li></Link>
              </>
            )}
          </ul>

          {/* Avatar with Popover */}
          {!user ? (
            <div className="flex gap-2">
              <Link to={'/login'}>
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="px-2 py-1 rounded-sm border border-gray-800 hover:bg-[#e0d7f0]"
                >
                  Login
                </motion.button>
              </Link>
              <Link to={'/signup'}>
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-[#955ff4] px-2 py-1 rounded-sm border border-gray-800 hover:bg-[#783ae2]"
                >
                  Signup
                </motion.button>
              </Link>
            </div>
          ) : (
            <Popover >
              <PopoverTrigger asChild>
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={user.profile.profilePhoto}
                    alt="@shadcn"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="mr-8 px-4 border p-3 bg-red-50  border-gray-200 shadow-lg rounded-lg ">
                <div className="flex space-y-1">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={user.profile.profilePhoto}
                      alt="@shadcn"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-semibold">{user.fullname}</h1>
                    <p>{user.profile.bio}</p>
                  </div>
                </div>
                {user.role === 'student' && (
                  <div className="flex gap-7 mt-2">
                    <CiUser size={20} />
                    <Link to={'/profile'}>
                      <button className="underline font-semibold text-sm outline-none">View Profile</button>
                    </Link>
                  </div>
                )}
                <div className="flex gap-7 mt-2">
                  <IoIosLogOut size={20} />
                  <button
                    onClick={logOutHandler}
                    className="underline font-semibold text-sm outline-none"
                  >
                    LogOut
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
