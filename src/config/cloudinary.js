import {v2 as cloudinary} from 'cloudinary'

export async function uploadimage(filepath){
    return await cloudinary.uploader.upload(filepath, {folder: 'imageMenu'})
}


cloudinary.config({ 
    cloud_name: 'dvxt7r888', 
    api_key: '761256241639243', 
    api_secret: 'RG0mVJhSOHJApufYyKAO6zceIzw' 
  });
