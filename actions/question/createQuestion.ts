"use server";

import { PrismaClient } from "@prisma/client";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { QuestionPayload, QuestionValidator } from "@/lib/validators/question";

export const createQuestion = async (payload: QuestionPayload) => {
    try {
        const validatedFields = QuestionValidator.safeParse(payload);
        if (!validatedFields.success) return { error: "Invalid fields" };

        const userSession = await auth();
        const { title, details, expectation, tags } = validatedFields.data;

        if (!userSession?.user || !userSession.user.id) return { error: "Unauthorized" };

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
                        creatorId: userSession.user.id!
                    }
                });
                tagIds.push(newTag.id);
            }
        }
        
        const prisma = new PrismaClient();
        await prisma.$transaction(async () => {
            const newQuestion = await db.question.create({
                data: {
                    title,
                    details,
                    expectation,
                    tagIds,
                    askerId: userSession.user.id!
                }
            });
    
            for(const tagId of tagIds) {
                await db.tag.update({
                    where: { id: tagId },
                    data: {
                        questionIds: {
                            push: newQuestion.id
                        }
                    }
                });
            }
        });

        return { success: "Question created" };
    } catch (error) {
        return { error: "Something went wrong" };
    }
};