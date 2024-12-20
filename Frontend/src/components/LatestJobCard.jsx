import { Badge } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({job}) => {
  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)}
    className="border border-gray-200 shadow-md rounded-md p-4">
      {/* Company Details */}
      <div className="mb-4">
        <h1 className="font-bold text-lg">{job.comapny}</h1>
        <p className="text-gray-500 text-sm">India</p>
      </div>

      {/* Job Title and Description */}
      <div className="mb-4">
        <h1 className="font-semibold text-base">{job.title}</h1>
        <p className="text-gray-600 text-sm">
          {job.description}
        </p>
      </div>
       {/* Salary and Position Section */}
       <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 rounded-md bg-[#f8faf8] shadow-sm">
          <h2 className="text-gray-600 text-sm font-medium">Salary</h2>
          <p className="text-gray-800 text-lg font-bold">
            {job.salary ? `${job.salary} LPA` : "Not disclosed"}
          </p>
        </div>
        <div className="p-3 rounded-md bg-[#F8F9FA] shadow-sm">
          <h2 className="text-gray-600 text-sm font-medium">Position</h2>
          <p className="text-gray-800 text-lg font-bold">
            {job.position || "Not specified"}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2">
        <span className="bg-gray-100 text-gray-700 text-xs font-medium py-1 px-3 rounded-full flex items-center gap-1">
          <Badge className="h-4 w-4 text-[#6A38C2]" />
          {job.jobType}
        </span>
        <span className="bg-gray-100 text-gray-700 text-xs font-medium py-1 px-3 rounded-full flex items-center gap-1">
          <Badge className="h-4 w-4 text-[#F83002]" />
          {job.location}
        </span>
        <span className="bg-gray-100 text-gray-700 text-xs font-medium py-1 px-3 rounded-full flex items-center gap-1">
          <Badge className="h-4 w-4 text-[#00A884]" />
           {`${job.experienceLevel} years`}
        </span>
      </div>
    </div>
  );
};

export default LatestJobCard;
