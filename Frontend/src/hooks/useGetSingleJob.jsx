import { JOB_API_END_POINT } from '@/lib/Constant'
import { setAllJobs, setSingleJob } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSingleJob = ({jobId}) => {
   
     const dispatch=useDispatch()
    //  useEffect(()=>{
    //     const fetchSingleJobs=async ()=>{
    //         try{
    //             console.log("running")

    //              const res=await axios.get(`${JOB_API_END_POINT}/get/${jobId}` ,{
    //                 withCredentials:true
    //              })
    //               if(res.data.success){
    //                 dispatch(setSingleJob(res.data.jobs))
                   

    //               }

    //         }catch(e){
    //                 console.log(e)
    //         }
    //     }
    //     fetchSingleJobs();
    //  },[])
}

export default useGetSingleJob