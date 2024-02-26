"use client";

import { useState } from "react";

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "./ui/Command";

const Searchbar = () => {
    const [input, setInput] = useState<string>('');

    return (
        <Command className="relative w-[250px] shrink rounded-lg border max-w-xl overflow-visible">
            <CommandInput
                className="outline-none border-none focus:border-none focus:outline-none ring-0 py-2"
                placeholder="Filter by tag name"
                value={input}
                onValueChange={(text) => {
                    setInput(text);
                }}
            />
        </Command>
    )
};

export default Searchbar;