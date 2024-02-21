import Link from "next/link";
import {
    IoMdArrowDropdown,
    IoMdArrowDropup
} from "react-icons/io";

import UserAvatar from "../UserAvatar";

const Answer = () => (
    <li className="flex-1 flex gap-4">
        <div className="flex flex-col items-center gap-3">
            <IoMdArrowDropup
                className="h-4 w-4 border border-zinc-200 rounded-full"
                size="16px"
            />
            <p className="text-xl font-bold text-zinc-900">24</p>
            <IoMdArrowDropdown
                className="h-4 w-4"
            />
        </div>
        <div className="flex-1">
            <div className="text-[15px] text-zinc-800">
                <p>So I'm trying to get Visual Studio Code to provide me with its intellisense for my AngularJs (not Angular) app's services. I managed to get the standard type for angular (now when I type "angular." it suggests stuff like module, etc). That works and it's great, however I can't find a way to get it to work with my services (or factories). I know, it's not that easy for an IDE to figure the code that comes through dependency injection, etc.</p>
            </div>
            <div className="bg-zinc-100 max-w-[200px] p-3 rounded-sm ml-auto mt-2">
                <p className="text-xs text-zinc-700 mb-1">answered 1 minute ago</p>
                <Link
                    href={`/users/prachu`}
                    className="flex items-center gap-1"
                >
                    <UserAvatar user={{
                        name: "prachu",
                        image: ""
                    }} className='h-8 w-8' />
                    <p className="text-xs text-blue-700 hover:text-blue-800">prachu</p>
                </Link>
            </div>
        </div>
    </li>
);

const Answers = () => {
    return (
        <ul className="space-y-5">
            <Answer />
            <Answer />
            <Answer />
            <Answer />
        </ul>
    )
};

export default Answers;