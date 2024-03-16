import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import PostVote from "./PostVote";
import Loader from "@/components/Loader";
import PostTabsLink from "../PostTabsLink";
import { VotesData } from "@/types/user";
import { getUserVotes } from "@/actions/user/getUserVotes";
import { USERS_VOTES_PER_PAGE, userVotesTabs } from "@/constants";
import PaginationBox from "@/components/PaginationBox";

type Sort = "all" | "answer" | "question";

interface VotesContentProps {
    userId: string;
    profileName: string;
    username: string;
    isCurrentUser: boolean;
}

const VotesContent = ({
    userId,
    profileName,
    username,
    isCurrentUser
}: VotesContentProps) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const sort = searchParams.get("sort") || "all";

    const fetchVotes = async () => {
        const payload = { userId, sort: sort as Sort, page: Number(page), limit: USERS_VOTES_PER_PAGE };
        const data = await getUserVotes(payload);
        return data as VotesData;
    };

    const {
        data,
        isFetching
    } = useQuery({
        queryKey: ["users", username, { tab: "votes", sort }],
        queryFn: fetchVotes
    });

    if(isFetching) return <Loader type="half" />
    if(!data) return <div className="flex-1 text-center py-10 text-zinc-400 text-[15px]">Something went wrong</div>

    return (
        <div className="flex-1">
            <div className="flex items-end justify-between flex-wrap gap-1.5 mb-2">
                <h3 className="text-lg sm:text-xl text-zinc-800 -mb-1.5 sm:-mb-1">
                    {data.totalVotes === 1 ? "1 Vote" : `${data.totalVotes} Votes`}
                </h3>
                <PostTabsLink
                    tabs={userVotesTabs}
                    value={sort}
                    route={`/users/${username}?tab=votes`}
                />
            </div>
            <ul className="border border-zinc-300 rounded-md mb-4">
                {data.votes.length ? (
                    data.votes.map((vote, index) => (
                        vote.postType === "ANSWER" ? (
                            <PostVote
                                type={vote.type}
                                postType={vote.postType}
                                questionId={vote.answer.question.id}
                                votes={vote.answer.votes}
                                title={vote.answer.question.title}
                                tags={vote.answer.question.tags}
                                votedAt={vote.votedAt}
                                isLast={index === data.votes.length - 1}
                            />
                        ) : (
                            <PostVote
                                type={vote.type}
                                postType={vote.postType}
                                questionId={vote.question.id}
                                votes={vote.question.votes}
                                answers={vote.question.answers}
                                views={vote.question.views}
                                title={vote.question.title}
                                tags={vote.question.tags}
                                votedAt={vote.votedAt}
                                isLast={index === data.votes.length - 1}
                            />
                        )
                    ))
                ) : (
                    <p className="px-4 py-10 text-center text-sm text-zinc-600">
                        {isCurrentUser ? "You have" : `${profileName} has`} not voted any {sort === "all" ? "posts" : `${sort}s`}
                    </p>
                )}
            </ul>

            {data.votes.length > 0 && (
                <PaginationBox
                    location={`/users/${username}?tab=votes&sort=${sort}&`}
                    currentPage={Number(page)}
                    lastPage={data.lastPage}
                />
            )}
        </div>
    )
};

export default VotesContent;