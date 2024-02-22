import { Question, User, Vote } from "@prisma/client"

type ExtendedQuestion = Question & {
    asker: User
};

type QuestionData = {
    questions: ExtendedQuestion[],
    hasNextPage: boolean
};

type DetailedQuestion = ExtendedQuestion & {
    votes: Vote[]
};