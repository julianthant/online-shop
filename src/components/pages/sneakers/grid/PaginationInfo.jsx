import PropTypes from 'prop-types';

export default function PaginationInfo({
  startIndex,
  endIndex,
  totalItems,
  currentPage,
  setCurrentPage,
}) {
  const totalPageCount = Math.ceil(totalItems / (endIndex - startIndex));
  const pageNumbers = Array.from(
    { length: totalPageCount },
    (_, index) => index + 1
  );

  const maxPageButtons = 5; // Maximum number of page buttons to display

  const getPageButtonsToDisplay = () => {
    if (totalPageCount <= maxPageButtons) {
      return pageNumbers;
    }

    // Calculate the start and end page numbers to display
    const halfMaxButtons = Math.floor(maxPageButtons / 2);
    let start = currentPage - halfMaxButtons;
    let end = currentPage + halfMaxButtons;

    if (start < 1) {
      start = 1;
      end = maxPageButtons;
    } else if (end > totalPageCount) {
      end = totalPageCount;
      start = totalPageCount - maxPageButtons + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const pageButtonsToDisplay = getPageButtonsToDisplay();

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="flex gap-2">
        <button
          disabled={currentPage < 2}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="text-gray-300 disabled:hover:opacity-60 hover:opacity-70 font-bold py-2 pr-10 max-sm:pr-3 text-sm tracking-widest opacity-50 font-[Montserrat]"
        >
          BACK
        </button>
        {pageButtonsToDisplay.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`${
              currentPage === pageNumber
                ? 'text-emerald-500'
                : 'text-white bg-transparent hover:text-emerald-600'
            }  font-bold py-2 px-5 max-sm:px-3 rounded`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          disabled={currentPage >= totalPageCount}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="text-gray-300 disabled:hover:opacity-60 hover:opacity-70 font-bold py-2 pl-10 max-sm:pl-3 text-sm tracking-widest opacity-50 font-[Montserrat]"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

PaginationInfo.propTypes = {
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
