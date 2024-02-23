import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import {
    IoMdArrowDropdown,
    IoMdArrowDropup
} from "react-icons/io";
import { AnswerVote, User } from "@prisma/client";

import UserAvatar from "../UserAvatar";

interface AnswerProps {
    votes: AnswerVote[];
    content: any;
    answerer: User;
    answeredAt: Date;
    updatedAt: Date;
    lastAnswerRef?: (node?: Element | null | undefined) => void;
}

const Answer = ({
    votes,
    content,
    answerer,
    answeredAt,
    updatedAt,
    lastAnswerRef
}: AnswerProps) => {
    return (
        <li className="flex-1 flex gap-4" ref={lastAnswerRef}>
            <div className="flex flex-col items-center gap-3">
                <IoMdArrowDropup
                    className="h-9 w-9 border border-zinc-200 text-zinc-800 rounded-full cursor-pointer hover:bg-blue-100"
                />
                <p className="text-xl font-bold text-zinc-900">57K</p>
                <IoMdArrowDropdown
                    className="h-9 w-9 border border-zinc-200 text-zinc-800 rounded-full cursor-pointer hover:bg-red-100"
                />
            </div>
            <div className="flex-1">
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                    className="text-zinc-800"
                />
                <div className="bg-zinc-100 max-w-[200px] p-3 rounded-sm ml-auto mt-2">
                    <p className="text-xs text-zinc-700 mb-1">answered 1 minute ago</p>
                    <Link
                        href={`/users/${answerer.username}`}
                        className="flex items-center gap-1"
                    >
                        <UserAvatar user={{
                            name: answerer.name,
                            image: answerer.image
                        }} className='h-8 w-8' />
                        <p className="text-xs text-blue-700 hover:text-blue-800">{answerer.name}</p>
                    </Link>
                </div>
            </div>
        </li>
    )
}

export default Answer;