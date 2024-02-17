import Link from "next/link";

import { Badge } from "@/components/ui/badge"

const Question = () => {
    return (
        <div className="border-t border-zinc-300 pl-4 py-4 flex gap-4">
            <div className="text-[15px] text-right text-zinc-700 w-[110px]">
                <p>-1 votes</p>
                <p>100.6k answers</p>
                <p>16 views</p>
            </div>
            <div className="flex-1">
                <Link href="/" className="text-lg text-blue-700 line-clamp-2 leading-snug hover:text-blue-800">Little Professor fails check50 despite many improvements with help of the duck and my friends. Little Professor fails check50 despite many improvements with help of the duck and my friends</Link>
                <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary">python</Badge>
                    <div className="text-xs text-zinc-700">
                        modified 1 year ago
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Question;