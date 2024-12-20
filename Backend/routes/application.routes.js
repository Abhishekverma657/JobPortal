import express from 'express'
 
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js'
 

 const router=express.Router()
  router.get('/apply/:id',isAuthenticated,applyJob);
  router.get("/get", isAuthenticated, getAppliedJobs);
  router.get("/:id/applications", isAuthenticated, getApplicants,)
  router.post("/status/:id/update", isAuthenticated, updateStatus,)
   




  export default router