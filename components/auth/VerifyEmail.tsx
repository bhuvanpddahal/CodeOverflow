"use client";

import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Loader from "../Loader";
import OTPInputForm from "./OTPInputForm";
import { VerifyEmailData } from "@/types/verification-token";
import { getVerificationToken } from "@/actions/emailVerification/getVerificationToken";

interface VerifyEmailProps {
    tokenId: string;
}

const VerifyEmail = ({ tokenId }: VerifyEmailProps) => {
    const fetchVerificationToken = async () => {
        const payload = { tokenId };
        const verificationToken = await getVerificationToken(payload);
        return verificationToken as VerifyEmailData;
    };

    const {
        data: verificationToken,
        isLoading
    } = useQuery({
        queryKey: [tokenId, "verify"],
        queryFn: fetchVerificationToken
    });

    if (isLoading) return <Loader type="full" />
    if (!verificationToken) return notFound();

    return (
        <div className="min-h-rem bg-zinc-100 flex items-center justify-center py-5 px-3">
            <div className="w-full sm:w-[400px] flex flex-col items-center shadow p-5 outline outline-1 outline-zinc-200 rounded-lg bg-white">
                <div className="flex items-center gap-3 mb-1">
                    <img
                        src="/images/logos/favicon.png"
                        alt="code-overflow-logo"
                        className="h-[40px]"
                    />
                    <h3 className="font-bold text-zinc-800">VERIFY YOUR EMAIL</h3>
                </div>

                <p className="text-zinc-500 text-center text-[13px] mb-4">We have already sent a code to <span className="font-medium">{verificationToken.email}</span>, please check your inbox and insert the code in form below to verify your email.</p>

                <OTPInputForm
                    email={verificationToken.email}
                />

                <p className="text-zinc-500 text-center text-[13px] mb-3">Don't worry, it's only one time. Once your email is verified, you don't need to do this anymore :)</p>
            </div>
        </div>
    )
};

export default VerifyEmail;