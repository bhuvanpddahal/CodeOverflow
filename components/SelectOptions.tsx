import { Dispatch, SetStateAction } from "react";
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

interface SelectOptionsProps {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    options: Option[];
}

const SelectOptions = ({
    value,
    setValue,
    options
}: SelectOptionsProps) => {
    return (
        <Select value={value} onValueChange={(value) => setValue(value)}>
            <SelectTrigger className="w-[240px]">
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