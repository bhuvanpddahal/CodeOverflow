"use client";

import { useState } from "react";
import moment from "moment";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import Answers from "../answer/Answers";
import AuthModal from "../auth/AuthModal";
import YourAnswer from "../answer/YourAnswer";
import DetailedQuestion from "./DetailedQuestion";
import { buttonVariants } from "../ui/Button";
import { AnswersSortValue } from "@/types/answer";
import { getQuestion } from "@/actions/getQuestion";
import { DetailedQuestion as QuestionType } from "@/types/question";

interface QuestionDetailsProps {
    id: string;
}

const QuestionDetails = ({ id }: QuestionDetailsProps) => {
    const [showAuthModal, setShowAuthModal] = useState(true);
    const [sortBy, setSortBy] = useState<AnswersSortValue>("highest-score");

    const fetchQuestion = async () => {
        const payload = { questionId: id };
        const question = await getQuestion(payload);
        return question as QuestionType;
    };

    const {
        data: question,
        status
    } = useQuery({
        queryKey: ["questions", id],
        queryFn: fetchQuestion
    });

    if(status === "pending") return <div>Loading...</div>
    if(status === "error") return <div>Something went wrong!</div>

    return (
        <div className="flex-1 p-4">
            {showAuthModal && (
                <AuthModal
                    setShow={setShowAuthModal}
                />
            )}

            <header className="border-b border-zinc-300">
                <div className="flex flex-col-reverse md:flex-row justify-between gap-3">
                    <h1 className="text-2xl font-medium text-slate-700">{question.title}</h1>
                    <Link href="/questions/ask" className={buttonVariants({
                        className: "whitespace-nowrap"
                    })}>Ask Question</Link>
                </div>

                <div className="text-[15px] flex gap-4 my-3">
                    <p className="text-zinc-500">Asked <span className="text-zinc-800">{moment(question.askedAt).calendar()}</span></p>
                    <p className="text-zinc-500">Modified <span className="text-zinc-800">{moment(question.updatedAt).calendar()}</span></p>
                    <p className="text-zinc-500">Viewed <span className="text-zinc-800">{question.views?.length} times</span></p>
                </div>
            </header>
            <div className="flex flex-col lg:flex-row gap-4 py-4">
                <section className="flex-1">
                    <DetailedQuestion
                        questionId={id}
                        askerId={question.askerId}
                        votes={question.votes}
                        details={question.details}
                        expectation={question.expectation}
                        tags={question.tags}
                        askedAt={question.askedAt}
                        updatedAt={question.updatedAt}
                        askerName={question.asker.name}
                        askerUsername={question.asker.username}
                        askerImage={question.asker.image}
                        setShowAuthModal={setShowAuthModal}
                    />

                    <Answers
                        questionId={id}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        setShowAuthModal={setShowAuthModal}
                    />

                    <YourAnswer
                        questionId={id}
                        sortBy={sortBy}
                        setShowAuthModal={setShowAuthModal}
                    />
                </section>

                <section className="w-full lg:w-[300px] border border-zinc-300 rounded-sm text-sm">
                    Hello world
                </section>
            </div>
        </div>
    )
};

export default QuestionDetails;