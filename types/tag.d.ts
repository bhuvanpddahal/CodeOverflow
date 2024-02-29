import { Tag } from "@prisma/client";

export type TagData = {
    tags: Tag[],
    lastPage: number
};