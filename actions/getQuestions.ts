"use server";

import { db } from "@/lib/db";
import { GetQuestionsPayload, GetQuestionsValidator } from "@/lib/validators/question";

export const getQuestions = async (payload: GetQuestionsPayload) => {
    try {
        const validatedFields = GetQuestionsValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { tab, page, limit } = validatedFields.data;

        const questions = await db.question.findMany({
            where: {},
            orderBy: { askedAt: "desc" },
            take: limit,
            skip: (page - 1) * limit,
            include: {
                asker: true,
                votes: true,
                answers: {
                    select: {
                        id: true
                    }
                }
            }
        });

        const totalQuestions = await db.question.count({
            where: {}
        });
        const hasNextPage = totalQuestions > (page * limit);

        return { questions, hasNextPage };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};