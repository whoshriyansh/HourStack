import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 5 Characters")
  .max(20, "Username must be no more than 20 Characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 Characters" }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 Characters" }),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

export const googleUserSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  fromGoogle: z.literal(true),
});
