import Link from "next/link";

interface SettingsNavProps {
    username: string;
    activeLocation: string;
}

const SettingsNav = ({ username, activeLocation }: SettingsNavProps) => {
    return (
        <ul className="hidden md:inline-block w-[200px] h-fit text-sm text-zinc-600">
            <li>
                <h4 className="text-zinc-800 font-semibold mb-1 text-[13px] px-4">PERSONAL INFORMATION</h4>
                <ul>
                    <li>
                        <Link href={`/users/${username}/edit`} className={`block px-4 py-1.5 rounded-3xl ${activeLocation === "edit" ? "text-zinc-800 bg-blue-100 hover:bg-blue-50" : "hover:bg-zinc-200"}`}>
                            Edit profile
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
    )
};

export default SettingsNav;