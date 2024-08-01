

import express from 'express' ; 
import dotenv from 'dotenv';
import { dbConnection } from './startup/dbConnection.js';
import { expressStartup } from './startup/expressStartup.js';


dotenv.config() ; 

const PORT = process.env.PORT || 3000 ;
const app = express() ; 


async function startServer()
{
    await dbConnection() ; 
    await expressStartup(app) ; 
}

startServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on  http://localhost:${PORT} `);
    });
}).catch(error => {
    console.error('Failed to start the server:', error);
});

























