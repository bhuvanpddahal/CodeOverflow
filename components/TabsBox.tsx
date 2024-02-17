import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/Tabs";
import Link from "next/link";

interface Tab {
    name: string;
    value: string;
}

interface TabsBoxProps {
    route: string;
    tabs: Tab[];
}

const TabsBox = ({ route, tabs }: TabsBoxProps) => {
    return (
        <Tabs defaultValue={tabs[0].value}>
            <TabsList className="border border-zinc-200">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        asChild
                    >
                        <Link href={`${route}?tab=${tab.value}`}>{tab.name}</Link>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
};

export default TabsBox;