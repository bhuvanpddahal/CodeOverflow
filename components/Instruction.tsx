interface InstructionProps {
    instruction: {
        title: string;
        description: string;
        steps: string[];
    }
}

const Instruction = ({ instruction }: InstructionProps) => {
    return (
        <div className="border border-blue-300 rounded-sm w-full max-w-4xl p-5 md:p-7 bg-blue-50">
            <h2 className="text-xl text-slate-600">{instruction.title}</h2>
            <p className="text-zinc-700 mt-2 mb-3">{instruction.description}</p>
            <h3 className="text-sm font-bold text-zinc-800">Steps:</h3>
            <ul className="text-sm ml-2">
                {instruction.steps.map((step) => (
                    <li key={step} className="text-zinc-700">
                        • {step}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Instruction;