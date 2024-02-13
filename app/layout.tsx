import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from '@/components/Providers';
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from "@/components/ui/Toaster";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Code Overflow",
    description: "A question-and-answer website for computer programmers",
    icons: {
        icon: '/images/logos/favicon.png'
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={figtree.className}>
                <Providers>
                    <Navbar />
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
