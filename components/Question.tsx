"use client";

import moment from "moment";
import Link from "next/link";

import { User } from "@prisma/client";
import { Badge } from "@/components/ui/Badge";
import UserAvatar from "./UserAvatar";

interface QuestionProps {
    id: string;
    title: string;
    tags: string;
    asker: User;
    createdAt: Date;
    updatedAt: Date;
    lastQuestionRef?: (node?: Element | null | undefined) => void;
}

const Question = ({
    id,
    title,
    tags,
    asker,
    createdAt,
    updatedAt,
    lastQuestionRef
}: QuestionProps) => {
    return (
        <div className="border-t border-zinc-300 pl-4 py-4 flex gap-4" ref={lastQuestionRef}>
            <div className="text-[15px] text-right text-zinc-700 w-[110px]">
                <p>-1 votes</p>
                <p>100.6k answers</p>
                <p>16 views</p>
            </div>
            <div className="flex-1">
                <Link href={`/questions/${id}`} className="text-lg text-blue-700 line-clamp-2 leading-snug hover:text-blue-800">{title}</Link>
                <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary">{tags}</Badge>
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/users/${asker.username}`}
                            className="flex items-center gap-1"
                        >
                            <UserAvatar user={{
                                name: asker.name,
                                image: asker?.image
                            }} className='h-8 w-8' />
                            <p className="text-xs text-blue-700 hover:text-blue-800">{asker.name}</p>
                        </Link>
                        <p className="text-xs text-zinc-700">
                            {updatedAt === createdAt
                                ? `asked ${moment(createdAt).startOf('hour').fromNow()}`
                                : `updated ${moment(updatedAt).startOf('minute').fromNow()}`
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Question;