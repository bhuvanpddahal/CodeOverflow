import Link from "next/link";

const SavesNav = () => {
    const activeLocation = "all";
    return (
        <ul className="hidden md:inline-block w-[200px] h-fit text-sm text-zinc-600">
            <li>
                <ul>
                    <li>
                        <Link href={`/users/${"username"}/saves`} className={`block px-4 py-1.5 rounded-3xl ${activeLocation === "all" ? "text-white bg-amber-600 hover:bg-amber-800" : "hover:bg-zinc-200"}`}>
                            All saves
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
    )
};

export default SavesNav;