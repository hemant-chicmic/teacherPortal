

import jwt from 'jsonwebtoken' ; 


const  TOKEN_SECRET = process.env.TOKEN_SECRET ; 


export function generateJWTAccessToken(jwtPayloadObject) 
{
    return jwt.sign(jwtPayloadObject, TOKEN_SECRET , { algorithm: 'HS256' , expiresIn: '300s' });
}







