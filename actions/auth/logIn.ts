"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import {
    LoginPayload,
    LoginValidator,
} from "@/lib/validators/auth";
import { getUserByEmail } from "@/lib/queries/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const logIn = async (payload: LoginPayload) => {
    const validatedFields = LoginValidator.safeParse(payload);
    if(!validatedFields.success) return { error: "Invalid fields" };
    
    const { email, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Invalid credentals" };
    }
    
    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );
        return { success: "Verification email sent", tokenId: verificationToken.id };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong" };
            }
        }
        throw error;
    }
};