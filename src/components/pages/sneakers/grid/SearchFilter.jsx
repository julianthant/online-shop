import PropTypes from 'prop-types';

export default function SearchFilter({ searchValue, setSearchValue }) {
  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Search Sneakers"
        value={searchValue}
        className="py-3 px-3 border-[1px] border-gray-200 w-full outline-none"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}

SearchFilter.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};
