"use client";

import { useState } from "react";
import moment from "moment";
import Link from "next/link";

import PostTabs from "./PostTabs";
import { useQuery } from "@tanstack/react-query";
import { SummaryQuestionsData } from "@/types/user";
import { userSummaryQuestionsTabs } from "@/constants";
import { getUserTopQuestions } from "@/actions/getUserTopQuestions";

interface QuestionsBoxProps {
    userId: string;
    username: string;
}

type Tab = "score" | "newest" | "views";

const QuestionsBox = ({ userId, username }: QuestionsBoxProps) => {
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

    if(isFetching) return <div>Loading...</div>
    if(!data) return <div>Something went wrong</div>

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
                {data.questions.map((question, index) => (
                    <li key={index} className={`flex items-center gap-3 ${index === data.questions.length - 1 ? "" : "border-b border-zinc-300"} p-3`}>
                        <div className="w-[50px] h-full text-[13px] sm:text-sm py-1 text-center bg-emerald-800 text-white rounded-sm">11869</div>
                        <Link href={`/questions/id`} className="flex-1 line-clamp-1 text-[15px] sm:text-base text-blue-700 hover:text-blue-800">
                            {question.title}
                        </Link>
                        <span className="text-[13px] sm:text-sm text-zinc-600">{moment(question.askedAt).format('ll')}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default QuestionsBox;