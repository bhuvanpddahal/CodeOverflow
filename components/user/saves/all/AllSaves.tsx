"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";

import SavedItem from "./SavedItem";
import Loader from "@/components/Loader";
import PostTabsLink from "../../activity/PostTabsLink";
import PaginationBox from "@/components/PaginationBox";
import { Button } from "@/components/ui/Button";
import {
    SAVED_ITEMS_PER_PAGE,
    userAllSavesTabs
} from "@/constants";
import { AllSavesData } from "@/types/user";
import { getUserSavedItems } from "@/actions/user/getUserSavedItems";

type Sort = "score" | "views" | "newest";

interface AllSavesProps {
    user: {
        id: string;
        username: string;
        watchedTagIds: string[];
        ignoredTagIds: string[];
        savedItemIds: string[];
    } | undefined;
}

const isValidTab = (value: string) => {
    const isValid = userAllSavesTabs.find((tab) => tab.value === value);
    if (!!isValid) return true;
    return false;
};

const AllSaves = ({
    user
}: AllSavesProps) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const sort = searchParams.get("sort") || "score";

    const fetchSavedItems = async () => {
        const payload = { sort: "score" as Sort, page: 1, limit: SAVED_ITEMS_PER_PAGE };
        const data = await getUserSavedItems(payload);
        return data as AllSavesData;
    };

    const {
        data,
        isFetching
    } = useQuery({
        queryKey: ["users", user?.username, "saves", { sort }],
        queryFn: fetchSavedItems
    });

    if (!isValidTab(sort)) return notFound();
    if (isFetching) return <Loader type="half" />
    if (!data) return <div>Something went wrong</div>

    return (
        <div className="flex-1">
            <div className="flex justify-between mb-3">
                <div>
                    <h3 className="text-lg sm:text-xl text-zinc-800 mb-2">All saves</h3>
                    <div className="text-zinc-500 text-xs sm:text-[15px]">{data.totalItems} saved {data.totalItems === 1 ? "item" : "items"}</div>
                </div>
                <div>
                    <Button className="block mb-4 ml-auto">Create a new list</Button>
                    {data.items.length > 0 && (
                        <PostTabsLink
                            tabs={userAllSavesTabs}
                            value={sort}
                            route={`/users/${user?.username}/saves`}
                        />
                    )}
                </div>
            </div>

            {user?.savedItemIds.length ? (
                <ul className="border border-zinc-300 rounded-md mb-4">
                    {data.items.map((item, index) => (
                        <SavedItem
                            key={item.itemId}
                            user={user}
                            item={item}
                            isLast={index === data.items.length - 1}
                        />
                    ))}
                </ul>
            ) : (
                <p className="text-center text-zinc-400 text-[15px] py-10">Add items to display</p>
            )}

            {(user?.savedItemIds && user.savedItemIds.length > 0) && (
                <PaginationBox
                    location={`/users/${user?.username}/saves?sort=${sort}&`}
                    currentPage={Number(page)}
                    lastPage={data?.lastPage}
                />
            )}
        </div>
    )
};

export default AllSaves;