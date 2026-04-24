import React from "react";

const Pagination = ({
                        currentPage: externalCurrentPage,
                        initialPage = 1,
                        maxPage = null,
                        onPageSelect
                    }) => {
    const [internalCurrentPage, setInternalCurrentPage] =
        React.useState(initialPage);

    const currentPage =
        externalCurrentPage ?? internalCurrentPage;

    const updateCurrentPage = (nextPage) => {
        if (externalCurrentPage === undefined) {
            setInternalCurrentPage(nextPage);
        }

        onPageSelect?.(nextPage);
    };

    const getStartPage = (page) => {
        const proposedStart = page - 2;

        if (maxPage === null) {
            return Math.max(1, proposedStart);
        }

        const maxStart = Math.max(1, maxPage - 3);
        return Math.min(
            Math.max(1, proposedStart),
            maxStart
        );
    };

    const startPage = getStartPage(currentPage);

    const visiblePages = [0, 1, 2, 3]
        .map((offset) => startPage + offset)
        .filter(
            (pageNumber) =>
                maxPage === null || pageNumber <= maxPage
        );

    const canGoPrev = currentPage > 1;
    const canGoNext =
        maxPage === null
            ? true
            : currentPage < maxPage;

    return (
        <div className="join">
            <button
                type="button"
                onClick={() =>
                    canGoPrev &&
                    updateCurrentPage(currentPage - 1)
                }
                disabled={!canGoPrev}
                className="join-item btn bg-[#91D8D4] rounded-4xl text-[#583927] mr-2 hover:bg-[#583927] hover:text-[#91D8D4] focus:outline-none disabled:opacity-50"
            >
                &lt;
            </button>

            {visiblePages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    type="button"
                    onClick={() =>
                        updateCurrentPage(pageNumber)
                    }
                    className={`join-item btn rounded-4xl mr-2 focus:outline-none ${
                        pageNumber === currentPage
                            ? "bg-[#583927] text-[#91D8D4]"
                            : "bg-[#91D8D4] text-[#583927] hover:bg-[#583927] hover:text-[#91D8D4]"
                    }`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                type="button"
                onClick={() =>
                    canGoNext &&
                    updateCurrentPage(currentPage + 1)
                }
                disabled={!canGoNext}
                className="join-item btn bg-[#91D8D4] rounded-4xl text-[#583927] mr-2 hover:bg-[#583927] hover:text-[#91D8D4] focus:outline-none disabled:opacity-50"
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;