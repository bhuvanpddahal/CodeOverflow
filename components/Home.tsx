import Link from "next/link";

import TabsBox from "./TabsBox";
import { buttonVariants } from "./ui/Button";
import { homeTabs } from "@/constants";
import Questions from "./Questions";

const Home = () => {
    return (
        <div className="flex-1 flex gap-4 py-4 pr-4">
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

            <section className="w-[300px] bg-red-400">

            </section>
        </div>
    )
};

export default Home;