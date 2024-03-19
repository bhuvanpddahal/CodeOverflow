"use server";

import { db } from "@/lib/db";
import { SearchQueryPayload, SearchQueryValidator } from "@/lib/validators/search";

export const searchQuery = async (payload: SearchQueryPayload) => {
    try {
        const validatedFields = SearchQueryValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { query } = validatedFields.data;
        if (!query) throw new Error("Invalid query");

        const questions = await db.question.findMany({
            where: {
                title: { contains: query }
            },
            take: 5,
            select: {
                id: true,
                title: true,
                views: true,
                votes: {
                    select: {
                        type: true
                    }
                }
            }
        });
        const tags = await db.tag.findMany({
            where: {
                name: { contains: query }
            },
            take: 5,
            select: {
                name: true,
                watcherIds: true,
                questionIds: true
            }
        });
        const users = await db.user.findMany({
            where: {
                OR: [{
                    email: { contains: query}
                }, {
                    name: { contains: query }
                }, {
                    username: { contains: query }
                }]
            },
            take: 5,
            select: {
                name: true,
                username: true,
                image: true,
                location: true,
                createdAt: true
            }
        });

        return { questions, tags, users };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};