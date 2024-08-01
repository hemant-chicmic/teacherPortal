

import Joi from 'joi' ; 
import { teacherController } from "../controller/teacherController.js";
import { asyncHandler } from '../services/errorHandlerMiddleware.js';





export const teacherRoutes =  [
    {
        method : 'put' ,
        path : '/teacher/:studentID',   // // to update the student's details
        schema: {
            body: Joi.object({
                subjects: Joi.array().items(Joi.string()).required(),  
                subjectsMarks: Joi.array().items(Joi.number().min(0).max(100)).required(),  
            }).required()
        },
        auth: true,        
        controller : asyncHandler(teacherController.updateStudentDetails) ,
    } ,
    // {
    //     method : 'delete' ,
    //     path : '/teacher/:rollNumber', // // to delete the student's details
    //     auth: true,        
    //     controller : asyncHandler(teacherController.deleteStudent) ,
    // } ,

]














