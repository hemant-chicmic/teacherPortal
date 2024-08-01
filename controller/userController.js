

import { generateJWTAccessToken } from '../utils/helperFunctions.js';
import { registerTeacher, findUserByEmailAndRole, checkUserExists } from '../services/userService.js';
import bcrypt from 'bcrypt' ;

const userController = {};



userController.userRegister = async (req, res) => {
    let { email, password, role, name, address, age, subjects, subjectsExperience } = req.body;
    email = email.toLowerCase();
    if (role !== 'teacher') return res.status(400).json({ message: "Role must be 'teacher'" });
    const isEmailExist = await checkUserExists(email);
    if (isEmailExist) return res.status(401).json({ message: "Email already exists" });
    const teacherDetails = await registerTeacher({ email, password, role, name, address, age, subjects, subjectsExperience });
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

userController.userLogin = async (req, res) => {
    let { email, password, role } = req.body;
    email = email.toLowerCase();
    const userDetailsObject = await findUserByEmailAndRole(email, role);
    if (!userDetailsObject) return res.status(401).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, userDetailsObject.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });
    const jwtPayloadObject = { email, role };
    const jwtToken = generateJWTAccessToken(jwtPayloadObject);
    const { password: _, ...userDetails } = userDetailsObject.toObject();
    res.status(200).json({
        message: "User logged in and fetched details successfully",
        user: userDetails,
        token: jwtToken
    });
};

export { userController };












