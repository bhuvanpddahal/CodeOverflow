"use client";

import Link from 'next/link';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import {
    RiUserLine,
    RiLogoutBoxRLine,
    RiQuestionLine,
    RiSettings3Line
} from "react-icons/ri";

import UserAvatar from "./UserAvatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/DropdownMenu";

interface UserAccountNavProps {
    user: (User & {
        username: string;
    });
}

const UserAccountNav = ({ user }: UserAccountNavProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="h-full">
                <div className="h-full px-1.5 flex items-center rounded-sm cursor-pointer hover:bg-zinc-200">
                    <UserAvatar user={{
                        name: user.name,
                        image: user.image
                    }} className='h-8 w-8 rounded-md' title={user.name || undefined} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white' align='end'>
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && <p className='font-medium text-[15px]'>{user.name}</p>}
                        {user.email && <p className='font-medium w-[200px] truncate text-sm text-zinc-700'>{user.email}</p>}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href={`/users/${user.username}`} className='flex items-center gap-2'>
                        <RiUserLine className='h-4 w-4 text-zinc-600' />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/questions/ask' className='flex items-center gap-2'>
                        <RiQuestionLine className='h-4 w-4 text-zinc-600' />
                        Ask question
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/users/${user.username}/edit`} className='flex items-center gap-2'>
                        <RiSettings3Line className='h-4 w-4 text-zinc-600' />
                        Settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault();
                    signOut({
                        callbackUrl: `${window.location.origin}/log-in`
                    });
                }} className='cursor-pointer flex items-center gap-2'>
                    <RiLogoutBoxRLine className='h-4 w-4 text-zinc-600' />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
};

export default UserAccountNav;