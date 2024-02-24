"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { GetQuestionPayload, GetQuestionValidator } from "@/lib/validators/question";

export const getQuestion = async (payload: GetQuestionPayload) => {
    try {
        const validatedFields = GetQuestionValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { questionId } = validatedFields.data;

        let question = await db.question.findUnique({
            where: { id: questionId },
            include: {
                asker: true,
                votes: true
            }
        });
        if(!question) throw new Error("Question not found");

        const session = await auth();
        if (session?.user && session.user.id) {
            const alreadyViewed = question.views.find((view) => view === session.user.id);

            // Add the user id to the views array of the question if the user is logged in
            // and if it was not previously viewed by the user
            if(!alreadyViewed) {
                const views = question.views;
                const newViews = [...views, session.user.id];
                await db.question.update({
                    where: { id: questionId },
                    data: { views: newViews }
                });
                question = { ...question, views: newViews };
            }
        }

        return question;
    } catch (error) {
        throw new Error("Something went wrong");
    }
};