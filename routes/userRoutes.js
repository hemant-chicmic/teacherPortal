
import Joi from 'joi' ; 
import { asyncHandler } from '../services/errorHandlerMiddleware.js';
import { userController } from '../controller/userController.js';


export const userRoutes = [
    {
        method: 'post',
        path: '/admin/register',
        schema: {
            body: Joi.object({
                name: Joi.string().required(),   
                email: Joi.string().email().required(),   
                password: Joi.string().min(4).required(),
                role: Joi.string().valid('admin').required()
            }).required()
        },
        auth: false ,
        controller: asyncHandler(userController.adminRegister)
    } ,
    {
        method: 'post',
        path: '/user/login',
        schema: {
            body: Joi.object({
                email: Joi.string().email().required(),   
                password: Joi.string().min(4).required(),
                role: Joi.string().valid('student', 'teacher' , 'admin').required()
            }).required()
        },
        auth: false ,
        controller: asyncHandler(userController.userLogin)
    } ,
    {
        method: 'post',
        path: '/admin/addTeacher',
        schema: {
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(4).required(),
                role: Joi.string().valid('teacher').required(),
                address: Joi.string().required(),
                age: Joi.number().required(),
                subjects: Joi.array().items(Joi.string()).required(),
                subjectsExperience: Joi.array().items(Joi.number().min(0).max(40)).required()
            }).required()
        },
        auth: true ,
        controller: asyncHandler(userController.addTeacher)
    } ,
    {
        method: 'put',
        path: '/admin/updateTeacher/:teacherID',
        schema: {
            params: Joi.object({
                teacherID: Joi.string().pattern(/^[a-fA-F0-9]{24}$/).required()
            }).required(),
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(4).required(),
                address: Joi.string(),
                age: Joi.number(),
                subjects: Joi.array().items(Joi.string()),
                subjectsExperience: Joi.array().items(Joi.number().min(0).max(40))
            }).optional()
        },
        auth: true,
        controller: asyncHandler(userController.updateTeacher)
    } ,
    {
        method: 'delete',
        path: '/admin/removeteacher/:teacherID',
        schema: {
            params: Joi.object({
                teacherID: Joi.string().pattern(/^[a-fA-F0-9]{24}$/).required()
            }).required(),
        },
        auth: true ,
        controller: asyncHandler(userController.removeTeacher)
    } ,
    {
        method: 'post',
        path: '/admin/addStudent',
        schema: {
            body: Joi.object({
                name: Joi.string().required(),
                rollNumber: Joi.number().min(1).max(100).required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(4).required(),
                role: Joi.string().valid('student').required(), 
                address: Joi.string().required(),
                age: Joi.number().required(),
                subjects: Joi.array().items(Joi.string().valid('Hindi', 'English', 'Physics', 'Chemistry', 'Math')).length(5).required(),  
                subjectsMarks: Joi.array().items(Joi.number().min(0).max(100)).length(5).required(), 
            }).required()
        },
        auth: true,
        controller: asyncHandler(userController.addStudent)
    } ,
    {
        method: 'put',
        path: '/admin/updateStudent/:studentID', //   rollNo
        schema: {
            params: Joi.object({
                studentID: Joi.string().pattern(/^[a-fA-F0-9]{24}$/).required()
            }).required(),
            body: Joi.object({
                name: Joi.string(),
                rollNumber: Joi.number().min(1).max(100),
                email: Joi.string().email(),
                password: Joi.string().min(4),
                address: Joi.string(),
                age: Joi.number(),
                subjects: Joi.array().items(Joi.string().valid('Hindi', 'English', 'Physics', 'Chemistry', 'Math')),
                subjectsMarks: Joi.array().items(Joi.number().min(0).max(100))
            }).optional()
        },
        auth: true,
        controller: asyncHandler(userController.updateStudent)
    },
    {
        method: 'delete',
        path: '/admin/removeStudent/:studentID',
        schema: {
            params: Joi.object({
                studentID: Joi.string().pattern(/^[a-fA-F0-9]{24}$/).required()
            }).required(),
        },
        auth: true ,
        controller: asyncHandler(userController.removeStudent)
    } ,
    
];



