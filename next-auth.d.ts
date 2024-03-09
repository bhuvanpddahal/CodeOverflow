import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    id: string;
    username: string;
    watchedTagIds: string[];
    watchedTagIds: string[];
    ignoredTagIds: string[];
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}