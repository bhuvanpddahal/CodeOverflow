import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { getUserById, getUserForSession } from "./lib/queries/user";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            console.log("Inside link account: ", user);
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            });
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log("Inside sign in, user: ", user, "account: ", account);
            // Allow OAuth login without email verification
            if(account?.provider !== "credentials") return true;
            const existingUser = await getUserById(user.id || '');

            // Prevent sign in without email verification
            if(!existingUser || !existingUser.emailVerified) {
                return false;
            }
            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (session.user) {
                session.user.id = token.sub || "";
                session.user.name = token.name;
                session.user.email = token.email || "";
                session.user.username = token.username || "";
                session.user.watchedTagIds = token.watchedTagIds;
                session.user.ignoredTagIds = token.ignoredTagIds;
                session.user.savedItemIds = token.savedItemIds;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserForSession(token.sub);
            if (!existingUser) return token;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.username = existingUser.username;
            token.watchedTagIds = existingUser.watchedTagIds;
            token.ignoredTagIds = existingUser.ignoredTagIds;
            token.savedItemIds = existingUser.saves.map((item) => item.itemId);

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
});