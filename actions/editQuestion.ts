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

        if (!session?.user || !session.user.id) return { error: "Unauthorized" };

        const question = await db.question.findUnique({
            where: { id: questionId }
        });
        if(question?.askerId !== session.user.id) return { error: "Not allowed" };

        let tagIds: string[] = [];

        for (const tag of tags) {
            const tagAlreadyExists = await db.tag.findUnique({
                where: { name: tag }
            });
            
            if(tagAlreadyExists) {
                tagIds.push(tagAlreadyExists.id);
            } else {
                // Create a new tag
                const newTag = await db.tag.create({
                    data: {
                        name: tag,
                        creatorId: session.user.id!
                    }
                });
                tagIds.push(newTag.id);
            }
        }

        const updatedQuestion = await db.question.update({
            where: { id: questionId },
            data: {
                title,
                details,
                expectation,
                tagIds
            }
        });

        for(const tagId of tagIds) {
            await db.tag.update({
                where: { id: tagId },
                data: {
                    questionIds: {
                        push: updatedQuestion.id
                    }
                }
            });
        }

        return { success: "Question edited" };
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
};