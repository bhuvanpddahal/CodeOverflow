import QuestionDetails from "@/components/question/QuestionDetails";

interface PageProps {
    params: {
        id: string;
    }
}

const Page = ({ params: { id } }: PageProps) => {
    return (
        <QuestionDetails id={id} />
    )
};

export default Page;