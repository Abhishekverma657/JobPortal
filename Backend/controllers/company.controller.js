import { Company } from "../models/company.model.js";
import getdataUri from './../utils/dataUri.js';
import cloudenry from './../utils/cloudinary.js';

export const registerCompany=async( req, res)=>{
     try{
        const {name}=req.body;
        if(!name){
            return res.status(400).json({ message: "Company name is required", success: false })
        }
    let company=await Company.findOne({name:name});
        if(company){
            return res.status(400).json({ message: "Company already exists", success: false })
            }
        company=await Company.create({
            name:name,
            userId:req.id
        })
        return res.status(200).json({ message: "Company created successfully", success: true ,company})




     }catch(e){
        
        console.log(e)
     }

}
 
 export const getCompany=async(req, res)=>{
    try{
         const userId=req.id;  //loggedin user id
          const companies=await Company.find({userId})
          if(!companies){
            return res.status(400).json({ message: "No companies found", success: false })
          }
          return res.status(200).json({ message: "Companies found successfully", success: true ,companies})


        
    }catch(e)
{
    console.log(e)
} 
}

export const getCompanyById=async(req, res)=>{
    try{
        const companyId=req.params.id;
        const company=await Company.findById(companyId)
        if(!company){
            return res.status(400).json({ message: "Company not found", success: false })
        }
        return res.status(200).json({ message: "Company found successfully", success: true ,company})

    }catch(e){
        console.log(e)
    }
}
 export const updateCompany= async(req, res)=>{
    try{
        const { name ,description,website,location}=req.body;
        const file =req.file;
        //cloudernry
        const fileUri=getdataUri(file);
        const cloudResponse=await cloudenry.uploader.upload(fileUri.content)

         const logo=cloudResponse.secure_url;
          


        const updateData={name ,description,website,location , logo}
        const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!company){
            return res.status(400).json({ message: "Company not found", success: false })
        }
        return res.status(200).json({ message: "Company updated successfully", success: true ,})


    }catch(e){
        console.log(e)
    }
 }