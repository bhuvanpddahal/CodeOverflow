"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zilla_Slab } from "next/font/google";
import { FcLock, FcSearch } from "react-icons/fc";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";

const recursive = Zilla_Slab({
    subsets: ["latin"],
    weight: ["500", "600", "700"]
});

const professions = [
    "developer",
    "data scientist",
    "system admin",
    "mobile developer"
];

const Landing = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % professions.length);
        }, 2000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="container px-4 sm:px-8 py-8 min-h-screen bg-zinc-100">
            <div className="bg-zinc-900 p-5 sm:p-8 md:p-10 rounded-2xl mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-8 bg-orange-100 flex flex-col gap-4 items-center rounded-t-xl rounded-bl-xl">
                        <FcSearch className="h-12 w-12" />
                        <p className="text-center text-lg max-w-[320px]">Find the best answer to your technical question, help others answer theirs</p>
                        <Link href="/questions" className={cn(buttonVariants({
                            size: "lg",
                            className: 'bg-orange-600 text-white hover:bg-orange-700'
                        }))}>
                            Go to Questions
                        </Link>
                    </div>
                    <div className="p-8 bg-blue-100 flex flex-col gap-4 items-center rounded-t-xl rounded-br-xl">
                        <FcLock className="h-12 w-12" />
                        <p className="text-center text-lg max-w-[320px]">Want to ask a technical question, that you are not finding answer for?</p>
                        <Link href="/sign-up" className={cn(buttonVariants({
                            size: "lg",
                            className: 'bg-blue-600 text-white hover:bg-blue-700'
                        }))}>
                            Sign up to ask
                        </Link>
                    </div>
                </div>
                <p className={cn(
                    recursive.className,
                    "font-semibold text-4xl sm:text-5xl md:text-6xl text-white text-center mt-12"
                )}>
                    Every <span className="text-orange-600">{professions[activeIndex]}</span> has a tab open to Code Overflow
                </p>
            </div>

            <div>
                <img
                    src="/images/logos/main-logo.svg"
                    alt="code-overflow-logo"
                    className="h-[50px] mx-auto"
                />
                <h5 className="text-muted-foreground text-center">Thousands of people around the globe use Code Overflow for technical problems</h5>
                <ul className="flex justify-center gap-6 flex-wrap mt-6 sm:px-12">
                    <li className="bg-white max-w-sm rounded-md p-5 shadow cursor-pointer hover:shadow-md">
                        <div className="flex items-center gap-3 mb-1">
                            <img
                                src="/images/logos/favicon.png"
                                alt="code-overflow-logo"
                                className="h-[40px]"
                            />
                            <h6 className="font-bold text-zinc-800">ADVERTISING</h6>
                        </div>
                        <p className="text-zinc-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, corrupti.</p>
                    </li>
                    <li className="bg-white max-w-sm rounded-md p-5 shadow cursor-pointer hover:shadow-md">
                        <div className="flex items-center gap-3 mb-1">
                            <img
                                src="/images/logos/favicon.png"
                                alt="code-overflow-logo"
                                className="h-[40px]"
                            />
                            <h6 className="font-bold text-zinc-800">COLLECTIVES</h6>
                        </div>
                        <p className="text-zinc-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, corrupti.</p>
                    </li>
                    <li className="bg-white max-w-sm rounded-md p-5 shadow cursor-pointer hover:shadow-md">
                        <div className="flex items-center gap-3 mb-1">
                            <img
                                src="/images/logos/favicon.png"
                                alt="code-overflow-logo"
                                className="h-[40px]"
                            />
                            <h6 className="font-bold text-zinc-800">TALENT</h6>
                        </div>
                        <p className="text-zinc-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, corrupti.</p>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Landing;