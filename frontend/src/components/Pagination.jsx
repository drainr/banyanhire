import React from 'react';

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
    // Keep exactly four numeric buttons visible at a time.
    const windowSize = 4;
    // Show navigation arrows only when there are more pages than the button window.
    const showArrows = totalPages > windowSize;

    let startPage = 1;
    // Center the current page when possible while clamping to valid boundaries.
    if (showArrows) {
        startPage = Math.max(1, currentPage - 2);
        startPage = Math.min(startPage, totalPages - (windowSize - 1));
    }

    // Compute the sliding page numbers (example: 2,3,4,5).
    const visiblePages = Array.from(
        { length: Math.min(windowSize, totalPages) },
        (_, i) => startPage + i
    );

    return (
        <div className="join ">
            {showArrows && (
                <button
                    // Move one page back.
                    onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="join-item btn rounded-4xl text-[#583927] mr-2 bg-[#91D8D4] hover:bg-[#583927] hover:text-[#91D8D4] focus:bg-[#583927] focus:text-[#91D8D4] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {'<'}
                </button>
            )}

            {visiblePages.map((page) => (
                <button
                    key={page}
                    // Jump directly to the selected page number.
                    onClick={() => onPageChange?.(page)}
                    className={`join-item btn rounded-4xl text-[#583927] mr-2 hover:bg-[#583927] hover:text-[#91D8D4] focus:bg-[#583927] focus:text-[#91D8D4] ${
                        page === currentPage
                            ? 'btn-active bg-[#583927] text-[#91D8D4]'
                            : 'bg-[#91D8D4]'
                    }`}
                >
                    {page}
                </button>
            ))}

            {showArrows && (
                <button
                    // Move one page forward.
                    onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="join-item btn rounded-4xl text-[#583927] mr-2 bg-[#91D8D4] hover:bg-[#583927] hover:text-[#91D8D4] focus:bg-[#583927] focus:text-[#91D8D4] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {'>'}
                </button>
            )}
        </div>
    );
};

export default Pagination;