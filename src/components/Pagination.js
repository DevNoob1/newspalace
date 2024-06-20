import React from 'react';

const Pagination = ({ totalResults, currentPage, setPage }) => {
    const totalPages = Math.ceil(totalResults / 10);
    const maxPages = 5; // maximum number of page buttons to display

    let startPage, endPage;
    if (totalPages <= maxPages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    const pages = Array.from({ length: (endPage + 1) - startPage }, (_, i) => startPage + i);

    return (
        <div className="flex flex-wrap justify-center mt-4 space-y-2 md:space-y-0 md:space-x-2">
            <button
                onClick={() => setPage(1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-red-600 text-white'} mx-1`}
            >
                First
            </button>
            <button
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-red-600 text-white'} mx-1`}
            >
                Previous
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => setPage(page)}
                    className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-black text-white' : 'bg-white border'} mx-1`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-red-600 text-white'} mx-1`}
            >
                Next
            </button>
            <button
                onClick={() => setPage(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-red-600 text-white'} mx-1`}
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;
