import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Username must be at least 5 Characters")
    .max(20, "Username must be no more than 20 Characters"),
});

export const clientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Username must be at least 5 Characters")
    .max(20, "Username must be no more than 20 Characters"),
  budget: z.number(),
});
