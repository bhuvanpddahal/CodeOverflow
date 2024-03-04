import Link from "next/link";

import {
    Tabs,
    TabsList,
    TabsTrigger
} from "@/components/ui/Tabs";

interface Tab {
    name: string;
    value: string;
}

interface PostTabsLinkProps {
    tabs: Tab[];
    value: string;
    route: string;
}

const PostTabsLink = ({
    tabs,
    value,
    route
}: PostTabsLinkProps) => {
    return (
        <Tabs defaultValue={value} className="w-fit h-7">
            <TabsList className="border border-zinc-300 h-7">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="text-xs px-2"
                        asChild
                    >
                        <Link href={`${route}&sort=${tab.value}`}>{tab.name}</Link>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
};

export default PostTabsLink;