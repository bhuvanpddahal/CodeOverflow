"use server";

import { db } from "@/lib/db";
import {
    GetQuestionsPayload,
    GetQuestionsValidator
} from "@/lib/validators/question";

export const getQuestions = async (payload: GetQuestionsPayload) => {
    try {
        const validatedFields = GetQuestionsValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { tab, page, limit } = validatedFields.data;
        let whereClause = {};
        let orderByClause = {};

        if(tab === "newest") {
            orderByClause = { askedAt: "desc" };
        } else if(tab === "unanswered") {
            const newWhereClause = {
                answers: {
                    none: {
                        content: {
                            contains: ""
                        }
                    }
                }
            };
            whereClause = newWhereClause;
        } else if(tab === "score") {
            orderByClause = {
                votes: { _count:  "desc" }
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