import Link from "next/link";
import SignUpForm from "./SignUpForm";
import SocialButtons from "./SocialButtons";

const SignUp = () => {
    return (
        <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
            <div className="flex flex-col space-y-2 text-center">
                <Link className="mx-auto" href='/'>
                    <img src="/images/logos/favicon.png" alt="stack-overflow-favicon" className='h-[40px]' />
                </Link>
                <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
                <p className='text-sm max-w-xs mx-auto'>By clicking "Sign up", you agree to our terms of service and acknowledge you have read our privacy policy.</p>
            </div>

            <SignUpForm />

            <SocialButtons
                auth="Sign up"
            />

            <p className='px-8 text-center text-sm text-zinc-700'>
                Already have an account?{' '}
                <Link href='/log-in' className='hover:text-zinc-800 text-sm underline underline-offset-4'>
                    Log In
                </Link>
            </p>
        </div>
    )
};

export default SignUp;