import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/components/ui/InputOTP";
import { Button } from "../ui/Button";

interface VerifyEmailProps {
    tokenId: string;
}

const VerifyEmail = ({ tokenId }: VerifyEmailProps) => {
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

                <p className="text-zinc-500 text-center text-[13px] mb-4">We have already sent a code to youremail@gmail.com, please check your inbox and insert the code in form below to verify your email.</p>

                <InputOTP maxLength={6}>
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

                <Button
                    className="w-full mt-5 mb-3"
                >
                    Confirm
                </Button>
                <Button
                    className="w-full mb-4"
                    variant="outline"
                >
                    Resend email
                </Button>

                <p className="text-zinc-500 text-center text-[13px] mb-3">Don't worry, it's only one time. Once your email is verified, you don't need to do this anymore :)</p>
            </div>
        </div>
    )
};

export default VerifyEmail;