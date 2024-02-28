"use client";

import { Dispatch, SetStateAction } from "react";

import { Command, CommandInput } from "./ui/Command";

interface SearchbarProps {
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
}

const Searchbar = ({ input, setInput }: SearchbarProps) => {
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