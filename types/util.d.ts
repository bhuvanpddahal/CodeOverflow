import { VoteType } from "./user";
import { Question, Tag, User } from "@prisma/client";

export interface InfiniteQueryFnProps {
    pageParam: number;
}

type SearchQueryQuestion = {
    id: string,
    title: string,
    views: string[],
    votes: {
        type: VoteType
    }[]
};

type SearchQueryTag = {
    name: string,
    watcherIds: string[],
    questionIds: string[]
};

type SearchQueryUser = {
    name: string,
    username: string,
    image: string | null,
    location: string | null,
    createdAt: Date
};

export type SearchQueryData = {
    questions: SearchQueryQuestion[],
    tags: SearchQueryTag[],
    users: SearchQueryUser[]
};