import jwt from 'jsonwebtoken'; 
import { usuarioModel } from '../model/usuarios.model.js';

const checkAuth = async(req, res, next) => {
   let token; 
   if (req.headers.authorization) {
    try{
        token = req.headers.authorization
        const decodificacion = jwt.verify(token, process.env.SECRET)
        req.user = await usuarioModel.findById(decodificacion.id).select("-password -confirmed -token -createdAt -updatedAt -__v")
        return next()
       
    }catch (error) {
        return res.status(404).json({msg: 'Hubo un error'});
    }

   }
   if (!token) {
        const error = new Error('Token no válido');
        res.status(401).json({ msg: error.message })

   }
   next()
}

export default checkAuth;

