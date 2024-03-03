import { z } from "zod";

export const GetUserValidator = z.object({
    username: z.string()
});

export const GetUserProfileValidator = z.object({
    id: z.string()
});

export const GetUsersValidator = z.object({
    tab: z.enum(["mature", "new-users", "voters"]),
    page: z.number(),
    limit: z.number()
});

export type GetUserPayload = z.infer<typeof GetUserValidator>;
export type GetUserProfilePayload = z.infer<typeof GetUserProfileValidator>;
export type GetUsersPayload = z.infer<typeof GetUsersValidator>;