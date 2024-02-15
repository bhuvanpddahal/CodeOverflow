"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { logOut } from "@/actions/logOut";
import { Button, buttonVariants } from "./ui/Button";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navbar = () => {
    const user = useCurrentUser();
    console.log('Inside navbar, user: ', user);

    const logout = () => {
        logOut();
    };
    
    return (
        <nav className="bg-white sticky top-0 py-2 border-b border-zinc-300">
            <div className="container flex items-center justify-between">
                <div>
                    <Link href='/'>
                        <img
                            src="/images/logos/main-logo.svg"
                            alt="code-overflow-logo"
                            className="h-[40px]"
                        />
                    </Link>
                </div>

                <div className="flex gap-2">
                    {!!user ? (
                        <Button onClick={logout}>
                            Log out
                        </Button>
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