"use client";

import { KeyboardEvent, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";

interface ChipInputProps {
    placeholder: string;
    disabled: boolean;
}

const ChipInput = ({
    placeholder,
    disabled
}: ChipInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [chips, setChips] = useState<string[]>([]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // If the space or the enter key is clicked
        if(e.key === " " || e.key === "Enter") {
            if(inputRef.current) {
                const newChip = inputRef.current.value.trim();
                const chipAlreadyExists = chips.find((chip) => chip === newChip);
                if(newChip && !chipAlreadyExists) {
                    setChips((prev) => [...prev, newChip]);
                }
                inputRef.current.value = "";
            }
        }
    };

    const handleClick = (chip: string) => {
        const updatedChips = chips.filter((tag) => tag !== chip);
        setChips(updatedChips);
    };

    return (
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
                className="flex-1 outline-0 border-0"
                onKeyDown={handleKeyDown}
                disabled={disabled}
            />
        </ul>
    )
};

export default ChipInput;