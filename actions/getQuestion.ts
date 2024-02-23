"use server";

import { db } from "@/lib/db";
import { GetQuestionPayload, GetQuestionValidator } from "@/lib/validators/question";

export const getQuestion = async (payload: GetQuestionPayload) => {
    try {
        const validatedFields = GetQuestionValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { questionId } = validatedFields.data;

        const question = await db.question.findUnique({
            where: { id: questionId },
            include: {
                asker: true,
                votes: true
            }
        });
        if(!question) throw new Error("Question not found");
        return question;
    } catch (error) {
        throw new Error("Something went wrong");
    }
};