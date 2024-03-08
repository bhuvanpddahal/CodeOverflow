"use server";

import { db } from "@/lib/db";
import { GetUserProfilePayload, GetUserProfileValidator } from "@/lib/validators/user";

export const getActivitySummary = async (payload: GetUserProfilePayload) => {
    try {
        const validatedFields = GetUserProfileValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { id } = validatedFields.data;

        const user = await db.user.findUnique({
            where: {
                id
            }
        });
        if(!user) throw new Error("User not found");

        const questions = await db.question.findMany({
            where: {
                askerId: id
            },
            orderBy: {
                votes: {
                    _count: "desc"
                }
            },
            take: 5,
            select: {
                id: true,
                title: true,
                askedAt: true
            }
        });
        const answers = await db.answer.findMany({
            where: {
                answererId: id
            },
            orderBy: {
                votes: {
                    _count: "desc"
                }
            },
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

        return { questions, answers };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};