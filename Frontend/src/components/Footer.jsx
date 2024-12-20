import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-start">
          {/* Brand Section */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h2 className="text-2xl font-bold">
              Job <span className="text-red-500">Hunt</span>
            </h2>
            <p className="mt-2 text-gray-400">
              Your one-stop platform for exploring and applying to jobs that match your skills and aspirations.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-red-500">Home</a></li>
              <li><a href="/jobs" className="hover:text-red-500">Find Jobs</a></li>
             
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full sm:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">Email: support@jobhunt.com</p>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
            <p className="text-gray-400">Address: 123 Job Hunt Street, Career City</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500">
              <FaLinkedinIn size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500">
              <FaInstagram size={20} />
            </a>
          </div>

          <p className="mt-4 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Job Hunt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
