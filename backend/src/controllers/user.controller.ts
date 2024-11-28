import { User } from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import uploadImageToCloudinary from "@/utils/cloudinary";
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
  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      data: { user: newUser },
      message: "User registered successfully",
    })
  );
});

export { signup };
