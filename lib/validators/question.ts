import { z } from "zod";

export const QuestionValidator = z.object({
    questionId: z.string(),
    title: z.string().min(5, {
        message: "Title must be at least 5 characters long"
    }),
    details: z.string().min(10, {
        message: "This is not an enough long detail"
    }),
    expectation: z.string().min(10, {
        message: "This is not an enough long paragraph"
    }),
    tags: z.string().min(3, {
        message: "Tag must be at least 3 characters long"
    })
});

export const GetQuestionValidator = z.object({
    questionId: z.string()
});

export const GetQuestionsValidator = z.object({
    tab: z.string(),
    page: z.number(),
    limit: z.number()
});

export type QuestionPayload = z.infer<typeof QuestionValidator>;
export type GetQuestionPayload = z.infer<typeof GetQuestionValidator>;
export type GetQuestionsPayload = z.infer<typeof GetQuestionsValidator>;