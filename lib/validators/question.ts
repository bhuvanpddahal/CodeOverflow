import { z } from "zod";

export const QuestionValidator = z.object({
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

export type QuestionPayload = z.infer<typeof QuestionValidator>;