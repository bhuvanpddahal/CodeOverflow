"use client";

import { useState } from "react";
import Link from "next/link";
import { ImFire } from "react-icons/im";
import { MdDoNotDisturb } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { UseMutateFunction } from "@tanstack/react-query";

import {
    WatchValues,
    IgnoreValues,
    WatchType,
    IgnoreType
} from "./question/Question";
import { Button } from "./ui/Button";

interface TagDetailsProps {
    tagId: string;
    tagName: string;
    watcherIds: string[];
    questionIds: string[];
    description: string | null;
    isWatchedTag: boolean;
    isIgnoredTag: boolean;
    isWatchLoading: boolean;
    isIgnoreLoading: boolean;
    handleWatch: UseMutateFunction<void, Error, WatchValues, unknown>;
    handleIgnore: UseMutateFunction<void, Error, IgnoreValues, unknown>;
}

const TagDetails = ({
    tagId,
    tagName,
    watcherIds,
    questionIds,
    description,
    isWatchedTag,
    isIgnoredTag,
    isWatchLoading,
    isIgnoreLoading,
    handleWatch,
    handleIgnore
}: TagDetailsProps) => {
    const watchType: WatchType = isWatchedTag ? "unwatch" : "watch";
    const ignoreType: IgnoreType = isIgnoredTag ? "unignore" : "ignore";
    const [watchersCount, setWatchersCount] = useState(watcherIds.length);
    const watchValues = { type: watchType, tagId, setWatchersCount };
    const ignoreValues = { type: ignoreType, tagId, setWatchersCount };

    return (
        <div>
            <header className="flex items-center gap-3 text-sm mb-2">
                <div className="flex items-center gap-1 text-amber-900">
                    <ImFire className="h-4 w-4" /> {watchersCount} {watchersCount === 1 ? "watcher" : "watchers"}
                </div>
                <div className="text-zinc-800">{questionIds.length} {questionIds.length === 1 ? "question" : "questions"}</div>
            </header>
            <p className={`text-sm ${description ? "text-zinc-600" : "text-slate-400"} mb-3`}>
                {description ? description : "No description provided for this tag."}
                <Link href={`/questions/tagged/${tagName}`} className="text-blue-700 ml-1 underline hover:text-blue-800">View tag</Link>
            </p>
            <div className="flex gap-3">
                <Button
                    className="w-full"
                    isLoading={isWatchLoading}
                    onClick={() => handleWatch(watchValues)}
                >
                    {isWatchedTag ? (
                        <>{!isWatchLoading && <IoMdEyeOff className="h-5 w-5 mr-1" />} Unwatch tag</>
                    ) : (
                        <>{!isWatchLoading && <IoMdEye className="h-5 w-5 mr-1" />} Watch tag</>
                    )}
                </Button>
                <Button
                    variant="outline"
                    className="w-full"
                    isLoading={isIgnoreLoading}
                    onClick={() => handleIgnore(ignoreValues)}
                >
                    {isIgnoredTag ? (
                        <>{!isIgnoreLoading && <MdDoNotDisturb className="h-5 w-5 mr-1" />} Unignore tag</>
                    ) : (
                        <>{!isIgnoreLoading && <MdDoNotDisturb className="h-5 w-5 mr-1" />} Ignore tag</>
                    )}
                </Button>
            </div>
        </div>
    )
};

export default TagDetails;