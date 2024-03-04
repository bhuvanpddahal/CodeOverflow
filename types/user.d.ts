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

export type AnswersData = {
    answers: {
        question: {
            id: string,
            title: string,
            tags: { name: string }[]
        },
        votes: { type: "UP" | "DOWN" }[],
        answeredAt: Date
    }[],
    totalAnswers: number,
    lastPage: number
};

export type QuestionsData = {
    questions: {
        votes: {
            type: "UP" | "DOWN"
        }[],
        answers: {
            id: string
        }[],
        views: string[],
        id: string,
        title: string,
        tags: {
            name: string
        }[],
        askedAt: Date
    }[],
    totalQuestions: number,
    lastPage: number
};

export type SummaryQuestionsData = {
    questions: Question[],
    totalQuestions: number
};