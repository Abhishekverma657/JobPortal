 
import React, { useEffect, useState } from 'react'
import { Badge } from "lucide-react";
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
// import useGetSingleJob from '@/hooks/useGetSingleJob';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/lib/Constant';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const JobDescription = () => {
     
   
     const { loading ,user}=useSelector(store=>store.auth)
     const  params=useParams();
      
      const {singleJob}=useSelector(store=>store.job)
     const jobId=params.id
 

     const isInitiallyApplied=singleJob?.applications?.some(applicaion=>applicaion.applicant===user?._id)||false
     const [isApplied, setisApplied] = useState( isInitiallyApplied)

   
   
      const dispatch=useDispatch();

       const applyJobhandler=async()=>{
        try{
          const res=await axios.get(`http://localhost:8000/api/v1/application/apply/${jobId}`,{
            withCredentials:true
          })
 

          if(res.data.success){
            // dispatch(setSingleJob(res.data.job))
            setisApplied(true)// update local state
            const updateSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
             console.log(updateSingleJob)
            dispatch(setSingleJob(updateSingleJob))   // help us to real time ui update
            
             toast.success('Job Applied Successfully')

          }

        }catch(e){
          console.log(e)
        toast.error("Somthing went wrong!")
        }
       }
      
       useEffect(()=>{
      
      const fetchSingleJobs=async ()=>{
          try{
       
   
           

               const res=await axios.get(`http://localhost:8000/api/v1/job/get/${jobId}` ,{
                  withCredentials:true
               })
               
                if(res.data.success){
                 
                  dispatch(setSingleJob(res.data.job))
                  setisApplied(res.data.job.applications.some(application=>application.applicant===user?._id))
                 

                }
                 else{
                  console.log('api error')
                 }

          }catch(e){
                  console.log(e)
          }
      }
      fetchSingleJobs();
   },[jobId, dispatch,user._id])





  return (
    <div className='max-w-7xl mx-auto my-10 mr-20 ml-20'>
        <h1 className=' font-bold  text-xl'>{singleJob?.title}</h1>
         <div className='flex items-center justify-between'>

          
        <div className="flex gap-1">
        <span className="bg-gray-100 text-gray-700 text-xs font-medium py-1 px-3 rounded-full flex items-center gap-1">
          <Badge className="h-4 w-4 text-[#6A38C2]" />
          {singleJob?.jobType}
        </span>
        <span className="bg-gray-100 text-gray-700 text-xs font-medium py-1 px-3 rounded-full flex items-center gap-1">
          <Badge className="h-4 w-4 text-[#F83002]" />
          {singleJob?.location}
        </span>
        <span className="bg-gray-100 text-gray-700 text-xs font-medium py-1 px-3 rounded-full flex items-center gap-1">
          <Badge className="h-4  text-[#00A884]" />
          {`${singleJob?.experienceLevel} Years`}
        </span>
      </div>

       <Button
        onClick={isApplied?null:applyJobhandler}
        disabled={isApplied}  className={` rounded-lg ${isApplied?'bg-gray-600 cursor-not-allowed':'bg-slate-800 hover:bg-slate-950 '}`}>
       {
        isApplied?'Already Applied': 
          (loading ? (
            <div className="flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Please wait
            </div>
          ) : (
            "Apply Now"
          ))
        }
       
       </Button>
       </div>
        <h1 className=' border-b-2 py-4 border-b-gray-200'>{singleJob?.description}</h1>
        <div className=' my-4'>
             <h1 className=' font-bold my-1'>Role:<span className=' pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
             <h1 className=' font-bold my-1'>Location:<span className=' pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
             <h1 className=' font-bold my-1'>Description:<span className=' pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
             <h1 className=' font-bold my-1'>Experience:<span className=' pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
             <h1 className=' font-bold my-1'>Salary:<span className=' pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
             <h1 className=' font-bold my-1'>Total Applicants:<span className=' pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
             <h1 className=' font-bold my-1'>Posted date:<span className=' pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split('T')[0]}</span></h1>

        </div>

    </div>
  )
}

export default JobDescription