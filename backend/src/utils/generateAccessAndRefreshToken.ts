import { User } from "@/models/user.model"
import { ApiError } from "./ApiError"

export const generateAccessAndRefreshToken = async(userId:any)=>{
  try {
    const user = await User.findById(userId)
    if(!user) throw new ApiError(404, "User not found")
    
    // genate tokens
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    
    // save tokens
    await user.save({validateBeforeSave:false})//learn about
    return {accessToken, refreshToken}  
  } catch (error) {
    throw new ApiError(500, "Error generating access token")
  }
}