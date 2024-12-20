import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import Footer from './Footer';
import CategoryCarousel from './CategoryCrousal';
import Latestjob from './Latestjob';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from Framer Motion

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, []);

  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer} // Apply stagger animation
    >
      <Navbar />
      {/* Hero Section Animation */}
      <motion.div variants={slideUp}>
        <HeroSection />
      </motion.div>

      {/* Category Carousel Animation */}
      <motion.div variants={slideUp}>
        <CategoryCarousel />
      </motion.div>

      {/* Latest Jobs Animation */}
      <motion.div variants={slideUp}>
        <Latestjob />
      </motion.div>

      <Footer />
    </motion.div>
  );
};

export default Home;
