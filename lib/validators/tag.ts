import { z } from "zod";

export const GetTagsValidator = z.object({
    tab: z.enum(["popular", "name", "new"]),
    page: z.number(),
    limit: z.number()
});

export const GetTagsByNameValidator = z.object({
    name: z.string()
});

export const GetUserTagsValidator = z.object({
    userId: z.string(),
    sort: z.enum(["used", "watched", "ignored", "created"]),
    page: z.number(),
    limit: z.number()
});

export type GetTagsPayload = z.infer<typeof GetTagsValidator>;
export type GetTagsByNamePayload = z.infer<typeof GetTagsByNameValidator>;
export type GetUserTagsPayload = z.infer<typeof GetUserTagsValidator>;