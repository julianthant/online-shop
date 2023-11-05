import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function SizeFilter({ sizes, setSizes, sneakers }) {
  const [tempSize, setTempSize] = useState(sizes);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    const tempSizes = sneakers
      .flatMap((sneaker) => sneaker.sizes)
      .filter((size) => typeof size === 'number');

    if (!sizes) {
      // Use a Set to remove duplicates
      setSizes([...new Set(tempSizes)].sort((a, b) => a - b));
    }
    setTempSize([...new Set(tempSizes)].sort((a, b) => a - b));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAllSizesIncluded = tempSize.every((size) => sizes.includes(size));

  const toggleSizeFilter = (size) => {
    setFirst(false);
    // Create a copy of the existing sizes array
    const updatedSizeFilters = [...sizes];

    if (isAllSizesIncluded) {
      // If all sizes are included, only keep the selected size
      setSizes([size]);
    } else {
      if (updatedSizeFilters.includes(size)) {
        // If the size is already in filters, remove it
        const index = updatedSizeFilters.indexOf(size);
        updatedSizeFilters.splice(index, 1);
      } else {
        // If the size is not in filters, add it
        updatedSizeFilters.push(size);
      }

      // Update the sizes filters
      setSizes(updatedSizeFilters);
    }
  };

  return (
    <div className="mb-4 font-[Inter] pt-5">
      <label className="text-2xl font-medium">Sizes</label>
      <div className="grid grid-cols-2 gap-3 pt-4">
        {tempSize &&
          tempSize.map((size, index) => (
            <button
              key={index}
              className={`px-3 py-2 rounded-md w-full ${
                isAllSizesIncluded && first
                  ? 'bg-gray-200 text-gray-700'
                  : sizes.includes(size)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => toggleSizeFilter(size)}
            >
              {size}
            </button>
          ))}
      </div>
    </div>
  );
}

SizeFilter.propTypes = {
  sizes: PropTypes.array.isRequired,
  setSizes: PropTypes.func,
  sneakers: PropTypes.arrayOf(
    PropTypes.shape({ sizes: PropTypes.array.isRequired })
  ),
};
