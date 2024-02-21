import { Dispatch, SetStateAction, useRef } from "react";
import Link from "next/link";
import { BiSolidHome } from "react-icons/bi";
import { RiQuestionnaireFill } from "react-icons/ri";
import { ImPriceTags } from "react-icons/im";
import { IoBookmark } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { PiBagSimpleFill } from "react-icons/pi";

import { useOnClickOutside } from "@/hooks/use-on-click-outside";

interface MobileSidebarProps {
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const MobileSidebar = ({ setShowSidebar }: MobileSidebarProps) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(sidebarRef, () => {
        setShowSidebar(false);
    });
    
    return (
        <div className="bg-white fixed left-0 bottom-0 h-rem max-w-[210px] w-full p-3 overflow-y-auto shadow-lg sm:hidden">
            <ul className="text-[15px]">
                <li>
                    <Link href="/home" className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-zinc-100">
                        <BiSolidHome className="h-5 w-5 text-zinc-800" />
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/home" className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-zinc-100">
                        <RiQuestionnaireFill className="h-5 w-5 text-zinc-800" />
                        Questions
                    </Link>
                </li>
                <li>
                    <Link href="/home" className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-zinc-100">
                        <ImPriceTags className="h-5 w-5 text-zinc-800" />
                        Tags
                    </Link>
                </li>
            </ul>

            <ul className="text-[15px] mt-4">
                <li>
                    <Link href="/home" className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-zinc-100">
                        <IoBookmark className="h-5 w-5 text-zinc-800" />
                        Saves
                    </Link>
                </li>
                <li>
                    <Link href="/home" className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-zinc-100">
                        <ImUsers className="h-5 w-5 text-zinc-800" />
                        Users
                    </Link>
                </li>
                <li>
                    <Link href="/home" className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-zinc-100">
                        <PiBagSimpleFill className="h-5 w-5 text-zinc-800" />
                        Companies
                    </Link>
                </li>
            </ul>
        </div>
    )
};

export default MobileSidebar;