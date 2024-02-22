import { z } from "zod";

export const QuestionVoteValidator = z.object({
    questionId: z.string(),
    voteType: z.enum(['UP', 'DOWN'])
});

export const AnswerVoteValidator = z.object({
    answerId: z.string(),
    voteType: z.enum(['UP', 'DOWN'])
});

export type QuestionVotePayload = z.infer<typeof QuestionVoteValidator>;
export type AnswerVotePayload = z.infer<typeof AnswerVoteValidator>;