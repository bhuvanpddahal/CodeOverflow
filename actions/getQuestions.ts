"use server";

import { db } from "@/lib/db";

export const getQuestions = async (tab: string, page: number, limit: number) => {
    try {
        const questions = await db.question.findMany({
            where: {},
            orderBy: { askedAt: "desc" },
            take: limit,
            skip: (page - 1) * limit,
            include: { asker: true }
        });

        const totalQuestions = await db.question.count({
            where: {}
        });
        const hasNextPage = totalQuestions > (page * limit);

        return { questions, hasNextPage };
    } catch (error) {
        return { error: "Something went wrong" };
    }
};