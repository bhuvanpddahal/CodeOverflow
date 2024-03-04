"use client";

import Link from "next/link";
import { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";

import TabsBox from "../TabsBox";
import Questions from "./Questions";
import PaginationBox from "../PaginationBox";
import { getTag } from "@/actions/getTag";
import { TaggedData } from "@/types/question";
import { buttonVariants } from "../ui/Button";
import { getTaggedQuestions } from "@/actions/getTaggedQuestions";
import { QUESTIONS_PER_PAGE, taggedQuestionsTabs } from "@/constants";

interface TaggedQuestionsProps {
    name: string;
}

const isValidTab = (value: string) => {
    const isValid = taggedQuestionsTabs.find((tab) => tab.value === value);
    if(!!isValid) return true;
    return false;
};

const TaggedQuestions = ({ name }: TaggedQuestionsProps) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const tab = searchParams.get("tab") || "newest";

    const fetchTag = async () => {
        const payload = { name };
        const tag = await getTag(payload);
        return tag as Tag;
    };

    const {
        data: tag,
        isFetching: isFetchingTag
    } = useQuery({
        queryKey: ["tag", name],
        queryFn: fetchTag
    });

    const fetchQuestions = async () => {
        if (tag) {
            // @ts-ignore
            const payload = { tagId: tag.id, tab, page: Number(page), limit: QUESTIONS_PER_PAGE };
            const data = await getTaggedQuestions(payload);
            return data as TaggedData;
        }
    };

    const {
        data,
        isFetching: isFetchingQuestions
    } = useQuery({
        queryKey: ["questions", "tagged", name, { tab, page }],
        queryFn: fetchQuestions,
        enabled: !!tag
    });

    if (!isValidTab(tab)) return notFound();
    if (isFetchingTag) return <div className="flex-1 text-center text-zinc-400 text-[15px] py-10">Loading...</div>
    if (!tag) return notFound();

    return (
        <div className="flex-1 flex flex-col lg:flex-row gap-4 py-4 pr-4">
            <section className="flex-1">
                <div className="pl-4">
                    <header className="">
                        <div className="flex items-enter justify-between">
                            <h1 className="text-xl sm:text-2xl font-medium text-zinc-800">Questions tagged [{tag.name}]</h1>
                            <Link href="/questions/ask" className={buttonVariants()}>Ask Question</Link>
                        </div>

                        <p className={`text-[13px] sm:text-sm ${tag.description ? "text-zinc-900" : "text-zinc-400"} mt-4`}>{tag.description
                            ? tag.description
                            : "No description provided for this tag"
                        }</p>
                    </header>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between my-4">
                        <p className="text-base sm:text-lg text-zinc-900 mb-2 sm:mb-0">
                            {data?.questions
                                ? `${data?.totalQuestions} ${data?.totalQuestions === 1 ? "question" : "questions"}`
                                : ""
                            }
                        </p>
                        <TabsBox
                            route={`/questions/tagged/${tag.name}`}
                            tabs={taggedQuestionsTabs}
                            value={tab}
                        />
                    </div>
                </div>

                {isFetchingQuestions ? (
                    <div className="text-center text-zinc-400 text-[15px] py-10">Loading...</div>
                ) : (
                    <>
                        <Questions
                            questions={data?.questions}
                            showDetails
                        />
                        <PaginationBox
                            location={`/tags?tab=${tab}&`}
                            currentPage={Number(page)}
                            lastPage={data?.lastPage}
                        />
                    </>
                )}
            </section>

            <section className="w-full lg:w-[300px] ml-4 lg:ml-0 border border-zinc-300 rounded-sm">
                Hello world
            </section>
        </div>
    )
};

export default TaggedQuestions;