"use server";

import { db } from "@/lib/db";
import { GetUserQuestionsPayload, GetUserQuestionsValidator } from "@/lib/validators/question";

export const getUserQuestions = async (payload: GetUserQuestionsPayload) => {
    try {
        const validatedFields = GetUserQuestionsValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { userId, sort, page, limit } = validatedFields.data;
        let orderByCaluse = {};

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        });
        if(!user) throw new Error("User not found");
        
        if (sort === "score") {
            orderByCaluse = {
                votes: { _count:  "desc" }
            };
        } else if (sort === "newest") {
            orderByCaluse = { askedAt: "desc" };
        } else if (sort === "views") {
            orderByCaluse = {};
        }

        const questions = await db.question.findMany({
            where: {
                askerId: userId
            },
            orderBy: orderByCaluse,
            take: limit,
            skip: (page - 1) * limit,
            select: {
                votes: {
                    select: {
                        type: true
                    }
                },
                answers: {
                    select: {
                        id: true
                    }
                },
                views: true,
                id: true,
                title: true,
                tags: {
                    select: {
                        name: true
                    }
                },
                askedAt: true
            }
        });

        const totalQuestions = await db.question.count({
            where: { askerId: userId }
        });
        const lastPage = Math.ceil(totalQuestions / limit);

        return { questions, totalQuestions, lastPage };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};