import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/Tooltip";

interface HintProps {
    children: React.ReactNode;
    label: string | undefined;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
}

const Hint = ({
    children,
    label,
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
                    >
                        <p className="text-sm text-zinc-700">
                            {label}
                        </p>
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    )
};

export default Hint;