"use client";

import moment from "moment";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import Loader from "@/components/Loader";
import PostTabsLink from "../PostTabsLink";
import PaginationBox from "@/components/PaginationBox";
import {
    USERS_ANSWERS_PER_PAGE,
    userSummaryAnswersTabs
} from "@/constants";
import { AnswersData } from "@/types/user";
import { Badge } from "@/components/ui/Badge";
import { getUserAnswers } from "@/actions/user/getUserAnswers";

interface AnswersContentProps {
    userId: string;
    profileName: string;
    username: string;
    isCurrentUser: boolean;
}

type Sort = "score" | "newest";

const AnswersContent = ({
    userId,
    profileName,
    username,
    isCurrentUser
}: AnswersContentProps) => {
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

    if(isFetching) return <Loader type="half" />
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

            <ul className="border border-zinc-300 rounded-md mb-4">
                {data.answers.length ? (
                    data.answers.map((answer, index) => {
                        const isLast = index === data.answers.length - 1;
                        const votesAmt = answer.votes.reduce((acc, vote) => {
                            if (vote.type === 'UP') return acc + 1;
                            if (vote.type === 'DOWN') return acc - 1;
                            return acc;
                        }, 0);
    
                        return (
                            <li key={index} className={`p-4 ${isLast ? "" : "border-b border-zinc-300"}`}>
                                <span className="text-sm text-zinc-700" title={`Score of ${votesAmt}`}>{votesAmt} votes</span>
                                <Link href={`/questions/${answer.question.id}`} className="text-blue-700 line-clamp-1 mb-1.5 hover:text-blue-800">
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
                    })
                ) : (
                    <p className="px-4 py-10 text-center text-sm text-zinc-600">
                        {isCurrentUser ? "You have" : `${profileName} has`} not answered any questions
                    </p>
                )}
            </ul>

            {data.answers.length > 0 && (
                <PaginationBox
                    location={`/users/${username}?tab=answers&sort=${sort}&`}
                    currentPage={Number(page)}
                    lastPage={data.lastPage}
                />
            )}
        </div>
    )
};

export default AnswersContent;