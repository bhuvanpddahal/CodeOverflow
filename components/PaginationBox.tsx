import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/Pagination";

interface PaginationBoxProps {
    isFiltering?: boolean;
    location: string;
    currentPage: number;
    lastPage: number | undefined;
}

const PaginationBox = ({
    isFiltering = false,
    location,
    currentPage,
    lastPage
}: PaginationBoxProps) => {
    if(isFiltering) return null;

    return (
        <Pagination className="justify-end">
            <PaginationContent>
                {currentPage > 1 && (
                    <>
                        <PaginationItem title="Go to previous page">
                            <PaginationPrevious href={`${location}page=${currentPage - 1}`} />
                        </PaginationItem>
                        <PaginationItem title="Go to page 1">
                            <PaginationLink href={`${location}page=1`}>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}
                <PaginationItem aria-disabled>
                    <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>
                {lastPage && currentPage < lastPage && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem title={`Go to page ${lastPage}`}>
                            <PaginationLink href={`${location}page=${lastPage}`}>{lastPage}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem title="Go to next page">
                            <PaginationNext href={`${location}page=${currentPage + 1}`} />
                        </PaginationItem>
                    </>
                )}
            </PaginationContent>
        </Pagination>
    )
};

export default PaginationBox;