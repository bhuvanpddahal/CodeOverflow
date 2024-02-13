import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import { db } from "@/lib/db";
import authConfig from "./auth.config";

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
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            });
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            return true;
        },
        async session({ token, session }) {
            return session;
        },
        async jwt({ token }) {
            return token;
        }
    },
    adapter: MongoDBAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
});