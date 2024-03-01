import Link from "next/link";

interface SummaryBoxProps {
    title: string;
}

const SummaryBox = ({
    title
}: SummaryBoxProps) => {
    return (
        <div>
            <div>
                <h3 className="text-lg sm:text-xl text-zinc-800 mb-2">{title}</h3>
            </div>
            {/* <p className="border border-zinc-300 text-[15px] p-4 rounded-md text-center">
                You have not answered any questions
            </p> */}
            <ul className="border border-zinc-300 rounded-md">
                <li className="flex items-center gap-3 border-b border-zinc-300 p-3">
                    <Link href="/questions/id" className="flex-1 line-clamp-1 text-[15px] sm:text-base text-blue-700 hover:text-blue-800">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi recusandae ut amet illum doloremque. Laudantium numquam rem, nobis ratione, cupiditate cumque inventore magni nemo, fuga commodi minima reiciendis aliquam beatae?
                    </Link>
                    <span className="text-sm sm:text-[15px] text-zinc-600">Jul 27, 2011</span>
                </li>
                <li className="flex items-center gap-3 border-b border-zinc-300 p-3">
                    <Link href="/questions/id" className="flex-1 line-clamp-1 text-[15px] sm:text-base text-blue-700 hover:text-blue-800">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi recusandae ut amet illum doloremque. Laudantium numquam rem, nobis ratione, cupiditate cumque inventore magni nemo, fuga commodi minima reiciendis aliquam beatae?
                    </Link>
                    <span className="text-sm sm:text-[15px] text-zinc-600">Jul 27, 2011</span>
                </li>
                <li className="flex items-center gap-3 border-b border-zinc-300 p-3">
                    <Link href="/questions/id" className="flex-1 line-clamp-1 text-[15px] sm:text-base text-blue-700 hover:text-blue-800">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi recusandae ut amet illum doloremque. Laudantium numquam rem, nobis ratione, cupiditate cumque inventore magni nemo, fuga commodi minima reiciendis aliquam beatae?
                    </Link>
                    <span className="text-sm sm:text-[15px] text-zinc-600">Jul 27, 2011</span>
                </li>
                <li className="flex items-center gap-3 p-3">
                    <Link href="/questions/id" className="flex-1 line-clamp-1 text-[15px] sm:text-base text-blue-700 hover:text-blue-800">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi recusandae ut amet illum doloremque. Laudantium numquam rem, nobis ratione, cupiditate cumque inventore magni nemo, fuga commodi minima reiciendis aliquam beatae?
                    </Link>
                    <span className="text-sm sm:text-[15px] text-zinc-600">Jul 27, 2011</span>
                </li>
            </ul>
        </div>
    )
};

export default SummaryBox;