import Subject from "../models/subjectModel.js";
import { isItAdmin } from "./userController.js";    


export function addSubject(req,res){

    if(req.user==null||!isItAdmin(req)){
        res.status(401).json({msg:"You are not authorized"});
        return
    }

    const data=req.body;
    const newSubject= new Subject(data)
    newSubject.save().then(()=>{
        res.json({msg:"New Subject Added Successfully"})
    }).catch((error)=>{
        res.status(500).json({error:error})
    })


}

export async function getAllSubjects(req,res){
    try {
        if(isItAdmin(req)){
            
            const subjects=await Subject.find();
            return res.json(subjects);
            
        }else{
            res.json({msg:"You are not authorized"});
        }
    } catch (error) {
        res.error({error:error})
    }
}

export async function getSubject(req,res){   
    const name=req.params.name
    try {
        if(isItAdmin(req)){            
            const subject=await Subject.find({sub_name:{$regex:name,$options:"i"}});
            if (subject.length==0){
                return res.status(404).json({msg:"Subject not found"});
            }else{
                return res.json(subject);
                
            }            
        }else{
            res.json({msg:"You are not authorized"});
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }   
}

export async function updateSubject(req,res){
    try {
        if(isItAdmin(req)){
            const key=req.params.key;
            const data=req.body

            await Subject.updateOne({subid:key},data).then(()=>{
                res.json({msg:"Subject updated Succesfully"})
            }).catch(()=>{
                res.json({msg:"Subject updated failed"})
            })
        }else{
            res.status(403).json({msg:"You are not authorized to perform this action"})
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
}

export async function deleteSubject(req,res){
    try {
        if(isItAdmin(req)){
            const key=req.params.key
            await Subject.deleteOne({subid:key}).then(()=>{
                res.json({msg:"Subject deleted succesfully"})
            }).catch(()=>{
                res.json({msg:"Subject deletion failed"})
            })
        }else{
            res.status(403).json({msg:"You are not authorized to perfome this action"})
        }
        
    } catch (error) {
        res.status(500).json({error:error})
        
    }
}