

import Joi from 'joi' ; 
import { teacherController } from "../controller/teacherController.js";
import { asyncHandler } from "../startup/errorHandlerMiddleware.js";





export const teacherRoutes =  [
    {
        method: 'post',
        path: '/teacher/addStudent',
        schema: {
            body: Joi.object({
                name: Joi.string().required(),
                rollNumber: Joi.number().min(1).max(100).required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(4).required(),
                role: Joi.string().valid('student').required(), 
                address: Joi.string().required(),
                age: Joi.number().required(),
                subjects: Joi.array().items(Joi.string()).required(),  
                subjectsMarks: Joi.array().items(Joi.number().min(0).max(100)).required(),  
                percentage: Joi.number().min(0).max(100).required()
            }).required()
        },
        auth: true,
        controller: asyncHandler(teacherController.addStudent)
    } ,
    {
        method : 'put' ,
        path : '/teacher/:rollNumber',   // // to update the student's details
        schema: {
            body: Joi.object({
                name: Joi.string().required(),
                rollNumber: Joi.number().min(1).max(100).required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(4).required(),
                role: Joi.string().valid('student').required(), 
                address: Joi.string().required(),
                age: Joi.number().required(),
                subjects: Joi.array().items(Joi.string()).required(),  
                subjectsMarks: Joi.array().items(Joi.number().min(0).max(100)).required(),  
                percentage: Joi.number().min(0).max(100).required()
            }).required()
        },
        auth: true,        
        controller : asyncHandler(teacherController.updateStudentDetails) ,
    } ,
    {
        method : 'delete' ,
        path : '/teacher/:rollNumber', // // to delete the student's details
        auth: true,        
        controller : asyncHandler(teacherController.deleteStudent) ,
    } ,

]














