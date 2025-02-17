import express from "express";
import{addLecture,getAllLectures,getLecture,updateLecture,deleteLecture} from "../controllers/lecturerController.js";



const lecturerRouter=express.Router()

lecturerRouter.post("/",addLecture)
lecturerRouter.get("/",getAllLectures)
lecturerRouter.get("/:name",getLecture)
lecturerRouter.put("/:key",updateLecture)
lecturerRouter.delete("/:key",deleteLecture)



export default lecturerRouter