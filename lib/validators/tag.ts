import { z } from "zod";

export const GetTagsValidator = z.object({
    name: z.string()
});

export type GetTagsPayload = z.infer<typeof GetTagsValidator>;