"use server";

import { db } from "@/lib/db";
import { GetUsersPayload, GetUsersValidator } from "@/lib/validators/user";

export const getUsers = async (payload: GetUsersPayload) => {
    try {
        const validatedFields = GetUsersValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { tab, page, limit } = validatedFields.data;
        let whereClause = {};
        let orderByClause = {};

        if (tab === "mature") {
            // Users who have answered at least 10 questions
            whereClause = {

            };
            orderByClause = {
                answers: {
                    _count: "desc"
                }
            };
        } else if (tab === "new-users") {
            // Users that have joined less than 2 months ago
            orderByClause = {
                createdAt: "desc"
            };
        } else if (tab === "voters") {
            // Users who have voted at least 10 posts
            orderByClause = {
                questionVotes: {
                    _count: "desc"
                }
            };
        }

        const users = await db.user.findMany({
            where: whereClause,
            orderBy: orderByClause,
            take: limit,
            skip: (page - 1) * limit,
            select: {
                id: true,
                name: true,
                username: true,
                location: true,
                image: true,
                questions: {
                    select: {
                        tags: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                watchedTags: {
                    select: {
                        name: true
                    }
                },
                createdTags: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const totalUsers = await db.tag.count({
            where: whereClause
        });
        const lastPage = Math.ceil(totalUsers / limit);

        return { users, lastPage };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};