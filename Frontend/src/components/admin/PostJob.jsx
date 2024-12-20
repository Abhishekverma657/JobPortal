import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue  ,SelectItem} from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/lib/Constant';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import toast from 'react-hot-toast';
// import { SelectItem } from '@radix-ui/react-select';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        location: "",
        salary: 0,
        experience: 0,
        requirements: "",
        jobType: "",
        position: 0,
        company: "",
    });
 const [loading, setLoading] = useState(false)
 const navigate=useNavigate()
    const { companies } = useSelector((store) => store.company);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
       
    };

    
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company._id === value);
        setInput({ ...input, company: selectedCompany?._id });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
     
        if (!input.company) {
           
            toast.error('Please select a company before submitting!')
            return;
        }
         try{
          
            setLoading(true)
            const res=await axios.post(`http://localhost:8000/api/v1/job/post`,input,{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials:true
            })
            if(res.data.success){
              
                setLoading(false)
               
                toast.success('Job posted successfully!')
                navigate('/admin/jobs')
            }
            else{
                toast.error("Somthing went wrong")
               
               

            }

         }catch(e){
            
            console.log(e)
            toast.error(e.response.data.message||"Somthing went wrong")
          
         }
         finally{
            setLoading(false)
         }
      
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-10">
                <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Post a Job
                    </h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                        {/* Title */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Job Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                placeholder="Enter job title"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 hover:border-slate-500"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="Enter location"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 hover:border-slate-500"
                                required
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Salary
                            </label>
                            <input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                placeholder="Enter salary"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 hover:border-slate-500"
                                required
                            />
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Experience (Years)
                            </label>
                            <input
                                type="number"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                placeholder="Enter experience in years"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 hover:border-slate-500"
                                required
                            />
                        </div>

                        {/* Job Type */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Job Type
                            </label>
                            <select
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 hover:border-slate-500"
                                required
                            >
                                <option value="">Select Job Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>

                        {/* Number of Positions */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Number of Positions
                            </label>
                            <input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                placeholder="Enter number of positions"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 hover:border-slate-500"
                                required
                            />
                        </div>

                        {/* Requirements */}
                        <div className="col-span-2">
                            <label className="block text-gray-700 font-medium mb-1">
                                Requirements
                            </label>
                            <input
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                placeholder="Enter job requirements"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 hover:border-slate-500"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                            <label className="block text-gray-700 font-medium mb-1">
                                Job Description
                            </label>
                            <input
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Enter job description"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 hover:border-slate-500"
                                required
                            />
                        </div>

                        {/* Select Company */}
                        {companies.length > 0 && (
                            <div className="col-span-2">
                                <label className="block text-gray-700 font-medium mb-1">
                                    Select Company
                                </label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company._id}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-slate-700 text-white py-2 px-4 rounded hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            >
                               {loading ? (
                <div className="flex items-center gap-2 text-center ">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Please wait
                </div>
              ) : (
                "Post Job"
              )}
                            </button>
                        </div>

                        {/* Register Company Warning */}
                        {companies.length === 0 && (
                            <p className="text-sm text-red-600 font-bold text-center my-3">
                                *Please register a company first before posting a job.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
