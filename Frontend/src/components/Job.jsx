import React from "react";
import { Button } from "./ui/button";
import { Badge, Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
   const  navigate=useNavigate()
    // const jobId='dbfjsd'
    const daysAgoFunctin=(mongodbTime)=>{
      const  createdAt =new Date(mongodbTime);
      const  currentTime = new Date();
      const timeDiff= currentTime-createdAt
      return Math.floor(timeDiff/(1000*24*60*60))
      
    }
  return (
    <div className="border border-gray-200 shadow-md rounded-md p-4 space-y-4">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {daysAgoFunctin(job?.createdAt)===0 ?"Today":`${daysAgoFunctin(job?.createdAt)} days ago`}
          {/* {job?.createdAt} */}
          

        </p>
        <Button variant="outline" className="rounded-full">
          <Bookmark size={16} />
        </Button>
      </div>

      {/* Company Details */}
      <div className="flex items-center space-x-4">
        {/* Company Logo */}
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={job?.company?.logo}
            alt="Company Logo"
            className="object-cover"
          />
        </Avatar>
        {/* Company Name and Location */}
        <div>
          <h1 className="font-semibold text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.company?.location}</p>
        </div>
      </div>

      {/* Job Details */}
      <div>
        <h2 className="font-bold text-xl">{job?.title}</h2>
        <p className="text-gray-600 text-sm mt-2">
         {job?.description}
           
        </p>
      </div>
      
       {/* Salary and Position */}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
          <p className="text-gray-500 text-sm font-medium uppercase">Salary</p>
          <p className="text-lg font-bold text-gray-800">
            {job?.salary ? `${job?.salary} LPA` : "Not Disclosed"}
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
          <p className="text-gray-500 text-sm font-medium uppercase">Position</p>
          <p className="text-lg font-bold text-gray-800">
            {job?.position || "Not Specified"}
          </p>
        </div>
      </div>




      <div className="flex gap-1">
        <span className="bg-gray-100 text-gray-700 text-xs font-medium py-1 px-3 rounded-full flex items-center gap-1">
          <Badge className="h-4 w-4 text-[#6A38C2]" />
          {job?.jobType}
        </span>
        <span className="bg-gray-100 text-gray-700 text-xs font-medium py-1 px-3 rounded-full flex items-center gap-1">
          <Badge className="h-4 w-4 text-[#F83002]" />
          {job?.location}
        </span>
        <span className="bg-gray-100 text-gray-700 text-xs font-medium py-1 px-3 rounded-full flex items-center gap-1">
          <Badge className="h-4  text-[#00A884]" />
          {`${job?.experienceLevel} years`}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button   variant="outline" className="px-4 py-2" onClick={()=>navigate(`/description/${job._id}`)}>
          Details
          
        </Button>
        <Button variant="default" className="px-4 py-2 ">
          Save For Latter
        </Button>
      </div>
    </div>
  );
};

export default Job;
