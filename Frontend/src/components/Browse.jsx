import React, { useEffect } from 'react';
import Job from './job.jsx';
import Navbar from './shared/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion'; // Importing Framer Motion

const Browse = () => {
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();
  useGetAllJobs();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  // Framer Motion Variants for Right to Left Slide
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10 mr-20 ml-20'>
        <motion.h1
          className='font-bold mb-5'
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          Search Results ({allJobs.length})
        </motion.h1>
        
        <motion.div
          className='grid grid-cols-3 gap-4'
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {allJobs.map((job, index) => {
            return (
              <motion.div
                key={job._id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Job job={job} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Browse;
