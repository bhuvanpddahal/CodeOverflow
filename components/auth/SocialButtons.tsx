"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "../ui/Button";

interface SocialButtonsProp {
    auth: string;
}

const SocialButtons = ({ auth }: SocialButtonsProp) => {
    const isLoading = false;
    const loginWithSocial = (provider: "google" | "github") => {
        // signIn(provider, {
        //     callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
        // });
        console.log("Trying to login with ", provider);
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