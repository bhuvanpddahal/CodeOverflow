import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/Tooltip";

interface HintProps {
    children: React.ReactNode;
    label: string;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
    width?: number;
}

const Hint = ({
    children,
    label,
    side,
    align,
    sideOffset,
    alignOffset,
    width
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    className={width ? `max-w-[${width}px]` : ""}
                >
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
};

export default Hint;