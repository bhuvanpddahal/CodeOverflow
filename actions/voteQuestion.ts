"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { QuestionVotePayload, QuestionVoteValidator } from "@/lib/validators/vote";

export const voteQuestion = async (payload: QuestionVotePayload) => {
    try {
        const validatedFields = QuestionVoteValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const session = await auth();
        if (!session?.user || !session.user.id) throw new Error("Unauthorized");

        const { questionId, voteType } = validatedFields.data;
        const question = await db.question.findUnique({
            where: {
                id: questionId
            },
            include: {
                votes: true
            }
        });
        if (!question) throw new Error("Question not found");

        const existingVote = await db.vote.findFirst({
            where: {
                voterId: session.user.id,
                questionId
            }
        });

        if (existingVote) {
            // If the existing vote type is the same as current vote type, delete the vote completely
            if (existingVote.type === voteType) {
                await db.vote.delete({
                    where: {
                        voterId_questionId: {
                            voterId: session.user.id,
                            questionId
                        }
                    }
                });
            } else { // If the existing vote type is different from current vote type, update the vote
                await db.vote.update({
                    where: {
                        voterId_questionId: {
                            voterId: session.user.id,
                            questionId
                        }
                    },
                    data: {
                        type: voteType
                    }
                });
            }
        } else {
            // Create a new vote with the current vote type, user id & question id
            await db.vote.create({
                data: {
                    type: voteType,
                    voterId: session.user.id,
                    questionId
                }
            });
        }
        return { status: 200 };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};