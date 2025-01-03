import { APPLICATION_API_END_POINT } from "@/lib/Constant";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetAppliedJob=()=>{
    const dispatch=useDispatch()
     useEffect(()=>{
        const fetchAppliedJobs=async()=>{
             try{
                 const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{
                    withCredentials:true
                 })
                  if(res.data.success){
                    // console.log(res)
                    dispatch(setAllAppliedJobs(res.data.appliedJobs))

                  }
            
             }catch(e){
                console.log(e)
             }

        }
        fetchAppliedJobs()
     },[])

}
export default useGetAppliedJob;