import crypto from "crypto";

import { db } from "./db";
import { getVerificationTokenByEmail } from "./queries/verification-token";

function generateCode() {
    // Generate a random string (longer to ensure enough numbers)
    const buffer = crypto.randomBytes(4); // 4 bytes for more options
    const hex = buffer.toString('hex').toUpperCase();

    // Filter out non-numeric characters
    let code = hex.replace(/\D/g, '');

    // If code is less than 6 digits, repeat until a valid code is found
    while (code.length < 6) {
        code += generateCode().slice(0, 6 - code.length); // Append digits from additional generations
    }

    return code.slice(0, 6); // Truncate to ensure exactly 6 digits
}

export const generateVerificationToken = async (email: string) => {
    const token = generateCode();
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