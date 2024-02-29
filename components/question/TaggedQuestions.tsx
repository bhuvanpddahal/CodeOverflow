import Link from "next/link";

import TabsBox from "../TabsBox";
import { homeTabs } from "@/constants";
import { buttonVariants } from "../ui/Button";
import PaginationBox from "../PaginationBox";

const TaggedQuestions = () => {
    return (
        <div className="flex-1 flex flex-col lg:flex-row gap-4 py-4 pr-4">
            <section className="flex-1">
                <div className="pl-4">
                    <header className="">
                        <div className="flex items-enter justify-between">
                            <h1 className="text-xl sm:text-2xl font-medium text-zinc-800">Questions tagged [javascript]</h1>
                            <Link href="/questions/ask" className={buttonVariants()}>Ask Question</Link>
                        </div>
                        <p className="text-[13px] sm:text-sm text-zinc-900 mt-4">Structured Query Language (SQL) is a language for querying databases. Questions should include code examples, table structure, sample data, and a tag for the DBMS implementation (e.g. MySQL, PostgreSQL, Oracle, MS SQL Server, IBM DB2, etc.) being used. If your question relates solely to a specific DBMS (uses specific extensions/features), use that DBMS's tag instead. Answers to questions tagged with SQL should use ISO/IEC standard SQL.</p>
                    </header>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between my-4">
                        <p className="text-base sm:text-lg text-zinc-900 mb-2 sm:mb-0">669,882 questions</p>
                        <TabsBox
                            route="/questions/tagged/javascript"
                            tabs={homeTabs}
                            value="interesting"
                        />
                    </div>
                </div>

                {/* <Questions
                    questions={questions}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                /> */}

                <PaginationBox />
            </section>

            <section className="w-full lg:w-[300px] ml-4 lg:ml-0 border border-zinc-300 rounded-sm">
                Hello world
            </section>
        </div>
    )
};

export default TaggedQuestions;