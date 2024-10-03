import { z } from "zod";

export const loginSchema = z
    .object({
        email: z.string().email({ message: "Must be a valid email!" }),
        password: z
            .string()
            .min(12, { message: "Password must be 12 characters" })
            .max(32, { message: "Password cannot be longer than 32 characters" }),
    })
    .superRefine(({ password }, checkPassComplexity) => {
        const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
        const containsLowercase = (ch: string) => /[a-z]/.test(ch);
        const containsSpecialChar = (ch: string) =>
            /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

        const containsNumber = (ch: string) => /[0-9]/.test(ch);

        if (!containsSpecialChar(password)) {
            checkPassComplexity.addIssue({
                code: "custom",
                message: "Password must contain a special character",
                path: ["password"],
            });
        }

        if (!containsUppercase(password)) {
            checkPassComplexity.addIssue({
                code: "custom",
                message: "Password must contain an uppercase character!",
                path: ["password"],
            });
        }

        if (!containsLowercase(password)) {
            checkPassComplexity.addIssue({
                code: "custom",
                message: "Password must contain an lowercase character!",
                path: ["password"],
            });
        }

        if (!containsNumber(password)) {
            checkPassComplexity.addIssue({
                code: "custom",
                message: "Password must contain a number!",
                path: ["password"],
            });
        }
    });
