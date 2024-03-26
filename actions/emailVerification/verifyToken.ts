"use server";

import { db } from "@/lib/db";
import { signIn } from "@/auth";
import {
    VerifyTokenPayload,
    VerifyTokenValidator
} from "@/lib/validators/verification-token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getVerificationTokenByEmail } from "@/lib/queries/verification-token";
import { useSession } from "next-auth/react";

export const verifyToken = async (payload: VerifyTokenPayload) => {
    try {
        const validatedFields = VerifyTokenValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { email, token } = validatedFields.data;
        console.log("Email: ", email, "Token: ", token);
        const verificationToken = await getVerificationTokenByEmail(email);
        console.log("VerificationToken: ", verificationToken)

        if (!verificationToken) {
            return { error: "Token not found" };
        }

        const hasExpired = new Date(verificationToken.expires) < new Date();
        if (hasExpired) {
            return { error: "Token has expired" };
        }

        console.log("actual token: ", verificationToken.token, "passed token: ", token);

        if (verificationToken.token !== token) {
            return { error: "Token is not matching" };
        }

        const user = await db.user.findUnique({
            where: { email }
        });
        if (!user) return { error: "User not found" };
        
        await db.user.update({
            where: { email },
            data: {
                emailVerified: new Date()
            }
        });

        await db.verificationToken.delete({
            where: { id: verificationToken.id }
        });

        await signIn("credentials", {
            email,
            password: user.password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        console.log("This is the error: ", error)
        throw new Error("Something went wrong");
    }
};