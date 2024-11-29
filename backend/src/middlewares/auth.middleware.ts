import { asyncHandler } from "@/utils/asyncHandler";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "@/utils/ApiError";
import { User } from "@/models/user.model";

// Extend Request to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      //valition
      if (!token) {
        throw new ApiError(401, "Not authorized");
      }

      if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new ApiError(
          404,
          "ACCESS_TOKEN_SECRET is not defined in the environment variables"
        );
      }
      //token deacode
      const decodeToken: any = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );

      console.log("decode token : ", token);

      const user = await User.findById(decodeToken?.id).select(
        "-password -refreshToken"
      );
      if (!user) {
        throw new ApiError(403, "Not authorized");
      }

      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(401, "Not authorized");
    }
  }
);

export { verifyJWT };
