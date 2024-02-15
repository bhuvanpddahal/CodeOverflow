"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "../ui/Button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface SocialButtonsProp {
    auth: string;
}

const SocialButtons = ({ auth }: SocialButtonsProp) => {
    const isLoading = false;
    const loginWithSocial = (provider: "google" | "github") => {
        console.log("Trying to login with ", provider);
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        });
    };

    return (
        <div>
            <Button
                onClick={() => loginWithSocial("google")}
                isLoading={isLoading}
                className='w-full shadow my-2'
                variant="outline"
            >
                {!isLoading && <FcGoogle className='h-4 w-4 mr-2' />}
                {auth} with Google
            </Button>
            <Button
                onClick={() => loginWithSocial("github")}
                isLoading={isLoading}
                className='w-full shadow my-2'
            >
                {!isLoading && <FaGithub className='h-4 w-4 mr-2' />}
                {auth} with GitHub
            </Button>
        </div>
    )
};

export default SocialButtons;