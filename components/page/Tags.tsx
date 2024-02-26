import Link from "next/link";

import TabsBox from "../TabsBox";
import Searchbar from "../Searchbar";
import PaginationBox from "../PaginationBox";
import { Badge } from "../ui/Badge";
import { tagsTabs } from "@/constants";

const Tags = () => {
    return (
        <section className="flex-1 p-4">
            <header>
                <h1 className="text-2xl font-medium text-zinc-800">Tags</h1>
                <p className="text-[15px] text-zinc-800 my-3 max-w-2xl">A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
            </header>

            <div className="flex items-center justify-between mb-3">
                <Searchbar />
                <TabsBox
                    route="/tags"
                    tabs={tagsTabs}
                />
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-px mb-3">
                <li className="border border-zinc-300 p-3 rounded-sm">
                    <Link href="/questions/tagged/javascript">
                        <Badge variant="secondary">javascript</Badge>
                    </Link>
                    <p className="text-sm text-zinc-700 my-3 line-clamp-4">A static library of object code in UNIX/Linux that can be used by the link editor to create an executable program.</p>
                    <div className="flex justify-between gap-3 text-[13px] text-zinc-500">
                        <span>25258314659 questions</span>
                        <span>161 asked today, 1494 this week</span>
                    </div>
                </li>
                <li className="border border-zinc-300 p-3 rounded-sm">
                    <Link href="/questions/tagged/javascript">
                        <Badge variant="secondary">javascript</Badge>
                    </Link>
                    <p className="text-sm text-zinc-700 my-3 line-clamp-4">A static library of object code in UNIX/Linux that can be used by the link editor to create an executable program.</p>
                    <div className="flex justify-between gap-3 text-[13px] text-zinc-500">
                        <span>25258314659 questions</span>
                        <span>161 asked today, 1494 this week</span>
                    </div>
                </li>
                <li className="border border-zinc-300 p-3 rounded-sm">
                    <Link href="/questions/tagged/javascript">
                        <Badge variant="secondary">javascript</Badge>
                    </Link>
                    <p className="text-sm text-zinc-700 my-3 line-clamp-4">A static library of object code in UNIX/Linux that can be used by the link editor to create an executable program.</p>
                    <div className="flex justify-between gap-3 text-[13px] text-zinc-500 mt-auto">
                        <span>25258314659 questions</span>
                        <span>161 asked today, 1494 this week</span>
                    </div>
                </li>
                <li className="border border-zinc-300 p-3 rounded-sm">
                    <Link href="/questions/tagged/javascript">
                        <Badge variant="secondary">javascript</Badge>
                    </Link>
                    <p className="text-sm text-zinc-700 my-3 line-clamp-4">A static library of object.</p>
                    <div className="flex justify-between gap-3 text-[13px] text-zinc-500 mt-auto">
                        <span>25258314659 questions</span>
                        <span>161 asked today, 1494 this week</span>
                    </div>
                </li>
                <li className="border border-zinc-300 p-3 rounded-sm">
                    <Link href="/questions/tagged/javascript">
                        <Badge variant="secondary">javascript</Badge>
                    </Link>
                    <p className="text-sm text-zinc-700 my-3 line-clamp-4">A static library of object code in UNIX/Linux that can be used by A static library of object code in UNIX/Linux that can be used by the link editor to create an executable program.</p>
                    <div className="flex justify-between gap-3 text-[13px] text-zinc-500">
                        <span>25258314659 questions</span>
                        <span>161 asked today, 1494 this week</span>
                    </div>
                </li>
                <li className="border border-zinc-300 p-3 rounded-sm">
                    <Link href="/questions/tagged/javascript">
                        <Badge variant="secondary">javascript</Badge>
                    </Link>
                    <p className="text-sm text-zinc-700 my-3 line-clamp-4">A static library of object code in UNIX/Linux that can be used by the link editor to create an executable program.</p>
                    <div className="flex justify-between gap-3 text-[13px] text-zinc-500">
                        <span>25258314659 questions</span>
                        <span>161 asked today, 1494 this week</span>
                    </div>
                </li>
                <li className="border border-zinc-300 p-3 rounded-sm">
                    <Link href="/questions/tagged/javascript">
                        <Badge variant="secondary">javascript</Badge>
                    </Link>
                    <p className="text-sm text-zinc-700 my-3 line-clamp-4">A static library of object code in UNIX/Linux that can be used by the link editor to create an executable program.</p>
                    <div className="flex justify-between gap-3 text-[13px] text-zinc-500">
                        <span>25258314659 questions</span>
                        <span>161 asked today, 1494 this week</span>
                    </div>
                </li>
            </ul>

            <PaginationBox />
        </section>
    )
}

export default Tags;