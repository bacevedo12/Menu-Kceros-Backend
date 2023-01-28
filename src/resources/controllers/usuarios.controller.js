import { usuarioModel } from '../model/usuarios.model.js';
import generateId from "../../../auth/generateId.js";
import { getToken } from '../../../auth/jwt.js';



export const createUsuario = async ( req, res ) => {
    const { username } = req.body;
    const userExists = await usuarioModel.findOne({ username });

    if(userExists) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    } 

    try {
      const user  = new usuarioModel(req.body);
      user.token = generateId();
      user.hashPassword(req.body.password);
      await user.save() 
        res.json({
          success: true,
          msg: "persona creada",
          userId: user._id
        })

    }catch (error) {
       res.json({
        success: false,
        error: error.message
       })
    }
  }

  export const getUsuarios = async ( req, res ) => {
    try {
      const usuarios = await usuarioModel.find()
      res.json({usuarios});
    }catch (e) {
      return res.json ({
        msg: "error",
        details: e.message
      });
    }
    
  }

  export const getUsuarioById = async ( req, res ) => {
    try{
      const id = req.params.id
      const usuario = await usuarioModel.findById( id )
      return res.json({usuario});
    }catch (e) {
      return res.json ({
        msg: "error",
        details: e.message
      });
    }
    
  };


    
export const signin = async (req, res) => {
    try {
       const { username, password } = req.body
       const user = await usuarioModel.findOne({username});

      if (!user){
        const error = new Error ('nombre usuario o clave incorrecta')
        return res.status(404).json({msg: error.message})
      }
      if (await user.checkPassword(password)) {

        res.json({
          _id: user._id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          token: generateJWT(user._id)
        })
      }else {
        const error =  new Error ('nombre usuario o clave incorrecta')
        return res.status(403).json({msg: error.message})
      }


      }catch (error) {
        return res.json({
          success: false,
          msg: "error en autenticación",
          details: error.message
        })
      }  
    } 
  
//     const { username, password } = req.body;
//     const user = await usuarioModel.findOne({ username });
//     if(!user) {
//         const error = new Error('Usuario y/o clave incorrecta');
//         return res.status(404).json({ msg: error.message });
//     }

//     if(await user.validPassword(password)) {
//         res.json({
//             _id: user._id,
//             name: user.name,
//             token: getToken(req.body.username)
//         })
//     } else {
//         const error = new Error('Usuario y/o clave incorrecta');
//         return res.status(403).json({ msg: error.message });
//     }
// }




export const profile = async (req, res) => {
    const { user } = req;
    res.json(user);
}
