import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import PriceSlider from './PriceSlider';
import GenderFilter from './GenderFilter';
import GeneratePrice from './GeneratePrice';
Modal.setAppElement('#root');

export default function SneakerFilter({ sneakers, setFilteredSneakers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [genderFilters, setGenderFilters] = useState({
    men: false,
    women: false,
    unisex: false,
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const applyFilters = () => {
    const noGenderFiltersSelected =
      !genderFilters.men && !genderFilters.women && !genderFilters.unisex;

    const getSneakerPrice = (sneaker) => {
      if (sneaker.initialPrice !== null) {
        return parseInt(sneaker.initialPrice);
      } else {
        return GeneratePrice(sneaker.id);
      }
    };

    if (noGenderFiltersSelected) {
      const priceFilteredSneakers = sneakers.filter((sneaker) => {
        const sneakerPrice = getSneakerPrice(sneaker);
        return sneakerPrice >= priceRange[0] && sneakerPrice <= priceRange[1];
      });
      setFilteredSneakers(priceFilteredSneakers);
    } else {
      const filteredSneakers = sneakers.filter((sneaker) => {
        return (
          (genderFilters.men && sneaker.sizing === 'man') ||
          (genderFilters.women && sneaker.sizing === 'woman') ||
          (genderFilters.unisex &&
            sneaker.sizing !== 'man' &&
            sneaker.sizing !== 'woman')
        );
      });

      const priceFilteredSneakers = filteredSneakers.filter((sneaker) => {
        const sneakerPrice = getSneakerPrice(sneaker);
        return sneakerPrice >= priceRange[0] && sneakerPrice <= priceRange[1];
      });

      setFilteredSneakers(priceFilteredSneakers);
    }

    closeModal();
  };

  const customOverlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 20,
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-emerald-500 text-white px-4 py-2 rounded-md"
      >
        Filter
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Filter Modal"
        className="fixed left-0 top-0 w-[22rem] h-full bg-white shadow-lg p-4"
        style={{
          overlay: customOverlayStyle,
        }}
      >
        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold font-[Inter]">
            Filter Options
          </h2>

          {sneakers && (
            <>
              <PriceSlider
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sneakers={sneakers}
              />
              <GenderFilter
                genderFilters={genderFilters}
                setGenderFilters={setGenderFilters}
                sneakers={sneakers}
                priceRange={priceRange}
              />
            </>
          )}
          <div className="flex justify-between">
            <button
              onClick={closeModal}
              className="bg-matte-black hover:bg-[#3b3b3b] text-white font-medium py-2 px-4 rounded-md"
            >
              Close
            </button>
            <button
              onClick={applyFilters}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

SneakerFilter.propTypes = {
  sneakers: PropTypes.arrayOf(
    PropTypes.shape({
      sizing: PropTypes.string,
      price: PropTypes.string,
    })
  ),
  setFilteredSneakers: PropTypes.func.isRequired,
};
