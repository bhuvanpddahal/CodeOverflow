"use client";

import {
    Dispatch,
    SetStateAction
} from "react";
import Link from "next/link";
import { ImFire } from "react-icons/im";
import { MdDoNotDisturb } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { UseMutateFunction } from "@tanstack/react-query";

import {
    IgnoreType,
    IgnoreValues,
    WatchType,
    WatchValues
} from "@/types/tag";
import { Button } from "./ui/Button";

interface TagDetailsProps {
    tagId: string;
    tagName: string;
    watchersCount: number;
    questionsCount: number;
    description: string | null;
    isWatchedTag: boolean;
    isIgnoredTag: boolean;
    isWatchLoading: boolean;
    isIgnoreLoading: boolean;
    handleWatch: UseMutateFunction<void, Error, WatchValues, unknown>;
    handleIgnore: UseMutateFunction<void, Error, IgnoreValues, unknown>;
    isLoggedIn: boolean;
    setShowAuthModal: Dispatch<SetStateAction<boolean>>;
}

const TagDetails = ({
    tagId,
    tagName,
    watchersCount,
    questionsCount,
    description,
    isWatchedTag,
    isIgnoredTag,
    isWatchLoading,
    isIgnoreLoading,
    handleWatch,
    handleIgnore,
    isLoggedIn,
    setShowAuthModal
}: TagDetailsProps) => {
    const watchType: WatchType = isWatchedTag ? "unwatch" : "watch";
    const ignoreType: IgnoreType = isIgnoredTag ? "unignore" : "ignore";
    const watchValues = { type: watchType, tagId };
    const ignoreValues = { type: ignoreType, tagId };

    return (
        <div>
            <header className="flex items-center gap-3 text-sm mb-2">
                <div className="flex items-center gap-1 text-amber-900">
                    <ImFire className="h-4 w-4" /> {watchersCount} {watchersCount === 1 ? "watcher" : "watchers"}
                </div>
                <div className="text-zinc-800">{questionsCount} {questionsCount === 1 ? "question" : "questions"}</div>
            </header>
            <p className={`text-sm ${description ? "text-zinc-600" : "text-zinc-400"}`}>
                {description ? description : "No description provided for this tag."}
                <Link href={`/questions/tagged/${tagName}`} className="text-blue-700 ml-1 underline hover:text-blue-800">View tag</Link>
            </p>
            {isLoggedIn && (
                <div className="flex gap-3 mt-3">
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
            )}
        </div>
    )
};

export default TagDetails;