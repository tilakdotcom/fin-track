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

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const avatar = z
  .any()
  .refine((files) => Array.isArray(files) || files instanceof FileList, {
    message: "Expected a list of files",
  })
  .refine((files) => Array.from(files).every((file) => file instanceof File), {
    message: "All items must be valid File objects",
  })
  .refine(
    (files) =>
      Array.from(files).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      ),
    { message: "Only these file types are allowed: .jpg, .jpeg, .png, .webp" }
  );

export const signupSchma = z.object({
  name: name,
  email: email,
  password: password,
  avatar: avatar,
});
