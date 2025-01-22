import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const LessonSchema = new Schema({
  language: { type: String, required: true },
  level: { type: String, required: true,
    enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
   },
  lessonNumber: { type: Number, required: true },
  lessonTitle: { type: String, required: true },
  videos: [
    {
      title: { type: String, required: true },
      subtitle:{type:String,required:true},
      url: { type: String, required: true }
    }
  ]
});
  
//   const Course = mongoose.model("Course", CourseSchema);
export default model("Course", LessonSchema);
