import { z } from "zod";

const name = z.string().min(2, {
  message: "Username must be at least 2 characters.",
});
const email = z.string().min(6, {
  message: "Username must be at least 6 characters.",
});
const password = z.string().min(6, {
  message: "Username must be at least 6 characters.",
});



const avatar = z.instanceof(File).nullable()

export const signupSchma = z.object({
  name: name,
  email: email,
  password: password,
  avatar: avatar,
});
