"use server";

import { db } from "@/lib/db";
import {
    GetUserTopQuestionsPayload,
    GetUserTopQuestionsValidator
} from "@/lib/validators/question";

export const getUserTopQuestions = async (payload: GetUserTopQuestionsPayload) => {
    try {
        const validatedFields = GetUserTopQuestionsValidator.safeParse(payload);
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
                votes: { _count: "desc" }
            };
        } else if (tab === "newest") {
            orderByCaluse = { askedAt: "desc" };
        } else if (tab === "views") {
            orderByCaluse = {
                viewers: {
                    _count: "desc"
                }
            };
        }

        const questions = await db.question.findMany({
            where: {
                askerId: userId
            },
            orderBy: orderByCaluse,
            take: 5,
            select: {
                id: true,
                title: true,
                votes: {
                    select: {
                        type: true
                    }
                },
                askedAt: true
            }
        });

        const totalQuestions = await db.question.count({
            where: { askerId: userId }
        });

        return { questions, totalQuestions };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};