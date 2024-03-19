"use client";

import { Dispatch, SetStateAction, useState } from "react";
import moment from "moment";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import {
    IoMdArrowDropdown,
    IoMdArrowDropup
} from "react-icons/io";
import { Loader2 } from "lucide-react";
import { LiaEdit } from "react-icons/lia";
import { usePrevious } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { QuestionVote, Tag, VoteType } from "@prisma/client";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

import Hint from "../Hint";
import UserAvatar from "../UserAvatar";
import { Badge } from "../ui/Badge";
import { ItemType } from "@/types/user";
import { saveItem } from "@/actions/user/saveItem";
import { useCurrentUser } from "@/hooks/use-current-user";
import { QuestionVotePayload } from "@/lib/validators/vote";
import { voteQuestion } from "@/actions/question/voteQuestion";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/Tooltip";

type PayloadType = "save" | "unsave";

interface DetailedQuestionProps {
    questionId: string;
    askerId: string;
    votes: QuestionVote[];
    details: string;
    expectation: string;
    tags: Tag[];
    askedAt: Date;
    updatedAt: Date;
    askerName: string;
    askerUsername: string;
    askerImage: string | null;
    setShowAuthModal: Dispatch<SetStateAction<boolean>>;
}

const DetailedQuestion = ({
    questionId,
    askerId,
    votes,
    details,
    expectation,
    tags,
    askedAt,
    updatedAt,
    askerName,
    askerUsername,
    askerImage,
    setShowAuthModal
}: DetailedQuestionProps) => {
    const user = useCurrentUser();
    const isQuestionSaved = user?.savedItemIds.find((id) => id === questionId);
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
            const payload: QuestionVotePayload = {
                voteType: type,
                questionId
            };
            await voteQuestion(payload);
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
            const payload = { itemId: questionId, itemType: "QUESTION" as ItemType };
            await saveItem(payload);
        },
        onSuccess: (_, type: PayloadType) => {
            if (!user) return;
            if (type === "save") {
                const newSavedItemIds = [...user.savedItemIds, questionId];
                user.savedItemIds = newSavedItemIds;
            } else if (type === "unsave") {
                const newSavedItemIds = user.savedItemIds.filter((id) => id !== questionId);
                user.savedItemIds = newSavedItemIds;
            }
        },
        onError: () => {
            // TODO - Show the error message
        }
    });

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center gap-3">
                <Hint
                    label="This question shows research effort; it is useful and clear"
                    side="right"
                    align="start"
                    sideOffset={12}
                    width={260}
                >
                    <IoMdArrowDropup
                        className={`h-9 w-9 border ${currentVote === "UP" ? "border-orange-300 text-orange-800" : "border-zinc-300 text-zinc-800"} rounded-full cursor-pointer hover:bg-orange-100`}
                        onClick={() => user ? vote('UP') : setShowAuthModal(true)}
                    />
                </Hint>
                <p className="text-xl font-bold text-zinc-900">{votesAmt}</p>
                <Hint
                    label="This question does not show any research effort; it is unclear or not useful"
                    side="right"
                    align="center"
                    sideOffset={12}
                    width={260}
                >
                    <IoMdArrowDropdown
                        className={`h-9 w-9 border ${currentVote === "DOWN" ? "border-orange-300 text-orange-800" : "border-zinc-300 text-zinc-800"} rounded-full cursor-pointer hover:bg-orange-100`}
                        onClick={() => user ? vote('DOWN') : setShowAuthModal(true)}
                    />
                </Hint>
                {user?.id === askerId && (
                    <Hint
                        label="Edit this question"
                        side="right"
                        align="center"
                        sideOffset={18}
                    >
                        <Link href={`${questionId}/edit`}>
                            <LiaEdit
                                className="h-6 w-6 text-zinc-400 cursor-pointer hover:text-blue-600"
                            />
                        </Link>
                    </Hint>
                )}
                {!!user && (
                    isSaveLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-slate-700" />
                    ) : (
                        <Hint
                            label={isQuestionSaved ? "Unsave this question" : "Save this question"}
                            side="right"
                            align="center"
                            sideOffset={18}
                        >
                            {isQuestionSaved ? (
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
                            }
                        </Hint>
                    )
                )}
            </div>
            <div className="flex-1">
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}
                    className="text-zinc-800 text-[15px]"
                />
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(expectation) }}
                    className="text-zinc-800 text-[15px]"
                />
                <div className="space-x-1.5 my-5">
                    {tags.map((tag) => (
                        <Link key={tag.id} href={`/questions/tagged/${tag.name}`}>
                            <Badge variant="secondary">{tag.name}</Badge>
                        </Link>
                    ))}
                </div>
                <div className="bg-blue-50 max-w-[200px] p-3 rounded-sm ml-auto">
                    <p className="text-xs text-zinc-700 mb-1">
                        {new Date(updatedAt) > new Date(askedAt)
                            ? `updated ${moment(updatedAt).startOf('minute').fromNow()}`
                            : `asked ${moment(askedAt).startOf('minute').fromNow()}`
                        }
                    </p>
                    <Link
                        href={`/users/${askerUsername}`}
                        className="flex items-center gap-1"
                    >
                        <UserAvatar user={{
                            name: askerName,
                            image: askerImage
                        }} className='h-6 w-6 rounded-sm' />
                        <p className="text-xs text-blue-700 hover:text-blue-800">{askerName}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default DetailedQuestion;