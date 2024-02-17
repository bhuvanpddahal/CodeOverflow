import Question from "./Question";

const questions = [1, 2, 3, 4, 5, 6];

const Questions = () => {
    return (
        <div>
            {questions.map((question) => (
                <Question
                    key={question}
                />
            ))}
        </div>
    )
};

export default Questions;