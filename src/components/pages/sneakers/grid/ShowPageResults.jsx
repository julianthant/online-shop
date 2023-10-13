import PropTypes from 'prop-types';

function ShowPageResults({ startIndex, endIndex, totalItems }) {
  return (
    <p className="text-white">
      {`Showing ${startIndex + 1}-${Math.min(
        endIndex,
        totalItems
      )} of ${totalItems} results`}
    </p>
  );
}

ShowPageResults.propTypes = {
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default ShowPageResults;
