import Saves from "@/components/page/Saves";

interface PageProps {
    params: {
        username: string;
    }
}

const Page = ({ params: { username } }: PageProps) => {
    return (
        <Saves username={username} />
    )
};

export default Page;