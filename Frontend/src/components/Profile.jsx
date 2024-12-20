import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { FaEdit } from 'react-icons/fa'; // Import the pen icon
import { Badge, Contact, Mail } from 'lucide-react';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDailog from './UpdateProfileDailog';
import { useSelector } from 'react-redux';
import useGetAppliedJob from '@/hooks/useGetAppliedJob';

// Example skills array
const skills = [
  'JavaScript', 
  'React', 
  'Node.js', 
  'Express.js', 
  'MongoDB', 
  'HTML', 
  'CSS', 
  'Python', 
  'Django', 
  'SQL', 
  'Git', 
  'TypeScript',
];

const Profile = () => {
  useGetAppliedJob()
  
   const [open, setOpen] = useState(false)
   const {user}=useSelector(store=>store.auth)


  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg mr-20 ml-20">
        {/* Profile Section */}
        <div className="flex justify-between items-center mb-6">
          {/* Avatar and Name Section (Left) */}
          <div className="flex items-center gap-6">
            <Avatar className="w-28 h-28">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
                className="object-cover rounded-full"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.fullname}</h1>
              <p className="text-gray-600 text-sm">{user.profile.bio}</p>
            </div>
          </div>

          {/* Edit Icon (Right) */}
          <div className="flex items-center">
            <button className="text-gray-600 hover:text-[#955ff4]"  onClick={()=>
              {
                // console.log("Button clicked");
                setOpen(true)
              }
                }>
              <FaEdit size={20}  />
            </button>
          </div>
        </div>

        {/* Additional Profile Info (Optional) */}
        <div className="flex items-center gap-3 my-2">
          <Mail />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact />
          <span>{user.phoneNumber}</span>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h1>
          <div className="flex gap-3 flex-wrap">
            {/* Dynamically Rendering Skills */}
            {user.profile.skills.length <= 0 ? <span>NA</span> : user.profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-[#F0F0F0] text-[#333] px-4 py-1 rounded-full text-sm font-medium shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Resume
            
          </h1>
          {user.profile.resume ? (
            <a
              target="blank"
              href={user.profile.resume}
              className="cursor-pointer text-blue-400 hover:text-blue-500 underline"
            >
               {user.profile.resumeOriginalname}
            </a>
          ) : <span>NA</span>}
        </div>

        {/* Applied Jobs Section */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Applied Jobs</h1>
          {/* Application Table */}
          <div className="overflow-x-auto">
            <AppliedJobTable />
          </div>
        </div>
      </div>
      <UpdateProfileDailog open={open} setOpen={setOpen} />

    </div>
  );
};

export default Profile;
