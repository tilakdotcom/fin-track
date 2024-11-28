import { ApiResponse } from "@/utils/ApiResponse";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { name, email, password}= req.body;
  res.json(
    new ApiResponse({
      statusCode: 200,
      message: "User registered successfully",
    })
  );
};
