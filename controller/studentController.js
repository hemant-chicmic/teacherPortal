
// import bcrypt from 'bcrypt';
// import { studentModel } from "../models/studentModel.js";



// const studentController = {} ;


// studentController.studentLogin = async(req , res) => {
//     const { enteredStudentEmail, enteredStudentPassword } = req.body;
//     const studentDetailsObject = await studentModel.findOne({ enteredStudentEmail }); 
//     if( !studentDetailsObject ) return res.status(401).json({ message: "Student Not found" });
//     const isMatch = await bcrypt.compare( enteredStudentPassword, studentDetailsObject.password);
//     if(!isMatch) return res.status(401).json({ message: "Invalid password" });
//     const { password: _ , ...studentDetails } = studentDetailsObject.toObject(); // // it is standared to keep name of the unused variable to _ 
//     res.status(200).json({
//         message: "Successfully fetched the student details",
//         student: studentDetails
//     });
// }


// export {studentController } ;








