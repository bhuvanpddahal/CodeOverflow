import Link from "next/link";

const Footer = () => {
    return (
        <div className="p-5 bg-zinc-900 text-slate-300">
            <div className="container px-4 md:px-8 flex items-start sm:justify-between gap-5 flex-wrap">
                <img
                    src="/images/logos/favicon.png"
                    alt="code-overflow-logo"
                    className="h-[40px]"
                />

                <ul className="flex flex-col sm:flex-row gap-8">
                    <li>
                        <h3 className="mb-3 font-semibold text-[15px]">CODE OVERFLOW</h3>
                        <div className="flex flex-col items-start gap-1 text-sm">
                            <Link href="/questions">Questions</Link>
                            <Link href="/tags">Tags</Link>
                            <Link href="/users">Users</Link>
                        </div>
                    </li>
                    <li className="flex flex-col">
                        <h3 className="mb-3 font-semibold text-[15px]">COMPANY</h3>
                        <div className="flex-1 flex flex-col justify-between">
                            <div className="flex gap-2 text-[13px]">
                                <Link href="/">Twitter</Link>
                                <Link href="/">GitHub</Link>
                                <Link href="/">Facebook</Link>
                                <Link href="/">LinkedIn</Link>
                            </div>
                            <div className="text-[13px]">Copyright © codeoverflow.com 2024. All rights reserved.</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Footer;