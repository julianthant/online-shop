import { useEffect } from 'react';
import BrandsList from '../../../../data/BrandsList';
import PropTypes from 'prop-types';

export default function BrandFilter({ brandFilters, setBrandFilters }) {
  useEffect(() => {
    // Initialize the brandFilters with an empty array or some initial values
    if (brandFilters.length === 0) {
      const initialBrandFilters = BrandsList.map((brand) => brand.name);
      setBrandFilters(initialBrandFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleBrandFilter = (brandName) => {
    // Create a copy of the existing brandFilters array
    const updatedBrandFilters = [...brandFilters];

    if (updatedBrandFilters.includes(brandName)) {
      // If the brand is already in filters, remove it
      const index = updatedBrandFilters.indexOf(brandName);
      updatedBrandFilters.splice(index, 1);
    } else {
      // If the brand is not in filters, add it
      updatedBrandFilters.push(brandName);
    }

    // Update the brand filters
    setBrandFilters(updatedBrandFilters);
  };

  return (
    <div className="mb-4 font-[Inter] pt-5">
      <label className="text-2xl font-medium">Brands</label>
      <div className="grid grid-cols-2 gap-3 pt-4">
        {BrandsList.map((brand) => (
          <button
            key={brand.id}
            className={`px-3 py-2 rounded-md w-full ${
              brandFilters.includes(brand.name)
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => toggleBrandFilter(brand.name)}
          >
            {brand.name}
          </button>
        ))}
      </div>
    </div>
  );
}

BrandFilter.propTypes = {
  brandFilters: PropTypes.array.isRequired,
  setBrandFilters: PropTypes.func.isRequired,
};
