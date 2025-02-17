import express from "express";
import { addStudent,getAllStudents,getStudent,updateStudent,deleteStudent } from "../controllers/studentController.js";



const studentRouter=express.Router();

studentRouter.post("/",addStudent)
studentRouter.get("/",getAllStudents)
studentRouter.get("/:name",getStudent)
studentRouter.put("/:key",updateStudent)
studentRouter.delete("/:key",deleteStudent)

export default studentRouter