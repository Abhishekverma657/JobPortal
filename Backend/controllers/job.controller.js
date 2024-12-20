import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, location, salary, requirements, jobType, position, company, experience } = req.body;
        const userId=req.id;
     
        if (!title ||  !description | !salary ||!location ||!requirements || !jobType || !position ||!company ||!experience) {
            return res.status(400).json({ message: "Please fill in all fields", success:false })
        }
        const job =await Job.create({
            title, description, location,
             salary:Number(salary), 
            requirements:requirements.split(","),
             jobType, position, company,
             experienceLevel:experience,
             created_by:userId

        })
        return   res.status(201).json({ message: "New  Job posted successfully", success:true,    job   })



    } catch (e) {
        console.log(e)
    }
}

 export const getAllJobs=async(req, res)=>{
    try{
        const keyword=req.query.keyword||"";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"} },
                {description:{$regex:keyword,$options:"i"} },
              
            ]
        }
         const jobs=await Job.find(query).populate({
            path:"company",
         }).sort({
            createdAt:-1
         });
         if(!jobs){
            return res.status(404).json({message:"Job Not Found",success:false})

         }
         return res.status(200).json({message:"Jobs fetched successfully",success:true,jobs})

    }catch(e){
        console.log(e)
    }
 }

  export const getJobById=async(req, res)=>{
    try{
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"applications",
            // populate: { path: 'applicant', select: 'name email' },
        })
        if(!job){
            return res.status(404).json({message:"Job Not Found",success:false})
            }
            return res.status(200).json({message:"Job fetched successfully",success:true,job})

    }catch(e){
        console.log(e)
    }
  }

   ///admit job poster k lour 




 //admint kitne job create  kiya h abhi tak
 export const getAdminJobs=async(req, res)=>{
    try{
        const adminId=req.id;
        const jobs=await Job.find({created_by: adminId}).populate(
            {
                path:"company",
                createdAt:-1
            }
        )
        if(!jobs){
            return res.status(404).json({message:"No Jobs Found",success:false})
            }
            return res.status(200).json({message:"Jobs fetched successfully",success:true,jobs})



    }catch(e){
        console.log(e)
    }
}