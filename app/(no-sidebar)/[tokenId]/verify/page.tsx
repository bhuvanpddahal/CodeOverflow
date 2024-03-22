import VerifyEmail from "@/components/auth/VerifyEmail";

interface PageProps {
    params: {
        tokenId: string;
    }
}

const Page = ({ params: { tokenId } }: PageProps) => {
    return (
        <VerifyEmail tokenId={tokenId} />
    )
};

export default Page;