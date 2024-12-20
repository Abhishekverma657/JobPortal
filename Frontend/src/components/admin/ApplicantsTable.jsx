import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/lib/Constant';
import toast from 'react-hot-toast';

const shortlistStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
    const {applicants}=useSelector(store=>store.application)
     const statusHandler=async(status , id)=>{
        try{
            const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status},{
                withCredentials:true
            })
            if(res.data.success){
              toast.success(res.data.message)
              
                 
            }

        }catch(e){
            console.log(e)
            toast.error("Somthing went wrong")
        }
     }
  return (
    <div className="p-4">
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Sample row */}
          {
            applicants&& applicants?.applications?.map((item)=>(
                
                <TableRow key={item._id}>
                <TableCell>{item.applicant?.fullname}</TableCell>
                <TableCell>{item.applicant?.email}</TableCell>
                <TableCell>{item.applicant?.phoneNumber}</TableCell>
                <TableCell>
                   {
                    (!item?.applicant?.profile.resume)?<span>NA</span>:(<a href={item?.applicant?.profile?.resume} target="_blank" className="text-blue-500 underline">
                        {item.applicant?.profile?.resumeOriginalname}
                        </a>)
                   }
                </TableCell>
                <TableCell className="text-gray-500">   {new Date(item?.applicant?.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-full hover:bg-gray-200">
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 border shadow-md bg-white rounded-md">
                      {shortlistStatus.map((status, index) => (
                        <div
                         onClick={()=>statusHandler(status,item?._id)}
                          key={index} 
                          className="p-2 hover:bg-gray-100 rounded-md cursor-pointer text-gray-700"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
              

            ))
          }
          
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
