"use server";

import { db } from "@/lib/db";
import {
    GetUserVotesPayload,
    GetUserVotesValidator
} from "@/lib/validators/user";
import { AnswerVotesType, QuestionVotesType } from "@/types/user";

export const getUserVotes = async (payload: GetUserVotesPayload) => {
    try {
        const validatedFields = GetUserVotesValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const { userId, sort, page, limit, date } = validatedFields.data;
        let whereClause = {
            voterId: userId,
            votedAt: {
                lt: date
            }
        };
        let votes: (QuestionVotesType | AnswerVotesType)[] = [];
        let totalVotes = 0, lastPage = 0;
        const QUESTION = "QUESTION";
        const ANSWER = "ANSWER";

        if (sort === "all") {
            const answerVotes = await db.answerVote.findMany({
                where: whereClause,
                take: limit,
                select: {
                    type: true,
                    answer: {
                        select: {
                            votes: {
                                select: {
                                    type: true
                                }
                            },
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
                            }
                        }
                    },
                    votedAt: true
                }
            });

            const questionVotes = await db.questionVote.findMany({
                where: whereClause,
                take: limit,
                select: {
                    type: true,
                    question: {
                        select: {
                            id: true,
                            votes: {
                                select: {
                                    type: true
                                }
                            },
                            answers: {
                                select: {
                                    id: true
                                }
                            },
                            views: true,
                            title: true,
                            tags: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    votedAt: true
                }
            });

            // Adding the respective postTypes to differentiate the votes
            const finalAnswerVotes: AnswerVotesType[] = answerVotes.map((vote) => ({ ...vote, postType: ANSWER }));
            const finalQuestionVotes: QuestionVotesType[] = questionVotes.map((vote) => ({ ...vote, postType: QUESTION }));

            // Sort the votes with respect to votedAt (new votes first)
            const allVotes = [...finalQuestionVotes, ...finalAnswerVotes].sort(
                (a, b) => (new Date(b.votedAt)).getTime() - (new Date(a.votedAt)).getTime()
            );

            // Grab only the latest 10 votes
            votes = allVotes.slice(0, 11);

            const answerVotesCount = await db.answerVote.count({
                where: { voterId: userId }
            });
            const questionVotesCount = await db.questionVote.count({
                where: { voterId: userId }
            });

            totalVotes = answerVotesCount + questionVotesCount;
            lastPage = Math.ceil(totalVotes / limit);
        } else if (sort === "answer") {
            const answerVotes = await db.answerVote.findMany({
                where: whereClause,
                take: limit,
                orderBy: {
                    votedAt: "desc"
                },
                select: {
                    type: true,
                    answer: {
                        select: {
                            votes: {
                                select: {
                                    type: true
                                }
                            },
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
                            }
                        }
                    },
                    votedAt: true
                }
            });

            const finalAnswerVotes: AnswerVotesType[] = answerVotes.map((vote) => ({ ...vote, postType: ANSWER }));

            votes = finalAnswerVotes;

            totalVotes = await db.answerVote.count({
                where: { voterId: userId }
            });
            lastPage = Math.ceil(totalVotes / limit);
        } else if (sort === "question") {
            const questionVotes = await db.questionVote.findMany({
                where: whereClause,
                orderBy: {
                    votedAt: "desc"
                },
                take: limit,
                select: {
                    type: true,
                    question: {
                        select: {
                            id: true,
                            votes: {
                                select: {
                                    type: true
                                }
                            },
                            answers: {
                                select: {
                                    id: true
                                }
                            },
                            views: true,
                            title: true,
                            tags: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    votedAt: true
                }
            });

            const finalQuestionVotes: QuestionVotesType[] = questionVotes.map((vote) => ({ ...vote, postType: QUESTION }));

            votes = finalQuestionVotes;

            totalVotes = await db.questionVote.count({
                where: { voterId: userId }
            });
            lastPage = Math.ceil(totalVotes / limit);
        }

        return { votes, totalVotes, lastPage };
    } catch (error) {
        console.log("Error: ", error);
        throw new Error("Something went wrong");
    }
};