import { z } from "zod";

export const LoginValidator = z.object({
    email: z.string().email({
        message: "Email is invalid"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
});

export const SignupValidator = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is invalid"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
});

export type LoginPayload = z.infer<typeof LoginValidator>;
export type SignupPayload = z.infer<typeof SignupValidator>;