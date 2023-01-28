import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema( {
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    unique:true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    
  },
  desc: {
    type: String,
    required: true,
    trim: true,
    
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    default:0,
  
  },
  img:{
   type:String,
  },
}, 

{
timestamps:true,
}
)

// Se crea la instancia del modelo.
export const menuModel = new mongoose.model( 'menu', menuSchema )