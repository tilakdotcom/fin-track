import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

if (
  !process.env.ClOUDINARY_API_NAME ||
  !process.env.ClOUDINARY_API_KEY ||
  !process.env.ClOUDINARY_API_SECRET
) {
  console.error("Missing Cloudinary API credentials!");
  process.exit(1);
}


//configure cloudinary
cloudinary.config({
  cloud_name: process.env.ClOUDINARY_API_NAME,
  api_key: process.env.ClOUDINARY_API_KEY,
  api_secret: process.env.ClOUDINARY_API_SECRET,
})


//upload image to cloudinary
const uploadImageToCloudinary = async(localImagePath : string)=>{
  if(!localImagePath){
    throw new Error("Local image path is required!");
  }
  try {
    const uploadResult = await  cloudinary.uploader.upload(localImagePath,{
      folder: "easy-order",
      public_id: Date.now().toString(),
      format: "jpg",
      width: 1000,
      height: 1000,
      crop: "fill",
      quality: "auto:good",

    })

    //validation 
    if(!uploadResult.secure_url){
      throw new Error("Failed to upload image to Cloudinary!");
    }
    console.log("successfully image uploaded")
    return uploadResult;
  } catch (error) {
    throw new Error(`Error uploading image to Cloudinary: ${error}`);
  }finally{
    fs.unlinkSync(localImagePath);
  }
}

export default uploadImageToCloudinary;