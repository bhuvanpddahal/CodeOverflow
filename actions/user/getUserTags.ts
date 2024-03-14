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
        let whereClause = {};

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        });
        if(!user) throw new Error("User not found");
        
        if (sort === "used") {
            whereClause = {
                questions: {
                    some: {
                        askerId: userId
                    }
                }
            };
        } else if (sort === "watched") {
            whereClause = {
                watcherIds: {
                    has: userId
                }
            };
        } else if (sort === "ignored") {
            whereClause = {
                ignorerIds: {
                    has: userId
                }
            };
        } else if (sort === "created") {
            whereClause = { creatorId: userId };
        }

        const tags = await db.tag.findMany({
            where: whereClause,
            take: limit,
            skip: (page - 1) * limit,
            select: {
                name: true,
                questionIds: true
            }
        });

        const totalTags = await db.tag.count({
            where: whereClause
        });
        const lastPage = Math.ceil(totalTags / limit);

        return { tags, totalTags, lastPage };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};