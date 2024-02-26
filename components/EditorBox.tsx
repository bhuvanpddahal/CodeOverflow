"use client";

import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { UseFormReturn } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "./ui/Form";
import { QuestionPayload } from "@/lib/validators/question";

interface EditorBoxProps {
    title: string;
    description: string;
    name: "details" | "expectation";
    form: UseFormReturn<QuestionPayload, any, QuestionPayload>;
    isLoading: boolean;
}

const EditorBox = ({
    title,
    description,
    name,
    form,
    isLoading
}: EditorBoxProps) => {
    const editor = useRef(null);

    return (
        <div className="border border-zinc-200 bg-white p-6 rounded-sm max-w-4xl">
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel children={
                            <>
                                <h3 className="font-bold text-zinc-800 text-base">{title}</h3>
                                <p className="text-[13px] text-zinc-600 mt-1">{description}</p>
                            </>
                        } />
                        <FormControl >
                            <JoditEditor
                                {...field}
                                ref={editor}
                                className={isLoading ? "pointer-events-none" : ""}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
};

export default EditorBox;