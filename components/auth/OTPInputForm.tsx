"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/components/ui/InputOTP";
import { Button } from "../ui/Button";
import { verifyToken } from "@/actions/verificationToken/verifyToken";
import { sendVerificationEmail } from "@/actions/verificationToken/sendVerificationEmail";

interface OTPInputFormProps {
    email: string;
}

const OTPInputForm = ({ email }: OTPInputFormProps) => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isResendLoading, startResendTransition] = useTransition();
    const [isConfirmLoading, startConfirmTransition] = useTransition();

    const handleConfirm = useCallback(() => {
        setError("");
        setSuccess("");
        const payload = { email, token: value };

        startConfirmTransition(() => {
            verifyToken(payload).then((data) => {
                if (data?.error) {
                    setError(data.error);
                }
            }).catch(() => {
                setError("Something went wrong");
            });
        });
    }, []);

    const handleResendEmail = useCallback(() => {
        setError("");
        setSuccess("");
        const payload = { email };

        startResendTransition(() => {
            sendVerificationEmail(payload).then((data) => {
                if (data.success) {
                    setSuccess(data.success);
                    router.push(`/${data.tokenId}/verify`);
                }
            }).catch(() => {
                setError("Something went wrong");
            });
        });
    }, []);

    return (
        <>
            <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>

            <FormSuccess message={success} />
            <FormError message={error} />

            <Button
                className="w-full mt-5 mb-3"
                onClick={handleConfirm}
                isLoading={isConfirmLoading}
            >
                {isConfirmLoading ? "Confirming..." : "Confirm"}
            </Button>
            <Button
                className="w-full mb-4"
                variant="outline"
                onClick={handleResendEmail}
                isLoading={isResendLoading}
            >
                {isResendLoading ? "Resending email..." : "Resend email"}
            </Button>
        </>
    )
};

export default OTPInputForm;