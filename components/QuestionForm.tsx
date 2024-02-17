import { questionTitle } from "@/constants";
import InputBox from "./InputBox";

const QuestionForm = () => {
    return (
        <div className="mt-5 flex flex-col gap-5">
            <InputBox
                title={questionTitle.title}
                description={questionTitle.description}
                placeholder={questionTitle.placeholder}
            />
        </div>
    )
};

export default QuestionForm;