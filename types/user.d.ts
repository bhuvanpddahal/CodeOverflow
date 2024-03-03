import { User } from "@prisma/client";

export type UserData = {
    users: User[],
    lastPage: number
};

export type Question = {
    id: string,
    title: string,
    askedAt: Date
};

export type Answer = {
    question: {
        id: string,
        title: string
    },
    answeredAt: Date
};

export type ActivitySummaryData = {
    questions: Question[],
    answers: Answer[]
};

export type ProfileData = ActivitySummaryData & {
    totalQuestions: number,
    totalAnswers: number
};

export type SummaryAnswersData = {
    answers: Answer[],
    totalAnswers: number
};

export type SummaryQuestionsData = {
    questions: Question[],
    totalQuestions: number
};