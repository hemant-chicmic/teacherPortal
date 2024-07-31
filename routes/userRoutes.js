
import Joi from 'joi' ; 
import { asyncHandler } from '../startup/errorHandlerMiddleware.js';
import { userController } from '../controller/userController.js';


export const userRoutes = [
    {
        method: 'post',
        path: '/user/register',
        schema: {
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(4).required(),
                role: Joi.string().valid('teacher').required(),
                address: Joi.string().required(),
                age: Joi.number().required(),
                subjects: Joi.array().items(Joi.string()).required(),
                subjectsExperience: Joi.array().items(Joi.number().min(0).max(100)).required()
            }).required()
        },
        auth: false ,
        controller: asyncHandler(userController.userRegister)
    } ,
    {
        method: 'post',
        path: '/user/login',
        schema: {
            body: Joi.object({
                email: Joi.string().email().required(),   
                password: Joi.string().min(4).required(),
                role: Joi.string().valid('student', 'teacher').required()
            }).required()
        },
        auth: false ,
        controller: asyncHandler(userController.userLogin)
    }
];



