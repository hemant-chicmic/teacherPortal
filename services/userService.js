import bcrypt from 'bcrypt';
import { studentModel } from "../models/studentModel.js";
import { teacherModel } from '../models/teacherModel.js';

const saltRounds = 10;

export const registerTeacher = async (userData) => {
    const { email, password, role, name, address, age, subjects, subjectsExperience } = userData;
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
    return teacherDetails;
};

export const findUserByEmailAndRole = async (email, role) => {
    let user;
    if (role === 'student') user = await studentModel.findOne({ email });
    else if (role === 'teacher') user = await teacherModel.findOne({ email });
    return user;
};

export const checkUserExists = async (email) => {
    let user = await teacherModel.findOne({ email });
    if (user) return true ;
    user = await studentModel.findOne({ email });
    return user ? true : false;
};


















