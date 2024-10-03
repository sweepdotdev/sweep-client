import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z.string().min(2).max(28),
        lastName: z.string().min(2).max(28),
        company: z.string().min(2).max(28).optional(),
        email: z.string().email(),
        password: z
            .string()
            .min(12, { message: "Password must be at least 12 characters." })
            .max(32, { message: "Password cannot be longer than 32 characters." }),
        confirm: z
            .string()
            .min(12, { message: "Password must be at least 12 characters." })
            .max(32, { message: "Password cannot be longer than 32 characters." }),
    })
    .superRefine(({ password, confirm }, ctx) => {
        if (password !== confirm) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match!",
                path: ["confirm"],
            });
        }
    });
