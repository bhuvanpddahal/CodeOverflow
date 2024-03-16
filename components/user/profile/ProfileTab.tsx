"use client";

import DOMPurify from "isomorphic-dompurify";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import PostsBox from "./PostsBox";
import Loader from "@/components/Loader";
import { ProfileData } from "@/types/user";
import { getUserProfile } from "@/actions/user/getUserProfile";

interface ProfileTabProps {
    userId: string;
    profileName: string
    username: string;
    about: string | null;
    isCurrentUser: boolean;
}

const ProfileTab = ({
    userId,
    profileName,
    username,
    about,
    isCurrentUser
}: ProfileTabProps) => {
    const fetchProfile = async () => {
        const payload = { id: userId };
        const data = await getUserProfile(payload);
        return data as ProfileData;
    };

    const {
        data,
        isFetching
    } = useQuery({
        queryKey: ["users", username, { tab: "profile" }],
        queryFn: fetchProfile
    });

    if (isFetching) return <Loader type="half" />
    if (!data) return notFound();

    const posts = [...data.questions, ...data.answers];

    return (
        <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-[240px] h-fit">
                <h3 className="text-lg sm:text-xl text-zinc-800 mb-2">Stats</h3>
                <ul className="grid grid-cols-2 gap-3 border border-zinc-300 rounded-md p-3">
                    <li>
                        <span className="block text-zinc-800 font-medium">1</span>
                        <span className="block text-zinc-600 text-[13px] sm:text-sm">reputation</span>
                    </li>
                    <li>
                        <span className="block text-zinc-800 font-medium">1</span>
                        <span className="block text-zinc-600 text-[13px] sm:text-sm">reached</span>
                    </li>
                    <li>
                        <span className="block text-zinc-800 font-medium">{data.totalAnswers}</span>
                        <span className="block text-zinc-600 text-[13px] sm:text-sm">answers</span>
                    </li>
                    <li>
                        <span className="block text-zinc-800 font-medium">{data.totalQuestions}</span>
                        <span className="block text-zinc-600 text-[13px] sm:text-sm">questions</span>
                    </li>
                </ul>
            </div>

            <div className="flex-1 space-y-4">
                <div>
                    <h3 className="text-lg sm:text-xl text-zinc-800 mb-2">About</h3>
                    {about ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(about) }}
                            className="text-zinc-800 text-[15px]"
                        />
                    ) : (
                        <div className="text-zinc-400 text-[15px]">No about data provided.</div>
                    )}
                </div>

                <PostsBox
                    title="Top posts"
                    posts={posts}
                    profileName={profileName}
                    isCurrentUser={isCurrentUser}
                />
            </div>
        </div>
    )
};

export default ProfileTab;