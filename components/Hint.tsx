import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/Tooltip";

interface HintProps {
    label: string | undefined;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
}

const Hint = ({
    label,
    children,
    side,
    align,
    sideOffset,
    alignOffset
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                {label && (
                    <TooltipContent
                        side={side}
                        align={align}
                        sideOffset={sideOffset}
                        alignOffset={alignOffset}
                        className="text-sm text-zinc-700 w-fit px-3 py-2"
                    >
                        {label}
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    )
};

export default Hint;