import { setSearchedQuery } from '@/redux/jobSlice';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
   const [query, setQuery] = useState('')
    const dispatch=useDispatch()

    const  navigate=useNavigate()
   const searchJobHandler=()=>{
    dispatch(setSearchedQuery(query));
    navigate('/browse')


   }
  return (
    <div className="text-center py-10">
      <div className="flex flex-col gap-4">
        {/* Badge */}
        <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] m-auto font-medium">
          No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="text-4xl font-bold">
          Search, Apply <br /> Get Your <span className="text-[#6A38C2]">Dream Job</span>
        </h1>
        <p className="text-gray-600">
        Your one-stop platform for exploring and applying to jobs that match your skills and aspirations.
        </p>

        {/* Search Bar */}
        <div className="flex w-[80%] sm:w-[60%] md:w-[40%] shadow-md border border-gray-200 px-1   py-1 rounded-full items-center mx-auto">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            className="outline-none border-none flex-grow text-gray-700"
          />
          <button className="flex items-center justify-center w-12 h-12 bg-[#6A38C2] text-white rounded-full hover:bg-[#572a9e] transition">
            <FaSearch 
             onClick={searchJobHandler}
             size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
