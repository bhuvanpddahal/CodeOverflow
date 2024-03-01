"use client";

import { useState } from "react";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";

import Searchbar from "./NavSearchbar";
import MobileSidebar from "./MobileSidebar";
import UserAccountNav from "./UserAccountNav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navbar = () => {
    const user = useCurrentUser();
    const pathname = usePathname();
    const [showSidebar, setShowSidebar] = useState(false);
    const showMenu = pathname === "/log-in" || pathname === "/sign-up" || pathname === "/questions/ask" || pathname === "/questions/:id/edit";
    
    return (
        <nav className="bg-white h-[57px] sticky top-0 py-2 border-b border-zinc-300 z-10">
            {showSidebar && (
                <MobileSidebar
                    setShowSidebar={setShowSidebar}
                    showMenu={showMenu}
                />
            )}

            <div className="container px-4 md:px-8 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <MdMenu
                        className={`h-6 w-6 text-slate-700 cursor-pointer ${showSidebar ? 'hidden' : 'block'} ${showMenu ? "" : "sm:hidden"}`}
                        onClick={() => setShowSidebar(true)}
                    />
                    <IoMdClose
                        className={`h-6 w-6 text-slate-700 cursor-pointer ${showSidebar ? 'block' : 'hidden'} ${showMenu ? "" : "sm:hidden"}`}
                        onClick={() => setShowSidebar(false)}
                    />

                    <Link href='/'>
                        <img
                            src="/images/logos/main-logo.svg"
                            alt="code-overflow-logo"
                            className="h-[40px] hidden lg:block"
                        />
                        <img
                            src="/images/logos/favicon.png"
                            alt="code-overflow-logo"
                            className="h-[40px] lg:hidden"
                        />
                    </Link>
                </div>

                <Searchbar />

                <div className="flex gap-2">
                    {!!user ? (
                        <UserAccountNav
                            user={user}
                        />
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
};

export default Navbar;