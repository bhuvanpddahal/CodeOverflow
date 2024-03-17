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
    tags: z.array(z.string()).refine(data => data.length <= 5, {
        message: "Please enter no more than 5 tags",
    })
});

export const GetQuestionValidator = z.object({
    questionId: z.string()
});

export const GetQuestionsValidator = z.object({
    tab: z.enum(["interesting", "hot", "week", "month"]),
    page: z.number(),
    limit: z.number()
});

export const GetTaggedQuestionsValidator = z.object({
    tagId: z.string(),
    tab: z.string(),
    page: z.number(),
    limit: z.number()
});

export const GetUserQuestionsValidator = z.object({
    userId: z.string(),
    sort: z.enum(["score", "newest", "views"]),
    page: z.number(),
    limit: z.number()
});

export const GetUserTopQuestionsValidator = z.object({
    userId: z.string(),
    tab: z.enum(["score", "newest", "views"])
});

export type QuestionPayload = z.infer<typeof QuestionValidator>;
export type GetQuestionPayload = z.infer<typeof GetQuestionValidator>;
export type GetQuestionsPayload = z.infer<typeof GetQuestionsValidator>;
export type GetTaggedQuestionsPayload = z.infer<typeof GetTaggedQuestionsValidator>;
export type GetUserQuestionsPayload = z.infer<typeof GetUserQuestionsValidator>;
export type GetUserTopQuestionsPayload = z.infer<typeof GetUserTopQuestionsValidator>;