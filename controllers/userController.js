
import bcrypt from "bcrypt";
import User from "../models/userModels.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"


dotenv.config();

export function registerUser(req,res){
    const data=req.body;
    data.password=bcrypt.hashSync(data.password,16);
    const newUser=new User(data);
    newUser.save().then((user)=>{
        res.json("User Successfully Registered");
    }).catch((err)=>{
        res.json(err);
    })
    
}

export function loginUser(req,res){
    const data=req.body;     
    User.findOne({name:data.name}).then((user)=>{       
        if(user===null){
            res.json({msg:'User not found'})
        }else{
            const isPasswordCorrect=bcrypt.compareSync(data.password,user.password)
            if(isPasswordCorrect){
                const token=jwt.sign({
                    name:user.name,
                    role:user.role,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    phone:user.phone,
                    profilePicture:user.profilePicture
                },process.env.JWT_SECRET)
                res.json({msg:'User login succesful',token:token,user:user})
            }else{
                res.status(404).json({error:"Login Failed"})
            }
        }
    })
}


export function logoutUser(req,res){
    const token=req.headers.authorization?.split("")[1];
    
    
    if (!token){
        res.status(400).json({msg:"No token found"})
    }else{
        
        res.json({msg:"Logout succesfull"})
    }
    
}

export function isItAdmin(req){
    let isAdmin=false;
    if(req.user!=null&&req.user.role=="admin"){
        isAdmin=true;
    }
    return isAdmin
}
//admin
/*{
        "name":"Shaluka",
        "password":"abc123"
      
    }*/