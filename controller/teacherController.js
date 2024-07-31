

import bcrypt from 'bcrypt';
import { teacherModel } from "../models/teacherModel.js";
import { generateJWTAccessToken } from '../utils/helperFunctions.js';
import { studentModel } from '../models/studentModel.js';


let saltRounds = 10 ; 

const teacherController = {} ;



// teacherController.teacherLogin = async(req , res ) => {
//     const { enteredTeacherEmail, enteredTeacherPassword } = req.body;
//     const teachertDetailsObject = await teacherModel.findOne({ enteredTeacherEmail }); 
//     if( !teachertDetailsObject ) return res.status(401).json({ message: "Teacher Not found" });
//     const isMatch = await bcrypt.compare( enteredTeacherPassword, teachertDetailsObject.password);
//     if(!isMatch) return res.status(401).json({ message: "Invalid password" });
//     const jwtPayloadObject = {
//         email : enteredTeacherEmail ,
//         role : 'teacher'
//     }
//     const jwtToken = generateJWTAccessToken( jwtPayloadObject ) ; 

//     const { password: _ , ...teacherDetails } = teachertDetailsObject.toObject(); // // it is standered to keep the name of the unused variable to _ 
//     res.status(200).json({
//         message: "Successfully fetched the teacher details",
//         teacher: teacherDetails ,
//         token : jwtToken
//     });
// }



teacherController.addStudent = async (req, res) => {
    let { email, password, role, rollNumber,  subjects, subjectsMarks, ...otherDetails } = req.body;
    email = email.toLowerCase();
    let isEmailExist = await studentModel.findOne({
        $or: [
            { email: email },
            { rollNumber: rollNumber }
        ]
    });
    if (isEmailExist) return res.status(401).json({ message: "Student email or roll no already exists" });
    isEmailExist = await teacherModel.findOne({ email });
    if (isEmailExist) return res.status(401).json({ message: "Student email or roll no already exists" });
    if (subjects.length !== subjectsMarks.length) {
        return res.status(400).json({ message: "Subjects and subjectsMarks must have the same length" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const studentDetails = new studentModel({
        email,
        password: hashedPassword,
        role,
        rollNumber , 
        subjects,
        subjectsMarks,
        ...otherDetails,
    });
    await studentDetails.save();
    res.status(201).json({
        status: 201,
        success: true,
        message: "New student details created successfully",
        user: studentDetails,
    });
};







teacherController.updateStudentDetails = async(req , res ) => {
    const { rollNumber } = req.params;
    let { email, password, role, subjects, subjectsMarks, ...otherDetails } = req.body;
    email = email.toLowerCase();
    let student = await studentModel.findOne({ rollNumber });
    if (!student) return res.status(404).json({ message: "Student does not exist" });
    if (subjects.length !== subjectsMarks.length) {
        return res.status(400).json({ message: "Subjects and subjectsMarks must have the same length" });
    }
    if (email) student.email = email;
    if (password) student.password = await bcrypt.hash(password, saltRounds);
    if (role) student.role = role;
    if (subjects) student.subjects = subjects;
    if (subjectsMarks) student.subjectsMarks = subjectsMarks;
    Object.assign(student, otherDetails);
    await student.save();
    res.status(200).json({
        status: 200,
        success: true,
        message: "Student details updated successfully",
        student: student
    });
}


teacherController.deleteStudent = async(req , res ) => {
    const { rollNumber } = req.params;
    const result = await studentModel.deleteOne({ rollNumber });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Student does not exist" });
    res.status(200).json({ 
        status: 200,
        success: true,
        message: "Student deleted successfully"
    });
}


export {teacherController } ;












