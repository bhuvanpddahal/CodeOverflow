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

        const { userId, sort, page, limit } = validatedFields.data;
        let whereClause = {
            voterId: userId
        };
        let votes: (QuestionVotesType | AnswerVotesType)[] = [];
        let totalVotes = 0, lastPage = 0;
        const QUESTION = "QUESTION";
        const ANSWER = "ANSWER";

        if (sort === "all") {
            const postSkip = ((page - 1) * limit) / 2;
            const answerVotesCount = await db.answerVote.count({
                where: { voterId: userId }
            });
            const questionVotesCount = await db.questionVote.count({
                where: { voterId: userId }
            });
            let answerVotes: (Omit<AnswerVotesType, "postType">)[] = [];
            let questionVotes: (Omit<QuestionVotesType, "postType">)[] = [];

            if (answerVotesCount <= postSkip) {
                const totalSkippedQuestionVotes = postSkip * 2 - answerVotesCount;
                questionVotes = await db.questionVote.findMany({
                    where: whereClause,
                    take: limit,
                    skip: totalSkippedQuestionVotes,
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
            } else if (questionVotesCount <= postSkip) {
                const totalSkippedAnswerVotes = postSkip * 2 - answerVotesCount;
                answerVotes = await db.answerVote.findMany({
                    where: whereClause,
                    take: limit,
                    skip: totalSkippedAnswerVotes,
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
            } else if (answerVotesCount - postSkip < limit / 2) {
                answerVotes = await db.answerVote.findMany({
                    where: whereClause,
                    take: limit,
                    skip: postSkip,
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
                questionVotes = await db.questionVote.findMany({
                    where: whereClause,
                    take: limit + postSkip - answerVotesCount,
                    skip: postSkip,
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
            } else if (questionVotesCount - postSkip < limit / 2) {
                questionVotes = await db.questionVote.findMany({
                    where: whereClause,
                    take: limit,
                    skip: postSkip,
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
                answerVotes = await db.answerVote.findMany({
                    where: whereClause,
                    take: limit + postSkip - questionVotesCount,
                    skip: postSkip,
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
            } else {
                answerVotes = await db.answerVote.findMany({
                    where: whereClause,
                    take: limit,
                    skip: postSkip,
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
                questionVotes = await db.questionVote.findMany({
                    where: whereClause,
                    take: limit,
                    skip: postSkip,
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
            }

            // Adding the respective postTypes to differentiate the votes
            const finalAnswerVotes: AnswerVotesType[] = answerVotes.map((vote) => ({ ...vote, postType: ANSWER }));
            const finalQuestionVotes: QuestionVotesType[] = questionVotes.map((vote) => ({ ...vote, postType: QUESTION }));

            // Sort the votes with respect to votedAt (new votes first)
            const allVotes = [...finalQuestionVotes, ...finalAnswerVotes].sort(
                (a, b) => (new Date(b.votedAt)).getTime() - (new Date(a.votedAt)).getTime()
            );

            // Grab only the latest 10 votes
            votes = allVotes.slice(0, 11);

            totalVotes = answerVotesCount + questionVotesCount;
            lastPage = Math.ceil(totalVotes / limit);
        } else if (sort === "answer") {
            const answerVotes = await db.answerVote.findMany({
                where: whereClause,
                orderBy: {
                    votedAt: "desc"
                },
                take: limit,
                skip: (page - 1) * limit,
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
                skip: (page - 1) * limit,
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