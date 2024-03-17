import "./globals.css";

import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
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

    return (
        <html lang="en">
            <body className={figtree.className}>
                <Providers session={session}>
                    <Navbar />
                    <div className="container">
                        {children}
                    </div>
                    <Toaster />
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}