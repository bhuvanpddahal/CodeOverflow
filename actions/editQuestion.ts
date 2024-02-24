"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { QuestionPayload, QuestionValidator } from "@/lib/validators/question";

export const editQuestion = async (payload: QuestionPayload) => {
    try {
        const validatedFields = QuestionValidator.safeParse(payload);
        if (!validatedFields.success) return { error: "Invalid fields" };

        const session = await auth();
        const { questionId, title, details, expectation, tags } = validatedFields.data;

        const question = await db.question.findUnique({
            where: { id: questionId }
        });
        if(question?.askerId !== session?.user.id) return { error: "Not allowed" };

        await db.question.update({
            where: { id: questionId },
            data: {
                title,
                details,
                expectation,
                tags
            }
        });
        return { success: "Question edited" };
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};