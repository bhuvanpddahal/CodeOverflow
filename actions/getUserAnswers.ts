"use server";

import { db } from "@/lib/db";
import { GetUserAnswersPayload, GetUserAnswersValidator } from "@/lib/validators/answer";

export const getUserAnswers = async (payload: GetUserAnswersPayload) => {
    try {
        const validatedFields = GetUserAnswersValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { userId, tab } = validatedFields.data;
        let orderByCaluse = {};

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        });
        if(!user) throw new Error("User not found");
        
        if (tab === "score") {
            orderByCaluse = {
                votes: { _count:  "desc" }
            };
        } else if (tab === "newest") {
            orderByCaluse = { answeredAt: "desc" };
        }

        const answers = await db.answer.findMany({
            where: {
                answererId: userId
            },
            orderBy: orderByCaluse,
            take: 5,
            select: {
                question: {
                    select: {
                        id: true,
                        title: true
                    }
                },
                answeredAt: true
            }
        });

        const totalAnswers = await db.answer.count({
            where: { answererId: userId }
        });

        return { answers, totalAnswers };
    } catch (error) {
        console.log(error);
        
        throw new Error("Something went wrong");
    }
};