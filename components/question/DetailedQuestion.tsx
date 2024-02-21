import moment from "moment";
import Link from "next/link";
import {
    IoMdArrowDropdown,
    IoMdArrowDropup
} from "react-icons/io";
import DOMPurify from "isomorphic-dompurify";

import UserAvatar from "../UserAvatar";
import { Badge } from "../ui/Badge";

interface DetailedQuestionProps {
    votes: string[];
    details: string;
    expectation: string;
    tags: string;
    createdAt: Date;
    askerName: string;
    askerUsername: string;
    askerImage: string | null;
}

const DetailedQuestion = ({
    votes,
    details,
    expectation,
    tags,
    createdAt,
    askerName,
    askerUsername,
    askerImage
}: DetailedQuestionProps) => {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center gap-3">
                <IoMdArrowDropup
                    className="h-4 w-4 border border-zinc-200 rounded-full"
                    size="16px"
                />
                <p className="text-xl font-bold text-zinc-900">{votes.length}</p>
                <IoMdArrowDropdown
                    className="h-4 w-4"
                />
            </div>
            <div className="flex-1">
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}
                    className="text-zinc-800"
                />
                <div
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}
                    className="text-zinc-800"
                />
                <div className="flex gap-2 my-5">
                    <Badge variant="secondary">{tags}</Badge>
                </div>
                <div className="bg-blue-50 max-w-[200px] p-3 rounded-sm ml-auto">
                    <p className="text-xs text-zinc-700 mb-1">asked {moment(createdAt).startOf('minute').fromNow()}</p>
                    <Link
                        href={`/users/${askerUsername}`}
                        className="flex items-center gap-1"
                    >
                        <UserAvatar user={{
                            name: askerName,
                            image: askerImage
                        }} className='h-8 w-8' />
                        <p className="text-xs text-blue-700 hover:text-blue-800">{askerName}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default DetailedQuestion;