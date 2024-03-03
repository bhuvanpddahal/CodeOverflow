"use client";

import { useRouter } from "next/navigation";

import { userActivityTabs } from "@/constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/Select";

interface SelectActivityProps {
    username: string;
    activeTab: string;
}

const SelectActivity = ({ username, activeTab }: SelectActivityProps) => {
    const router = useRouter();
    const value = activeTab === "activity" ? "summary" : activeTab;

    const handleValueChange = (tab: string) => {
        router.push(`users/${username}?tab=${tab}`);
    };

    return (
        <div className="md:hidden">
            <h2 className="font-semibold text-[15px] sm:text-base text-zinc-800">Navigation</h2>
            <span className="text-zinc-500 text-xs sm:text-[13px] mb-3 -mt-2">View all activity pages</span>
            <Select value={value} onValueChange={handleValueChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={userActivityTabs[0].name} />
                </SelectTrigger>
                <SelectContent>
                    {userActivityTabs.map((tab) => (
                        <SelectItem key={tab.value} value={tab.value}>
                            {tab.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
};

export default SelectActivity;