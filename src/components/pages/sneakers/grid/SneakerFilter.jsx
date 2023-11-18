import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import PriceSlider from './PriceSlider';
import GenderFilter from './GenderFilter';
import GeneratePrice from './GeneratePrice';
import SearchFilter from './SearchFilter';
import CloseMenu from '../../../../assets/close_menu_dark.svg';
import { motion, AnimatePresence } from 'framer-motion';
import OpenMenu from '../../../../assets/menu.svg';
import BrandFilter from './BrandFilter';
import BrandsList from '../../../../data/BrandsList';
import SizeFilter from './SizeFilter';
import { useLocation } from 'react-router-dom';

export default function SneakerFilter({
  sneakers,
  setFilteredSneakers,
  setOriginalSneakers,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [genderFilters, setGenderFilters] = useState({
    men: false,
    women: false,
    unisex: false,
  });
  const [brandFilters, setBrandFilters] = useState([]);
  const [sizeFilters, setSizeFilters] = useState([]);

  const modalRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const gender = queryParams.get('gender');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (gender === 'men') {
      setGenderFilters({
        men: true,
        women: false,
        unisex: false,
      });
    }

    if (gender === 'women') {
      setGenderFilters({
        men: false,
        women: true,
        unisex: false,
      });
    }

    if (gender === 'unisex') {
      setGenderFilters({
        men: false,
        women: false,
        unisex: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender]);

  useEffect(() => {
    const isGenderFilterSelected =
      genderFilters.men || genderFilters.women || genderFilters.unisex;
    const isPriceFilterSelected = priceRange[0] !== 0 || priceRange[1] !== 100;
    const isSearchFilterSelected = searchValue.length > 0;
    const isBrandFilterSelected = brandFilters.length > 0;
    const isSizeFilterSelected = sizeFilters.length > 0;

    const getSneakerPrice = (sneaker) => {
      if (sneaker.initialPrice !== null) {
        return parseInt(sneaker.initialPrice);
      } else if (sneaker.price) {
        return parseInt(sneaker.price);
      } else {
        return GeneratePrice(sneaker.id);
      }
    };

    let filteredSneakers = sneakers;

    if (isBrandFilterSelected) {
      const modifiedBrandFilters = brandFilters.map((brand) => {
        return brand === 'Reebok' ? 'Reebook' : brand;
      });

      filteredSneakers = filteredSneakers.filter((sneaker) => {
        return modifiedBrandFilters.some((brand) => {
          // Make sure both sneaker.brandName and brand are defined
          if (sneaker.brandName && brand) {
            return sneaker.brandName
              .toLowerCase()
              .includes(brand.toLowerCase());
          }
          return false;
        });
      });
    }

    if (isSizeFilterSelected) {
      filteredSneakers = filteredSneakers.filter((sneaker) => {
        return sizeFilters.some((size) => {
          if (sneaker.sizes && size) {
            return sneaker.sizes.includes(size);
          }
        });
      });
    }

    if (isGenderFilterSelected) {
      filteredSneakers = filteredSneakers.filter((sneaker) => {
        return (
          (genderFilters.men && sneaker.sizing === 'man') ||
          (genderFilters.women && sneaker.sizing === 'woman') ||
          (genderFilters.unisex &&
            sneaker.sizing !== 'man' &&
            sneaker.sizing !== 'woman')
        );
      });
    }

    if (isPriceFilterSelected) {
      filteredSneakers = filteredSneakers.filter((sneaker) => {
        const sneakerPrice = getSneakerPrice(sneaker);
        return sneakerPrice >= priceRange[0] && sneakerPrice <= priceRange[1];
      });
    }

    if (isSearchFilterSelected) {
      filteredSneakers = filteredSneakers.filter((sneaker) =>
        sneaker.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredSneakers(filteredSneakers);
    setOriginalSneakers(filteredSneakers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    genderFilters.men,
    genderFilters.women,
    genderFilters.unisex,
    priceRange,
    searchValue,
    setFilteredSneakers,
    setOriginalSneakers,
    brandFilters,
    sizeFilters,
    location.search,
    queryParams,
    gender,
  ]);

  const customOverlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 20,
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  function handleReset() {
    setFilteredSneakers(sneakers);

    const initialBrandFilters = BrandsList.map((brand) => brand.name);
    setBrandFilters(initialBrandFilters);

    setGenderFilters({ men: false, women: false, unisex: false });

    setPriceRange([0, 100]);

    const initialSizeFilters = sneakers
      .flatMap((sneaker) => sneaker.sizes)
      .filter((size) => typeof size === 'number');

    setSizeFilters([...new Set(initialSizeFilters)].sort((a, b) => a - b));

    closeModal();
  }

  return (
    <div className="w-full">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-emerald-700 text-white px-4 py-[0.6rem] w-full font-[Inter] tracking-widest whitespace-nowrap flex items-center gap-3 hover:bg-emerald-800"
      >
        <img className="w-6 max-xs:hidden" src={OpenMenu} alt="Menu" />
        <p>FILTER SHOES</p>
      </button>
      <AnimatePresence>
        {isModalOpen && (
          <div style={customOverlayStyle}>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25 }}
              className="fixed left-0 top-0 w-[22rem] h-full bg-white shadow-lg p-4 overflow-auto"
              ref={modalRef}
            >
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <h2 className="text-3xl font-semibold font-[Inter]">
                    Filter Options
                  </h2>
                  <button
                    className="w-8 h-8 hover-bg-gray-100 rounded-full"
                    onClick={closeModal}
                  >
                    <img className="w-6 mx-auto" src={CloseMenu} alt="" />
                  </button>
                </div>
                {sneakers && (
                  <>
                    <SearchFilter
                      setFilteredSneakers={setFilteredSneakers}
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                    />
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
                      brandFilters={brandFilters}
                      sizeFilters={sizeFilters}
                      gender={gender}
                    />
                    <BrandFilter
                      brandFilters={brandFilters}
                      setBrandFilters={setBrandFilters}
                    />
                    <SizeFilter
                      sizes={sizeFilters}
                      setSizes={setSizeFilters}
                      sneakers={sneakers}
                    />
                  </>
                )}
                <div className="font-[Inter] pt-5">
                  <h3 className="text-2xl font-medium">Settings</h3>
                  <button
                    onClick={handleReset}
                    className="bg-red-600 py-2 w-full mt-3 rounded-md text-md"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
  setOriginalSneakers: PropTypes.func.isRequired,
};
