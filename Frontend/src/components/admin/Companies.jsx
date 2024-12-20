import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import ComapaniesTable from './ComapaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'

const Companies = () => {
     const navigate=useNavigate()
      const [input, setInput] = useState('')
     useGetAllCompanies()
      const dispatch=useDispatch()
      useEffect(()=>{
        dispatch(setSearchCompanyByText(input))


      },[input])
  return (
    <div> 

        <Navbar/>
        <div className=' mr-20 ml-20 my-10'>
            <div  className=' flex items-center justify-between mr-20'>
                 <input type="text"  className=' w-fit py-2' placeholder='Filter by name' onChange={(e)=> setInput(e.target.value) }
                 value={input} />
                 <button  onClick={()=> navigate('/admin/companies/create')} className=' bg-slate-900 rounded-lg px-2 py-2 text-white text-sm'>
                    New Company
                 </button>
                  
            </div>
            <ComapaniesTable/>
        </div>

    </div>
  )
}

export default Companies