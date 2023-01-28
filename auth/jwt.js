import jwt from 'jsonwebtoken'; 

//const jwt = require("jsonwebtoken");

import * as dotenv from 'dotenv';

dotenv.config();

export const getToken =  (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
      expiresIn: "30d",     
  }) 
}

export const validateToken = (token) => {
  return jwt.validateToken(token, process.env.SECRET);
}

export const verifyToken = (req) => {
  let { authorization } = req.headers;
  if (authorization) {
    let [type, token] = authorization.split(" ");
    if (type === "Token" || type === "Bearer") {
      let { sub } = jwt.verify(token, process.env.SECRET);
      return sub;
    }
  }
  return null;
};

