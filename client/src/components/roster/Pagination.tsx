
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

  console.log({ pageNumbers })
  const maxPagesToShow = 5;

  const renderPageNumbers = () => {
    if (totalPages <= maxPagesToShow) {
      return pageNumbers.map((number) => (
        <li key={number} className={number === currentPage ? 'text-primary-orange' : ''}>
          <button onClick={() => paginate(number)}>{number}</button>
        </li>
      ));
    }

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={i === currentPage ? 'text-primary-orange' : ''}>
          <button onClick={() => paginate(i)}>{i}</button>
        </li>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <li key={1}>
          <button onClick={() => paginate(1)}>1</button>
        </li>,
        <li key="ellipsis-prev">...</li>
      );
    }

    if (endPage < totalPages) {
      pages.push(<li key="ellipsis-next">...</li>);
      pages.push(
        <li key={totalPages}>
          <button onClick={() => paginate(totalPages)}>{totalPages}</button>
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

export default Pagination;
