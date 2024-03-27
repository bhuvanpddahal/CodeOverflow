"use client";

import Link from "next/link";
import { ImUsers } from "react-icons/im";
import { IoBookmark } from "react-icons/io5";
import { BiSolidHome } from "react-icons/bi";
import { ImPriceTags } from "react-icons/im";
import { usePathname } from "next/navigation";
import { PiBagSimpleFill } from "react-icons/pi";
import { RiQuestionnaireFill } from "react-icons/ri";

import { useCurrentUser } from "@/hooks/use-current-user";

const Sidebar = () => {
    const user = useCurrentUser();
    const pathname = usePathname();

    return (
        <div className="sticky top-[57px] h-rem w-[180px] md:w-[192px] border-r border-zinc-300 pl-2 py-2 md:pl-3 md:py-3 overflow-y-auto hidden sm:block">
            <ul className="text-[15px]">
                <li>
                    <Link href="/home" className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-s-md ${(pathname === "/" || pathname.includes("/home")) ? "bg-zinc-200 font-semibold" : "hover:bg-zinc-100"}`}>
                        <BiSolidHome className={`h-5 w-5 ${pathname.includes("/home") ? "text-zinc-800" : "text-zinc-700"}`} />
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/questions" className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-s-md ${pathname.includes("/questions") ? "bg-zinc-200 font-semibold" : "hover:bg-zinc-100"}`}>
                        <RiQuestionnaireFill className={`h-5 w-5 ${pathname.includes("/questions") ? "text-zinc-800" : "text-zinc-700"}`} />
                        Questions
                    </Link>
                </li>
                <li>
                    <Link href="/tags" className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-s-md ${pathname.includes("/tags") ? "bg-zinc-200 font-semibold" : "hover:bg-zinc-100"}`}>
                        <ImPriceTags className={`h-5 w-5 ${pathname.includes("/tags") ? "text-zinc-800" : "text-zinc-700"}`} />
                        Tags
                    </Link>
                </li>
            </ul>

            <ul className="text-[15px] mt-4">
                {!!user && (
                    <li>
                        <Link href={`/users/${user.username}/saves`} className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-s-md ${pathname.includes("/saves") ? "bg-zinc-200 font-semibold" : "hover:bg-zinc-100"}`}>
                            <IoBookmark className={`h-5 w-5 ${pathname.includes("/saves") ? "text-zinc-800" : "text-zinc-700"}`} />
                            Saves
                        </Link>
                    </li>
                )}
                <li>
                    <Link href="/users" className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-s-md ${(pathname.includes("/users") && !pathname.includes("/saves")) ? "bg-zinc-200 font-semibold" : "hover:bg-zinc-100"}`}>
                        <ImUsers className={`h-5 w-5 ${pathname.includes("/users") ? "text-zinc-800" : "text-zinc-700"}`} />
                        Users
                    </Link>
                </li>
                <li>
                    <Link href="/companies" className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-s-md ${pathname.includes("/companies") ? "bg-zinc-200 font-semibold" : "hover:bg-zinc-100"}`}>
                        <PiBagSimpleFill className={`h-5 w-5 ${pathname.includes("/companies") ? "text-zinc-800" : "text-zinc-700"}`} />
                        Companies
                    </Link>
                </li>
            </ul>
        </div>
    )
};

export default Sidebar;