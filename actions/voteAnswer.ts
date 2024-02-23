"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { AnswerVotePayload, AnswerVoteValidator } from "@/lib/validators/vote";

export const voteAnswer = async (payload: AnswerVotePayload) => {
    try {
        const validatedFields = AnswerVoteValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const session = await auth();
        if (!session?.user || !session.user.id) throw new Error("Unauthorized");

        const { answerId, voteType } = validatedFields.data;
        const answer = await db.answer.findUnique({
            where: {
                id: answerId
            }
        });
        if (!answer) throw new Error("Answer not found");

        const existingVote = await db.answerVote.findFirst({
            where: {
                voterId: session.user.id,
                answerId
            }
        });

        if (existingVote) {
            // If the existing vote type is the same as current vote type, delete the vote completely
            if (existingVote.type === voteType) {
                await db.answerVote.delete({
                    where: {
                        voterId_answerId: {
                            voterId: session.user.id,
                            answerId
                        }
                    }
                });
            } else { // If the existing vote type is different from current vote type, update the vote
                await db.answerVote.update({
                    where: {
                        voterId_answerId: {
                            voterId: session.user.id,
                            answerId
                        }
                    },
                    data: {
                        type: voteType
                    }
                });
            }
        } else {
            // Create a new vote with the current vote type, user id & answer id
            await db.answerVote.create({
                data: {
                    type: voteType,
                    voterId: session.user.id,
                    answerId
                }
            });
        }
        return { status: 200 };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};