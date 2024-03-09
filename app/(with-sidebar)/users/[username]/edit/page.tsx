import UserProfile from "@/components/user/UserProfile";

interface PageProps {
    params: {
        username: string;
    }
}

const Page = ({ params: { username } }: PageProps) => {
    return (
        <UserProfile
            activeTab="settings"
            username={decodeURIComponent(username)}
        />
    )
};

export default Page;