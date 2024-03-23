import { db } from "@/lib/db";

export const getVerificationTokenById = async (id: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: { id }
        });
        return verificationToken;
    } catch (error) {
        return null;
    }
};

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: { email }
        });
        return verificationToken;
    } catch (error) {
        return null;
    }
};