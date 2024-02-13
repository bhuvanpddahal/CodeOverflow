import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";

const Navbar = async () => {
    const session = await getAuthSession();
    console.log(session);

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
                    {session ? (
                        <p>You're logged in</p>
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