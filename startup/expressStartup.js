

import express from "express" ;
import { allRoutes  } from "../routes/index.js";
import { validateRequest } from "../utils/validateRequest.js";
import { authenticateToken } from "../services/authMiddleware.js";
import { errorHandler } from "../services/errorHandlerMiddleware.js";



async function expressStartup(app)
{
    app.use( express.json()) ; 

    app.get('/', (req, res) => {
        res.send('Hello, Wolrd! This is a teacher portal');
    });

    allRoutes.forEach(route => {

        const { method, path, schema = {}, auth = false, controller } = route;
        const middlewares = [];
        if( schema ) middlewares.push( validateRequest(schema) ) ; 
        if( auth ) middlewares.push(authenticateToken)
        app[method](path, ...middlewares, controller);
    });

    // Error handling middleware
    app.use(errorHandler);

}


export { expressStartup } ; 












