"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod';

import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { Button } from "../ui/Button";
import {
    SignupPayload,
    SignupValidator
} from "@/lib/validators/auth";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/Form";
import { Input } from "../ui/Input";
import { signUp } from "@/actions/auth/signUp";

const SignUpForm = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, startTransition] = useTransition();

    const form = useForm<SignupPayload>({
        resolver: zodResolver(SignupValidator),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = (payload: SignupPayload) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            signUp(payload).then((data) => {
                if (data?.error) {
                    setError(data.error);
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                    router.push(`/${data.tokenId}/verify`);
                }
            }).catch(() => {
                setError("Something went wrong");
            });
        });
    };

    return (
        <div className="w-full shadow p-5 outline outline-1 outline-zinc-200 rounded-lg bg-white">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-5'
                >
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='John Doe'
                                            type='text'
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='johndoe@example.com'
                                            type='email'
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='******'
                                            type='password'
                                            autoComplete="on"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <Button
                        type='submit'
                        className='w-full'
                        disabled={isLoading}
                        isLoading={isLoading}
                    >
                        {isLoading ? "Signing up..." : "Sign up"}
                    </Button>
                </form>
            </Form>
        </div>
    )
};

export default SignUpForm;