import express from "express";
import { addSubject,getAllSubjects,getSubject,updateSubject,deleteSubject } from "../controllers/subjectController.js";



const subjectRouter=express.Router();

subjectRouter.post("/",addSubject)
subjectRouter.get("/",getAllSubjects)
subjectRouter.get("/:name",getSubject)
subjectRouter.put("/:key",updateSubject)
subjectRouter.delete("/:key",deleteSubject)

export default subjectRouter