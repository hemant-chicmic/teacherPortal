
import { addStudent, updateStudentDetails, deleteStudent, checkEmailOrRollNumberExists } from '../services/teacherService.js';

const teacherController = {};

teacherController.addStudent = async (req, res) => {
    const { email, password, role, rollNumber, subjects, subjectsMarks, ...otherDetails } = req.body;
    const isEmailOrRollNumberExist = await checkEmailOrRollNumberExists(email, rollNumber);
    if (isEmailOrRollNumberExist)  return res.status(401).json({ message: "Student email or roll number already exists" });
    if (subjects.length !== subjectsMarks.length) {
        return res.status(400).json({ message: "Subjects and subjectsMarks must have the same length" });
    }
    const studentDetails = await addStudent({ email, password, role, rollNumber, subjects, subjectsMarks, ...otherDetails });
    res.status(201).json({
        status: 201,
        success: true,
        message: "New student details created successfully",
        user: studentDetails,
    });
};

teacherController.updateStudentDetails = async (req, res) => {
    const { rollNumber } = req.params;
    const updateData = req.body;
    if (updateData.subjects && updateData.subjectsMarks && updateData.subjects.length !== updateData.subjectsMarks.length) {
        return res.status(400).json({ message: "Subjects and subjectsMarks must have the same length" });
    }
    const updatedStudent = await updateStudentDetails(rollNumber, updateData);
    res.status(200).json({
        status: 200,
        success: true,
        message: "Student details updated successfully",
        student: updatedStudent,
    });
};

teacherController.deleteStudent = async (req, res) => {
    const { rollNumber } = req.params;
    await deleteStudent(rollNumber);
    res.status(200).json({
        status: 200,
        success: true,
        message: "Student deleted successfully",
    });
};

export { teacherController };










