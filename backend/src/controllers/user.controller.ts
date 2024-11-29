import { User } from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import uploadImageToCloudinary from "@/utils/cloudinary";
import { generateAccessAndRefreshToken } from "@/utils/generateAccessAndRefreshToken";
import { Request, Response } from "express";
import fs from "fs";

const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const avatarLocalPath = req.file?.path;

  //validations
  if (!name || !email || !password) {
    return res.json(
      new ApiError(
        400,
        "Please provide all required fields: name, email, password"
      )
    );
  }

  if (!avatarLocalPath) {
    return res.json(new ApiError(400, "Please upload a profile image"));
  }

  //check is exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    fs.unlinkSync(avatarLocalPath);
    return res.json(new ApiError(400, "Email already exists"));
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

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //validations
  if (!email || !password) {
    return res.json(
      new ApiError(400, "Please provide all required fields: email, password")
    );
  }
  //check if exist
  const user = await User.findOne({ email });

  //validation
  if (!user) {
    return res.json(
      new ApiResponse({
        statusCode: 404,
        message: "user not found",
      })
    );
  }

  //password check
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.json(
      new ApiResponse({
        statusCode: 401,
        message: "Invalid credentials",
      })
    );
  }

  //generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  user.refreshToken = "";
  user.password = "";

  const options ={
    httpOnly: true,
    secure: true,
  }
  //return
  return res
  .status(200)
  .cookie("accessToken", accessToken , options)
  .cookie("refreshToken", refreshToken , options)
  .json(
    new ApiResponse({
      statusCode: 200,
      message: "Logged in successfully",
      data: { user, accessToken, refreshToken},
    })
  )

});



export { signup, login };
