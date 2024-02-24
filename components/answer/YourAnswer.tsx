"use client";

import { useTransition, useRef, useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import JoditEditor from "jodit-react";
import { Button } from "../ui/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "../ui/Form";
import {
    AnswerPayload,
    AnswerValidator
} from "@/lib/validators/answer";
import { AnswersSortValue } from "@/types/answer";
import { answerQuestion } from "@/actions/answerQuestion";
import { useCurrentUser } from "@/hooks/use-current-user";

interface YourAnswerProps {
    questionId: string;
    sortBy: AnswersSortValue;
    setShowAuthModal: Dispatch<SetStateAction<boolean>>;
}

const YourAnswer = ({
    questionId,
    sortBy,
    setShowAuthModal
}: YourAnswerProps) => {
    const editor = useRef(null);
    const user = useCurrentUser();
    const queryClient = useQueryClient();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, startTransition] = useTransition();

    const form = useForm<AnswerPayload>({
        resolver: zodResolver(AnswerValidator),
        defaultValues: {
            content: "",
            questionId
        }
    });

    const onSubmit = (payload: AnswerPayload) => {
        if(user) {
            startTransition(() => {
                answerQuestion(payload).then((data) => {
                    if (data.success) {
                        queryClient.invalidateQueries({
                            queryKey: ["answers", { questionId, sortBy }],
                            exact: true
                        });
                        setSuccess(data.success);
                        form.reset();
                    }
                }).catch(() => {
                    setError("Something went wrong");
                });
            });
        } else {
            setShowAuthModal(true);
        }
    };

    return (
        <div className="mt-4">
            <p className="text-xl text-slate-700 font-medium">Your Answer</p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='mt-5'
                >
                    <div className='flex flex-col gap-5'>
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <JoditEditor
                                            {...field}
                                            ref={editor}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="max-w-4xl flex justify-between gap-3 mt-5">
                        <Button
                            type='submit'
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            {isLoading ? "Posting..." : "Post your answer"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
};

export default YourAnswer;