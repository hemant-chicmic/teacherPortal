import bcrypt from 'bcrypt';
import { studentModel } from '../models/studentModel.js';
import { teacherModel } from '../models/teacherModel.js';

const saltRounds = 10;

export const addStudent = async (studentData) => {
    const { email, password, role, rollNumber, subjects, subjectsMarks, ...otherDetails } = studentData;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const studentDetails = new studentModel({
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
        rollNumber,
        subjects,
        subjectsMarks,
        ...otherDetails,
    });
    await studentDetails.save();
    return studentDetails;
};

export const updateStudentDetails = async (rollNumber, updateData) => {
    const { email, password, role, subjects, subjectsMarks, ...otherDetails } = updateData;
    let student = await studentModel.findOne({ rollNumber });
    if (!student) throw new Error('Student does not exist');
    if (email) student.email = email.toLowerCase();
    if (password) student.password = await bcrypt.hash(password, saltRounds);
    if (role) student.role = role;
    if (subjects) student.subjects = subjects;
    if (subjectsMarks) student.subjectsMarks = subjectsMarks;
    Object.assign(student, otherDetails);

    await student.save();
    return student;
};

export const deleteStudent = async (rollNumber) => {
    const result = await studentModel.deleteOne({ rollNumber });
    if (result.deletedCount === 0) throw new Error('Student does not exist');
};

export const checkEmailOrRollNumberExists = async (email, rollNumber) => {
    let user = await studentModel.findOne({
        $or: [{ email: email.toLowerCase() }, { rollNumber }]
    });
    if (!user) user = await teacherModel.findOne({ email: email.toLowerCase() });
    return user;
};






