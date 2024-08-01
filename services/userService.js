import bcrypt from 'bcrypt';
import { studentModel } from "../models/studentModel.js";
import { teacherModel } from '../models/teacherModel.js';
import { adminModel } from '../models/adminModel.js';

const saltRounds = 10;

export const registerAdmin = async (userData) => {
    const { name , email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const adminDetails = new adminModel({
        name,
        email,
        password: hashedPassword,
        role,
    });
    await adminDetails.save();
    return adminDetails;
};



export const findUserByEmailAndRole = async (email, role) => {
    let user;
    if (role === 'student') user = await studentModel.findOne({ email });
    else if (role === 'teacher') user = await teacherModel.findOne({ email });
    else if (role === 'admin') user = await adminModel.findOne({ email });
    return user;
};

export const checkUserExists = async (email) => {
    let user = await adminModel.findOne({ email });
    if (user) return true ;
    user = await teacherModel.findOne({ email });
    if (user) return true ;
    user = await studentModel.findOne({ email });
    return user ? true : false;
};



















