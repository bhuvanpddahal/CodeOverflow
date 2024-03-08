"use client";

import moment from "moment";
import Link from "next/link";
import { User } from "@prisma/client";
import { MdCake } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { RiLinksFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { IoLocationSharp } from "react-icons/io5";
import { FaTwitter, FaGithub } from "react-icons/fa";
import { notFound, useSearchParams } from "next/navigation";

import Loader from "../Loader";
import UserAvatar from "../UserAvatar";
import ProfileTab from "./profile/ProfileTab";
import NavigationTabs from "./NavigationTabs";
import SettingsTab from "./settings/SettingsTab";
import ActivitiesTab from "./activity/ActivitiesTab";
import { getUser } from "@/actions/user/getUser";
import { buttonVariants } from "../ui/Button";
import { useCurrentUser } from "@/hooks/use-current-user";

interface UserProfileProps {
    activeTab?: string;
    username: string;
}

const UserProfile = ({ activeTab, username }: UserProfileProps) => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || activeTab || "activity";
    const currentUser = useCurrentUser();

    const fetchUser = async () => {
        const payload = { username };
        const user = await getUser(payload);
        return user as User;
    };

    const {
        data: user,
        isFetching
    } = useQuery({
        queryKey: ["users", username],
        queryFn: fetchUser
    });

    if(isFetching) return <Loader type="full" />
    console.log("user: ", user);
    if(!user) return notFound();

    const isCurrentUser = currentUser?.id === user.id;

    return (
        <section className="flex-1 p-3 sm:p-5 space-y-8">
            <header className="relative">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <UserAvatar user={{
                        name: user.name,
                        image: user.image
                    }} className='h-[80px] sm:h-[110px] md:h-[140px] w-[80px] sm:w-[110px] md:w-[140px] rounded-md shadow-md' />
                    <div>
                        <h2 className="text-2xl sm:text-3xl text-zinc-800" title={user.username}>{user.name}</h2>
                        <div className="mt-2 space-y-1">
                            <p className="text-[13px] sm:text-sm flex items-center gap-1 text-zinc-500" title={String(user.createdAt)}>
                                <MdCake className="h-5 w-5 text-zinc-400" />
                                Member from {moment(user.createdAt).startOf('seconds').fromNow()}
                            </p>
                            {user.location && (
                                <p className="text-[13px] sm:text-sm flex items-center gap-1 text-zinc-500">
                                    <IoLocationSharp className="h-5 w-5 text-zinc-400" />
                                    {user.location}
                                </p>
                            )}
                            <div className="flex gap-2">
                                {user.twitterLink && (
                                    <Link href={user.twitterLink} className="text-[13px] sm:text-sm flex items-center gap-1 text-zinc-500" title={user.twitterLink}>
                                        <FaTwitter className="h-5 w-5 text-zinc-400" />
                                    </Link>
                                )}
                                {user.githubLink && (
                                    <Link href={user.githubLink} className="text-[13px] sm:text-sm flex items-center gap-1 text-zinc-500" title={user.githubLink}>
                                        <FaGithub className="h-5 w-5 text-zinc-400" />
                                    </Link>
                                )}
                                {user.websiteLink && (
                                    <Link href={user.websiteLink} className="text-[13px] sm:text-sm flex items-center gap-1 text-zinc-500" title={user.websiteLink}>
                                        <RiLinksFill className="h-5 w-5 text-zinc-400" />
                                        {user.websiteLink}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {isCurrentUser && (
                    <div className="absolute top-0 right-0">
                        <Link href={`/users/${username}/edit`} className={buttonVariants({
                            variant: "outline",
                            size: "sm",
                            className: "text-zinc-800"
                        })}>
                            <HiPencil className="text-zinc-800 mr-1" />
                            Edit profile
                        </Link>
                    </div>
                )}
            </header>

            <NavigationTabs
                activeTab={tab}
                username={user.username}
                isCurrentUser={isCurrentUser}
            />

            {tab === "profile" && (
                <ProfileTab
                    userId={user.id}
                    username={user.name}
                />
            )}
            {(tab === "activity" || tab === "summary" || tab === "answers" || tab === "questions" || tab === "tags" || tab === "votes") && (
                <ActivitiesTab
                    userId={user.id}
                    profileName={user.name}
                    username={user.username}
                    activeTab={tab}
                    isCurrentUser={isCurrentUser}
                />
            )}
            {tab === "settings" && (
                <SettingsTab
                    userId={user.id}
                    profileName={user.name}
                    username={user.username}
                    image={user.image}
                    location={user.location}
                    about={user.about}
                    websiteLink={user.websiteLink}
                    twitterLink={user.twitterLink}
                    githubLink={user.githubLink}
                    isCurrentUser={isCurrentUser}
                />
            )}
        </section>
    )
};

export default UserProfile;