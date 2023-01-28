import { menuModel } from '../model/menu.model.js'
import { uploadimage } from '../../config/cloudinary.js';



export const createPlato = async ( req, res ) => {
  try{

    const plato  = new menuModel(req.body);
    let resultado;
    if(req.files?.image){
      const result= await uploadimage(req.files.image.tempFilePath)
      console.log(result)
    }
    plato.save().then((data) => resultado = data);
    return res.json ({
      msg: "plato creado",
      details: resultado
    });
  }catch (error) {
    console.log(error);
    return res.json({
     msg: "ocurrio un error",
     details: error.message
    });
 } 
}


//   const body = req.body
//   const newUsuario = await usuarioModel.create( body )
//   res.json( newUsuario )
// }

export const getPlatos = async ( req, res ) => {
  try {
    const platos = await menuModel.find()
    res.json({platos});
  }catch (e) {
   return res.json ({
      msg: "error",
      details: e.message
    });
  }
  
}

export const getPlatoById = async ( req, res ) => {
  try{
    const id = req.params.id
    const plato = await menuModel.findById( id )
    return res.json({plato});
  }catch (e) {
    return res.json ({
      msg: "error",
      details: e.message
    });
  }
  
};

export const updatePlatoById = async ( req, res ) => {
 try {
  const body = req.body
  const id = req.params.id
  const platoUpdated = await menuModel.findByIdAndUpdate( id, body, { new: true } )
  res.json({platoUpdated});
 }catch (e) {
  return res.json ({
    msg: "error",
    details: e.message
  });
}
  
};

export const deletePlatoById = async ( req, res ) => {
  try {
    const id = req.params.id
    const platoRemoved = await menuModel.findByIdAndDelete( id )
    res.json({platoRemoved});
  }catch (error) {
    console.log(error);
    return res.json({
     msg: "ocurrio un error",
     details: error.message
    });
 } 
  
}
