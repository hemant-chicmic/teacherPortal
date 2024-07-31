


export const validateRequest = (schema) => {
    return (req , res , next ) => {
        
        const result = schema.validate(req.body, { abortEarly: false }); 
        if( result.error )
        {
            return res.status(400).json({
                error:  result.error ,
            });
        }
        req.body = result.value; 
        console.log( req.body ) ; 
        next() ;
    }
}






