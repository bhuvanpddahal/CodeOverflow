import { connectToDatabase } from "./database";
import User from "./database/models/user.model";

import { nanoid } from "nanoid"
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/log-in'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ token, session }) {
            if(token) {
                const user = {
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                    username: token.username
                };
                session = {
                    ...session,
                    user
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            await connectToDatabase();
            const dbUser = await User.findOne({ email: token.email });

            if(!dbUser) {
                token.id = user.id;
                return token;
            }
            if(!dbUser.username) {
                await User.findByIdAndUpdate(dbUser.id, { username: nanoid(10) }, { new: true });
            }

            return {
                id: dbUser._id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                username: dbUser.username,
            }
        },
        redirect() {
            return '/';
        }
    }
};

export const getAuthSession = () => getServerSession(authOptions);