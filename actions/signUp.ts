"use server";

import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

import { db } from "@/lib/db";
import {
    SignupPayload,
    SignupValidator
} from "@/lib/validators/auth";
import { getUserByEmail } from "@/lib/queries/user";

export const signUp = async (payload: SignupPayload) => {
    const validatedFields = SignupValidator.safeParse(payload);
    if(!validatedFields.success) return { error: "Invalid fields" };

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if(existingUser) return { error: "Email already taken" };

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            username: nanoid(10)
        }
    });

    // TODO: Send verification token

    return { success: "You are signed up, now log in" };
};