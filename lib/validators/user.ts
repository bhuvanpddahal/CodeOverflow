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

export const ProfileValidator = z.object({
    userId: z.string(),
    image: z.string().optional(),
    name: z.string().min(3, {
        message: "Display name must be at least 3 characters long"
    }),
    username: z.string().min(3, {
        message: "User name must be at least 3 characters long"
    }),
    location: z.string().optional(),
    about: z.string().trim().refine(
      (value) => value === '' || value.length >= 20,
      { message: "About me must be at least 20 characters long. Either meet the characters mark, or don't include it at all." }
    ),
    websiteLink: z.union([
        z.string().optional(), // Allow empty string or undefined
        z.string().url({ message: 'Invalid URL' }) // Validate URL if present
    ]),
    twitterLink: z.union([
        z.string().optional(), // Allow empty string or undefined
        z.string().url({ message: 'Invalid URL' }) // Validate URL if present
    ]),
    githubLink: z.union([
        z.string().optional(), // Allow empty string or undefined
        z.string().url({ message: 'Invalid URL' }) // Validate URL if present
    ])
});

export const SaveItemValidator = z.object({
    itemId: z.string(),
    itemType: z.enum(["QUESTION", "ANSWER"])
});

export type GetUserPayload = z.infer<typeof GetUserValidator>;
export type GetUserProfilePayload = z.infer<typeof GetUserProfileValidator>;
export type GetUsersPayload = z.infer<typeof GetUsersValidator>;
export type ProfilePayload = z.infer<typeof ProfileValidator>;
export type SaveItemPayload = z.infer<typeof SaveItemValidator>;