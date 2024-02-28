"use server";

import { db } from "@/lib/db";
import { GetAnswersPayload, GetAnswersValidator } from "@/lib/validators/answer";

export const getAnswers = async (payload: GetAnswersPayload) => {
    try {
        const validatedFields = GetAnswersValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { questionId, orderBy, page, limit } = validatedFields.data;
        let orderByCaluse = {};
        
        if (orderBy === "highest-score") {
            orderByCaluse = {
                votes: { _count:  "desc" }
            };
        } else if (orderBy === "newest-first") {
            orderByCaluse = { answeredAt: "desc" };
        } else if (orderBy === "oldest-first") {
            orderByCaluse = { answeredAt: "asc" };
        }

        const answers = await db.answer.findMany({
            where: { questionId },
            orderBy: orderByCaluse,
            take: limit,
            skip: (page - 1) * limit,
            include: {
                answerer: true,
                votes: true
            }
        });

        const totalAnswers = await db.answer.count({
            where: { questionId }
        });
        const hasNextPage = totalAnswers > (page * limit);

        return { answers, hasNextPage };
    } catch (error) {
        console.log(error);
        
        throw new Error("Something went wrong");
    }
};