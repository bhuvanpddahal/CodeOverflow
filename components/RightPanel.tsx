import Link from "next/link";
import { GoIssueOpened } from "react-icons/go";
import { LuHeartHandshake } from "react-icons/lu";

const RightPanel = () => {
    return (
        <section className="sticky top-[73px] h-fit w-full lg:w-[300px] px-4 sm:pr-0 lg:px-0">
            <ul className="bg-orange-50 border border-orange-400 rounded-sm">
                <li className="text-zinc-900">
                    <h4 className="text-[13px] font-semibold px-3 py-2 border-b border-amber-500">CONTRIBUTE</h4>
                    <ul className="text-sm px-3 py-2 space-y-1">
                        <li className="flex gap-2">
                            <LuHeartHandshake className="h-6 w-6 text-zinc-800" />
                            <p>
                                Want to contribute to this project? Go to our
                                <Link
                                    href="https://github.com/BhuvanPdDahal/CodeOverflow"
                                    className='text-blue-700 ml-1 hover:text-blue-800'
                                >github repo</Link>.
                            </p>
                        </li>
                        <li className="flex gap-2">
                            <GoIssueOpened className="h-5 w-5 text-zinc-800" />
                            <p>
                                Have an issue with the project? Create an issue
                                <Link
                                    href="https://github.com/BhuvanPdDahal/CodeOverflow/issues/new"
                                    className='text-blue-700 ml-1 hover:text-blue-800'
                                >here</Link>.
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    )
};

export default RightPanel;