"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

import SocialButtons from "./SocialButtons";
import { Button, buttonVariants } from "../ui/Button";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

interface AuthModalProps {
    setShow: Dispatch<SetStateAction<boolean>>;
}

const AuthModal = ({
    setShow
}: AuthModalProps) => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleIsLogin = () => {
        setIsLogin((prev) => !prev);
    };

    return (
        <div className="bg-zinc-900/40 fixed inset-0 flex items-center justify-center z-20 p-3 overflow-y-auto">
            <div className="bg-white p-5 max-w-sm w-full rounded-md space-y-5">
                <div>
                    <header className="text-slate-700 font-semibold text-lg">Authenticate Yourself</header>
                    <p className="text-zinc-400 text-sm mt-2">You must be logged in to perform that action.</p>
                </div>

                {isLogin ? (
                    <LogInForm />
                ) : (
                    <SignUpForm />
                )}

                <SocialButtons />

                <p className='px-8 text-center text-sm text-zinc-700'>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button onClick={toggleIsLogin} className='hover:text-zinc-800 text-sm underline underline-offset-4'>
                        {isLogin ? "Sign Up" : "Log In"}
                    </button>
                </p>

                <Button
                    variant="outline"
                    onClick={() => setShow(false)}
                    className="ml-auto"
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
};

export default AuthModal;