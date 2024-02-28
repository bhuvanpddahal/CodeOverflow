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

import { TagData } from "@/types/tag";
import { getTags } from "@/actions/getTags";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "./ui/Command";

interface ChipInputProps {
    placeholder: string;
    disabled: boolean;
    onChange: (chips: string[]) => void;
}

const ChipInput = ({
    placeholder,
    disabled,
    onChange
}: ChipInputProps) => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const commandRef = useRef<HTMLDivElement>(null);
    const [chips, setChips] = useState<string[]>([]);

    const fetchTags = async () => {
        const payload = { name: inputRef.current?.value || "" };
        const data = await getTags(payload);
        console.log('Inside fetch tags: ', data);
        
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
        refetch();
    }, 300);

    const debounceRequest = useCallback(() => {
        request();
    }, []);

    useOnClickOutside(commandRef, () => {
        if(inputRef.current) inputRef.current.value = "";
    });


    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // If the space or the enter key is clicked
        if(e.key === " " || e.key === "Enter") {
            if(inputRef.current) {
                const newChip = inputRef.current.value.trim();
                const chipAlreadyExists = chips.find((chip) => chip === newChip);
                if(newChip && !chipAlreadyExists) {
                    onChange([...chips, newChip]);
                    setChips((prev) => [...prev, newChip]);
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
        <Command ref={commandRef}>
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

            {inputRef.current?.value.length && (
                <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
                    {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
                    {data?.tags.length && (
                        <CommandGroup heading="Tags">
                            {data.tags.map((tag) => (
                                <CommandItem
                                    key={tag.id}
                                    onSelect={(e) => {
                                        router.push(`/questions/tagged/${tag.name}`);
                                        router.refresh();
                                    }}
                                    value={tag.name}
                                >
                                    {tag.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            )}
        </Command>
    )
};

export default ChipInput;