"use client";

import { userActivityTabs } from "@/constants";
import SelectOptions from "../SelectOptions";
import { useState } from "react";

const SelectActivity = () => {
    const [value, setValue] = useState("summary");
    
    return (
        <div className="md:hidden">
            <h2 className="font-semibold text-[15px] sm:text-base text-zinc-800">Navigation</h2>
            <span className="text-zinc-500 text-xs sm:text-[13px] mb-3 -mt-2">View all activity pages</span>
            <SelectOptions
                options={userActivityTabs}
                value={value}
                setValue={setValue}
                className="w-full"
            />
        </div>
    )
};

export default SelectActivity;