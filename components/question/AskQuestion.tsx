import Instruction from "../Instruction";
import { askQuestionInstruction } from "@/constants";
import QuestionForm from "./QuestionForm";

const AskQuestion = () => {
    return (
        <div className="bg-zinc-100 p-5 md:py-10 md:px-14">
            <header className="mb-3 md:mb-5">
                <h1 className="text-2xl font-semibold text-zinc-800">Ask a public question</h1>
            </header>

            <Instruction instruction={askQuestionInstruction} />

            <QuestionForm />
        </div>
    )
};

export default AskQuestion;