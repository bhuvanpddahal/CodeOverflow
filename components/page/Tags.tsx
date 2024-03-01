"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";

import TabsBox from "../TabsBox";
import Searchbar from "../Searchbar";
import PaginationBox from "../PaginationBox";
import { Badge } from "../ui/Badge";
import { TagData } from "@/types/tag";
import { getTags } from "@/actions/getTags";
import { GetTagsPayload } from "@/lib/validators/tag";
import { TAGS_PER_PAGE, tagsTabs } from "@/constants";

type Tab = "popular" | "name" | "new";

const isValidTab = (value: string) => {
    const isValid = tagsTabs.find((tab) => tab.value === value);
    if(!!isValid) return true;
    return false;
};

const Tags = () => {
    const [input, setInput] = useState("");
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const tab = searchParams.get("tab") || "popular";

    const fetchTags = async () => {
        if (isValidTab(tab)) {
            const payload: GetTagsPayload = { tab: tab as Tab, page: Number(page), limit: TAGS_PER_PAGE };
            const data = await getTags(payload);
            return data as TagData;
        } else {
            throw new Error("Invalid tab");
        }
    };

    const {
        data,
        isFetching
    } = useQuery({
        queryKey: ["tags", { tab, page }],
        queryFn: fetchTags
    });

    if (!isValidTab(tab)) return notFound();

    return (
        <section className="flex-1 p-4">
            <header>
                <h1 className="text-2xl font-medium text-zinc-800">Tags</h1>
                <p className="text-[15px] text-zinc-800 my-3 max-w-2xl">A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
            </header>

            <div className="flex items-center justify-between mb-3">
                <Searchbar
                    input={input}
                    setInput={setInput}
                    placeholder="Filter by tag name"
                />
                <TabsBox
                    route="/tags"
                    tabs={tagsTabs}
                    value={tab}
                />
            </div>

            {isFetching ? (
                <div className="text-center text-zinc-400 text-[15px] py-10">Loading...</div>
            ) : (
                data?.tags && data.tags.length ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-px mb-3">
                        {data.tags.map((tag) => {
                            if(tag.name.includes(input)) {
                                return (
                                    <li className="border border-zinc-300 p-3 rounded-sm">
                                        <Link href={`/questions/tagged/${tag.name}`}>
                                            <Badge variant="secondary">{tag.name}</Badge>
                                        </Link>
                                        <p className="text-sm text-zinc-700 my-3 line-clamp-4">{tag.description ? tag.description : ""}</p>
                                        <div className="flex justify-between gap-3 text-[13px] text-zinc-500">
                                            <span>{tag.questionIds.length} questions</span>
                                            <span>1 asked today, 2 this week</span>
                                        </div>
                                    </li>
                                )
                            }
                            return null;
                        })}
                    </ul>
                ) : (
                    <div className="text-center text-zinc-400 text-[15px] py-10">No tags to show</div>
                )
            )}

            {data?.tags && (
                <PaginationBox
                    isFiltering={input.length > 0}
                    location="/tags"
                    tab={tab}
                    currentPage={Number(page)}
                    lastPage={data?.lastPage}
                />
            )}
        </section>
    )
};

export default Tags;