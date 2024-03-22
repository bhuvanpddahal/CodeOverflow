import { db } from "./db";
import { getVerificationTokenByEmail } from "./queries/verification-token";

export const generateVerificationToken = async (email: string) => {
    const token = String(Math.floor(Math.random() * 1000000));
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 minutes
    const existingToken = await getVerificationTokenByEmail(email);
    
    if(existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id }
        });
    }
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });
    return verificationToken;
};