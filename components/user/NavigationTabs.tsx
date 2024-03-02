import Link from "next/link";

const NavigationTabs = () => {
    const username = "username";
    const tab: string = "profile";

    return (
        <ul className="flex gap-1 text-zinc-600 text-[13px] sm:text-sm">
            <li>
                <Link href={`/users/${username}?tab=profile`} className={`rounded-3xl px-3 py-1.5 ${tab === "profile" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                    Profile
                </Link>
            </li>
            <li>
                <Link href={`/users/${username}?tab=activity`} className={`rounded-3xl px-3 py-1.5 ${tab === "activity" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                    Activity
                </Link>
            </li>
            <li>
                <Link href={`/users/${username}?tab=saves`} className={`rounded-3xl px-3 py-1.5 ${tab === "saves" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                    Saves
                </Link>
            </li>
            <li>
                <Link href={`/users/${username}?tab=settings`} className={`rounded-3xl px-3 py-1.5 ${tab === "settings" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                    Settings
                </Link>
            </li>
        </ul>
    )
};

export default NavigationTabs;