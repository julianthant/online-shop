import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function SizeControl({ sizes, setSize }) {
  const dropdownRef = useRef(null);

  const [selectedSize, setSelectedSize] = useState('');
  const [sizeDropdownVisible, setSizeDropdownVisible] = useState(false);

  const handleSizeDropdownClick = () => {
    setSizeDropdownVisible(!sizeDropdownVisible);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains('size-dropdown')
      ) {
        setSizeDropdownVisible(false);
      }
    }

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSize(size);
    setSizeDropdownVisible(false);
  };

  return (
    <div className="flex items-center">
      <p className="text-gray-600 w-28">Sizes:</p>
      <div className="relative sidebar-container">
        <button
          onClick={handleSizeDropdownClick}
          className="h-10 border border-gray-300 p-2 text-left focus:outline-none w-full size-dropdown"
        >
          {selectedSize || 'Select Size'}
        </button>
        {sizeDropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute left-0 top-10 mt-2 bg-white border border-gray-300 shadow-lg w-full z-10"
          >
            <ul className="py-2">
              {sizes.map((size) => (
                <li
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className="cursor-pointer px-4 py-1 hover:bg-gray-100"
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

SizeControl.propTypes = {
  sizes: PropTypes.array.isRequired,
  setSize: PropTypes.func,
};
