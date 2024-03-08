"use client";

import moment from "moment";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import Loader from "@/components/Loader";
import PostTabsLink from "../PostTabsLink";
import PaginationBox from "@/components/PaginationBox";
import {
    USERS_QUESTIONS_PER_PAGE,
    userSummaryQuestionsTabs
} from "@/constants";
import { QuestionsData } from "@/types/user";
import { Badge } from "@/components/ui/Badge";
import { getUserQuestions } from "@/actions/user/getUserQuestions";

interface QuestionsContentProps {
    userId: string;
    profileName: string;
    username: string;
    isCurrentUser: boolean;
}

type Sort = "score" | "newest" | "views";

const QuestionsContent = ({
    userId,
    profileName,
    username,
    isCurrentUser
}: QuestionsContentProps) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const sort = searchParams.get("sort") || "score";

    const fetchQuestions = async () => {
        const payload = { userId, sort: sort as Sort, page: Number(page), limit: USERS_QUESTIONS_PER_PAGE };
        const data = await getUserQuestions(payload);
        return data as QuestionsData;
    };

    const {
        data,
        isFetching
    } = useQuery({
        queryKey: ["users", username, { tab: "questions", sort }],
        queryFn: fetchQuestions
    });

    if(isFetching) return <Loader type="half" />
    if(!data) return <div className="flex-1 text-center py-10 text-zinc-400 text-[15px]">Something went wrong</div>

    return (
        <div className="flex-1">
            <div className="flex items-end justify-between flex-wrap gap-1.5 mb-2">
                <h3 className="text-lg sm:text-xl text-zinc-800 -mb-1.5 sm:-mb-1">
                    {data.totalQuestions} {data.totalQuestions === 1 ? "Question" : "Questions"}
                </h3>
                <PostTabsLink
                    tabs={userSummaryQuestionsTabs}
                    value={sort}
                    route={`/users/${username}?tab=questions`}
                />
            </div>

            <ul className="border border-zinc-300 rounded-md mb-4">
                {data.questions.length ? (
                    data.questions.map((question, index) => {
                        const isLast = index === data.questions.length - 1;
                        const votesAmt = question.votes.reduce((acc, vote) => {
                            if (vote.type === 'UP') return acc + 1;
                            if (vote.type === 'DOWN') return acc - 1;
                            return acc;
                        }, 0);
    
                        return (
                            <li key={index} className={`p-4 ${isLast ? "" : "border-b border-zinc-300"}`}>
                                <div className="flex gap-3">
                                    <span className="text-sm text-zinc-700" title={`Score of ${votesAmt}`}>{votesAmt} votes</span>
                                    <span className="text-sm text-emerald-700" title={`${question.answers.length} answers`}>{question.answers.length} answers</span>
                                    <span className="text-sm text-amber-700" title={`${question.views.length} views`}>{question.views.length} views</span>
                                </div>
                                <Link href={`/questions/${question.id}`} className="text-blue-700 line-clamp-1 mb-1.5 hover:text-blue-800">
                                    {question.title}
                                </Link>
                                <div className="flex items-center justify-between gap-3 flex-wrap">
                                    <div className="space-x-1.5">
                                        {question.tags.map((tag) => (
                                            <Link href={`/questions/tagged/${tag.name}`}>
                                                <Badge variant="secondary">{tag.name}</Badge>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="text-zinc-600 text-sm">asked on {moment(question.askedAt).calendar()}</div>
                                </div>
                            </li>
                        )
                    })
                ) : (
                    <p className="px-4 py-10 text-center text-sm text-zinc-600">
                        {isCurrentUser ? "You have" : `${profileName} has`} not asked any questions
                    </p>
                )}
            </ul>

            {data.questions.length > 0 && (
                <PaginationBox
                    location={`/users/${username}?tab=questions&sort=${sort}&`}
                    currentPage={Number(page)}
                    lastPage={data.lastPage}
                />
            )}
        </div>
    )
};

export default QuestionsContent;