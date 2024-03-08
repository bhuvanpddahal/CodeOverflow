"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { AnswerPayload, AnswerValidator } from "@/lib/validators/answer";

export const answerQuestion = async (payload: AnswerPayload) => {
    try {
        const validatedFields = AnswerValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const session = await auth();
        if (!session?.user || !session.user.id) throw new Error("Unauthorized");

        const { questionId, content } = validatedFields.data;
        const question = await db.question.findUnique({
            where: {
                id: questionId
            }
        });
        if(!question) throw new Error("Question not found");

        await db.answer.create({
            data: {
                content,
                questionId,
                answererId: session.user.id
            }
        });
        return { success: "Your answer is posted" };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};