


export const validateRequest = (schema) => {
    return (req , res , next ) => {
        if (schema.params) {
            const { error } = schema.params.validate(req.params, { abortEarly: false });
            if (error) {
                return res.status(400).json({
                    error: error.details.map(err => err.message),
                });
            }
        }
        if (schema.body) {
            const { error } = schema.body.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({
                    error: error.details.map(err => err.message),
                });
            }
        }
        next();
    }
}






