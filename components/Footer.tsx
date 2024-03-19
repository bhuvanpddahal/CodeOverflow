import Link from "next/link";

const Footer = () => {
    return (
        <div className="p-5 bg-zinc-900 text-slate-300">
            <div className="container px-4 md:px-8 flex justify-between gap-5">
                <img
                    src="/images/logos/favicon.png"
                    alt="code-overflow-logo"
                    className="h-[40px]"
                />

                <ul className="flex-1 flex gap-8">
                    <li>
                        <h3 className="mb-3 font-semibold text-[15px]">CODE OVERFLOW</h3>
                        <div className="flex flex-col items-start gap-1 text-sm">
                            <Link href="/questions">Questions</Link>
                            <Link href="/tags">Tags</Link>
                            <Link href="/users">Users</Link>
                        </div>
                    </li>
                    <li>
                        <h3 className="mb-3 font-semibold text-[15px]">CODE OVERFLOW</h3>
                        <div className="flex flex-col items-start gap-1 text-sm">
                            <Link href="/questions">Questions</Link>
                            <Link href="/tags">Tags</Link>
                            <Link href="/users">Users</Link>
                        </div>
                    </li>
                    <li>
                        <h3 className="mb-3 font-semibold text-[15px]">CODE OVERFLOW</h3>
                        <div className="flex flex-col items-start gap-1 text-sm">
                            <Link href="/questions">Questions</Link>
                            <Link href="/tags">Tags</Link>
                            <Link href="/users">Users</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Footer;