import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z.string().min(2).max(28),
        lastName: z.string().min(2).max(28),
        organizationName: z.string().min(2).max(28),
        email: z.string().email(),
        password: z.string().min(12, { message: "Password must be at least 12 characters." }),
        confirm: z.string().min(12, { message: "Password must be at least 12 characters." }),
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
