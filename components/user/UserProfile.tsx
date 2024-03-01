"use client";

import { MdCake } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import UserAvatar from "../UserAvatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "../ui/Button";
import Link from "next/link";
import SummaryBox from "./SummaryBox";
import SelectActivity from "./SelectActivity";

interface UserProfileProps {
    username: string;
}

const UserProfile = ({ username }: UserProfileProps) => {
    const tab: string = "activity";
    const user = useCurrentUser();

    return (
        <section className="flex-1 p-3 sm:p-5 space-y-8">
            <header className="relative">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    {/* <UserAvatar user={{
                        name: user?.name,
                        image: user?.image
                    }} className='h-[120px] w-[120px] rounded-md shadow-sm' /> */}
                    <div className='h-[80px] sm:h-[110px] md:h-[140px] w-[80px] sm:w-[110px] md:w-[140px] rounded-md shadow-md'></div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl text-zinc-800">Jon Skeet</h2>
                        <div className="mt-2 space-y-1">
                            <p className="text-[13px] sm:text-sm flex items-center gap-1 text-zinc-500">
                                <MdCake className="h-5 w-5 text-zinc-400" />
                                Member for 15 years, 5 months
                            </p>
                            <p className="text-[13px] sm:text-sm flex items-center gap-1 text-zinc-500">
                                <IoLocationSharp className="h-5 w-5 text-zinc-400" />
                                Reading, United Kingdom
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 right-0">
                    <Button variant="outline" className="text-sm text-zinc-800">
                        <HiPencil className="text-zinc-800" />
                        Edit profile
                    </Button>
                </div>
            </header>

            
            <ul className="flex gap-1 text-zinc-600 text-[13px] sm:text-sm">
                <li>
                    <Link href={`/users/${username}?tab=profile`} className={`rounded-3xl px-3 py-1.5 ${tab === "profile" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link href={`/users/${username}?tab=activity`} className={`rounded-3xl px-3 py-1.5 ${tab === "activity" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                        Activity
                    </Link>
                </li>
                <li>
                    <Link href={`/users/${username}?tab=saves`} className={`rounded-3xl px-3 py-1.5 ${tab === "saves" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                        Saves
                    </Link>
                </li>
                <li>
                    <Link href={`/users/${username}?tab=settings`} className={`rounded-3xl px-3 py-1.5 ${tab === "settings" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                        Settings
                    </Link>
                </li>
            </ul>

            <SelectActivity />

            <div className="flex gap-4">
                <ul className="hidden md:inline-block w-[140px] h-fit sticky top-[57px] py-3 text-sm text-zinc-600">
                    <li>
                        <Link href={`/users/${username}?tab=summary`} className="block px-4 py-1.5 rounded-3xl hover:bg-zinc-200">
                            Summary
                        </Link>
                    </li>
                    <li>
                        <Link href={`/users/${username}?tab=answers`} className="block px-4 py-1.5 rounded-3xl hover:bg-zinc-200">
                            Answers
                        </Link>
                    </li>
                    <li>
                        <Link href={`/users/${username}?tab=tags`} className="block px-4 py-1.5 rounded-3xl hover:bg-zinc-200">
                            Tags
                        </Link>
                    </li>
                    <li>
                        <Link href={`/users/${username}?tab=votes`} className="block px-4 py-1.5 rounded-3xl hover:bg-zinc-200">
                            Votes
                        </Link>
                    </li>
                </ul>

                <div className="flex-1 space-y-4">
                    <div>
                        <h3 className="text-xl text-zinc-800 mb-2">Summary</h3>
                        <div className="flex flex-col items-center justify-center gap-2 border border-zinc-300 p-5 rounded-md">
                            <FaUserAstronaut className="h-12 w-12 text-zinc-400" />
                            <div className="text-[15px] sm:text-base text-zinc-800">Measure your impact</div>
                            <p className="text-[13px] sm:text-sm text-zinc-600 text-center">Your posts and helpful actions here help hundreds or thousands of people searching for help.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        <SummaryBox
                            title="Answers"
                        />
                        <SummaryBox
                            title="Questions"
                        />
                        <SummaryBox
                            title="Tags"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
};

export default UserProfile;