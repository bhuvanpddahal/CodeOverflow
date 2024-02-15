import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    username: string;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}