"use server";

import { db } from "@/lib/db";
import { GetTagsByNamePayload, GetTagsByNameValidator } from "@/lib/validators/tag";

export const getTagsByName = async (payload: GetTagsByNamePayload) => {
    try {
        const validatedFields = GetTagsByNameValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { name } = validatedFields.data;

        const tags = await db.tag.findMany({
            where: {
                name: { contains: name }
            },
            take: 6
        });

        return { tags };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};