"use client";

import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "../ui/Button";

interface AuthModalProps {
    setShow: Dispatch<SetStateAction<boolean>>;
}

const AuthModal = ({ setShow }: AuthModalProps) => {
    return (
        <div className="bg-zinc-900/40 fixed inset-0 flex items-center justify-center z-20 p-3">
            <div className="bg-white p-5 max-w-sm w-full rounded-md">
                <header className="text-slate-700 font-semibold text-lg">Authenticate Yourself</header>
                <p className="text-zinc-400 mt-2 mb-3">You must be logged in to vote a question.</p>
                <div className="flex justify-between">
                    <Link
                        href="/log-in"
                        className={buttonVariants()}
                    >
                        Go to Log in
                    </Link>
                    <Button
                        variant="destructive"
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default AuthModal;