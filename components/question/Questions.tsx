"use client";

import { useEffect, useState } from "react";
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
import AuthModal from "../auth/AuthModal";

interface QuestionsProps {
    questions: ExtendedQuestion[] | undefined;
    fetchNextPage?: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<QuestionData, unknown>, Error>>;
    hasNextPage?: boolean;
    showDetails?: boolean;
}

const Questions = ({
    questions,
    fetchNextPage,
    hasNextPage,
    showDetails = false
}: QuestionsProps) => {
    const { ref, inView } = useInView();
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        if (inView && hasNextPage) {
            if(fetchNextPage) fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <>
            {showAuthModal && (
                <AuthModal setShow={setShowAuthModal} />
            )}
            <div>
                {questions && questions?.length > 0 ? (
                    questions.map((question, index) => {
                        if (index === questions.length - 1) {
                            return <Question
                                key={index}
                                id={question.id}
                                title={question.title}
                                details={question.details}
                                tags={question.tags}
                                asker={question.asker}
                                votes={question.votes}
                                answererIds={question.answers}
                                views={question.views}
                                askedAt={question.askedAt}
                                updatedAt={question.updatedAt}
                                showDetails={showDetails}
                                setShowAuthModal={setShowAuthModal}
                                lastQuestionRef={ref}
                            />
                        } else {
                            return <Question
                                key={index}
                                id={question.id}
                                title={question.title}
                                details={question.details}
                                tags={question.tags}
                                asker={question.asker}
                                votes={question.votes}
                                answererIds={question.answers}
                                views={question.views}
                                askedAt={question.askedAt}
                                updatedAt={question.updatedAt}
                                showDetails={showDetails}
                                setShowAuthModal={setShowAuthModal}
                            />
                        }
                    })
                ) : (
                    <p className="text-center text-zinc-400 text-[15px]">No questions to show</p>
                )}
            </div>
        </>
    )
};

export default Questions;