import { Answer, Question, QuestionVote, Tag, User, Vote } from "@prisma/client";

export type AnswererId = {
    id: string;
}

export type ExtendedQuestion = Question & {
    asker: User,
    votes: QuestionVote[],
    answers: AnswererId[],
    tags: Tag[]
};

export type QuestionData = {
    questions: ExtendedQuestion[],
    hasNextPage: boolean
};