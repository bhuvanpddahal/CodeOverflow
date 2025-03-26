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
    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

    return (
        <html lang="en">
            <head>
                <script
                    defer
                    data-website-id={process.env.METRIK_WEBSITE_ID}
                    data-domain={new URL(appUrl).host}
                    src="https://metrik-one.vercel.app/js/script.js"
                ></script>
            </head>
            <body className={figtree.className}>
                <Providers session={session}>
                    <Navbar />
                    {children}
                    <Toaster />
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
