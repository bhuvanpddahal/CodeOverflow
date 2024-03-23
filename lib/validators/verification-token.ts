import { z } from "zod";

export const GetVerificationTokenValidator = z.object({
    tokenId: z.string()
});

export const VerifyTokenValidator = z.object({
    email: z.string(),
    token: z.string()
});

export const SendVerificationEmailValidator = z.object({
    email: z.string()
});

export type GetVerificationTokenPayload = z.infer<typeof GetVerificationTokenValidator>;
export type VerifyTokenPayload = z.infer<typeof VerifyTokenValidator>;
export type SendVerificationEmailPayload = z.infer<typeof SendVerificationEmailValidator>;