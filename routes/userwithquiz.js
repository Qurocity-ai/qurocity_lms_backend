import express, { json } from "express";
import bcrypt from "bcryptjs";
import UserwithQuiz from "../models/Userwithquiz.js";
import jwt from "jsonwebtoken"
const UserwithQuizRouter = express.Router();


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

// User Registration Route
UserwithQuizRouter.post("/register", async (req, res) => {
    const { responses, name, email, password } = req.body;

    try {
        // Validate required fields
        if (!responses || Object.keys(responses).length === 0) {
            return res.status(400).json({ error: "Please answer all questions to help us suggest better courses!" });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // Check if user already exists
        let user = await UserwithQuiz.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already registered. Please log in." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new UserwithQuiz({ responses, name, email, password: hashedPassword });
        await user.save();

        console.log("User registered successfully!");

        // Generate token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully!", token });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Error processing request." });
    }
});


// User Login Route
UserwithQuizRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required!" });
        }

        // Check if user exists
        const user = await UserwithQuiz.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials!" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials!" });
        }

        console.log("User logged in successfully!");

        // Generate token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "User logged in successfully!", token });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Error processing request." });
    }
});

export default UserwithQuizRouter;
