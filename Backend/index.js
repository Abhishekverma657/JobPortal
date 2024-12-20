import express from 'express'
 
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';
const app= express();
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import userRoute from './routes/user.routes.js'
import companyRoute from './routes/company.routes.js'
import jobRoute from './routes/job.routes.js'
import applicationRoute from './routes/application.routes.js'

 const _dirname=path.resolve()
dotenv.config({})





//middlewere     

 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use(cookieParser())
 const corsOption={
origin:'http://localhost:5173',
methods: ['GET', 'POST', 'PUT', 'DELETE'],
credentials:true
 }
 app.use(cors(corsOption))


const PORT=process.env.PORT||3000;

app.use('/api/v1/user',userRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/job',jobRoute)
app.use('/api/v1/application',applicationRoute)

app.use(express.static(path.join(_dirname,"/Frontend/dist")))
 app.get('*', (_, res)=>{
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"))
 })
 

 
app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running ${PORT}`)
})