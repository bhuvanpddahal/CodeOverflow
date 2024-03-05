"use client";

import { useState } from "react";
import moment from "moment";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import PostTabs from "../PostTabs";
import Loader from "@/components/Loader";
import { SummaryQuestionsData } from "@/types/user";
import { userSummaryQuestionsTabs } from "@/constants";
import { getUserTopQuestions } from "@/actions/getUserTopQuestions";

interface QuestionsBoxProps {
    userId: string;
    profileName: string;
    username: string;
    isCurrentUser: boolean;
}

type Tab = "score" | "newest" | "views";

const QuestionsBox = ({
    userId,
    profileName,
    username,
    isCurrentUser
}: QuestionsBoxProps) => {
    const [tab, setTab] = useState("score");

    const fetchQuestions = async () => {
        const payload = { userId, tab: tab as Tab };
        const data = await getUserTopQuestions(payload);
        return data as SummaryQuestionsData;
    };

    const {
        data,
        isFetching
    } = useQuery({
        queryKey: ["users", username, { tab: "activity" }, "questions", { tab }],
        queryFn: fetchQuestions
    });

    if(isFetching) return <Loader />
    if(!data) return <div className="flex-1 text-center py-10 text-zinc-400 text-[15px]">Something went wrong</div>

    return (
        <div>
            <div className="flex items-end justify-between flex-wrap gap-1.5 mb-2">
                <div>
                    <h3 className="text-lg sm:text-xl text-zinc-800 -mb-1.5 sm:-mb-1">Questions</h3>
                    <Link href={`/users/${username}?tab=questions`} className="text-zinc-500 text-xs sm:text-sm">View all {data.totalQuestions} questions</Link>
                </div>
                <PostTabs
                    tabs={userSummaryQuestionsTabs}
                    value={tab}
                    setTab={setTab}
                />
            </div>
            <ul className="border border-zinc-300 rounded-md">
                {data.questions.length ? (
                    data.questions.map((question, index) => {
                        const isLast = index === data.questions.length - 1;
                        const votesAmt = question.votes.reduce((acc, vote) => {
                            if (vote.type === 'UP') return acc + 1;
                            if (vote.type === 'DOWN') return acc - 1;
                            return acc;
                        }, 0);

                        return (
                            <li key={index} className={`flex items-center gap-3 ${isLast ? "" : "border-b border-zinc-300"} p-3`}>
                                <div title={`This question has a score of ${votesAmt}`} className="w-[50px] h-full text-[13px] sm:text-sm py-1 text-center bg-emerald-800 text-white rounded-sm">{votesAmt}</div>
                                <Link href={`/questions/${question.id}`} className="flex-1 line-clamp-1 text-[15px] sm:text-base text-blue-700 hover:text-blue-800">
                                    {question.title}
                                </Link>
                                <span title={String(question.askedAt)} className="text-[13px] sm:text-sm text-zinc-600">{moment(question.askedAt).format('ll')}</span>
                            </li>
                        )
                    })
                ) : (
                    <p className="px-4 py-10 text-center text-sm text-zinc-600">
                        {isCurrentUser ? "You have" : `${profileName} has`} not asked any questions
                    </p>
                )}
            </ul>
        </div>
    )
};

export default QuestionsBox;