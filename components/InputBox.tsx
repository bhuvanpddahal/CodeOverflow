import { Input } from "./ui/Input";

interface InputBoxProps {
    title: string;
    description: string;
    placeholder: string;
}

const InputBox = ({
    title,
    description,
    placeholder
}: InputBoxProps) => {
    return (
        <div className="border border-zinc-200 bg-white p-6 rounded-sm">
            <h3 className="font-bold text-zinc-800">{title}</h3>
            <p className="text-[13px] text-zinc-600 mb-1">{description}</p>
            <Input
                placeholder={placeholder}
            />
        </div>
    )
};

export default InputBox;