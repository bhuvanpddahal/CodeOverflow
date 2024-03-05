import Link from "next/link";

interface NavigationTabsProps {
    activeTab: string;
    username: string;
    isCurrentUser: boolean;
}

const NavigationTabs = ({
    activeTab,
    username,
    isCurrentUser
}: NavigationTabsProps) => {
    return (
        <ul className="flex gap-1 text-zinc-600 text-[13px] sm:text-sm">
            <li>
                <Link href={`/users/${username}?tab=profile`} className={`rounded-3xl px-3 py-1.5 ${activeTab === "profile" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                    Profile
                </Link>
            </li>
            <li>
                <Link href={`/users/${username}?tab=activity`} className={`rounded-3xl px-3 py-1.5 ${(activeTab === "activity" || activeTab === "summary" || activeTab === "answers" || activeTab === "questions" || activeTab === "tags" || activeTab === "votes") ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                    Activity
                </Link>
            </li>
            {isCurrentUser && (
                <>
                    <li>
                        <Link href={`/users/${username}?tab=saves`} className={`rounded-3xl px-3 py-1.5 ${activeTab === "saves" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                            Saves
                        </Link>
                    </li>
                    <li>
                        <Link href={`/users/${username}?tab=settings`} className={`rounded-3xl px-3 py-1.5 ${activeTab === "settings" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                            Settings
                        </Link>
                    </li>
                </>
            )}
        </ul>
    )
};

export default NavigationTabs;