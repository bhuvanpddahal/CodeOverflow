import TaggedQuestions from "@/components/question/TaggedQuestions";

interface PageProps {
    params: {
        name: string;
    }
}

const Page = ({ params: { name } }: PageProps) => {
    return (
        <TaggedQuestions name={name} />
    )
};

export default Page;