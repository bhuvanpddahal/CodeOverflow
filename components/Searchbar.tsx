"use client";

import { useRef, useState } from "react";
import { CommandEmpty } from "cmdk";

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "./ui/Command";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const Searchbar = () => {
    const [input, setInput] = useState<string>('');
    const commandRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(commandRef, () => {
        setInput('');
    });

    return (
        <Command ref={commandRef} className="relative rounded-lg border max-w-xl z-50 overflow-visible">
            <CommandInput
                className="outline-none border-none focus:border-none focus:outline-none ring-0 py-2"
                placeholder="Search..."
                value={input}
                onValueChange={(text) => {
                    setInput(text);
                }}
            />

            {input.length > 0 && (
                <CommandList className="absolute bg-white top-full inset-x-0  shadow rounded-b-md">
                    <CommandEmpty>No results found.</CommandEmpty>
                </CommandList>
            )}
        </Command>
    )
};

export default Searchbar;