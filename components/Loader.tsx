import { Loader2 } from "lucide-react";

interface LoaderProps {
    type?: "mini" | "half" | "full";
}

const Loader = ({ type = "mini" }: LoaderProps) => {
    return (
        <div className={`flex-1 ${type === "full" ? "h-rem" : type === "half" ? "h-half" : ""} py-10 text-[15px]`}>
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-700" />
        </div>
    )
};

export default Loader;