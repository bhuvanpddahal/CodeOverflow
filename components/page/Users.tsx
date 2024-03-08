"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";

import Loader from "../Loader";
import TabsBox from "../TabsBox";
import Searchbar from "../Searchbar";
import UserAvatar from "../UserAvatar";
import PaginationBox from "../PaginationBox";
import { UserData } from "@/types/user";
import { getUsers } from "@/actions/user/getUsers";
import { GetUsersPayload } from "@/lib/validators/user";
import { USERS_PER_PAGE, usersTabs } from "@/constants";

type Tab = "mature" | "new-users" | "voters";

const isValidTab = (value: string) => {
    const isValid = usersTabs.find((tab) => tab.value === value);
    if (!!isValid) return true;
    return false;
};

const Users = () => {
    const [input, setInput] = useState("");
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const tab = searchParams.get("tab") || "mature";

    const fetchUsers = async () => {
        if (isValidTab(tab)) {
            const payload: GetUsersPayload = { tab: tab as Tab, page: Number(page), limit: USERS_PER_PAGE };
            const data = await getUsers(payload);
            return data as UserData;
        } else {
            throw new Error("Invalid tab");
        }
    };

    const {
        data,
        isFetching
    } = useQuery({
        queryKey: ["users", { tab, page }],
        queryFn: fetchUsers
    });

    if (!isValidTab(tab)) return notFound();

    return (
        <section className="flex-1 p-4">
            <header>
                <h1 className="text-2xl font-medium text-zinc-800 mb-3">Users</h1>
            </header>

            <div className="flex items-center justify-between mb-8">
                <Searchbar
                    input={input}
                    setInput={setInput}
                    placeholder="Filter by name"
                />
                <TabsBox
                    route="/users"
                    tabs={usersTabs}
                    value={tab}
                />
            </div>

            {isFetching ? (
                <Loader type="half" />
            ) : (
                data?.users && data.users.length ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-px mb-3">
                        {data.users.map((user) => {
                            if(user.name.includes(input)) {
                                return (
                                    <li className="flex gap-2">
                                        <Link href={`/users/${user.username}`}>
                                            <UserAvatar user={{
                                                name: user.name,
                                                image: user.image
                                            }} className='h-12 w-12 rounded-md' />
                                        </Link>
                                        <div>
                                            <Link
                                                href={`/users/${user.username}`}
                                                className="text-[15px] text-blue-700 hover:text-blue-800"
                                            >
                                                {user.name}
                                            </Link>
                                            <p className="text-[13px] text-zinc-600">France</p>
                                            <div className="text-[13px] text-blue-700 hover:text-blue-800">
                                                git, github, docker
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                            return null;
                        })}
                    </ul>
                ) : (
                    <div className="text-center text-zinc-400 text-[15px] py-10">No users to show</div>
                )
            )}

            {data?.users && (
                <PaginationBox
                    isFiltering={input.length > 0}
                    location={`/users?tab=${tab}&`}
                    currentPage={Number(page)}
                    lastPage={data?.lastPage}
                />
            )}
        </section>
    )
};

export default Users;