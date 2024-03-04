"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import PostTabsLink from "./PostTabsLink";
import {
    USERS_ANSWERS_PER_PAGE,
    userSummaryAnswersTabs
} from "@/constants";
import { AnswersData } from "@/types/user";
import { Badge } from "@/components/ui/Badge";
import { getUserAnswers } from "@/actions/getUserAnswers";
import moment from "moment";

interface AnswersContentProps {
    userId: string;
    username: string;
}

type Sort = "score" | "newest";

const AnswersContent = ({ userId, username }: AnswersContentProps) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const sort = searchParams.get("sort") || "score";

    const fetchAnswers = async () => {
        const payload = { userId, sort: sort as Sort, page: Number(page), limit: USERS_ANSWERS_PER_PAGE };
        const data = await getUserAnswers(payload);
        return data as AnswersData;
    };

    const {
        data,
        isFetching
    } = useQuery({
        queryKey: ["users", username, { tab: "answers", sort }],
        queryFn: fetchAnswers
    });

    if(isFetching) return <div className="flex-1 text-center py-10 text-zinc-400 text-[15px]">Loading...</div>
    if(!data) return <div className="flex-1 text-center py-10 text-zinc-400 text-[15px]">Something went wrong</div>

    return (
        <div className="flex-1">
            <div className="flex items-end justify-between flex-wrap gap-1.5 mb-2">
                <h3 className="text-lg sm:text-xl text-zinc-800 -mb-1.5 sm:-mb-1">
                    {data.totalAnswers} {data.totalAnswers === 1 ? "Answer" : "Answers"}
                </h3>
                <PostTabsLink
                    tabs={userSummaryAnswersTabs}
                    value={sort}
                    route={`/users/${username}?tab=answers`}
                />
            </div>

            <ul className="border border-zinc-300 rounded-md">
                {data.answers.map((answer, index) => {
                    const isLast = index === data.answers.length - 1;
                    const votesAmt = answer.votes.reduce((acc, vote) => {
                        if (vote.type === 'UP') return acc + 1;
                        if (vote.type === 'DOWN') return acc - 1;
                        return acc;
                    }, 0);

                    return (
                        <li key={index} className={`p-4 ${isLast ? "" : "border-b border-zinc-300"}`}>
                            <span className="text-sm text-zinc-700">{votesAmt} votes</span>
                            <Link href={`/questions/id`} className="text-blue-700 line-clamp-1 mb-1.5 hover:text-blue-800">
                                {answer.question.title}
                            </Link>
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                <div className="space-x-1.5">
                                    {answer.question.tags.map((tag) => (
                                        <Link href={`/questions/tagged/${tag.name}`}>
                                            <Badge variant="secondary">{tag.name}</Badge>
                                        </Link>
                                    ))}
                                </div>
                                <div className="text-zinc-600 text-sm">answered on {moment(answer.answeredAt).calendar()}</div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default AnswersContent;