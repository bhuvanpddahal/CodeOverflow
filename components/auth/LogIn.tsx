import Link from "next/link";
import LogInForm from "./LogInForm";
import SocialButtons from "./SocialButtons";

const LogIn = () => {
    return (
        <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
            <div className="flex flex-col space-y-2 text-center">
                <Link className="mx-auto" href='/'>
                    <img src="/images/logos/favicon.png" alt="stack-overflow-favicon" className='h-[40px]' />
                </Link>
                <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
                <p className='text-sm max-w-xs mx-auto'>Collaborate and share knowledge with people for FREE.</p>
            </div>

            <LogInForm />

            <SocialButtons
                auth="Log in"
            />

            <p className='px-8 text-center text-sm text-zinc-700'>
                Don't have an account?{' '}
                <Link href='/sign-up' className='hover:text-zinc-800 text-sm underline underline-offset-4'>
                    Sign Up
                </Link>
            </p>
        </div>
    )
};

export default LogIn;