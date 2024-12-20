import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getdataUri from "../utils/dataUri.js";
import cloudenry from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ message: "Please fill in all fields", success: false });
        }
        const file=req.file;
        const fileUri=getdataUri(file)


        const cloudResponse=await cloudenry.uploader.upload(fileUri.content ,{
           
        })
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists", success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            profile:{
                profilePhoto:cloudResponse?.secure_url
            }
        });
        return res.status(201).json({ message: "User created successfully", success: true });

    } catch (e) {
        console.log(e)
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields", success: false
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email ", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password", success: false });
        }

        // check role is correct or not
        if (user.role !== role) {
            return res.status(400).json({ message: "Invalid role", success: false });
        }
        const tokendata = {
            user: user._id,

        }
        const token = await jwt.sign(tokendata, process.env.SECRET_KEY, {
            expiresIn: '1d',
        })
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile

        }
        return res.status(200).cookie('token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpsOnly: true,
            sameSite: 'strict'
        }).json({
            message: `welcome back ${user.fullname}`, success: true, user
        })



    } catch (e) {
        console.log(e)
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', "", { maxAge: 0 }).json({
            message: "logged out successfully",
            success: true,

        })


    } catch (e) {
        console.log(e)
    }
}

export const updateProfile=async(req, res)=>{
    try{
         
        const {fullname, email, phoneNumber, bio, skills}=req.body
      
         const file=req.file
        
    /// cloudenry 
    const fileUri=getdataUri(file);
 
    const cloudResponse=await cloudenry.uploader.upload(fileUri.content, 

        
        
    );
    console.log(cloudResponse)
    
    



    let skillsArray = [];
if (skills && typeof skills === "string") {
  skillsArray = skills.split(",").map(skill => skill.trim());
}


    // let   skillsArray;
    // if(skillsArray){
    //  skillsArray=skills.split(",");
    // }
        
        const userId=req.id; //middlewere authentication
        // console.log(userId)
        let user=await  User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found",success:false})
        }
        if(fullname) {
            user.fullname=fullname
        }
        if(email) {
            user.email=email
        }
        if(phoneNumber) {
            user.phoneNumber=phoneNumber
        }
        if(bio) {
            user.profile.bio=bio
        }
        if(skillsArray) {
            user.profile.skills=skillsArray
        }
         
        
         
        
        


        /////resumer comes here 
        if(cloudResponse){
            user.profile.resume=cloudResponse.secure_url   
            
            user.profile.resumeOriginalname=file.originalname   //save the original file name
        }
        await user.save()
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile


        }
        return res.status(200).json({ message: "Profile updated successfully", success: true, user})
            



        



    }catch(e){
        console.log(e)
    }
}