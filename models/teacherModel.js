
import mongoose from 'mongoose';



const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true } ,
    role: { type: String, required: true } ,
    address: { type: String, required: true },
    age: { type: Number, required: true },
    subjects: { type: [String],    required: true },
    subjectsExperience: { type: [Number],  required: true },
});

teacherSchema.pre('save', function(next) {
    if (this.subjects.length !== this.subjectsExperience.length) 
    {
        return next(new Error('Subjects and subjectsExperience must have the same length'));
    }
    next();
});

export const teacherModel = mongoose.model('Teacher', teacherSchema);



