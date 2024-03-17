import Instruction from "../Instruction";
import QuestionForm from "./QuestionForm";
import { askQuestionInstruction } from "@/constants";
import { createQuestion } from "@/actions/question/createQuestion";

const AskQuestion = () => {
    return (
        <div className="container p-5 md:py-10 md:px-14">
            <header className="mb-3 md:mb-5">
                <h1 className="text-2xl font-semibold text-zinc-800">Ask a public question</h1>
            </header>

            <Instruction instruction={askQuestionInstruction} />

            <QuestionForm
                mutationFn={createQuestion}
                redirectUrl="/home?tab=interesting"
                btnText="Submit your question"
                loadingBtnText="Submitting..."
            />
        </div>
    )
};

export default AskQuestion;