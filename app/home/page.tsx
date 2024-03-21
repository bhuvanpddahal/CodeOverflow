"use client";

import Home from '@/components/page/Home';
import Landing from '@/components/Landing';
import Sidebar from '@/components/Sidebar';
import { useCurrentUser } from '@/hooks/use-current-user';

const Page = () => {
    const user = useCurrentUser();

    if(user && user.id) return (
        <div className="container px-0 sm:px-2 md:px-8 flex">
            <Sidebar />
            <Home />
        </div>
    )
    return <Landing />
};

export default Page;