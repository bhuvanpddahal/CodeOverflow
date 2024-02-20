import Link from "next/link";

const Footer = () => {
    return (
        <div className="p-5 bg-zinc-800 text-zinc-200">
            <div className="container px-4 md:px-8 flex items-center justify-between gap-3">
                <img
                    src="/images/logos/favicon.png"
                    alt="code-overflow-logo"
                    className="h-[40px]"
                />

                <ul>
                    <li>
                        <h3>Code Overflow</h3>
                        <div>
                            <Link href="/questions">Questions</Link>
                            <Link href="/help">Help</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Footer;