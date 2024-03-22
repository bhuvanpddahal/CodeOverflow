"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import moment from "moment";
import debounce from "lodash.debounce";
import { ImFire } from "react-icons/im";
import { MdCake } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { RiQuestionnaireFill } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";

import Loader from "./Loader";
import UserAvatar from "./UserAvatar";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "./ui/Command";
import { Badge } from "./ui/Badge";
import { SearchQueryData } from "@/types/util";
import { searchQuery } from "@/actions/searchQuery";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavSearchbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [input, setInput] = useState<string>('');
    const commandRef = useRef<HTMLDivElement>(null);

    const {
        data: queryResult,
        refetch,
        isFetched,
        isFetching
    } = useQuery({
        queryFn: async () => {
            if (!input.length) return { questions: [], tags: [], users: [] };
            const payload = { query: input };
            const data = await searchQuery(payload);
            return data as SearchQueryData;
        },
        queryKey: ['search-query'],
        enabled: false
    });

    const request = debounce(() => {
        refetch();
    }, 300);

    const debounceRequest = useCallback(() => {
        request();
    }, []);

    useOnClickOutside(commandRef, () => {
        setInput('');
    });

    useEffect(() => {
        setInput('');
    }, [pathname]);

    return (
        <Command ref={commandRef} className="relative rounded-lg border max-w-lg z-50 overflow-visible">
            <CommandInput
                className="outline-none border-none focus:border-none focus:outline-none ring-0"
                placeholder="Search..."
                value={input}
                onValueChange={(text) => {
                    setInput(text);
                    debounceRequest();
                }}
            />

            {input.length > 0 && (
                <>
                    <CommandList className="absolute bg-white top-full border border-zinc-200 inset-x-0 shadow-md rounded-b-md">
                        {isFetching && <Loader />}
                        {(!isFetching && isFetched && !queryResult?.questions.length && !queryResult?.tags.length && !queryResult?.users.length) && (
                            <div className="text-zinc-400 text-sm text-center py-3">No results found.</div>
                        )}
                        {(!isFetching && (queryResult?.questions.length ?? 0) > 0) && (
                            <CommandGroup heading="Questions">
                                {queryResult?.questions.map((question) => {
                                    const votesAmt = question.votes.reduce((acc, vote) => {
                                        if (vote.type === 'UP') return acc + 1;
                                        if (vote.type === 'DOWN') return acc - 1;
                                        return acc;
                                    }, 0);

                                    return (
                                        <CommandItem
                                            key={question.id}
                                            onSelect={() => {
                                                router.push(`/questions/${question.id}`);
                                                router.refresh();
                                            }}
                                            value={question.title}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="flex-1 line-clamp-1">
                                                {question.title}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <div
                                                    title={question.views.length === 1 ? "1 view" : `${question.views.length} views`}
                                                    className="flex items-center"
                                                >
                                                    <IoMdEye className="text-zinc-400 h-4 w-4 mr-0.5" />
                                                    <span className="text-xs">{question.views.length}</span>
                                                </div>
                                                <div
                                                    title={votesAmt === 1 || votesAmt === -1 ? `${votesAmt} vote` : `${votesAmt} votes`}
                                                    className="flex items-center"
                                                >
                                                    <IoStar className="text-zinc-400 h-4 w-4 mr-0.5" />
                                                    <span className="text-xs">{votesAmt}</span>
                                                </div>
                                            </div>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )}
                        {(!isFetching && (queryResult?.tags.length ?? 0) > 0) && (
                            <CommandGroup heading="Tags">
                                {queryResult?.tags.map((tag) => (
                                    <CommandItem
                                        key={tag.name}
                                        onSelect={() => {
                                            router.push(`/questions/tagged/${tag.name}`);
                                            router.refresh();
                                        }}
                                        value={tag.name}
                                        className="flex justify-between items-center"
                                    >
                                        <Badge variant="secondary">
                                            {tag.name}
                                        </Badge>
                                        <div className="flex items-center gap-1.5">
                                            <div
                                                title={tag.watcherIds.length === 1 ? "1 watcher" : `${tag.watcherIds.length} watchers`}
                                                className="flex items-center"
                                            >
                                                <ImFire className="text-zinc-400 h-4 w-4 mr-0.5" />
                                                <span className="text-xs">{tag.watcherIds.length}</span>
                                            </div>
                                            <div
                                                title={tag.questionIds.length === 1 ? "1 question" : `${tag.questionIds.length} questions`}
                                                className="flex items-center"
                                            >
                                                <RiQuestionnaireFill className="text-zinc-400 h-4 w-4 mr-0.5" />
                                                <span className="text-xs">{tag.questionIds.length}</span>
                                            </div>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        {(!isFetching && (queryResult?.users.length ?? 0) > 0) && (
                            <CommandGroup heading="Users">
                                {queryResult?.users.map((user) => (
                                    <CommandItem
                                        key={user.username}
                                        onSelect={() => {
                                            router.push(`/users/${user.username}`);
                                            router.refresh();
                                        }}
                                        value={user.username}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-1">
                                            <UserAvatar user={{
                                                name: user.name,
                                                image: user.image
                                            }} className='h-6 w-6 rounded-sm'/>
                                            <div>
                                                <p>{user.name}</p>
                                                {user.location && (
                                                    <span className="text-xs">{user.location}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div title={`Member from ${moment(user.createdAt).startOf('seconds').fromNow()}`} className="flex items-center">
                                            <MdCake className="h-5 w-5 text-zinc-400 mr-0.5" />
                                            <span className="text-xs">{moment(user.createdAt).calendar()}</span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </>
            )}
        </Command>
    )
};

export default NavSearchbar;