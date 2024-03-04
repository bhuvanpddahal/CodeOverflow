"use server";

import { db } from "@/lib/db";
import {
    GetUserTagsPayload,
    GetUserTagsValidator
} from "@/lib/validators/tag";

export const getUserTags = async (payload: GetUserTagsPayload) => {
    try {
        const validatedFields = GetUserTagsValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { userId, sort, page, limit } = validatedFields.data;
        let orderByCaluse = {};

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        });
        if(!user) throw new Error("User not found");
        
        // TODO - Implement the sorting of tags
        if (sort === "watched") {
            orderByCaluse = {};
        } else if (sort === "ignored") {
            orderByCaluse = {};
        } else if (sort === "created") {
            orderByCaluse = {};
        }

        const tags = await db.tag.findMany({
            where: {
                creatorId: userId
            },
            orderBy: orderByCaluse,
            take: limit,
            skip: (page - 1) * limit,
            select: {
                name: true
            }
        });

        const totalTags = await db.tag.count({
            where: { creatorId: userId }
        });
        const lastPage = Math.ceil(totalTags / limit);

        return { tags, totalTags, lastPage };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};