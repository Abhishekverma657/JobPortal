import mongoose, { connect } from 'mongoose'
 const  connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
         console.log(' db connect succecfull ')

    }catch(e){
        console.log(e)

    }
 }
  export default connectDB