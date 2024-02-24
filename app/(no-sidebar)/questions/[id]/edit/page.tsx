import Footer from "@/components/Footer";
import EditQuestion from "@/components/question/EditQuestion";

interface PageProps {
    params: {
        id: string;
    }
}

const Page = ({ params: { id } }: PageProps) => {
    return (
        <>
            <EditQuestion id={id} />
            <Footer />
        </>
    )
};

export default Page;