import Link from "next/link";

interface ActivityNavProps {
    username: string;
    activeTab: string;
}

const ActivityNav = ({ username, activeTab }: ActivityNavProps) => {
    return (
        <ul className="hidden md:inline-block w-[140px] h-fit sticky top-[70px] text-sm text-zinc-600">
            <li>
                <Link href={`/users/${username}?tab=summary`} className={`block px-4 py-1.5 rounded-3xl ${(activeTab === "activity" || activeTab === "summary") ? "text-zinc-800 bg-blue-100 hover:bg-blue-50" : "hover:bg-zinc-200"}`}>
                    Summary
                </Link>
            </li>
            <li>
                <Link href={`/users/${username}?tab=answers`} className={`block px-4 py-1.5 rounded-3xl ${activeTab === "answers" ? "text-zinc-800 bg-blue-100 hover:bg-blue-50" : "hover:bg-zinc-200"}`}>
                    Answers
                </Link>
            </li>
            <li>
                <Link href={`/users/${username}?tab=questions`} className={`block px-4 py-1.5 rounded-3xl ${activeTab === "questions" ? "text-zinc-800 bg-blue-100 hover:bg-blue-50" : "hover:bg-zinc-200"}`}>
                    Questions
                </Link>
            </li>
            <li>
                <Link href={`/users/${username}?tab=tags`} className={`block px-4 py-1.5 rounded-3xl ${activeTab === "tags" ? "text-zinc-800 bg-blue-100 hover:bg-blue-50" : "hover:bg-zinc-200"}`}>
                    Tags
                </Link>
            </li>
            <li>
                <Link href={`/users/${username}?tab=votes`} className={`block px-4 py-1.5 rounded-3xl ${activeTab === "votes" ? "text-zinc-800 bg-blue-100 hover:bg-blue-50" : "hover:bg-zinc-200"}`}>
                    Votes
                </Link>
            </li>
        </ul>
    )
};

export default ActivityNav;