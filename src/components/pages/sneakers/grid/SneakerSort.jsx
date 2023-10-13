import { useState } from 'react';
import GeneratePrice from './GeneratePrice';
import PropTypes from 'prop-types';

export default function SneakerSort({
  filteredSneakers,
  setFilteredSneakers,
  originalSneakers,
}) {
  const [sortOption, setSortOption] = useState('default');

  const handleSortChange = (option) => {
    setSortOption(option);
    sortSneakers(option);
  };

  const sortSneakers = (option) => {
    let sortedSneakers = [...filteredSneakers];

    switch (option) {
      case 'ascendingPrice':
        sortedSneakers.sort((a, b) => {
          if (a.initialPrice === null) a.initialPrice = GeneratePrice(a.id);
          if (b.initialPrice === null) b.initialPrice = GeneratePrice(b.id);
          return a.initialPrice - b.initialPrice;
        });
        break;
      case 'descendingPrice':
        sortedSneakers.sort((a, b) => {
          if (a.initialPrice === null) a.initialPrice = GeneratePrice(a.id);
          if (b.initialPrice === null) b.initialPrice = GeneratePrice(b.id);
          return b.initialPrice - a.initialPrice;
        });
        break;
      case 'ascendingName':
        sortedSneakers.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case 'descendingName':
        sortedSneakers.sort((a, b) => (a.name < b.name ? 1 : -1));
        break;
      case 'default':
        sortedSneakers = [...originalSneakers];
        break;
      default:
        break;
    }

    setFilteredSneakers(sortedSneakers);
  };

  return (
    <div>
      <select
        value={sortOption}
        onChange={(e) => handleSortChange(e.target.value)}
        className="py-3 px-4 text-white bg-transparent font-[Inter] font-light outline-none border-[1px] border-gray-300 w-56"
      >
        <option className="text-black" value="default">
          Default sorting
        </option>
        <option className="text-black" value="ascendingPrice">
          Ascending Price
        </option>
        <option className="text-black" value="descendingPrice">
          Descending Price
        </option>
        <option className="text-black" value="ascendingName">
          Ascending Name
        </option>
        <option className="text-black" value="descendingName">
          Descending Name
        </option>
      </select>
    </div>
  );
}

SneakerSort.propTypes = {
  filteredSneakers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      initialPrice: PropTypes.number,
    })
  ),
  setFilteredSneakers: PropTypes.func.isRequired,
  originalSneakers: PropTypes.array.isRequired,
};
