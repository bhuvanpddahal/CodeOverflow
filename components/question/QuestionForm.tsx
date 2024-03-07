"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputBox from "../InputBox";
import EditorBox from "../EditorBox";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import AuthModal from "../auth/AuthModal";
import ChipInputBox from "../ChipInputBox";
import { Form } from "../ui/Form";
import { Button } from "../ui/Button";
import {
    questionTitle,
    questionDetails,
    questionExpectation,
    questionTags
} from "@/constants";
import {
    QuestionPayload,
    QuestionValidator
} from "@/lib/validators/question";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

interface Tag {
    name: string;
}

interface QuestionFormProps {
    questionId?: string;
    title?: string;
    details?: string;
    expectation?: string;
    tags?: Tag[];
    mutationFn: (payload: QuestionPayload) => Promise<{
        error: string;
        success?: undefined;
    } | {
        success: string;
        error?: undefined;
    }>;
    redirectUrl: string;
    btnText: string;
    loadingBtnText: string;
}

const QuestionForm = ({
    questionId,
    title,
    details,
    expectation,
    tags,
    mutationFn,
    redirectUrl,
    btnText,
    loadingBtnText
}: QuestionFormProps) => {
    const router = useRouter();
    const user = useCurrentUser();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, startTransition] = useTransition();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const tagNames = tags ? tags.map((tag) => tag.name) : [];

    const form = useForm<QuestionPayload>({
        resolver: zodResolver(QuestionValidator),
        defaultValues: {
            questionId: questionId || "",
            title: title || "",
            details: details || "",
            expectation: expectation || "",
            tags: tagNames
        }
    });

    const onSubmit = (payload: QuestionPayload) => {
        setError('');
        setSuccess('');

        if (user) {
            startTransition(() => {
                mutationFn(payload).then((data) => {
                    if (data.success) {
                        setSuccess(data.success);
                        router.push(redirectUrl);
                    }
                    if (data.error) {
                        setError(data.error);
                    }
                });
            });
        } else {
            setShowAuthModal(true);
        }
    };

    const handleDiscard = () => {
        form.reset();
    };

    return (
        <>
            {showAuthModal && (
                <AuthModal
                    setShow={setShowAuthModal}
                />
            )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='mt-5'
                >
                    <div className='flex flex-col gap-5'>
                        <InputBox
                            title={questionTitle.title}
                            description={questionTitle.description}
                            placeholder={questionTitle.placeholder}
                            name="title"
                            form={form}
                            isLoading={isLoading}
                        />
                        <EditorBox
                            title={questionDetails.title}
                            description={questionDetails.description}
                            name="details"
                            form={form}
                            isLoading={isLoading}
                        />
                        <EditorBox
                            title={questionExpectation.title}
                            description={questionExpectation.description}
                            name="expectation"
                            form={form}
                            isLoading={isLoading}
                        />
                        <ChipInputBox
                            title={questionTags.title}
                            description={questionTags.description}
                            placeholder={questionTags.placeholder}
                            name="tags"
                            form={form}
                            isLoading={isLoading}
                            initialTags={tagNames}
                        />
                    </div>

                    <FormSuccess message={success} />
                    <FormError message={error} />

                    <div className="max-w-4xl flex justify-between gap-3 mt-5">
                        <Button
                            type='submit'
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            {isLoading ? loadingBtnText : btnText}
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={isLoading}
                            onClick={handleDiscard}
                        >
                            Discard draft
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
};

export default QuestionForm;