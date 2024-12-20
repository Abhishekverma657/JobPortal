import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/lib/Constant'
import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
   
     const dispatch=useDispatch()
     useEffect(()=>{
        const fetchSingleCompany=async ()=>{
            try{
                console.log("running")

                 const res=await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}` ,{
                    withCredentials:true
                 })
                  if(res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                   

                  }

            }catch(e){
                    console.log(e)
            }
        }
        fetchSingleCompany();
     },[companyId, dispatch])
}

export default useGetCompanyById