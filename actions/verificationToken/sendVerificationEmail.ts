"use server";

import {
    SendVerificationEmailPayload,
    SendVerificationEmailValidator
} from "@/lib/validators/verification-token";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail as sendToken } from "@/lib/mail";

export const sendVerificationEmail = async (payload: SendVerificationEmailPayload) => {
    try {
        const validatedFields = SendVerificationEmailValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { email } = validatedFields.data;

        const verificationToken = await generateVerificationToken(email);
        await sendToken(email, verificationToken.token);

        return { success: "Verification email sent", tokenId: verificationToken.id };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};