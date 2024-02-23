import { Answer, Question, User, Vote } from "@prisma/client"

export type ExtendedQuestion = Question & {
    asker: User
};

export type QuestionData = {
    questions: ExtendedQuestion[],
    hasNextPage: boolean
};

export type DetailedQuestion = ExtendedQuestion & {
    votes: Vote[]
};