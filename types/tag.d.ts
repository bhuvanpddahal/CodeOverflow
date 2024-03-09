import { Tag } from "@prisma/client";

export type TagData = {
    tags: Tag[],
    lastPage: number
};

export type WatchType = "watch" | "unwatch";
export type IgnoreType = "ignore" | "unignore";

export interface WatchValues {
    type: WatchType;
    tagId: string;
}

export interface IgnoreValues {
    type: IgnoreType;
    tagId: string;
    setWatchersCount?: Dispatch<SetStateAction<number>>;
}