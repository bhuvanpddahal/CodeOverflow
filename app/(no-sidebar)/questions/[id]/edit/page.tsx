import EditQuestion from "@/components/question/EditQuestion";

interface PageProps {
    params: {
        id: string;
    }
}

const Page = ({ params: { id } }: PageProps) => {
    return (
        <div className="bg-zinc-100 min-h-screen w-full">
            <EditQuestion id={id} />
        </div>
    )
};

export default Page;