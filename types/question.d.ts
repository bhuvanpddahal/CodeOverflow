import { Question, User } from "@prisma/client"

type ExtendedQuestion = Question & {
    asker: User
};

type QuestionData = {
    questions: ExtendedQuestion[],
    hasNextPage: boolean
};