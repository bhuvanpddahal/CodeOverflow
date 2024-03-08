"use server";

import { db } from "@/lib/db";
import { GetUserAnswersPayload, GetUserAnswersValidator } from "@/lib/validators/answer";

export const getUserAnswers = async (payload: GetUserAnswersPayload) => {
    try {
        const validatedFields = GetUserAnswersValidator.safeParse(payload);
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
            orderByCaluse = { answeredAt: "desc" };
        }

        const answers = await db.answer.findMany({
            where: {
                answererId: userId
            },
            orderBy: orderByCaluse,
            take: limit,
            skip: (page - 1) * limit,
            select: {
                question: {
                    select: {
                        id: true,
                        title: true,
                        tags: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                votes: {
                    select: {
                        type: true
                    }
                },
                answeredAt: true
            }
        });

        const totalAnswers = await db.answer.count({
            where: { answererId: userId }
        });
        const lastPage = Math.ceil(totalAnswers / limit);

        return { answers, totalAnswers, lastPage };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};