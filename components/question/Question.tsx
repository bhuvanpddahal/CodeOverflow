"use client";

import moment from "moment";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { IoMdEye } from "react-icons/io";
import { QuestionVote, Tag, User } from "@prisma/client";

import TagDetails from "../TagDetails";
import UserAvatar from "@/components/UserAvatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/HoverCard";
import { Badge } from "@/components/ui/Badge";
import { AnswererId } from "@/types/question";

interface QuestionProps {
    id: string;
    title: string;
    details: string;
    tags: Tag[];
    asker: User;
    votes: QuestionVote[];
    answererIds: AnswererId[];
    views: string[];
    askedAt: Date;
    updatedAt: Date;
    showDetails: boolean;
    lastQuestionRef?: (node?: Element | null | undefined) => void;
}

const Question = ({
    id,
    title,
    details,
    tags,
    asker,
    votes,
    answererIds,
    views,
    askedAt,
    updatedAt,
    showDetails,
    lastQuestionRef
}: QuestionProps) => {
    const votesAmt = votes.reduce((acc, vote) => {
        if (vote.type === 'UP') return acc + 1;
        if (vote.type === 'DOWN') return acc - 1;
        return acc;
    }, 0);

    return (
        <div className="border-t border-zinc-300 pl-4 py-4 flex gap-4" ref={lastQuestionRef}>
            <div className="text-[15px] text-right text-zinc-700 w-[110px]">
                <p>{votesAmt} votes</p>
                <p>{answererIds.length} answers</p>
                <p>{views.length} views</p>
            </div>
            <div className="flex-1">
                <Link href={`/questions/${id}`} className="text-lg text-blue-700 line-clamp-2 leading-snug hover:text-blue-800">{title}</Link>
                {showDetails && (
                    <div
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}
                        className="text-zinc-700 text-sm line-clamp-2"
                    />
                )}
                <div className="flex items-center justify-between gap-3 flex-wrap mt-2">
                    <div className="space-x-1.5">
                        {tags.map((tag) => (
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Link key={tag.id} href={`/questions/tagged/${tag.name}`}>
                                        <Badge variant="secondary">
                                            <IoMdEye className="h-4 w-4 mr-0.5" /> {tag.name}
                                        </Badge>
                                    </Link>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <TagDetails
                                        watcherIds={tag.watcherIds}
                                        questionIds={tag.questionIds}
                                        description={tag.description}

                                    />
                                </HoverCardContent>
                            </HoverCard>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/users/${asker.username}`}
                            className="flex items-center gap-1"
                        >
                            <UserAvatar user={{
                                name: asker.name,
                                image: asker?.image
                            }} className='h-6 w-6 rounded-sm' />
                            <p className="text-xs text-blue-700 hover:text-blue-800">{asker.name}</p>
                        </Link>
                        <p className="text-xs text-zinc-700">
                            {new Date(updatedAt) > new Date(askedAt)
                                ? `updated ${moment(updatedAt).startOf('minute').fromNow()}`
                                : `asked ${moment(askedAt).startOf('minute').fromNow()}`
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Question;