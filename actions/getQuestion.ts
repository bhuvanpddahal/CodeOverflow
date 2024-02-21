"use server";

import { db } from "@/lib/db";

export const getQuestion = async (id: string) => {
    try {
        const question = await db.question.findUnique({
            where: { id },
            include: {
                asker: true,
                votes: {
                    select: {
                        id: true
                    }
                }
            }
        });
        return question;
    } catch (error) {
        return { error: "Something went wrong" };
    }
};