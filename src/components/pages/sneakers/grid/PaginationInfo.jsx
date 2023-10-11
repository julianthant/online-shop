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

  return (
    <div className="flex justify-between mt-4">
      <p className="text-white">
        {`Showing ${startIndex + 1}-${Math.min(
          endIndex,
          totalItems
        )} of ${totalItems} results`}
      </p>
      <div className="flex gap-2">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded"
          >
            Previous Page
          </button>
        )}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`${
              currentPage === pageNumber
                ? 'bg-gray-500'
                : 'bg-gray-300 hover:bg-gray-400'
            } text-white font-bold py-2 px-3 rounded`}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage < totalPageCount && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-gray-500 hover.bg-gray-600 text-white font-bold py-2 px-3 rounded"
          >
            Next Page
          </button>
        )}
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
