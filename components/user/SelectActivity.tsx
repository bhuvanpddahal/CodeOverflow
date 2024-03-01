import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";

const SelectActivity = () => {
    return (
        <div className="md:hidden">
            <h2 className="font-semibold text-[15px] sm:text-base text-zinc-800">Navigation</h2>
            <span className="text-zinc-500 text-xs sm:text-[13px] mb-3 -mt-2">View all activity pages</span>
            <Select>
                <SelectTrigger className="w-full text-[15px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent className="text-[15px]">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
};

export default SelectActivity;