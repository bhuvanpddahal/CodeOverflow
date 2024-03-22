"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";

import NavSearchbar from "./NavSearchbar";
import MobileSidebar from "./MobileSidebar";
import UserAccountNav from "./UserAccountNav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navbar = () => {
    const user = useCurrentUser();
    const pathname = usePathname();
    const [showSidebar, setShowSidebar] = useState(false);
    const showMenu = pathname === "/log-in" ||
                    pathname === "/sign-up" ||
                    pathname === "/questions/ask" ||
                    (pathname.startsWith("/questions/") && pathname.endsWith("/edit")) || // /questions/:id/edit
                    (pathname.startsWith("/") && pathname.endsWith("/verify")) || // /:tokenId/verify
                    (!user?.id && (pathname === "/" || pathname === "/home"));

    useEffect(() => {
        setShowSidebar(false);
    }, [pathname]);

    return (
        <nav className="bg-white h-[57px] sticky top-0 border-b border-zinc-300 z-10">
            <div className="container h-full pl-0 pr-2 sm:px-4 md:px-8 flex items-center justify-between gap-3">
                <div className="h-full flex">
                    <div className={`relative h-full ${showMenu ? "" : "sm:hidden"}`}>
                        {showSidebar && (
                            <MobileSidebar
                                setShowSidebar={setShowSidebar}
                                showMenu={showMenu}
                            />
                        )}
                        {showSidebar ? (
                            <div className="h-full px-3 flex items-center cursor-pointer hover:bg-zinc-200">
                                <IoMdClose
                                    className="h-6 w-6 shrink-0 text-slate-700"
                                />
                            </div>
                        ) : (
                            <div className="h-full px-3 flex items-center cursor-pointer hover:bg-zinc-200" onClick={() => setShowSidebar(true)}>
                                <MdMenu
                                    className="h-6 w-6 shrink-0 text-slate-700"
                                />
                            </div>
                        )}
                    </div>

                    <Link href='/' className="h-full px-2 flex items-center rounded-sm cursor-pointer hover:bg-zinc-200">
                        <img
                            src="/images/logos/main-logo.svg"
                            alt="code-overflow-logo"
                            className="h-[40px] shrink-0 hidden lg:block"
                        />
                        <img
                            src="/images/logos/favicon.png"
                            alt="code-overflow-logo"
                            className="h-[40px] shrink-0 lg:hidden"
                        />
                    </Link>
                </div>

                <NavSearchbar />

                {!!user ? (
                    <UserAccountNav
                        user={user}
                    />
                ) : (
                    <div className="flex items-center gap-2">
                        <Link href='/log-in' className={cn(buttonVariants({
                            variant: 'outline',
                            className: 'whitespace-nowrap'
                        }))}>
                            Log in
                        </Link>
                        <Link href='/sign-up' className={buttonVariants({
                            className: 'whitespace-nowrap'
                        })}>
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
};

export default Navbar;