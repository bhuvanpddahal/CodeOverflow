import { z } from "zod";

export const GetUsersValidator = z.object({
    tab: z.enum(["mature", "new-users", "voters"]),
    page: z.number(),
    limit: z.number()
});

export type GetUsersPayload = z.infer<typeof GetUsersValidator>;;