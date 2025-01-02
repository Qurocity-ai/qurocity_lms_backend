import express, { json } from "express";
import bcrypt from "bcryptjs";
import UserwithQuiz from "../models/Userwithquiz.js";
import jwt from "jsonwebtoken"
const UserwithQuizRouter = express.Router();

// Registration Route
// UserwithQuizRouter.post("/register", async (req, res) => {
//     const { responses, email, password } = req.body;

//     try {
//         // Check if the user already exists
//         let user = await UserwithQuiz.findOne({ email });

//         if (user) {
//             return res.status(400).json({ error: "User already exists. Please login." });
//         }

//         // Validate responses (this can be skipped if no strict validation is needed)
//         if (!responses || Object.keys(responses).length === 0) {
//             return res.status(400).json({ error: "Please answer all the questions." });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user with responses, email, and password
//         user = new UserwithQuiz({ responses, email, password: hashedPassword });
//         await user.save();

//         res.status(201).json({ msg: "User registered successfully!" });
//     } catch (error) {
//         console.error("Error:", error.message);
//         res.status(500).json({ error: "Error processing request." });
//     }
// });


// Register and login both at the same time 
// Let's create auth route for that 

// Scret Key 
const JWT_SECRET = "Qurocity";

UserwithQuizRouter.post("/auth",async(req,res)=>{
    const { responses ,name,email,password} = req.body;
 
 try {
    // 1.First checke user is exist or not 
    let user = await UserwithQuiz.findOne({email});
    if(!user){
    // if User doen not exist register them 
    // let's check user has given all answer or not 
        if (!responses || Object.keys(responses).length===0){
        return res.status(400).json({error:"Hey!Please Give all answer it help us suggest better course!"})
    }
// Now in order to register hash password 
const hashedPassword = await bcrypt.hash(password,10);
user = new UserwithQuiz({responses,name,email,password:hashedPassword});
await user.save();
// Update User regsiter succesefully we will not return becasue we want auto login 
 console.log("User registered succussfully!");

    }else{
    // 2. If User is exist First validate  then auto login them.
    const isPasswordValid = await bcrypt.compare(password,user.password);
 
    if(!isPasswordValid){
        return res.status(401).json({error:"Invalid credential!"})
    };
    console.log("user login ")

    }
    // auto login we need to genrate token both case 
    const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:"1h"});

    // login or register msg to user 
    res.status(200).json({msg:!user.isNew?"User logged in successfully":"User register successfully",token});
    
 } catch (error) {
    console.error("Error",error.message);
    res.status(500).json({error:"Error processing request."});
 }
})

export default UserwithQuizRouter;
