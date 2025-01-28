import express from "express";
import "dotenv/config.js";
import IELTSLesson from "../models/IELTS.js";

const router = express.Router();

// Testing Route

router.get("/",async(req,res)=>{
    res.send("Hello From IELTSClass")
})


// CREATE a new lesson
router.post('/ielts-lessons', async (req, res) => {
    try {
        const newLesson = new IELTSLesson(req.body);
        const savedLesson = await newLesson.save();
        res.status(201).json(savedLesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all lessons
router.get('/ielts-lessons', async (req, res) => {
    try {
        const lessons = await IELTSLesson.find();
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single lesson by ID
router.get('/ielts-lessons/:id', async (req, res) => {
    try {
        const lesson = await IELTSLesson.findById(req.params.id); // Corrected the model name
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a lesson by ID
router.put('/ielts-lessons/:id', async (req, res) => {
    try {
        const updatedLesson = await IELTSLesson.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Ensure new data is returned and validators are run
        );
        if (!updatedLesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.status(200).json(updatedLesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a lesson by ID
router.delete('/ielts-lessons/:id', async (req, res) => {
    try {
        const deletedLesson = await IELTSLesson.findByIdAndDelete(req.params.id);
        if (!deletedLesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
