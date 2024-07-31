


import bcrypt from 'bcrypt';
import { studentModel } from "../models/studentModel.js";
import { teacherModel } from '../models/teacherModel.js';
import { generateJWTAccessToken } from '../utils/helperFunctions.js';

let saltRounds = 10 ; 

const userController = {} ;





userController.userRegister = async(req , res) => {
    let { email, password, role, name, address, age, subjects, subjectsExperience } = req.body;
    email = email.toLowerCase();
    if (role !== 'teacher') {
        return res.status(400).json({ message: "Role must be 'teacher'" });
    }
    let existingTeacher = await teacherModel.findOne({ email });
    if (existingTeacher) return res.status(401).json({ message: " email already exists" });
    existingTeacher = await studentModel.findOne({ email });
    if (existingTeacher) return res.status(401).json({ message: " email already exists" });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const teacherDetails = new teacherModel({
        email,
        password: hashedPassword,
        role,
        name,
        address,
        age,
        subjects,
        subjectsExperience,
    });
    await teacherDetails.save();

    const jwtPayloadObject = {
        email,
        role,
    };
    const jwtToken = generateJWTAccessToken(jwtPayloadObject);

    // Send response
    res.status(201).json({
        status: 201,
        success: true,
        message: "New teacher registered successfully",
        user: teacherDetails,
        token: jwtToken
    });
}


userController.userLogin = async(req , res) => {
    let { email, password , role } = req.body;
    email = email.toLowerCase();
    console.log( email , " " , password , " " , role ) ; 
    let userDetailsObject ; 
    if( role == 'student' ) userDetailsObject = await studentModel.findOne({ email }); 
    else if( role == 'teacher' ) userDetailsObject = await teacherModel.findOne({ email }); 
    else return res.status(400).json({ message: "Invalid user role" }); 
    if( !userDetailsObject ) return res.status(401).json({ message: "user not found" });
    const isMatch = await bcrypt.compare( password, userDetailsObject.password);
    if(!isMatch) return res.status(401).json({ message: "Invalid password" });
    const jwtPayloadObject = {
        email : email ,
        role : role ,
    }
    const jwtToken = generateJWTAccessToken( jwtPayloadObject ) ; 
    const { password: _ , ...userDetails } = userDetailsObject.toObject(); // // Standard practice to use `_` for unused variables  
    res.status(200).json({
        message: "user logged in and fetched details Successfully ",
        user: userDetails ,
        token : jwtToken
    });
}















export {userController } ;








