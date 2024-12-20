import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob=async(req, res)=>{
    try{
        const userId =req.id;

         const jobId=req.params.id;
         if(!jobId){
            return res.status(400).json({message: "Job id is required", success:false});
         }
       
         const existingApplications=await Application.findOne({job:jobId,applicant:userId});
         if(existingApplications){
            return res.status(400).json({message: "You have already applied for this job",
                success:false});
                }
               
                // check iff the job exist 
                const job=await Job.findById(jobId);
                if(!job){
                    return res.status(404).json({message: "Job not found", success:false});
                    }
                    //create a new appplication
                    const newApplication=new Application({
                        job:jobId,
                        applicant:userId,
                      
                        });
                        await newApplication.save();
                        job.applications.push(newApplication._id);
                        await job.save();
                        return res.status(200).json({
                            message: "Application applied successfully",
                            success:true

                        })




    }catch(e){
        console.log(e)
    }
}

export const getAppliedJobs=async(req, res)=>{
    try{
        const userId=req.id;
        const appliedJobs=await Application.find({applicant:userId}).sort({
            createdAt: -1
        }).populate(
            {
            path:'job',
            option:{sort:{ createdAt: -1}},
            
            populate:{
                path:'company',
                option:{sort:{ createdAt: -1}}
            }
        }
        );


        if(!appliedJobs){
            return res.status(404).json({message: "No jobs applied", success:false});
        }
        return res.status(200).json({appliedJobs, success:true});


    }catch(e){
        console.log(e)

    }
}

// for admin

 export const getApplicants=async(req,res)=>{
    try{
       const jobId=req.params.id
       const job=await Job.findById(jobId).populate({
        path:'applications',
        option:{sort:{ createdAt: -1}},
        populate:{
            path:'applicant',
            
            }
    });
    if(!job){
        return res.status(404).json({message: "Job not found", success:false});
    }
    return res.status(200).json({job, success:true});



    }catch(e){
        console.log(e)
    }

 }

  export const updateStatus=async(req, res)=>{
    try{
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(404).json({message: "status is required", success:false});

        }
        const application=await Application.findOne({ _id:applicationId});
        if(!application){
            return res.status(404).json({message: "Application not found", success:false});
        }
        application.status=status.toLowerCase();
        await application.save()
        return res.status(200).json({
            message:"Status Updated Succesfully",
             success:true});

    }catch(e){
        console.log(e)
    }
  }