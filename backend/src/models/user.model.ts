import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  refreshToken: string;
  generateAccessToken: () => void;
  generateRefreshToken: () => void;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password must be provided"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email must be provided"],
      trim: true,
      unique: true,
    },
    avatarUrl: {
      type: String,
    },
    refreshToken: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// generates a access token

userSchema.methods.generateAccessToken = function () {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not defined in the environment variables"
    );
  }
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      avatarUrl: this.avatarUrl,
    },
    process.env.ACCESS_TOKEN_SECRET,

    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
  );
};
// generates a refresh token
userSchema.methods.generateRefreshToken = function () {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not defined in the environment variables"
    );
  }
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,

    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
  );
};
// pre hash  password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//comparing password
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model<User>("User", userSchema);