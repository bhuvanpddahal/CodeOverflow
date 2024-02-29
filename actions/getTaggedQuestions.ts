"use server";

import { db } from "@/lib/db";
import {
    GetTaggedQuestionsPayload,
    GetTaggedQuestionsValidator
} from "@/lib/validators/question";

export const getTaggedQuestions = async (payload: GetTaggedQuestionsPayload) => {
    try {
        const validatedFields = GetTaggedQuestionsValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { tagId, tab, page, limit } = validatedFields.data;
        let orderByCaluse = {};
        let whereClause = {
            tagIds: { has: tagId }
        };
        
        if (tab === "newest") {
            orderByCaluse = { askedAt: "desc" };
        } else if (tab === "bountied") {
            orderByCaluse = { };
        } else if (tab === "unanswered") {
            const newWhereClause = {
                tagIds: { has: tagId },
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
            orderByCaluse = {
                votes: { _count:  "desc" }
            };
        }

        const questions = await db.question.findMany({
            where: whereClause,
            orderBy: orderByCaluse,
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
        const lastPage = Math.ceil(totalQuestions / limit);

        return { questions, lastPage };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};