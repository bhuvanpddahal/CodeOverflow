"use server";

import { db } from "@/lib/db";

export const getQuestion = async (id: string) => {
    try {
        const question = await db.question.findUnique({
            where: { id },
            include: {
                asker: true,
                votes: true
            }
        });
        return question;
    } catch (error) {
        throw new Error("Something went wrong");
    }
};