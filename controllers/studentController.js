import Student from "../models/studentModel.js";
import { isItAdmin } from "./userController.js";

export function addStudent(req,res){

    if(req.user==null||!isItAdmin(req)){
        res.status(401).json({msg:"You are not authorized"});
        return
    }

    const data=req.body;
    const newStudent= new Student(data)
    newStudent.save().then(()=>{
        res.json({msg:"New Student Added Successfully"})
    }).catch((error)=>{
        res.status(500).json({error:error})
    })


}

export async function getAllStudents(req,res){
    try {
        if(isItAdmin(req)){
            
            const students=await Student.find();
            res.json(students);
            return
        }else{
            res.json({msg:"You are not authorized"});
        }
    } catch (error) {
        res.error({error:error})
    }
}

export async function getStudent(req,res){   
    const name=req.params.name
    try {
        if(isItAdmin(req)){            
            const student=await Student.find({s_name:{$regex:name,$options:"i"}});
            if (student.length==0){
                return res.status(404).json({msg:"Student not found"});
            }else{
                return res.json(student);
                
            }            
        }else{
            res.json({msg:"You are not authorized"});
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }   
}

export async function updateStudent(req,res){
    try {
        if(isItAdmin(req)){
            const key=req.params.key;
            const data=req.body
            console.log(data);
            

            await Student.updateOne({sid:key},data).then(()=>{
                res.json({msg:"Student updated Succesfully"})
            }).catch(()=>{
                res.json({msg:"Student updated failed"})
            })
        }else{
            res.status(403).json({msg:"You are not authorized to perform this action"})
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
}

export async function deleteStudent(req,res){
    try {
        if(isItAdmin(req)){
            const key=req.params.key
            await Student.deleteOne({sid:key}).then(()=>{
                res.json({msg:"Student deleted succesfully"})
            }).catch(()=>{
                res.json({msg:"Student deletion failed"})
            })
        }else{
            res.status(403).json({msg:"You are not authorized to perfome this action"})
        }
        
    } catch (error) {
        res.status(500).json({error:error})
        
    }
}