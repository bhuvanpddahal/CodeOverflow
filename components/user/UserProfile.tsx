"use client";

import Link from "next/link";
import { MdCake } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";

import ActivitiesTab from "./ActivitiesTab";
import SelectActivity from "./SelectActivity";
import { Button } from "../ui/Button";
import { useCurrentUser } from "@/hooks/use-current-user";
import ProfileTab from "./ProfileTab";
import NavigationTabs from "./NavigationTabs";

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

            <NavigationTabs />

            {/* <ActivitiesTab /> */}
            <ProfileTab />
        </section>
    )
};

export default UserProfile;