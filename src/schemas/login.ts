import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Must be a valid email!" }),
    password: z.string().min(12, { message: "Password must be 12 characters" }),
});
