"use client";

import {
    KeyboardEvent,
    useCallback,
    useRef,
    useState
} from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { IoIosClose } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";

import { Badge } from "./ui/Badge";
import { TagData } from "@/types/tag";
import { getTagsByName } from "@/actions/getTagsByName";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import Link from "next/link";

interface ChipInputProps {
    placeholder: string;
    disabled: boolean;
    onChange: (chips: string[]) => void;
    initialValue: string[];
}

const ChipInput = ({
    placeholder,
    disabled,
    onChange,
    initialValue
}: ChipInputProps) => {
    const router = useRouter();
    const tagsRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [chips, setChips] = useState<string[]>(initialValue);
    const [showTags, setShowTags] = useState<boolean>(true);

    const fetchTags = async () => {
        const payload = { name: inputRef.current?.value || "" };
        const data = await getTagsByName(payload);
        setShowTags(true);
        return data as TagData;
    };

    const {
        data,
        refetch,
        isFetched
    } = useQuery({
        queryFn: fetchTags,
        queryKey: ['search-tags'],
        enabled: false
    });

    const request = debounce(() => {
        if(inputRef.current?.value.trim()) {
            refetch();
        }
    }, 300);

    const debounceRequest = useCallback(() => {
        request();
    }, []);

    useOnClickOutside(tagsRef, () => {
        setShowTags(false);
    });

    const handleTagClick = (name: string) => {
        const chipAlreadyExists = chips.find((chip) => chip === name);
        if (!chipAlreadyExists) {
            onChange([...chips, name]);
            setChips((prev) => [...prev, name]);
        }
        setShowTags(false);
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // If the space or the enter key is clicked
        if (e.key === " " || e.key === "Enter") {
            if (inputRef.current) {
                const newChip = inputRef.current.value.trim();
                const chipAlreadyExists = chips.find((chip) => chip === newChip);
                if (newChip && !chipAlreadyExists) {
                    onChange([...chips, newChip]);
                    setChips((prev) => [...prev, newChip]);
                    setShowTags(false);
                }
                inputRef.current.value = "";
            }
        }
    };

    const handleClick = (chip: string) => {
        const updatedChips = chips.filter((tag) => tag !== chip);
        onChange(updatedChips);
        setChips(updatedChips);
    };

    return (
        <div className="relative">
            <ul
                className="chip-input flex h-11 w-full items-center gap-2 bg-white rounded-md border border-input overflow-x-auto px-2 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => inputRef.current?.focus()}
            >
                {chips.map((chip, index) => (
                    <li
                        key={index}
                        className="bg-blue-100 flex items-center gap-1 rounded-sm px-1.5 py-1 text-[13px] font-medium"
                    >
                        {chip}
                        <IoIosClose
                            className="h-5 w-5 text-blue-800 rounded-sm hover:text-white cursor-pointer hover:bg-blue-600"
                            onClick={() => handleClick(chip)}
                        />
                    </li>
                ))}

                <input
                    ref={inputRef}
                    type="text"
                    placeholder={chips.length ? "" : placeholder}
                    className={`flex-1 outline-0 border-0 ${chips.length ? "" : "px-1"}`}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    onChange={() => debounceRequest()}
                />
            </ul>

            {showTags && (
                <ul ref={tagsRef} className="absolute bg-white left-0 right-0 top-full grid grid-cols-2 sm:grid-cols-3 p-1 z-30 shadow rounded-b-md">
                    {data?.tags.length ? (
                        data.tags.map((tag) => (
                            <li
                                key={tag.id}
                                className="p-2 rounded-sm select-none cursor-pointer hover:bg-zinc-100"
                                onClick={() => handleTagClick(tag.name)}
                            >
                                <Link href={`/questions/tagged/${tag.name}`}>
                                    <Badge variant="secondary">{tag.name}</Badge>
                                </Link>
                                <p className="text-xs pt-2 line-clamp-4 text-zinc-900">{tag.description ? tag.description : ""}</p>
                            </li>
                        ))
                    ) : (
                        <div className="text-zinc-400 text-sm text-center col-span-4 py-3">No tags found</div>
                    )}
                </ul>
            )}
        </div>
    )
};

export default ChipInput;