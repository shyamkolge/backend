import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({ 
  cloud_name: 'dxy3e0x34', 
  api_key: '937866313525647', 
  api_secret: '8SzhrWiEuCFR8q4NKZMamYioiMg' 
});

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

const uploadOnCloudinary = async (localFilePath) => {

    try {
        if (!localFilePath) return null
        // Upload file on cloudinary 
        const response =  await cloudinary.uploader.upload(localFilePath , {resource_type : "auto"});
        fs.unlinkSync(localFilePath);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath); 
        return null    
    }
}

export {uploadOnCloudinary}