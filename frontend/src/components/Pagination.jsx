import React from 'react';

const Pagination = ({ currentPage: externalCurrentPage, initialPage = 1, maxPage = null, onPageSelect }) => {
    const [internalCurrentPage, setInternalCurrentPage] = React.useState(initialPage);
    const currentPage = externalCurrentPage ?? internalCurrentPage;

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
        return Math.min(Math.max(1, proposedStart), maxStart);
    };

    const startPage = getStartPage(currentPage);
    const visiblePages = [0, 1, 2, 3]
        .map((offset) => startPage + offset)
        .filter((pageNumber) => maxPage === null || pageNumber <= maxPage);

    const canGoPrev = currentPage > 1;
    const canGoNext = maxPage === null ? true : currentPage < maxPage;

    const goPrev = () => {
        if (!canGoPrev) return;
        updateCurrentPage(currentPage - 1);
    };

    const goNext = () => {
        if (!canGoNext) return;
        updateCurrentPage(currentPage + 1);
    };

    const handlePageClick = (pageNumber) => {
        updateCurrentPage(pageNumber);
    };

    return (
        <div className="join ">
            <button
                type="button"
                onClick={goPrev}
                disabled={!canGoPrev}
                className="join-item btn bg-[#91D8D4] rounded-4xl text-[#583927] mr-2 hover:bg-[#583927] hover:text-[#91D8D4] focus:bg-[#583927] focus:text-[#91D8D4] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &lt;
            </button>

            {visiblePages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    type="button"
                    onClick={() => handlePageClick(pageNumber)}
                    className={`join-item btn rounded-4xl text-[#583927] mr-2 hover:bg-[#583927] hover:text-[#91D8D4] focus:bg-[#583927] focus:text-[#91D8D4] ${
                        pageNumber === currentPage
                            ? 'btn-active bg-[#583927] text-[#91D8D4]'
                            : 'bg-[#91D8D4]'
                    }`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                type="button"
                onClick={goNext}
                disabled={!canGoNext}
                className="join-item btn bg-[#91D8D4] rounded-4xl text-[#583927] mr-2 hover:bg-[#583927] hover:text-[#91D8D4] focus:bg-[#583927] focus:text-[#91D8D4] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;