import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  //validations
  if (!name || !email || !password) {
    return res.json(
      new ApiError(
        400,
        "Please provide all required fields: name, email, password"
      )
    );
  }
  //check is exist 
};
