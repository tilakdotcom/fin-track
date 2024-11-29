import { User } from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import uploadImageToCloudinary from "@/utils/cloudinary";
import { generateAccessAndRefreshToken } from "@/utils/generateAccessAndRefreshToken";
import { Request, Response } from "express";
import fs from "fs";

//signup
const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const avatarLocalPath = req.file?.path;

  //validations
  if (!name || !email || !password) {
   throw new ApiError(
    400,
    "Please provide all required fields: name, email, password"
  )
  }

  if (!avatarLocalPath) {
    throw new ApiError(
      400,
      "Please upload an avatar image"
    );
  }

  //check is exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    fs.unlinkSync(avatarLocalPath);
    throw new ApiError(400, "Email already exists")
  }

  //upload image
  const uploadImageUrl = await uploadImageToCloudinary(avatarLocalPath);

  const newUser = new User({
    name,
    email,
    password,
    avatarUrl: uploadImageUrl.secure_url,
  });
  await newUser.save();

  newUser.password = "secret";
  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "User registered successfully",
      data: { user: newUser },
    })
  );
});

//login
const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //validations
  if (!email || !password) {
    throw new ApiError(400, "Please provide all required fields: email, password")
  }
  //check if exist
  const user = await User.findOne({ email });

  //validation
  if (!user) {
    throw new ApiError(404,"user not found")
  }

  //password check
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "invalid credentials")
  }

  //generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const userRefreshToken = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        refreshToken: refreshToken,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };
  //return
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse({
        statusCode: 200,
        message: "Logged in successfully",
        data: { user },
      })
    );
});

//logout
const logout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(404, "User not found")
  } 
  const userNull = await User.findByIdAndUpdate(userId,
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true }
  )

  //validation
  if (!userNull) {
    throw new ApiError(404, "User not found")
  }

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
  .clearCookie("accessToken" , options)
  .clearCookie("refreshToken", options)
  .json({
    statusCode: 200,
    message: "Logged out successfully",
    data: null,
  })
});

export { signup, login,logout };
