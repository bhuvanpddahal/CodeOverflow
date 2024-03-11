import moment from "moment";
import Link from "next/link";
import { IoEllipsisVertical } from "react-icons/io5";

import UserAvatar from "@/components/UserAvatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { VoteType } from "@/types/user";
import { Badge } from "@/components/ui/Badge";
import { useCurrentUser } from "@/hooks/use-current-user";

interface QuestionContentProps {
    questionId: string;
    votes: {
        type: VoteType;
    }[];
    answersCount: number;
    viewsCount: number;
    title: string;
    tags: {
        name: string;
    }[];
    askerImage: string | null;
    askerName: string;
    askerUsername: string;
    askedAt: Date;
    updatedAt: Date;
}

const QuestionContent = ({
    questionId,
    votes,
    answersCount,
    viewsCount,
    title,
    tags,
    askerImage,
    askerName,
    askerUsername,
    askedAt,
    updatedAt
}: QuestionContentProps) => {
    const user = useCurrentUser();
    const votesAmt = votes.reduce((acc, vote) => {
        if (vote.type === 'UP') return acc + 1;
        if (vote.type === 'DOWN') return acc - 1;
        return acc;
    }, 0);

    return (
        <>
            <div className="flex gap-3">
                <span className="text-sm text-zinc-700" title={`Score of 12340`}>{votesAmt} {votesAmt === 1 ? "vote" : "votes"}</span>
                <span className="text-sm text-emerald-700" title={`23 answers`}>{answersCount} {answersCount === 1 ? "answer" : "answers"}</span>
                <span className="text-sm text-amber-700" title={`45k views`}>{viewsCount} {viewsCount === 1 ? "view" : "views"}</span>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2">
                    <div className="p-2 rounded-sm cursor-pointer border border-transparent hover:border-zinc-300 hover:bg-zinc-100">
                        <IoEllipsisVertical className="text-zinc-700" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-white' align='end'>
                    <DropdownMenuItem className="cursor-pointer">Unsave</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Move to...</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Link href={`/questions/${questionId}`} className="inline-block text-blue-700 line-clamp-1 -mb-1 hover:text-blue-800">
                {title}
            </Link>
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="space-x-1.5">
                    {tags.map((tag) => (
                        <Link href={`/questions/tagged/${tag.name}`}>
                            <Badge variant="secondary">{tag.name}</Badge>
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-2">
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
                    <p className="text-xs text-zinc-700">
                        {new Date() > new Date()
                            ? `updated ${moment(updatedAt).startOf('minute').fromNow()}`
                            : `asked ${moment(askedAt).startOf('minute').fromNow()}`
                        }
                    </p>
                </div>
            </div>
        </>
    )
};

export default QuestionContent;