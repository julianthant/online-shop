import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function GenderFilter({
  genderFilters,
  setGenderFilters,
  sneakers,
  priceRange,
  brandFilters,
}) {
  const [genderCounts, setGenderCounts] = useState({
    men: 0,
    women: 0,
    unisex: 0,
  });

  useEffect(() => {
    const calculateGenderCounts = () => {
      const counts = {
        men: 0,
        women: 0,
        unisex: 0,
      };

      sneakers.forEach((sneaker) => {
        if (sneaker.sizing === 'man') {
          counts.men++;
        } else if (sneaker.sizing === 'woman') {
          counts.women++;
        } else {
          counts.unisex++;
        }
      });
      setGenderCounts(counts);
    };

    calculateGenderCounts();
  }, [sneakers, priceRange, brandFilters]);

  const handleGenderFilterChange = (gender) => {
    setGenderFilters((prevFilters) => ({
      ...prevFilters,
      [gender]: !prevFilters[gender],
    }));
  };

  return (
    <div className="mb-4 font-[Inter] pt-5">
      <label className="text-2xl font-medium">Gender</label>
      <div className="flex flex-wrap justify-between gap-y-3 pt-4">
        <button
          onClick={() => handleGenderFilterChange('men')}
          className={`${
            genderFilters.men
              ? 'bg-teal-500 text-white'
              : 'bg-gray-200 text-gray-700'
          } px-3 py-2 rounded-md w-full`}
        >
          Men ({genderCounts.men})
        </button>
        <button
          onClick={() => handleGenderFilterChange('women')}
          className={`${
            genderFilters.women
              ? 'bg-teal-500 text-white'
              : 'bg-gray-200 text-gray-700'
          } px-3 py-2 rounded-md w-full`}
        >
          Women ({genderCounts.women})
        </button>
        <button
          onClick={() => handleGenderFilterChange('unisex')}
          className={`${
            genderFilters.unisex
              ? 'bg-teal-500 text-white'
              : 'bg-gray-200 text-gray-700'
          } px-3 py-2 rounded-md w-full`}
        >
          Unisex ({genderCounts.unisex})
        </button>
      </div>
    </div>
  );
}

GenderFilter.propTypes = {
  genderFilters: PropTypes.object.isRequired,
  setGenderFilters: PropTypes.func.isRequired,
  sneakers: PropTypes.arrayOf(
    PropTypes.shape({
      sizing: PropTypes.string.isRequired,
    })
  ).isRequired,
  priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  brandFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
};
