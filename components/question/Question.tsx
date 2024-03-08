"use client";

import {
    Dispatch,
    SetStateAction,
    useState
} from "react";
import moment from "moment";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { useMutation } from "@tanstack/react-query";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
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
import { watchTag } from "@/actions/tag/watchTag";
import { ignoreTag } from "@/actions/tag/ignoreTag";
import { useCurrentUser } from "@/hooks/use-current-user";

export type WatchType = "watch" | "unwatch";
export type IgnoreType = "ignore" | "unignore";

export interface WatchValues {
    type: WatchType;
    tagId: string;
    setWatchersCount: Dispatch<SetStateAction<number>>;
}

export interface IgnoreValues {
    type: IgnoreType;
    tagId: string;
    setWatchersCount: Dispatch<SetStateAction<number>>;
}

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
    const user = useCurrentUser();
    const [watchedTagIds, setWatchedTagIds] = useState(user?.watchedTagIds || []);
    const [ignoredTagIds, setIgnoredTagIds] = useState(user?.ignoredTagIds || []);
    const votesAmt = votes.reduce((acc, vote) => {
        if (vote.type === 'UP') return acc + 1;
        if (vote.type === 'DOWN') return acc - 1;
        return acc;
    }, 0);

    const {
        mutate: watch,
        isPending: isWatchLoading
    } = useMutation({
        mutationFn: async (values: WatchValues) => {
            const payload = { tagId: values.tagId };
            await watchTag(payload);
        },
        onSuccess: (_, values: WatchValues) => {
            if(values.type === "watch") {
                // If the user is clicking the `Watch tag` button,
                // Remove the tag id from the ignoredTagIds (in case if they have ignored the tag) & add it to watchedTagIds
                const newIgnoredTagIds = ignoredTagIds.filter((id) => id !== values.tagId);
                const newWatchedTagIds = [...watchedTagIds, values.tagId];
                setIgnoredTagIds(newIgnoredTagIds);
                setWatchedTagIds(newWatchedTagIds);
                values.setWatchersCount((prev) => prev + 1); // Increament the watchers count
            } else if(values.type === "unwatch") {
                // If the user is clicking the `Unwatch tag` button,
                // Simply remove the tag id from the watchedTagIds
                const newWatchedTagIds = watchedTagIds.filter((id) => id !== values.tagId);
                setWatchedTagIds(newWatchedTagIds);
                values.setWatchersCount((prev) => prev - 1); // Decreament the watchers count
            }
        },
        onError: (error) => {
            // TODO - Alert the user about the error
            console.log("Something went wrong", error);
        }
    });

    const {
        mutate: ignore,
        isPending: isIgnoreLoading
    } = useMutation({
        mutationFn: async (values: IgnoreValues) => {
            const payload = { tagId: values.tagId };
            await ignoreTag(payload);
        },
        onSuccess: (_, values: IgnoreValues) => {
            if(values.type === "ignore") {
                // If the user is clicking the `Ignore tag` button,
                // Remove the tag id from the watchedTagIds (in case if they have watched the tag) & add it to ignoredTagIds
                const newWatchedTagIds = watchedTagIds.filter((id) => id !== values.tagId);
                const newIgnoredTagIds = [...ignoredTagIds, values.tagId];
                if(newWatchedTagIds.length < watchedTagIds.length) {
                    // If the user had previously watched the tag, decreament the watchers count
                    values.setWatchersCount((prev) => prev - 1);
                }
                setWatchedTagIds(newWatchedTagIds);
                setIgnoredTagIds(newIgnoredTagIds);
            } else if(values.type === "unignore") {
                // If the user is clicking the `Unignore tag` button,
                // Simply remove the tag id from the ignoredTagIds
                const newIgnoredTagIds = ignoredTagIds.filter((id) => id !== values.tagId);
                setIgnoredTagIds(newIgnoredTagIds);
            }
        },
        onError: (error) => {
            // TODO - Alert the user about the error
            console.log("Something went wrong", error);
        }
    });

    return (
        <div className="border-t border-zinc-300 pl-4 py-4 flex gap-4" ref={lastQuestionRef}>
            <div className="text-[15px] text-right text-zinc-700 w-[110px]">
                <p>{votesAmt} {votesAmt === 1 ? "vote" : "votes"}</p>
                <p>{answererIds.length} {answererIds.length === 1 ? "answer" : "answers"}</p>
                <p>{views.length} {views.length === 1 ? "view" : "views"}</p>
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
                        {tags.map((tag) => {
                            const isWatchedTag = watchedTagIds.find((id) => id === tag.id);
                            const isIgnoredTag = ignoredTagIds.find((id) => id === tag.id);

                            return (
                                <HoverCard key={tag.id}>
                                    <HoverCardTrigger>
                                        <Link href={`/questions/tagged/${tag.name}`}>
                                            <Badge variant={isIgnoredTag ? "outline" : "secondary"}>
                                                {isWatchedTag && (
                                                    <IoMdEye className="h-4 w-4 mr-0.5" />
                                                )}
                                                {isIgnoredTag && (
                                                    <IoMdEyeOff className="h-4 w-4 mr-0.5" />
                                                )}
                                                {tag.name}
                                            </Badge>
                                        </Link>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        <TagDetails
                                            tagId={tag.id}
                                            tagName={tag.name}
                                            watcherIds={tag.watcherIds}
                                            questionIds={tag.questionIds}
                                            description={tag.description}
                                            isWatchedTag={!!isWatchedTag}
                                            isIgnoredTag={!!isIgnoredTag}
                                            isWatchLoading={isWatchLoading}
                                            isIgnoreLoading={isIgnoreLoading}
                                            handleWatch={watch}
                                            handleIgnore={ignore}
                                        />
                                    </HoverCardContent>
                                </HoverCard>
                            )
                        })}
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