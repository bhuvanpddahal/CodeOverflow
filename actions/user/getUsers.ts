"use server";

import { db } from "@/lib/db";
import { GetUsersPayload, GetUsersValidator } from "@/lib/validators/user";

export const getUsers= async (payload: GetUsersPayload) => {
    try {
        const validatedFields = GetUsersValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { tab, page, limit } = validatedFields.data;
        let orderByClause = {};

        if(tab === "mature") {
            // TODO - Only return the users who have answered at least 10 questions
            orderByClause = {
                answers: {
                    _count: "desc"
                }
            };
        } else if(tab === "new-users") {
            orderByClause = {
                createdAt: "desc"
            };
        } else if(tab === "voters") {
            // TODO - Only return the users who have voted at least one question
            orderByClause = {
                questionVotes: {
                    _count: "desc"
                }
            };
        }

        const users = await db.user.findMany({
            where: {},
            orderBy: orderByClause,
            take: limit,
            skip: (page - 1) * limit,
        });

        const totalUsers = await db.tag.count({
            where: {}
        });
        const lastPage = Math.ceil(totalUsers / limit);

        return { users, lastPage };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};