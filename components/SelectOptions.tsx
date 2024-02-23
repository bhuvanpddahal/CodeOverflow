import { Dispatch, SetStateAction } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/Select";
import {
    AnswersSortOptions,
    AnswersSortValue
} from "@/types/answer";

interface SelectOptionsProps {
    value: AnswersSortValue;
    setValue: Dispatch<SetStateAction<AnswersSortValue>>;
    options: AnswersSortOptions;
}

const SelectOptions = ({
    value,
    setValue,
    options
}: SelectOptionsProps) => {
    return (
        <Select value={value} onValueChange={(value) => setValue(value as AnswersSortValue)}>
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