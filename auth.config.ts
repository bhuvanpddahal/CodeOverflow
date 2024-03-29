import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { getUserByEmail } from "./lib/queries/user";
import { LoginValidator } from "./lib/validators/auth";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials) {
                console.log("Inside credentials signin: ", credentials);
                const validatedFields = LoginValidator.safeParse(credentials);
                if(!validatedFields.success) return null;
                const { email, password } = validatedFields.data;
                const user = await getUserByEmail(email);
                if(!user || !user.password) return null;
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if(!passwordsMatch) return null;
                console.log("user is this: ", user);
                return user;
            }
        })
    ],
} satisfies NextAuthConfig;