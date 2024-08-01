

import { addStudentToDB, checkEmailOrRollNoExist, deleteStudent, isStudentExist, updateStudentInDB } from '../services/studentService.js';
import { addTeacherToDB, deleteTeacher, isTeacherExist, updateTeacherInDB } from '../services/teacherService.js';
import { generateJWTAccessToken } from '../utils/helperFunctions.js';
import { registerAdmin , findUserByEmailAndRole, checkUserExists } from '../services/userService.js';
import bcrypt from 'bcrypt' ;


const userController = {};

let saltRounds = 10 ;

userController.adminRegister = async (req, res) => {
    let { name, email, password, role } = req.body;
    email = email.toLowerCase();
    if (role !== 'admin') return res.status(400).json({ message: "Role must be 'admin'" });
    const isEmailExist = await checkUserExists(email);
    if (isEmailExist)  return res.status(400).json({ message: "Email already exists" });
    const adminDetails = await registerAdmin({ name, email, password, role });
    const jwtPayloadObject = { email, role };
    const jwtToken = generateJWTAccessToken(jwtPayloadObject);
    res.status(201).json({
        status: 201,
        success: true,
        message: "New admin registered successfully",
        user: adminDetails,
        token: jwtToken
    });
}



// userController.userRegister = async (req, res) => {
//     // let { email, password, role, name, address, age, subjects, subjectsExperience } = req.body;
//     // email = email.toLowerCase();
//     // if (role !== 'teacher') return res.status(400).json({ message: "Role must be 'teacher'" });
//     // const isEmailExist = await checkUserExists(email);
//     // if (isEmailExist) return res.status(401).json({ message: "Email already exists" });
//     // const teacherDetails = await registerTeacher({ email, password, role, name, address, age, subjects, subjectsExperience });
//     // const jwtPayloadObject = { email, role };
//     // const jwtToken = generateJWTAccessToken(jwtPayloadObject);
//     // res.status(201).json({
//     //     status: 201,
//     //     success: true,
//     //     message: "New teacher registered successfully",
//     //     user: teacherDetails,
//     //     token: jwtToken
//     // });
// };


userController.userLogin = async (req, res) => {
    let { email, password, role } = req.body;
    email = email.toLowerCase();
    const userDetailsObject = await findUserByEmailAndRole(email, role);
    if (!userDetailsObject) return res.status(401).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, userDetailsObject.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });
    let jwtPayloadObject = { email, role };
    if (role === 'student') {
        jwtPayloadObject.rollNumber = userDetailsObject.rollNumber;
    } else if (role === 'teacher' || role === 'admin') {
        jwtPayloadObject._id = userDetailsObject._id;
    }
    const jwtToken = generateJWTAccessToken(jwtPayloadObject);
    const { password: _, ...userDetails } = userDetailsObject.toObject();
    res.status(200).json({
        message: "User logged in and fetched details successfully",
        user: userDetails,
        token: jwtToken
    });
};





userController.addTeacher = async (req, res) => {
    let { name , email, password, role, address, age, subjects, subjectsExperience } = req.body;
    email = email.toLowerCase();
    if (role !== 'teacher') return res.status(400).json({ message: "Role must be 'teacher'" });
    const isEmailExist = await checkUserExists(email);
    if (isEmailExist) return res.status(400).json({ message: "Email already exists" });
    const teacherDetails = await addTeacherToDB({ email, password, role, name, address, age, subjects, subjectsExperience });
    const jwtPayloadObject = { email, role };
    const jwtToken = generateJWTAccessToken(jwtPayloadObject);
    res.status(201).json({
        status: 201,
        success: true,
        message: "New teacher registered successfully",
        user: teacherDetails,
        token: jwtToken
    });
};

userController.updateTeacher = async (req, res) => {
    const { teacherID } = req.params; 
    const teacherExist = await isTeacherExist(teacherID);
    if (!teacherExist) return res.status(404).json({ message: "Teacher doesn't exist" });
    let { name, email, password, address, age, subjects, subjectsExperience } = req.body;
    if (email) email = email.toLowerCase();
    const updateData = { name, email, address, age, subjects, subjectsExperience };
    if (password) updateData.password = await bcrypt.hash(password, saltRounds);
    const updatedTeacher = await updateTeacherInDB(teacherID, updateData);
    res.status(200).json({
        status: 200,
        success: true,
        message: "Teacher details updated successfully",
        user: updatedTeacher
    });
};

userController.removeTeacher = async (req, res) => {
    const { teacherID } = req.params;
    const teacherExist = await isTeacherExist(teacherID);
    if ( !teacherExist) return res.status(400).json({ message: "Teacher doesn't  exists" });
    await deleteTeacher(teacherID);
    res.status(200).json({
        status: 200,
        success: true,
        message: "teacher deleted successfully",
    });
};




userController.addStudent = async (req, res) => {
    let { name, rollNumber, email, password, role, address, age, subjects, subjectsMarks } = req.body;
    email = email.toLowerCase();
    if (role !== 'student') return res.status(400).json({ message: "Role must be 'student'" });
    const isEmailOrRollNoExist = await checkEmailOrRollNoExist(email, rollNumber);
    if (isEmailOrRollNoExist) return res.status(400).json({ message: "Email or roll number already exists" });
    const studentDetails = await addStudentToDB({ name, rollNumber, email, password, role, address, age, subjects, subjectsMarks });
    res.status(201).json({
        status: 201,
        success: true,
        message: "New student registered successfully",
        user: studentDetails,
    });
};

userController.updateStudent = async (req, res) => {
    const { rollNo } = req.params; 
    const studentExist = await isStudentExist(rollNo);
    if (!studentExist) return res.status(404).json({ message: "student doesn't exist" });
    let { name, rollNumber , email, password, address, age, subjects, subjectsMarks } = req.body;
    if (email) email = email.toLowerCase();
    const updateData = { name, rollNumber , email, password, address, age, subjects, subjectsMarks  };
    if (password) updateData.password = await bcrypt.hash(password, saltRounds);
    const updateStudent = await updateStudentInDB(rollNo, updateData);
    res.status(200).json({
        status: 200,
        success: true,
        message: "Student details updated successfully",
        user: updateStudent
    });
};

userController.removeStudent = async (req, res) => {
    const { rollNo } = req.params;
    const studentExist = await isStudentExist(rollNo);
    if ( !studentExist) return res.status(400).json({ message: "Student doesn't  exists" });
    await deleteStudent(rollNo);
    res.status(200).json({
        status: 200,
        success: true,
        message: "Student deleted successfully",
    });
};





export { userController };












