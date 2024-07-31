

import express from "express" ;
import { allRoutes  } from "../routes/index.js";
import { errorHandler } from "./errorHandlerMiddleware.js";
import { validateRequest } from "../utils/validateRequest.js";
import { authenticateToken } from "./authMiddleware.js";


async function expressStartup(app)
{
    app.use( express.json()) ; 

    app.get('/', (req, res) => {
        res.send('Hello, Wolrd! This is a teacher portal');
    });

    allRoutes.forEach(route => {

        const { method, path, schema = {}, auth = false, controller } = route;
        const middlewares = [];
        if( schema.body ) middlewares.push( validateRequest(schema.body) ) ; 
        if( auth ) middlewares.push(authenticateToken)
        app[method](path, ...middlewares, controller);
    });

    // Error handling middleware
    app.use(errorHandler);

}


export { expressStartup } ; 












