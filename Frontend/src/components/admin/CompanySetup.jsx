import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { ArrowLeft, Rss } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/lib/Constant';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import toast from 'react-hot-toast';

const CompanySetup = () => {
    const params=useParams()
    useGetCompanyById(params.id)

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });
   const {singleCompany}=useSelector(store=>store.company)
   const navigate=useNavigate()
//    const params=useParams()
   const [loading, setLoading] = useState(false)

  const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const fileChanegehandler=(e)=>{
    setInput({...input,file:e.target.files?.[0]})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log('Form Submitted:', input);
    const formdata=new FormData();
    formdata.append('name',input.name)
    formdata.append('description',input.description)
    formdata.append('website',input.website)
    formdata.append('location',input.location)
    if(input.file){
        formdata.append('file',input.file)
    }
     try{
        setLoading(true)
        const res= await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formdata,{
            headers:{
                'Content-Type':'multipart/form-data',
 
                
                },
                withCredentials:true

        })
         if(res.data.success){
        toast.success('Company Updated Successfully')
            navigate('/admin/companies')
            setLoading(false)

         }
         
     }catch(e){
         console.log(e)
         toast.error(e.response.data.message||"Somthing went wrong")
         setLoading(false)


        
     }


  };
   useEffect(()=>{
     setInput({
        name: singleCompany.name||"",
        description: singleCompany.description||'',
        website: singleCompany.website||'',
        location: singleCompany.location||'',
        file: null,
     })

   },[singleCompany])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-start pt-10 px-4">
        <form
          className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-4 mb-8">
            <button
              type="button"
              className="flex items-center px-2 text-gray-500 font-semibold hover:border  "
              onClick={() =>navigate('/admin/companies')}
            >
              <ArrowLeft className="mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter company name"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter company description"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
              ></input>
            </div>

            {/* Website */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="Enter company website"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter company location"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            {/* File Upload */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Upload File
              </label>
              <input
                type="file"
                name="file"
                accept='image/*'
                onChange={fileChanegehandler}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            
            <button
              type="submit"
              className="bg-slate-900 text-white py-2 px-4 rounded hover:bg-slate-800"
            >
            {loading ? (
                <div className="flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Please wait
                </div>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
