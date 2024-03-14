import { Save, User } from "@prisma/client";

export type VoteType = "UP" | "DOWN";
export type ItemType = "QUESTION" | "ANSWER";

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

export type AnswersData = {
    answers: {
        question: {
            id: string,
            title: string,
            tags: { name: string }[]
        },
        votes: {
            type: VoteType
        }[],
        answeredAt: Date
    }[],
    totalAnswers: number,
    lastPage: number
};

export type QuestionsData = {
    questions: {
        votes: {
            type: VoteType
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

export type SummaryAnswersData = {
    answers: {
        question: {
            id: string,
            title: string
        },
        votes: {
            type: VoteType
        }[],
        answeredAt: Date
    }[],
    totalAnswers: number
};

export type SummaryQuestionsData = {
    questions: {
        id: string,
        title: string,
        votes: {
            type: VoteType
        }[],
        askedAt: Date
    }[],
    totalQuestions: number
};

export type TagsData = {
    tags: {
        name: string,
        questionIds: string[]
    }[],
    totalTags: number,
    lastPage: number
};

type SavedQuestionType = {
    votes: {
        type: VoteType
    }[],
    answers: {
        id: string
    }[],
    views: string[],
    title: string,
    tags: {
        name: string
    }[],
    asker: {
        image: string | null,
        name: string,
        username: string
    },
    askedAt: Date,
    updatedAt: Date
};

export type SavedItem = Save & {
    question: SavedQuestionType,
    answer: {
        question: SavedQuestionType & {
            id: string
        },
        votes: {
            type: VoteType
        }[],
        content: string,
        answerer: {
            image: string | null,
            name: string,
            username: string
        },
        answeredAt: Date,
        updatedAt: Date
    }
};

export type AllSavesData = {
    items: SavedItem[],
    totalItems: number,
    lastPage: number
};