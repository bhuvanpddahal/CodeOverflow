import { Dispatch, SetStateAction, useState } from "react";
import moment from "moment";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import {
    IoMdArrowDropdown,
    IoMdArrowDropup
} from "react-icons/io";
import { Loader2 } from "lucide-react";
import { usePrevious } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { AnswerVote, User, VoteType } from "@prisma/client";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

import UserAvatar from "../UserAvatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from "../ui/HoverCard";
import { ItemType } from "@/types/user";
import { saveItem } from "@/actions/user/saveItem";
import { voteAnswer } from "@/actions/answer/voteAnswer";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AnswerVotePayload } from "@/lib/validators/vote";

type PayloadType = "save" | "unsave";

interface AnswerProps {
    id: string;
    votes: AnswerVote[];
    content: any;
    answerer: User;
    answeredAt: Date;
    updatedAt: Date;
    setShowAuthModal: Dispatch<SetStateAction<boolean>>;
    lastAnswerRef?: (node?: Element | null | undefined) => void;
}

const Answer = ({
    id,
    votes,
    content,
    answerer,
    answeredAt,
    updatedAt,
    setShowAuthModal,
    lastAnswerRef
}: AnswerProps) => {
    const user = useCurrentUser();
    const isAnswerSaved = user?.savedItemIds.find((savedId) => savedId === id);
    const initialVotesAmt = votes.reduce((acc, vote) => {
        if (vote.type === 'UP') return acc + 1;
        if (vote.type === 'DOWN') return acc - 1;
        return acc;
    }, 0);
    const initialUserVote = votes.find((vote) => vote.voterId === user?.id);
    const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
    const [currentVote, setCurrentVote] = useState(initialUserVote?.type);
    const prevVote = usePrevious(currentVote);

    const { mutate: vote } = useMutation({
        mutationFn: async (type: VoteType) => {
            const payload: AnswerVotePayload = {
                voteType: type,
                answerId: id
            };
            await voteAnswer(payload);
        },
        onError: (error, type) => {
            console.log(error);
            if (prevVote === type) {
                if (type === 'UP') setVotesAmt((prev) => prev + 1);
                else if (type === 'DOWN') setVotesAmt((prev) => prev - 1);
            } else {
                if (type === 'UP') setVotesAmt((prev) => prev - (prevVote ? 2 : 1));
                else if (type === 'DOWN') setVotesAmt((prev) => prev + (prevVote ? 2 : 1));
            }
            setCurrentVote(prevVote); // Reset the current vote
        },
        onMutate: (type: VoteType) => {
            if (currentVote === type) {
                setCurrentVote(undefined);
                if (type === 'UP') setVotesAmt((prev) => prev - 1);
                else if (type === 'DOWN') setVotesAmt((prev) => prev + 1);
            } else {
                setCurrentVote(type);
                if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
                else if (type === 'DOWN') setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
            }
        }
    });

    const {
        mutate: save,
        isPending: isSaveLoading
    } = useMutation({
        mutationFn: async (type: PayloadType) => {
            const payload = { itemId: id, itemType: "ANSWER" as ItemType };
            await saveItem(payload);
        },
        onSuccess: (_, type: PayloadType) => {
            if(!user) return;
            if(type === "save") {
                const newSavedItemIds = [...user.savedItemIds, id];
                user.savedItemIds = newSavedItemIds;
            } else if(type === "unsave") {
                const newSavedItemIds = user.savedItemIds.filter((savedId) => savedId !== id);
                user.savedItemIds = newSavedItemIds;
            }
        },
        onError: () => {
            // TODO - Show the error message
        }
    });

    return (
        <li className="flex-1 flex gap-4" ref={lastAnswerRef}>
            <div className="flex flex-col items-center gap-3">
                <HoverCard>
                    <HoverCardTrigger>
                        <IoMdArrowDropup
                            className={`h-9 w-9 border ${currentVote === "UP" ? "border-orange-300 text-orange-800" : "border-zinc-300 text-zinc-800"} rounded-full cursor-pointer hover:bg-orange-100`}
                            onClick={() => user ? vote('UP') : setShowAuthModal(true)}
                        />
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm text-zinc-700 w-fit px-3 py-2">
                        This answer is useful
                    </HoverCardContent>
                </HoverCard>
                <p className="text-xl font-bold text-zinc-900">{votesAmt}</p>
                <HoverCard>
                    <HoverCardTrigger>
                        <IoMdArrowDropdown
                            className={`h-9 w-9 border ${currentVote === "DOWN" ? "border-orange-300 text-orange-800" : "border-zinc-300 text-zinc-800"} rounded-full cursor-pointer hover:bg-orange-100`}
                            onClick={() => user ? vote('DOWN') : setShowAuthModal(true)}
                        />
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm text-zinc-700 w-fit px-3 py-2">
                        This answer is not useful
                    </HoverCardContent>
                </HoverCard>
                {!!user && (
                    <HoverCard>
                    <HoverCardTrigger>
                        {isSaveLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-slate-700" />
                        ) : (
                            isAnswerSaved ? (
                                <IoBookmark
                                    className="h-5 w-5 text-amber-500 hover:text-amber-600 cursor-pointer"
                                    onClick={() => save("unsave")}
                                />
                            ) : (
                                <IoBookmarkOutline
                                    className="h-5 w-5 text-zinc-400 hover:text-blue-600 cursor-pointer"
                                    onClick={() => save("save")}
                                />
                            )
                        )}
                    </HoverCardTrigger>
                    {!isSaveLoading && (
                        <HoverCardContent className="text-sm text-zinc-700 w-fit px-3 py-2">
                            {isAnswerSaved
                                ? "Unsave this question"
                                : "Save this question"
                            }
                        </HoverCardContent>
                    )}
                </HoverCard>
                )}
            </div>
            <div className="flex-1">
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                    className="text-zinc-800 text-[15px]"
                />
                <div className="bg-zinc-100 max-w-[200px] p-3 rounded-sm ml-auto mt-2">
                    <p className="text-xs text-zinc-700 mb-1">
                        {new Date(updatedAt) > new Date(answeredAt)
                            ? `updated ${moment(updatedAt).startOf('minute').fromNow()}`
                            : `answered ${moment(answeredAt).startOf('minute').fromNow()}`
                        }
                    </p>
                    <Link
                        href={`/users/${answerer.username}`}
                        className="flex items-center gap-1"
                    >
                        <UserAvatar user={{
                            name: answerer.name,
                            image: answerer.image
                        }} className='h-6 w-6 rounded-sm' />
                        <p className="text-xs text-blue-700 hover:text-blue-800">{answerer.name}</p>
                    </Link>
                </div>
            </div>
        </li>
    )
}

export default Answer;