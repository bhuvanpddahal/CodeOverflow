import { z } from "zod";

export const SearchQueryValidator = z.object({
    query: z.string()
});

export type SearchQueryPayload = z.infer<typeof SearchQueryValidator>;