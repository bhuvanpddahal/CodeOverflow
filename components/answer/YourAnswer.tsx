"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
} from "@/lib/validators/question";

const YourAnswer = () => {
    const isLoading = false;
    const editor = useRef(null);

    const form = useForm<AnswerPayload>({
        resolver: zodResolver(AnswerValidator),
        defaultValues: {
            answer: ""
        }
    });

    const onSubmit = () => { };

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
                            name="answer"
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