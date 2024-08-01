
import mongoose from 'mongoose';



const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true } ,
    role: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    subjects: { type: [String],    required: true },
    subjectsMarks: { type: [Number],  required: true },
});

studentSchema.pre('save', function(next) {
    if (this.subjects.length !== this.subjectsMarks.length) 
    {
        return next(new Error('Subjects and subjectsMarks must have the same length'));
    }
    next();
});

export const studentModel = mongoose.model('Student', studentSchema);
















