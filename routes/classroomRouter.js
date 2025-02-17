import express from "express";
import{addClassroom,getAllClassrooms,getClassroom,updateClassroom,deleteClassroom} from "../controllers/classroomrController.js";



const classroomRouter=express.Router()

classroomRouter.post("/",addClassroom)
classroomRouter.get("/",getAllClassrooms)
classroomRouter.get("/:name",getClassroom)
classroomRouter.put("/:key",updateClassroom)
classroomRouter.delete("/:key",deleteClassroom)



export default classroomRouter