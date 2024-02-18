"use client";

import Link from "next/link";

import Searchbar from "./Searchbar";
import UserAccountNav from "./UserAccountNav";
import { cn } from "@/lib/utils";
import { logOut } from "@/actions/logOut";
import { buttonVariants } from "./ui/Button";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navbar = () => {
    const user = useCurrentUser();
    
    return (
        <nav className="bg-white sticky top-0 py-2 border-b border-zinc-300 z-10">
            <div className="container px-4 md:px-8 flex items-center justify-between gap-3">
                <div>
                    <Link href='/'>
                        <img
                            src="/images/logos/main-logo.svg"
                            alt="code-overflow-logo"
                            className="h-[40px] hidden md:block"
                        />
                        <img
                            src="/images/logos/favicon.png"
                            alt="code-overflow-logo"
                            className="h-[40px] md:hidden"
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
                            <Link href='/log-in' className={cn(buttonVariants({ variant: 'outline' }))}>
                                Log in
                            </Link>
                            <Link href='/sign-up' className={buttonVariants()}>
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