import mongoose from "mongoose";
import { Schema } from "mongoose";
// first step 
const UserQuizSchema = new Schema({
  responses:{
    type:Object,
  },
  name:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true

  }
})

const UserwithQuiz = mongoose.model("Userwithquiz",UserQuizSchema);

export default UserwithQuiz;