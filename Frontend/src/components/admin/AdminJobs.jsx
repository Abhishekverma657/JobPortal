 import useGetAllCompanies from '@/hooks/usegetAllCompanies'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { setSearchCompanyByText } from '@/redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdmin'
import { setSearchJobByText } from '@/redux/jobSlice'
 
 const AdminJobs = () => {
  useGetAllAdminJobs()
  const navigate=useNavigate()
  const [input, setInput] = useState('')
 useGetAllCompanies()
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(setSearchJobByText(input))


  },[input])
return (
<div> 

    <Navbar/>
    <div className=' mr-20 ml-20 my-10'>
        <div  className=' flex items-center justify-between mr-20'>
             <input type="text"  className=' w-fit py-2' placeholder='Filter by name or Role' onChange={(e)=> setInput(e.target.value) }
             value={input} />
             <button  onClick={()=> navigate('/admin/jobs/create')} className=' bg-slate-900 rounded-lg px-2 py-2 text-white text-sm'>
                New Job
             </button>
            
              
        </div>
        <AdminJobsTable/>
        
    </div>

</div>
)
 }
 
 export default AdminJobs