import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import studentRouter from "./routes/studentRouter.js";
import lecturerRouter from "./routes/lectureRouter.js";
import subjectRouter from "./routes/subjectRouter.js";
import classroomRouter from "./routes/classroomRouter.js";
import studentPaymentRouter from "./routes/studentPaymentRouter.js";
import lecturerPaymentRouter from "./routes/lecturerPaymentRouter.js";
import schoolRouter from "./routes/schoolRouter.js";

const app = express();

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();


app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(bodyParser.json());



app.use('/api/users',userRouter);
app.use((req,res,next)=>{
    let token=req.header("Authorization");

    if (token!=null){
        token=token.replace("Bearer ","");
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(!err){
                req.user=decoded;
                
            }
        })
        next();
    }

})
let mongoUrl=process.env.MONGO_URL;

mongoose.connect(mongoUrl)

let connection = mongoose.connection;
connection.once("open", () => {
    console.log("Database Connection Success");
});


app.use("/api/students",studentRouter)
app.use("/api/lecturers",lecturerRouter)
app.use("/api/subjects",subjectRouter)
app.use("/api/classrooms",classroomRouter)
app.use("/api/studentPayments", studentPaymentRouter);
app.use("/api/lecturerPayments", lecturerPaymentRouter);
app.use("/api/schools", schoolRouter);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

 