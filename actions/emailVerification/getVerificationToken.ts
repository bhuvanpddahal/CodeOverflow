"use server";

import {
    GetVerificationTokenPayload,
    GetVerificationTokenValidator
} from "@/lib/validators/verification-token";
import { getVerificationTokenById } from "@/lib/queries/verification-token";

export const getVerificationToken = async (payload: GetVerificationTokenPayload) => {
    try {
        const validatedFields = GetVerificationTokenValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { tokenId } = validatedFields.data;
        const verificationToken = await getVerificationTokenById(tokenId);

        if(!verificationToken) {
            throw new Error("Token not found");
        }
        return { email: verificationToken.email };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};