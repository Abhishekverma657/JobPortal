import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/lib/Constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicant } from '@/redux/applicationSlice'

const Applicants = () => {
     const perms=useParams()
      const dispatch=useDispatch()
      const {applicants}=useSelector(store=>store.application)
     useEffect(()=>{
         const fetchAllApplicants=async()=>{
            try{
                const res= await axios.get(`${APPLICATION_API_END_POINT}/${perms.id}/applications`,{
                    withCredentials:true
                })
           
                if(res.data.success){
                    dispatch(setAllApplicant(res.data.job));


                    

                }
                 
            } catch(e)
            {
                console.log(e);
            }
         }
         fetchAllApplicants()

     },[])
  return (
    <div>
        <Navbar/>
        <div className=' mr-20 ml-20 max-w-7xl mx-auto'>
            <h1 className=' font-bold text-xl my-5'>Applicants({applicants?.applications?.length})</h1>
            <ApplicantsTable/>
            

        </div>
    </div>
  )
}

export default Applicants