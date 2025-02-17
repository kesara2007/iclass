import Classroom from "../models/classroomModel.js";
import { isItAdmin } from "./userController.js";

export function addClassroom(req,res){

    if(req.user==null||!isItAdmin(req)){
        res.status(401).json({msg:"You are not authorized"});
        return
    }

    const data=req.body;
    const newClassroom= new Classroom(data)
    newClassroom.save().then(()=>{
        res.json({msg:"New Classroom Added Successfully"})
    }).catch((error)=>{
        res.status(500).json({error:error})
    })


}

export async function getAllClassrooms(req,res){
    try {
        if(isItAdmin(req)){
            
            const classrooms=await Classroom.find();
            return res.json(classrooms);
            
        }else{
            res.json({msg:"You are not authorized"});
        }
    } catch (error) {
        res.error({error:error})
    }
}

export async function getClassroom(req,res){   
    const name=req.params.name
    try {
        if(isItAdmin(req)){            
            const classroom=await Classroom.find({class_name:{$regex:name,$options:"i"}});
            if (classroom.length==0){
                return res.status(404).json({msg:"Classroom not found"});
            }else{
                return res.json(classroom);
                
            }            
        }else{
            res.json({msg:"You are not authorized"});
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }   
}

export async function updateClassroom(req,res){
    try {
        if(isItAdmin(req)){
            const key=req.params.key;
            const data=req.body

            await Classroom.updateOne({classid:key},data).then(()=>{
                res.json({msg:"Class room updated Succesfully"})
            }).catch(()=>{
                res.json({msg:"Class room updated failed"})
            })
        }else{
            res.status(403).json({msg:"You are not authorized to perform this action"})
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
}

export async function deleteClassroom(req,res){
    try {
        if(isItAdmin(req)){
            const key=req.params.key
            await Classroom.deleteOne({classid:key}).then(()=>{
                res.json({msg:"Classroom deleted succesfully"})
            }).catch(()=>{
                res.json({msg:"Classroom deletion failed"})
            })
        }else{
            res.status(403).json({msg:"You are not authorized to perfome this action"})
        }
        
    } catch (error) {
        res.status(500).json({error:error})
        
    }
}