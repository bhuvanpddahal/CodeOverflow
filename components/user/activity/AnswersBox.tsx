"use client";

import { useState } from "react";
import moment from "moment";
import Link from "next/link";

import PostTabs from "./PostTabs";
import { useQuery } from "@tanstack/react-query";
import { SummaryAnswersData } from "@/types/user";
import { userSummaryAnswersTabs } from "@/constants";
import { getUserTopAnswers } from "@/actions/getUserTopAnswers";

interface AnswersBoxProps {
    userId: string;
    username: string;
}

type Tab = "score" | "newest";

const AnswersBox = ({ userId, username }: AnswersBoxProps) => {
    const [tab, setTab] = useState("score");

    const fetchAnswers = async () => {
        const payload = { userId, tab: tab as Tab };
        const data = await getUserTopAnswers(payload);
        return data as SummaryAnswersData;
    };

    const {
        data,
        isFetching
    } = useQuery({
        queryKey: ["users", username, { tab: "activity" }, "answers", { tab }],
        queryFn: fetchAnswers
    });

    if(isFetching) return <div>Loading...</div>
    if(!data) return <div>Something went wrong</div>

    return (
        <div>
            <div className="flex items-end justify-between flex-wrap gap-1.5 mb-2">
                <div>
                    <h3 className="text-lg sm:text-xl text-zinc-800 -mb-1.5 sm:-mb-1">Answers</h3>
                    <Link href={`/users/${username}?tab=answers`} className="text-zinc-500 text-xs sm:text-sm">View all {data.totalAnswers} answers</Link>
                </div>
                <PostTabs
                    tabs={userSummaryAnswersTabs}
                    value={tab}
                    setTab={setTab}
                />
            </div>
            <ul className="border border-zinc-300 rounded-md">
                {data.answers.map((answer, index) => (
                    <li key={index} className={`flex items-center gap-3 ${index === data.answers.length - 1 ? "" : "border-b border-zinc-300"} p-3`}>
                        <div className="w-[50px] h-full text-[13px] sm:text-sm py-1 text-center bg-emerald-800 text-white rounded-sm">11869</div>
                        <Link href={`/questions/id`} className="flex-1 line-clamp-1 text-[15px] sm:text-base text-blue-700 hover:text-blue-800">
                            {answer.question.title}
                        </Link>
                        <span className="text-[13px] sm:text-sm text-zinc-600">{moment(answer.answeredAt).format('ll')}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default AnswersBox;