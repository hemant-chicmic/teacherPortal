import bcrypt from 'bcrypt';
import { studentModel } from "../models/studentModel.js";


let saltRounds = 10 ;

export const checkEmailOrRollNoExist = async (email, rollNo) => {
    const user = await studentModel.findOne({
        $or: [
            { email: email },
            { rollNumber: rollNo }
        ]
    });
    return user ? true : false;
};

export const isStudentExist = async (rollNo) => {
    let student = await studentModel.findOne({ rollNumber: rollNo });
    return student ? true : false ;
};

export const addStudentToDB = async (userData) => {
    let { password, ...otherDetails } = userData;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const studentDetails = new studentModel({
        password: hashedPassword,
        ...otherDetails
    });
    await studentDetails.save();
    return studentDetails;
};


export const updateStudentInDB = async (rollNo, updateData) => {
    const updatedStudent = await studentModel.findOneAndUpdate( { rollNumber : rollNo} , updateData , { new : true } ) ; 
    return updatedStudent ; 
};


export const updateStudentMarksInDB = async (rollNo, updateData) => {
    const student = await studentModel.findOne( { rollNumber : rollNo} ) ; 
    updateData.subjects.forEach((subject, index) => {
        const mark = updateData.subjectsMarks[index];
        const subjectIndex = student.subjects.indexOf(subject);
        student.subjectsMarks[subjectIndex] = mark;
    });
    await student.save();
    return student ; 
};

export const deleteStudent = async (rollNo) => {
    await  studentModel.deleteOne( { rollNumber: rollNo} ) ; 
};






















