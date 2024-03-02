import Link from "next/link";
import { FaUserAstronaut } from "react-icons/fa";

import SummaryBox from "./SummaryBox";
import SelectActivity from "./SelectActivity";

const ActivitiesTab = () => {
    const username = "username";
    return (
        <>
            <SelectActivity />
            <div className="flex gap-5">
                <ul className="hidden md:inline-block w-[140px] h-fit sticky top-[70px] text-sm text-zinc-600">
                    <li>
                        <Link href={`/users/${username}?tab=summary`} className="block px-4 py-1.5 rounded-3xl hover:bg-zinc-200">
                            Summary
                        </Link>
                    </li>
                    <li>
                        <Link href={`/users/${username}?tab=answers`} className="block px-4 py-1.5 rounded-3xl hover:bg-zinc-200">
                            Answers
                        </Link>
                    </li>
                    <li>
                        <Link href={`/users/${username}?tab=questions`} className="block px-4 py-1.5 rounded-3xl hover:bg-zinc-200">
                            Questions
                        </Link>
                    </li>
                    <li>
                        <Link href={`/users/${username}?tab=tags`} className="block px-4 py-1.5 rounded-3xl hover:bg-zinc-200">
                            Tags
                        </Link>
                    </li>
                    <li>
                        <Link href={`/users/${username}?tab=votes`} className="block px-4 py-1.5 rounded-3xl hover:bg-zinc-200">
                            Votes
                        </Link>
                    </li>
                </ul>

                <div className="flex-1 space-y-4">
                    <div>
                        <h3 className="text-lg sm:text-xl text-zinc-800 mb-2">Summary</h3>
                        <div className="flex flex-col items-center justify-center gap-2 border border-zinc-300 p-5 rounded-md">
                            <FaUserAstronaut className="h-12 w-12 text-zinc-400" />
                            <div className="text-[15px] sm:text-base text-zinc-800">Measure your impact</div>
                            <p className="text-[13px] sm:text-sm text-zinc-600 text-center">Your posts and helpful actions here help hundreds or thousands of people searching for help.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        <SummaryBox
                            title="Answers"
                        />
                        <SummaryBox
                            title="Questions"
                        />
                        <SummaryBox
                            title="Tags"
                        />
                    </div>
                </div>
            </div>
        </>
    )
};

export default ActivitiesTab;