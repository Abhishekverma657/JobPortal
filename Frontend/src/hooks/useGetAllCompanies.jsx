import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/lib/Constant'
import { setCompanies } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
   
     const dispatch=useDispatch()
     useEffect(()=>{
        const fetchAllCompany=async ()=>{
            try{
             

                 const res=await axios.get(`${COMPANY_API_END_POINT}/get` ,{
                    withCredentials:true
                 })
                  if(res.data.success){
                    dispatch(setCompanies(res.data.companies))
                   

                  }

            }catch(e){
                    console.log(e)
            }
        }
        fetchAllCompany();
     },[])
}

export default useGetAllCompanies