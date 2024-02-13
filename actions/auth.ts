"use server";

import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database";
import {
    LoginPayload,
    LoginValidator,
    SignupPayload,
    SignupValidator
} from "@/lib/validators/auth";

export const logIn = async (payload: LoginPayload) => {
    const validatedFields = LoginValidator.safeParse(payload);
    if(!validatedFields.success) return { error: "Invalid fields" };
    const { email, password } = validatedFields.data;
    console.log(email, password);
    return { success: "All good" };
};

export const signUp = async (payload: SignupPayload) => {
    const validatedFields = SignupValidator.safeParse(payload);
    if(!validatedFields.success) return { error: "Invalid fields" };

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if(existingUser) return { error: "Email already taken" };

    await User.create({
        name,
        email,
        password: hashedPassword,
        username: nanoid(10)
    });

    // TODO: Send verification token

    return { success: "You are signed up" };
};