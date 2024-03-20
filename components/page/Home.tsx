"use client";

import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";

import Loader from "../Loader";
import TabsBox from "../TabsBox";
import RightPanel from "../RightPanel";
import Questions from "../question/Questions";
import { buttonVariants } from "../ui/Button";
import { QuestionData } from "@/types/question";
import { InfiniteQueryFnProps } from "@/types/util";
import { QUESTIONS_PER_PAGE, homeTabs } from "@/constants";
import { getHomeQuestions } from "@/actions/question/getHomeQuestions";

type Tab = "interesting" | "hot" | "week" | "month";

const isValidTab = (value: string) => {
    const isValid = homeTabs.find((tab) => tab.value === value);
    if(!!isValid) return true;
    return false;
};

const Home = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "interesting";

    const fetchQuestions = async ({ pageParam }: InfiniteQueryFnProps) => {
        const payload = { tab: tab as Tab, page: pageParam, limit: QUESTIONS_PER_PAGE };
        const data = await getHomeQuestions(payload);
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
        <div className="flex-1 flex flex-col lg:flex-row gap-4 py-4 sm:pr-4">
            <section className="flex-1">
                <div className="pl-4 pr-4 sm:pr-0">
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

            <RightPanel />
        </div>
    )
};

export default Home;