"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { QuestionPayload, QuestionValidator } from "@/lib/validators/question";

export const createQuestion = async (payload: QuestionPayload) => {

    const validatedFields = QuestionValidator.safeParse(payload);
    if(!validatedFields.success) return { error: "Invalid fields" };

    const session = await auth();
    const { title, details, expectation, tags } = validatedFields.data;
    
    try {
        await db.question.create({
            data: {
                title,
                details,
                expectation,
                tags,
                asker: {
                    connect: {
                        id: session?.user.id
                    }
                }
            }
        });
        return { success: "Question created" };
    } catch (error) {
        return { error: "Something went wrong" };
    }
};