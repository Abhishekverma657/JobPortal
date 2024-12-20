import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/lib/Constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import toast from 'react-hot-toast';

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState('');
 const navigate=useNavigate()
  const dispatch=useDispatch()
  const registerCompany= async()=>{
     try{
         
        const res= await axios.post(`${COMPANY_API_END_POINT}/register`,{ name:companyName},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
     

         if(res?.data?.success){
          
             dispatch(setSingleCompany(res.data.company))
           
            toast.success(res.data.message)
            const companyId=res?.data?.company?._id
            navigate(`/admin/company/${companyId}`)
         }
          else{
            toast.error("somthing went wrong")
          }

     }catch(e){
         console.log(e)
         toast.error(e.respanse.data.message||"somthing went wrong")

     }

  }
   

  return (
     <div> 
        <Navbar/>
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-slate-900">
          Create Company
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Please enter the name of the company you want to create. Once saved, you can manage the company's details.
        </p>
        <div className="mb-6">
          <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={()=>navigate('/admin/companies')}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            // onClick={handleSave}
            onClick={registerCompany}
            className="bg-slate-900 text-white py-2 px-4 rounded hover:bg-slate-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CompanyCreate;
