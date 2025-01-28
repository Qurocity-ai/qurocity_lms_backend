import mongoose ,{model} from 'mongoose';
const {Schema} = mongoose;

const IELTSLessonSchema = new Schema({
    language:{type:String,required:true
    },
    lessonNumber:{type:Number,required:true},
    lessonTitle:{type:String,required:true},
    videos:[{
        title:{type:String,required:true},
        subtitle:{type:String,required:true},
        url:{type:String,required:true}
    }]
})

export default model("IELTSCourse",IELTSLessonSchema);