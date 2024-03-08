"use server";

import { db } from "@/lib/db";
import { GetTagsPayload, GetTagsValidator } from "@/lib/validators/tag";

export const getTags= async (payload: GetTagsPayload) => {
    try {
        const validatedFields = GetTagsValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { tab, page, limit } = validatedFields.data;
        let orderByClause = {};

        if(tab === "popular") {
            orderByClause = {
                questions: { _count: "desc"}
            };
        } else if(tab === "name") {
            orderByClause = {
                name: "asc"
            };
        } else if(tab === "new") {
            orderByClause = {
                createdAt: "desc"
            };
        }

        const tags = await db.tag.findMany({
            where: {},
            orderBy: orderByClause,
            take: limit,
            skip: (page - 1) * limit,
        });

        const totalTags = await db.tag.count({
            where: {}
        });
        const lastPage = Math.ceil(totalTags / limit);

        return { tags, lastPage };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};