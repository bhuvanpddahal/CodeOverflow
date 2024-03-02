import React, { Dispatch, SetStateAction } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/Select";

interface Option {
    name: string;
    value: string;
}

interface SelectOptionsProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    options: Option[];
    className?: string;
}

const SelectOptions = ({
    value,
    setValue,
    options,
    className = "w-[240px]"
}: SelectOptionsProps) => {
    return (
        <Select value={value} onValueChange={(value) => setValue(value)}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={options[0].name} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
};

export default SelectOptions;