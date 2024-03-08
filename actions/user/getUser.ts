"use server";

import { db } from "@/lib/db";
import { GetUserPayload, GetUserValidator } from "@/lib/validators/user";

export const getUser = async (payload: GetUserPayload) => {
    try {
        const validatedFields = GetUserValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { username } = validatedFields.data;

        const user = await db.user.findUnique({
            where: {
                username
            }
        });
        if(!user) throw new Error("User not found");

        return user;
    } catch (error) {
        throw new Error("Something went wrong");
    }
};