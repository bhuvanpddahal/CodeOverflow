import { z } from "zod";

export const AnswerValidator = z.object({
    questionId: z.string(),
    content: z.string().min(10, {
        message: "This is not an enough long answer"
    })
});

export const GetAnswersValidator = z.object({
    questionId: z.string(),
    orderBy: z.enum(["highest-score", "newest-first", "oldest-first"]),
    page: z.number(),
    limit: z.number()
});

export type AnswerPayload = z.infer<typeof AnswerValidator>;
export type GetAnswersPayload = z.infer<typeof GetAnswersValidator>;