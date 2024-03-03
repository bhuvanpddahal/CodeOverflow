import { Dispatch, SetStateAction } from "react";

import {
    Tabs,
    TabsList,
    TabsTrigger
} from "@/components/ui/Tabs";

interface Tab {
    name: string;
    value: string;
}

interface PostTabsProps {
    tabs: Tab[];
    value: string;
    setTab: Dispatch<SetStateAction<string>>;
}

const PostTabs = ({
    tabs,
    value,
    setTab
}: PostTabsProps) => {
    return (
        <Tabs defaultValue={value} onValueChange={(value) => setTab(value)} className="w-fit h-7">
            <TabsList className="border border-zinc-300 h-7">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="text-xs px-2"
                    >
                        {tab.name}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
};

export default PostTabs;