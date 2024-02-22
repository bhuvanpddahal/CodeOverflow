"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult
} from "@tanstack/react-query";

import Question from "./Question";
import {
    ExtendedQuestion,
    QuestionData
} from "@/types/question";

interface QuestionsProps {
    questions: ExtendedQuestion[] | undefined;
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<QuestionData, unknown>, Error>>;
    hasNextPage: boolean;
}

const Questions = ({
    questions,
    fetchNextPage,
    hasNextPage
}: QuestionsProps) => {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <div>
            {!!questions ? (
                questions?.length > 0 ? (
                    questions?.map((question, index) => {
                        if (index === questions.length - 1) {
                            return <Question
                                key={index}
                                id={question.id}
                                title={question.title}
                                tags={question.tags}
                                asker={question.asker}
                                askedAt={question.askedAt}
                                updatedAt={question.updatedAt}
                                lastQuestionRef={ref}
                            />
                        } else {
                            return <Question
                                key={index}
                                id={question.id}
                                title={question.title}
                                tags={question.tags}
                                asker={question.asker}
                                askedAt={question.askedAt}
                                updatedAt={question.updatedAt}
                            />
                        }
                    })
                ) : (
                    <p className="text-center text-zinc-400 text-[15px]">No questions to show</p>
                )
            ) : (
                <p className="text-center text-zinc-400 text-[15px]">An error occurred while trying to get the questions</p>
            )}
        </div>
    )
};

export default Questions;