import moment from "moment";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

import UserAvatar from "@/components/UserAvatar";
import { VoteType } from "@/types/user";
import { useCurrentUser } from "@/hooks/use-current-user";

interface AnswerContentProps {
    votes: {
        type: VoteType;
    }[];
    content: string;
    answererImage: string | null;
    answererName: string;
    answererUsername: string;
    answeredAt: Date;
    updatedAt: Date;
}

const AnswerContent = ({
    votes,
    content,
    answererImage,
    answererName,
    answererUsername,
    answeredAt,
    updatedAt
}: AnswerContentProps) => {
    const user = useCurrentUser();
    const votesAmt = votes.reduce((acc, vote) => {
        if (vote.type === 'UP') return acc + 1;
        if (vote.type === 'DOWN') return acc - 1;
        return acc;
    }, 0);

    return (
        <div className="border-l-4 border-zinc-300 pl-3 mt-3">
            <div className="flex gap-3">
                <span className="text-sm text-zinc-700" title={`Score of ${votesAmt}`}>{votesAmt} {votesAmt === 1 ? "vote" : "votes"}</span>
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                className="text-zinc-800 text-sm line-clamp-2"
            />
            <div className="flex items-center justify-between">
                <Link href="answer-link" className="text-sm text-blue-700 line-clamp-2 hover:text-blue-800">View answer</Link>
                <div className="flex items-center gap-2">
                    <Link
                        href={`/users/${answererUsername}`}
                        className="flex items-center gap-1"
                    >
                        <UserAvatar user={{
                            name: answererName,
                            image: answererImage
                        }} className='h-6 w-6 rounded-sm' />
                        <p className="text-xs text-blue-700 hover:text-blue-800">{answererName}</p>
                    </Link>
                    <p className="text-xs text-zinc-700">
                        {new Date() > new Date()
                            ? `updated ${moment(updatedAt).startOf('minute').fromNow()}`
                            : `asked ${moment(answeredAt).startOf('minute').fromNow()}`
                        }
                    </p>
                </div>
            </div>
        </div>
    )
};

export default AnswerContent;