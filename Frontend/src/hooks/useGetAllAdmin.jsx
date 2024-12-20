import { JOB_API_END_POINT } from '@/lib/Constant'
import { setAllAdminJobs, setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
   
     const dispatch=useDispatch()
     useEffect(()=>{
        const fetchAllAdminJobs=async ()=>{
            try{
               

                 const res=await axios.get(`${JOB_API_END_POINT}/getadminjobs` ,{
                    withCredentials:true
                 })
                  if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs))
                   

                  }

            }catch(e){
                    console.log(e)
            }
        }
        fetchAllAdminJobs();
     },[])
}

export default useGetAllAdminJobs