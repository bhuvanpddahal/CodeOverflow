import { Answer, AnswerVote, User } from "@prisma/client";

export type ExtendedAnswer = Answer & {
    answerer: User,
    votes: AnswerVote[]
};

export type AnswersData = {
    answers: ExtendedAnswer[],
    hasNextPage: boolean;
}

export type AnswersSortValue = "highest-score" | "newest-first" | "oldest-first";

export type AnswersSortOption = {
    name: string,
    value: AnswersSortValue
};

export type AnswersSortOptions = AnswersSortOption[];