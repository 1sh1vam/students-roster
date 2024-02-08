import React from "react";

type PaginationPropsT = {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ totalPages, currentPage, paginate } : PaginationPropsT) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxPagesToShow = 5;

  const renderPageNumbers = () => {
    if (totalPages <= maxPagesToShow) {
      return pageNumbers.map((number) => (
        <li key={number} className={number === currentPage ? 'text-primary-orange' : ''}>
          <button onClick={() => paginate(number)}>{number}</button>
        </li>
      ));
    }

    const startPage = Math.floor((currentPage-1)/maxPagesToShow) * maxPagesToShow + 1;
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={i === currentPage ? 'text-primary-orange' : ''}>
          <button onClick={() => paginate(i)}>{i}</button>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav>
      <ul className="w-[300px] mx-auto flex items-center justify-between bg-neutral-light text-content-2 px-4 py-2 rounded">
        <li>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            &laquo; Prev
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

const MemoizedPagination = React.memo(Pagination);

export default MemoizedPagination;
