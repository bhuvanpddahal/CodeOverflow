import "./globals.css";
import { Figtree } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/Toaster";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Code Overflow",
    description: "A question-and-answer website for computer programmers",
    icons: {
        icon: '/images/logos/favicon.png'
    }
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    console.log('Session: ', session);
    
    
    // const queryClient = new QueryClient();

    return (
        <html lang="en">
            <body className={figtree.className}>
                {/* <QueryClientProvider client={queryClient}> */}
                    <SessionProvider session={session}>
                        <Navbar />
                        {children}
                        <Toaster />
                    </SessionProvider>
                {/* </QueryClientProvider> */}
            </body>
        </html>
    );
}