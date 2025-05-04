import Lecturer from "../models/lectureModel.js";
import { isItAdmin } from "./userController.js";

export function addLecture(req,res){

    if(req.user==null||!isItAdmin(req)){
        res.status(401).json({msg:"You are not authorized"});
        return
    }
    let lastLecId= Lecturer.find().sort({lid:-1}).limit(1);
    let lid=""
    if (lastLecId==null){
        lid="LEC00001"
    }else{
       lastLecId=lastLecId[0].lid
       lid="LEC"+(parseInt(lastLecId.substring(3))+1).toString().padStart(5,"0")
    }

    const data=req.body;
    const newLecturer= new Lecturer(data)
    newLecturer.save().then(()=>{
        res.json({msg:"New Lecturer Added Successfully"})
    }).catch((error)=>{
        res.status(500).json({error:error})
    })


}

export async function getAllLectures(req,res){
    try {
        if(isItAdmin(req)){
            
            const lecturers=await Lecturer.find();
            return res.json(lecturers);
            
        }else{
            res.json({msg:"You are not authorized"});
        }
    } catch (error) {
        res.error({error:error})
    }
}

export async function getLecture(req,res){   
    const name=req.params.name
    try {
        if(isItAdmin(req)){            
            const lecturer=await Lecturer.find({lec_name:{$regex:name,$options:"i"}});
            if (lecturer.length==0){
                return res.status(404).json({msg:"Lecturer not found"});
            }else{
                return res.json(lecturer);
                
            }            
        }else{
            res.json({msg:"You are not authorized"});
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }   
}
export async function updateLecture(req,res){
    try {
        if(isItAdmin(req)){
            const key=req.params.key;
            const data=req.body

            await Lecturer.updateOne({lid:key},data).then(()=>{
                res.json({msg:"Lecturer updated Succesfully"})
            }).catch(()=>{
                res.json({msg:"Lecturer updated failed"})
            })
        }else{
            res.status(403).json({msg:"You are not authorized to perform this action"})
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
}


export async function deleteLecture(req,res){
    try {
        if(isItAdmin(req)){
            const key=req.params.key
            await Lecturer.deleteOne({lid:key}).then(()=>{
                res.json({msg:"Lecture deleted succesfully"})
            }).catch(()=>{
                res.json({msg:"Lecture deletion failed"})
            })
        }else{
            res.status(403).json({msg:"You are not authorized to perfome this action"})
        }
        
    } catch (error) {
        res.status(500).json({error:error})
        
    }
}