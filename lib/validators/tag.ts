import { z } from "zod";

export const GetTagsValidator = z.object({
    tab: z.enum(["popular", "name", "new"]),
    page: z.number(),
    limit: z.number()
});

export const GetTagsByNameValidator = z.object({
    name: z.string()
});

export type GetTagsPayload = z.infer<typeof GetTagsValidator>;
export type GetTagsByNamePayload = z.infer<typeof GetTagsByNameValidator>;