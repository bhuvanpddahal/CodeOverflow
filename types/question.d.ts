import { Answer, Question, QuestionVote, User, Vote } from "@prisma/client";

export type AnswererId = {
    id: string;
}

export type ExtendedQuestion = Question & {
    asker: User,
    votes: QuestionVote[],
    answers: AnswererId[];
};

export type QuestionData = {
    questions: ExtendedQuestion[],
    hasNextPage: boolean
};

export type DetailedQuestion = ExtendedQuestion & {
    votes: Vote[]
};