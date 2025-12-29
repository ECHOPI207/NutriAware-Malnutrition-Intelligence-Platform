import { z } from 'zod';

// Password Regex: Min 8, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'), // Don't leak length requirement on login
    rememberMe: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(passwordRegex, 'Password must contain Uppercase, Lowercase, Number, and Special Character'),
    confirmPassword: z.string(),
    terms: z.literal(true, {
        errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(passwordRegex, 'Password must contain Uppercase, Lowercase, Number, and Special Character'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
