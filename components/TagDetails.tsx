"use client";

import Link from "next/link";
import { ImFire } from "react-icons/im";
import { MdDoNotDisturb } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { Button } from "./ui/Button";

interface TagDetailsProps {
    watcherIds: string[];
    questionIds: string[];
    description: string | null;
}

const TagDetails = ({
    watcherIds,
    questionIds,
    description
}: TagDetailsProps) => {
    return (
        <div>
            <header className="flex items-center gap-3 text-sm mb-2">
                <div className="flex items-center gap-1 text-amber-900">
                    <ImFire /> {watcherIds.length} {watcherIds.length === 1 ? "watcher" : "watchers"}
                </div>
                <div className="text-zinc-800">{questionIds.length} {questionIds.length === 1 ? "question" : "questions"}</div>
            </header>
            <p className="text-sm text-zinc-600 mb-3">
                {description ? (
                    <>
                        For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that JavaScript is NOT Java. Include all tags that are relevant to your question: e.g., [node.js], [jQuery], [JSON], [ReactJS], [angular], [ember.js], [vue.js], [typescript], [svelte], etc.
                        <Link href={`/questions/tagged/tagname`} className="text-blue-700 ml-0.5 underline hover:text-blue-800">View tag</Link>
                    </>
                ) : "No description provided for this tag."}
            </p>
            <div className="flex gap-3">
                <Button className="w-full">
                    <IoMdEye className="h-5 w-5 mr-1" /> Watch tag
                </Button>
                <Button variant="outline" className="w-full">
                    <MdDoNotDisturb className="h-5 w-5 mr-1" /> Ignore tag
                </Button>
            </div>
        </div>
    )
};

export default TagDetails;