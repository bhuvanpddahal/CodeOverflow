import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username?: string | null;
        watchedTagIds?: string[];
        ignoredTagIds?: string[];
    }
}

declare module "next-auth" {
    interface Session {
        id: string;
        username?: string | null;
        watchedTagIds?: string[];
        ignoredTagIds?: string[];
    }
}