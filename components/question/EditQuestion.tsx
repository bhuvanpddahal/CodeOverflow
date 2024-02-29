"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Instruction from "../Instruction";
import QuestionForm from "./QuestionForm";
import { getQuestion } from "@/actions/getQuestion";
import { FormQuestion } from "@/types/question";
import { askQuestionInstruction } from "@/constants";
import { editQuestion } from "@/actions/editQuestion";
import { useCurrentUser } from "@/hooks/use-current-user";

interface EditQuestionProps {
    id: string;
}

const EditQuestion = ({ id }: EditQuestionProps) => {
    const user = useCurrentUser();

    const fetchQuestion = async () => {
        const payload = { questionId: id };
        const question = await getQuestion(payload);
        return question as FormQuestion;
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
    if(question.askerId !== user?.id) return notFound();

    return (
        <div className="bg-zinc-100 p-5 md:py-10 md:px-14">
            <header className="mb-3 md:mb-5">
                <h1 className="text-2xl font-semibold text-zinc-800">Edit your question</h1>
            </header>

            <Instruction instruction={askQuestionInstruction} />

            <QuestionForm
                questionId={id}
                title={question.title}
                details={question.details}
                expectation={question.expectation}
                tags={question.tags}
                mutationFn={editQuestion}
                redirectUrl={`/questions/${id}`}
                btnText="Edit your question"
                loadingBtnText="Editing..."
            />

            <p className='px-8 text-center text-sm text-zinc-700 max-w-4xl mt-2'>
                Want to ask a question instead?{' '}
                <Link href='/questions/ask' className='hover:text-zinc-800 text-sm underline underline-offset-4'>
                    Click here
                </Link>
            </p>
        </div>
    )
};

export default EditQuestion;