"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import Answer from "./Answer";
import SelectOptions from "../SelectOptions";
import {
    answersSortOptions,
    ANSWERS_PER_PAGE
} from "@/constants";
import { getAnswers } from "@/actions/getAnswers";
import { InfiniteQueryFnProps } from "@/types/util";
import { AnswersData, AnswersSortValue } from "@/types/answer";

interface AnswersProps {
    questionId: string;
    sortBy:  AnswersSortValue;
    setSortBy: Dispatch<SetStateAction<AnswersSortValue>>;
}

const Answers = ({
    questionId,
    sortBy,
    setSortBy
}: AnswersProps) => {
    const { ref, inView } = useInView();

    const fetchAnswers = async ({ pageParam }: InfiniteQueryFnProps) => {
        const payload = { questionId, orderBy: sortBy, page: pageParam, limit: ANSWERS_PER_PAGE };
        const data = await getAnswers(payload);
        return data as AnswersData;
    };

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ["answers", { questionId, sortBy }],
        queryFn: fetchAnswers,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.hasNextPage) {
                return pages.length + 1;
            } else {
                return null;
            }
        }
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const answers = data?.pages.flatMap((page) => page.answers);

    return (
        <>
            {answers && answers.length > 0 && (
                <>
                    <div className="flex items-center justify-between mt-6 mb-7">
                        <p className="text-xl text-slate-700 font-medium">{answers.length} Answers</p>

                        <div className="flex items-center gap-2 text-zinc-800">
                            <span className="whitespace-nowrap text-[13px]">Sorted by:</span>
                            <SelectOptions
                                value={sortBy}
                                setValue={setSortBy}
                                options={answersSortOptions}
                            />
                        </div>
                    </div>
                    
                    <ul className="space-y-5">
                        {answers.map((answer, index) => {
                            if (index === answers.length - 1) {
                                return <Answer
                                    key={answer.id}
                                    votes={answer.votes}
                                    content={answer.content}
                                    answerer={answer.answerer}
                                    answeredAt={answer.answeredAt}
                                    updatedAt={answer.updatedAt}
                                    lastAnswerRef={ref}
                                />
                            } else {
                                return <Answer
                                    key={answer.id}
                                    votes={answer.votes}
                                    content={answer.content}
                                    answerer={answer.answerer}
                                    answeredAt={answer.answeredAt}
                                    updatedAt={answer.updatedAt}
                                />
                            }
                        })}
                    </ul>
                </>
            )}
        </>
    )
};

export default Answers;