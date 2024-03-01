import { User } from "@prisma/client";

export type UserData = {
    users: User[],
    lastPage: number
};