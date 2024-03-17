"use client";

import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";

import Loader from "../Loader";
import TabsBox from "../TabsBox";
import Questions from "../question/Questions";
import { homeTabs } from "@/constants";
import { buttonVariants } from "../ui/Button";
import { QuestionData } from "@/types/question";
import { InfiniteQueryFnProps } from "@/types/util";
import { getQuestions } from "@/actions/question/getQuestions";

type Tab = "interesting" | "hot" | "week" | "month";

const isValidTab = (value: string) => {
    const isValid = homeTabs.find((tab) => tab.value === value);
    if(!!isValid) return true;
    return false;
};

const Home = () => {
    const limit = 3;
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "interesting";

    const fetchQuestions = async ({ pageParam }: InfiniteQueryFnProps) => {
        const payload = { tab: tab as Tab, page: pageParam, limit };
        const data = await getQuestions(payload);
        return data as QuestionData;
    };

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: [`${tab}-questions`],
        queryFn: fetchQuestions,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.hasNextPage) {
                return pages.length + 1;
            } else {
                return null;
            }
        }
    });

    const questions = data?.pages.flatMap((page) => page.questions);

    if (!isValidTab(tab)) return notFound();

    return (
        <div className="flex-1 flex flex-col lg:flex-row gap-4 py-4 pr-4">
            <section className="flex-1">
                <div className="pl-4">
                    <header className="flex items-enter justify-between">
                        <h1 className="text-xl sm:text-2xl font-medium text-zinc-800">Top Questions</h1>
                        <Link href="/questions/ask" className={buttonVariants()}>Ask Question</Link>
                    </header>
                    <div className="flex justify-end my-4">
                        <TabsBox
                            route="/home"
                            tabs={homeTabs}
                            value={tab}
                        />
                    </div>
                </div>

                {status === "pending" ? (
                    <Loader type="full" />
                ) : (
                    <Questions
                        questions={questions}
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                    />
                )}
            </section>

            <section className="w-full lg:w-[300px] ml-4 lg:ml-0 border border-zinc-300 rounded-sm">
                Hello world
            </section>
        </div>
    )
};

export default Home;