"use client";

import { Dispatch, SetStateAction, useState } from "react";
import moment from "moment";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import {
    IoMdArrowDropdown,
    IoMdArrowDropup
} from "react-icons/io";
import { LiaEdit } from "react-icons/lia";
import { usePrevious } from "@mantine/hooks";
import { QuestionVote, VoteType } from "@prisma/client";

import UserAvatar from "../UserAvatar";
import { Badge } from "../ui/Badge";
import { useMutation } from "@tanstack/react-query";
import { voteQuestion } from "@/actions/voteQuestion";
import { useCurrentUser } from "@/hooks/use-current-user";
import { QuestionVotePayload } from "@/lib/validators/vote";

interface DetailedQuestionProps {
    questionId: string;
    askerId: string;
    votes: QuestionVote[];
    details: string;
    expectation: string;
    tags: string;
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

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center gap-3">
                <IoMdArrowDropup
                    className={`h-9 w-9 border ${currentVote === "UP" ? "border-orange-300 text-orange-800" : "border-zinc-300 text-zinc-800"} rounded-full cursor-pointer hover:bg-orange-100`}
                    onClick={() => user ? vote('UP') : setShowAuthModal(true)}
                />
                <p className="text-xl font-bold text-zinc-900">{votesAmt}</p>
                <IoMdArrowDropdown
                    className={`h-9 w-9 border ${currentVote === "DOWN" ? "border-orange-300 text-orange-800" : "border-zinc-300 text-zinc-800"} rounded-full cursor-pointer hover:bg-orange-100`}
                    onClick={() => user ? vote('DOWN') : setShowAuthModal(true)}
                />
                {user?.id === askerId && (
                    <Link href={`${questionId}/edit`}>
                        <LiaEdit
                            className="h-7 w-7 text-zinc-300 cursor-pointer hover:text-blue-600"
                        />
                    </Link>
                )}
            </div>
            <div className="flex-1">
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}
                    className="text-zinc-800"
                />
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(expectation) }}
                    className="text-zinc-800"
                />
                <div className="flex gap-2 my-5">
                    <Link href="/questions/tagged/javascript">
                        <Badge variant="secondary">{tags}</Badge>
                    </Link>
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
                        }} className='h-6 w-6' />
                        <p className="text-xs text-blue-700 hover:text-blue-800">{askerName}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default DetailedQuestion;