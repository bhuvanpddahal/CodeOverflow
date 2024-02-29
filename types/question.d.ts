import { Answer, Question, QuestionVote, Tag, User, Vote } from "@prisma/client";

export type AnswererId = {
    id: string;
}

export type BaseQuestion = Question & {
    asker: User,
    votes: QuestionVote[],
    answers: AnswererId[]
};

export type ExtendedQuestion = BaseQuestion & {
    tags: Tag[]
};

export type FormQuestion = BaseQuestion & {
    tags: {
        name: string
    }[]
};

export type QuestionData = {
    questions: ExtendedQuestion[],
    hasNextPage: boolean
};