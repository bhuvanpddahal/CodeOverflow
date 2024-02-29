"use server";

import { db } from "@/lib/db";
import { GetTagsByNamePayload, GetTagsByNameValidator } from "@/lib/validators/tag";

export const getTag = async (payload: GetTagsByNamePayload) => {
    try {
        const validatedFields = GetTagsByNameValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { name } = validatedFields.data;

        const tag = await db.tag.findUnique({
            where: {
                name
            }
        });
        if(!tag) throw new Error("Tag not found");

        return tag;
    } catch (error) {
        throw new Error("Something went wrong");
    }
};