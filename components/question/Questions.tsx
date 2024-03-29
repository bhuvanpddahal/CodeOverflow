"use client";

import { useEffect, useState } from "react";
import {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import Question from "./Question";
import AuthModal from "../auth/AuthModal";
import {
    ExtendedQuestion,
    QuestionData
} from "@/types/question";
import { useCurrentUser } from "@/hooks/use-current-user";

interface QuestionsProps {
    questions: ExtendedQuestion[] | undefined;
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<QuestionData, unknown>, Error>>;
    hasNextPage: boolean;
    showDetails?: boolean;
}

const Questions = ({
    questions,
    fetchNextPage,
    hasNextPage,
    showDetails = false
}: QuestionsProps) => {
    const user = useCurrentUser();
    const { ref, inView } = useInView();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [watchedTagIds, setWatchedTagIds] = useState(user?.watchedTagIds || []);
    const [ignoredTagIds, setIgnoredTagIds] = useState(user?.ignoredTagIds || []);

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
                                user={user}
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
                                watchedTagIds={watchedTagIds}
                                ignoredTagIds={ignoredTagIds}
                                setWatchedTagIds={setWatchedTagIds}
                                setIgnoredTagIds={setIgnoredTagIds}
                                setShowAuthModal={setShowAuthModal}
                                showDetails={showDetails}
                                lastQuestionRef={ref}
                            />
                        } else {
                            return <Question
                                key={index}
                                user={user}
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
                                watchedTagIds={watchedTagIds}
                                ignoredTagIds={ignoredTagIds}
                                setWatchedTagIds={setWatchedTagIds}
                                setIgnoredTagIds={setIgnoredTagIds}
                                setShowAuthModal={setShowAuthModal}
                                showDetails={showDetails}
                            />
                        }
                    })
                ) : (
                    <p className="text-center text-zinc-400 text-[15px] py-10">No questions to show</p>
                )}
            </div>
        </>
    )
};

export default Questions;