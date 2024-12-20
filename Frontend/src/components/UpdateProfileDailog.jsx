import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react'; // Close Icon
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/lib/Constant';
import { setUser } from '@/redux/authSlice';
import toast from 'react-hot-toast';

const UpdateProfileDailog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const {user}=useSelector(store=>store.auth)
    const [input , setInput]=useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile.bio,
        skills:user?.profile.skills.map(skills=>skills),
        file :user?.profile.resume



    })
     const dispatch=useDispatch()
    const changeEventHandler=(e)=>{
        setInput({...input ,[e.target.name]:e.target.value})

    }
    const filechangehandler=(e)=>{
        const file=e.target.files?.[0]
        setInput({...input, file})
         
    }
     const submitHandler=async (e)=>{
        e.preventDefault()
        const formData= new FormData()
         
        formData.append('fullname',input.fullname)
        formData.append('email',input.email)
        formData.append('phoneNumber',input.phoneNumber)
        formData.append('bio',input.bio)
        formData.append('skills',input.skills)
        if(input.file){
            formData.append('file',input.file)

        }
         try{
            setLoading(true)
            const res=await axios.post(`${USER_API_END_POINT}/profile/update`, formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                  
                    },
                    withCredentials:true
            })
            if(res.data.success){
               
                dispatch(setUser(res.data.user))
              
                toast.success(res.data.message)
                setLoading(false)
                setOpen(false);
                

            }

         }catch(e){
            console.log(e)
            setLoading(false)
            toast.error(e.response.data.message)
         }

        
        
     }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Overlay */}
      <Dialog.Overlay className="fixed inset-0 bg-black/70" />

      {/* Content */}
      <Dialog.Content
        className="bg-white rounded-lg p-6 max-w-lg w-full mx-auto fixed inset-0 shadow-lg focus:outline-none"
        aria-label="Update Profile"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setOpen(false)}
        >
          <X size={24} />
        </button>

        {/* Title */}
        <Dialog.Title className="text-2xl font-bold mb-4 text-center">
          Update Profile
        </Dialog.Title>

        {/* Form */}
        <form onSubmit={submitHandler}>
          <div className="grid gap-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-sm font-medium">
                Name:
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3 border rounded-md p-2"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-sm font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3 border rounded-md p-2"
                placeholder="Enter your email"
              />
            </div>
               {/* phone number  */}
               <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-sm font-medium">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3 border rounded-md p-2"
                placeholder="Enter your number"
              />
            </div>

            {/* Bio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bio" className="text-sm font-medium">
                Bio:
              </label>
              <input
                id="bio"
                name="bio"
              
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3 border rounded-md p-2"
                placeholder="Tell something about yourself"
              ></input>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="skills" className="text-sm font-medium">
                Skills:
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3 border rounded-md p-2"
                placeholder="E.g., React, Node.js"
              />
            </div>

            {/* Resume Upload */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="resume" className="text-sm font-medium">
                Resume:
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept='application/pdf'
                 onChange={filechangehandler}
                className="col-span-3 border rounded-md p-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
          <button 
              type="submit"
              className="w-full bg-gray-800 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              disabled={loading}
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
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UpdateProfileDailog;
