"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import TabsBox from "./TabsBox";
import Questions from "./Questions";
import { buttonVariants } from "./ui/Button";
import { homeTabs } from "@/constants";

const Home = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");
    console.log(tab);
    

    return (
        <div className="flex-1 flex flex-col lg:flex-row gap-4 py-4 pr-4">
            <section className="flex-1">
                <div className="pl-4">
                    <header className="flex items-enter justify-between">
                        <h1 className="text-2xl font-medium text-zinc-800">Top Questions</h1>
                        <Link href="/questions/ask" className={buttonVariants()}>Ask Question</Link>
                    </header>
                    <div className="flex justify-end my-4">
                        <TabsBox
                            route="/home"
                            tabs={homeTabs}
                        />
                    </div>
                </div>

                <Questions />
            </section>

            <section className="w-full lg:w-[300px] border border-zinc-300 rounded-sm">
                Hello world
            </section>
        </div>
    )
};

export default Home;