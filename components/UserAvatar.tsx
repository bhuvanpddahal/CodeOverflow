import Image from 'next/image';
import { User } from 'next-auth';
import { AvatarProps } from '@radix-ui/react-avatar';
import { FaUser } from 'react-icons/fa';

import {
    Avatar,
    AvatarFallback
} from "./ui/Avatar";

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, 'name' | 'image'>;
    size?: "sm" | "default";
}

const UserAvatar = ({ user, size, ...props }: UserAvatarProps) => {
    return (
        <Avatar {...props}>
            {user?.image ? (
                <div className="relative aspect-squareh-full w-full">
                    <Image
                        fill
                        src={user.image}
                        alt='profile picture'
                        referrerPolicy='no-referrer'
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span className='sr-only'>{user?.name}</span>
                    <FaUser />
                </AvatarFallback>
            )}
        </Avatar>

    )
};

export default UserAvatar;