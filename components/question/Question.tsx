"use client";

import {
    Dispatch,
    SetStateAction
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
import { ExtendedUser } from "@/next-auth";
import { Badge } from "@/components/ui/Badge";
import { AnswererId } from "@/types/question";
import { watchTag } from "@/actions/tag/watchTag";
import { ignoreTag } from "@/actions/tag/ignoreTag";
import { IgnoreValues, WatchValues } from "@/types/tag";

interface QuestionProps {
    user: ExtendedUser | undefined;
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
    watchedTagIds: string[];
    ignoredTagIds: string[];
    setWatchedTagIds: Dispatch<SetStateAction<string[]>>;
    setIgnoredTagIds: Dispatch<SetStateAction<string[]>>;
    setShowAuthModal: Dispatch<SetStateAction<boolean>>;
    showDetails?: boolean;
    lastQuestionRef?: (node?: Element | null | undefined) => void;
}

const Question = ({
    user,
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
    watchedTagIds,
    ignoredTagIds,
    setWatchedTagIds,
    setIgnoredTagIds,
    setShowAuthModal,
    showDetails = false,
    lastQuestionRef
}: QuestionProps) => {
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
            if (!user) return;
            if (values.type === "watch") {
                // If the user is clicking the `Watch tag` button,
                // Remove the tag id from the ignoredTagIds (in case if they have ignored the tag) & add it to watchedTagIds
                const newIgnoredTagIds = ignoredTagIds.filter((id) => id !== values.tagId);
                const newWatchedTagIds = [...watchedTagIds, values.tagId];
                user.ignoredTagIds = newIgnoredTagIds;
                user.watchedTagIds = newWatchedTagIds;
                setIgnoredTagIds(newIgnoredTagIds);
                setWatchedTagIds(newWatchedTagIds);
            } else if (values.type === "unwatch") {
                // If the user is clicking the `Unwatch tag` button,
                // Simply remove the tag id from the watchedTagIds
                const newWatchedTagIds = watchedTagIds.filter((id) => id !== values.tagId);
                user.watchedTagIds = newWatchedTagIds;
                setWatchedTagIds(newWatchedTagIds);
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
            if (!user) return;
            if (values.type === "ignore") {
                // If the user is clicking the `Ignore tag` button,
                // Remove the tag id from the watchedTagIds (in case if they have watched the tag) & add it to ignoredTagIds
                const newWatchedTagIds = watchedTagIds.filter((id) => id !== values.tagId);
                const newIgnoredTagIds = [...ignoredTagIds, values.tagId];
                user.watchedTagIds = newWatchedTagIds;
                user.ignoredTagIds = newIgnoredTagIds;
                setWatchedTagIds(newWatchedTagIds);
                setIgnoredTagIds(newIgnoredTagIds);
            } else if (values.type === "unignore") {
                // If the user is clicking the `Unignore tag` button,
                // Simply remove the tag id from the ignoredTagIds
                const newIgnoredTagIds = ignoredTagIds.filter((id) => id !== values.tagId);
                user.ignoredTagIds = newIgnoredTagIds;
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
                            const watcherIdsHasUserId = tag.watcherIds.find((id) => id === user?.id);
                            let watchersCount = tag.watcherIds.length;
                            // Code to dynamically update the watchers count
                            if (isWatchedTag && !watcherIdsHasUserId) {
                                watchersCount += 1;
                            } else if (!isWatchedTag && watcherIdsHasUserId) {
                                watchersCount -= 1;
                            }

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
                                            watchersCount={watchersCount}
                                            questionsCount={tag.questionIds.length}
                                            description={tag.description}
                                            isWatchedTag={!!isWatchedTag}
                                            isIgnoredTag={!!isIgnoredTag}
                                            isWatchLoading={isWatchLoading}
                                            isIgnoreLoading={isIgnoreLoading}
                                            handleWatch={watch}
                                            handleIgnore={ignore}
                                            isLoggedIn={!!user}
                                            setShowAuthModal={setShowAuthModal}
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