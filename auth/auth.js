import { expressjwt as jwt } from 'express-jwt';
import * as dotenv from 'dotenv';

//const { expressjwt: jwt } = require("express-jwt");

dotenv.config();


export const getToken = (req) => {
  let { authorization } = req.headers;
  if (authorization) {
    let [type, token] = authorization.split(" ");
    return (type === 'Token' || type === "Bearer") ? token : null;
  }
  return null;
}

export const auth = jwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "user",
  getToken
});

// export const verifyToken = ( req, res, next ) => {

//   // {'authorization': 'Bearer <token>'}
//   const authHeader = req.headers[ 'authorization' ]
//   // Bearer <token>
//   const token = authHeader && authHeader.split( ' ' )[ 1 ]
//   if ( !token ) return res.status( 401 ).json( {
//     status: 'FAILED',
//     error: 'token no presente'
//   } )
//   try {
//     const payload = jwt.verify( token, TOKEN_SECRET )
//     req.user = payload
//     next()
//   } catch ( error ) {
//     if ( error instanceof jwt.TokenExpiredError ) {
//       res.status( 401 ).json( {
//         status: 'FAILED',
//         error: 'token expiró'
//       } )
//     }
//     else if ( error instanceof jwt.JsonWebTokenError ) {
//       res.status( 401 ).json( {
//         status: 'FAILED',
//         error: 'token inválido'
//       } )
//     }
//   }
// }

