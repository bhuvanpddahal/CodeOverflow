"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { GetQuestionsPayload, GetQuestionsValidator } from "@/lib/validators/question";

export const getQuestions = async (payload: GetQuestionsPayload) => {
    try {
        const validatedFields = GetQuestionsValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const session = await auth();
        const { tab, page, limit } = validatedFields.data;
        let whereClause = {};
        let orderByClause = {};
        const today = new Date();

        if (!session?.user || !session.user.id) return { error: "Unauthorized" };

        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: {
                watchedTags: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if(!user) throw new Error("User not found");

        const watchedTags = user.watchedTags.map((tag) => tag.name);

        if(tab === "interesting") {
            whereClause = {
                tags: {
                    some: {
                        name: { in: watchedTags }
                    }
                }
            };
            orderByClause = { askedAt: "desc" };
        } else if(tab === "hot") {
            const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000); // Subtract 3 days in milliseconds
            whereClause = {
                askedAt: {
                    gte: threeDaysAgo // Greater than or equal to 3 days ago
                }
            };
            orderByClause = {
                viewers: {
                    _count: "desc"
                }
            };
        } else if(tab === "week") {
            const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days in milliseconds
            whereClause = {
                askedAt: {
                    gte: oneWeekAgo // Greater than or equal to 7 days ago
                }
            };
            orderByClause = {
                viewers: {
                    _count: "desc"
                }
            };
        } else if(tab === "month") {
            const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // Subtract 30 days in milliseconds
            whereClause = {
                askedAt: {
                    gte: oneMonthAgo // Greater than or equal to 30 days ago
                }
            };
            orderByClause = {
                viewers: {
                    _count: "desc"
                }
            };
        }

        const questions = await db.question.findMany({
            where: whereClause,
            orderBy: orderByClause,
            take: limit,
            skip: (page - 1) * limit,
            include: {
                asker: true,
                votes: true,
                tags: true,
                answers: {
                    select: {
                        id: true
                    }
                }
            }
        });

        const totalQuestions = await db.question.count({
            where: whereClause
        });
        const hasNextPage = totalQuestions > (page * limit);

        return { questions, hasNextPage };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};