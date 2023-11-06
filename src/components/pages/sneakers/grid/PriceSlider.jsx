import { useEffect, useMemo, useState } from 'react';
import ReactSlider from 'react-slider';
import PropTypes from 'prop-types';
import GeneratePrice from './GeneratePrice';

export default function PriceSlider({ priceRange, setPriceRange, sneakers }) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  useMemo(() => {
    if (sneakers.length > 0) {
      const priceOrIds = sneakers.map((sneaker) => {
        if (sneaker.initialPrice !== null) {
          return parseInt(sneaker.initialPrice);
        } else {
          return sneaker.id;
        }
      });

      const generatedPrices = priceOrIds
        .filter((value) => typeof value === 'string')
        .map((id) => GeneratePrice(id));

      const allPrices = priceOrIds
        .filter((value) => typeof value === 'number')
        .concat(generatedPrices)
        .filter((price) => !isNaN(price));

      if (allPrices.length > 0) {
        const minPrice = Math.min(...allPrices);
        const maxPrice = Math.max(...allPrices);
        setLocalPriceRange([minPrice, maxPrice]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      priceRange[0] < localPriceRange[0] ||
      priceRange[1] > localPriceRange[1]
    ) {
      setPriceRange(localPriceRange);
    }
  }, [priceRange, localPriceRange, setPriceRange]);

  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  return (
    <div className="mb-4 font-[Inter] pt-5">
      <label className="text-2xl font-medium">Price</label>
      <ReactSlider
        min={localPriceRange[0]}
        max={localPriceRange[1]}
        value={priceRange}
        onChange={handlePriceChange}
        thumbClassName="h-4 max-xs:h-6 w-4 max-xs:w-6 bg-emerald-500 rounded-full"
        trackClassName="h-1 bg-gray-300 mt-[0.38rem] max-xs:mt-[0.65rem] relative track-color"
        className="w-full mt-2 max-xs:w-[90%] mx-auto"
      />
      <div className="flex justify-between text-sm pt-4 max-xs:pt-7 max-xs:w-[90%] mx-auto">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
  );
}

PriceSlider.propTypes = {
  priceRange: PropTypes.array.isRequired,
  setPriceRange: PropTypes.func.isRequired,
  sneakers: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
