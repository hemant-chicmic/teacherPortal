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

export const isStudentExist = async (studentID) => {
    let student = await studentModel.findOne({ _id: studentID });
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


export const updateStudentInDB = async (studentID, updateData) => {
    const updatedStudent = await studentModel.findOneAndUpdate( { _id : studentID} , updateData , { new : true } ) ; 
    return updatedStudent ; 
};


export const updateStudentMarksInDB = async (studentID, updateData) => {
    const student = await studentModel.findOne( { _id : studentID} ) ; 
    updateData.subjects.forEach((subject, index) => {
        const mark = updateData.subjectsMarks[index];
        const subjectIndex = student.subjects.indexOf(subject);
        student.subjectsMarks[subjectIndex] = mark;
    });
    await student.save();
    return student ; 
};

export const deleteStudent = async (studentID) => {
    await  studentModel.deleteOne( { _id: studentID} ) ; 
};


export const isEmailOrRollNumberInUse = async (email, rollNumber, currentStudentID) => {
    const existingStudentByEmail = await studentModel.findOne({ email });
    if (existingStudentByEmail && existingStudentByEmail._id.toString() !== currentStudentID) return true;
    const existingStudentByRollNumber = await studentModel.findOne({ rollNumber });
    if (existingStudentByRollNumber && existingStudentByRollNumber._id.toString() !== currentStudentID) return true;
    return false;
};



















