"use client";

import { FaUserAstronaut } from "react-icons/fa";

import AnswersBox from "./AnswersBox";
import QuestionsBox from "./QuestionsBox";
import { useQuery } from "@tanstack/react-query";
import { ActivitySummaryData } from "@/types/user";
import { getActivitySummary } from "@/actions/getActivitySummary";
import { notFound } from "next/navigation";

interface SummaryContentProps {
    userId: string;
    username: string;
    isCurrentUser: boolean;
}

const SummaryContent = ({
    userId,
    username,
    isCurrentUser
}: SummaryContentProps) => {
    return (
        <div className="flex-1 space-y-4">
            <div>
                <h3 className="text-lg sm:text-xl text-zinc-800 mb-2">Summary</h3>
                <div className="flex flex-col items-center justify-center gap-2 border border-zinc-300 p-5 rounded-md">
                    <FaUserAstronaut className="h-12 w-12 text-zinc-400" />
                    <div className="text-[15px] sm:text-base text-zinc-800">Measure your impact</div>
                    <p className="text-[13px] sm:text-sm text-zinc-600 text-center">Your posts and helpful actions here help hundreds or thousands of people searching for help.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <AnswersBox
                    userId={userId}
                    username={username}
                />
                <QuestionsBox
                    userId={userId}
                    username={username}
                />
            </div>
        </div>
    )
};

export default SummaryContent;